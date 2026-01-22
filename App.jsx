import React, { useState, useEffect, useRef } from 'react';
import { Play, Mail, Menu, X, Monitor, Users, Home, Briefcase, Phone, BookOpen, Clapperboard, Star, ChevronDown, ChevronUp, Instagram } from 'lucide-react';

/* ==================================================================================
   1. PANEL DE CONTROL (CONFIGURACIÓN EDITABLE)
   
   MANUAL RÁPIDO DE USO:
   ---------------------
   Este archivo es el "cerebro" de tu página. Aquí controlas todo el contenido.
   
   - SECCIÓN ESTADO: Cambia 'plazas' al número de clientes que puedes aceptar. 
     Si pones 0, el estado cambiará automáticamente a "Agenda Cerrada".
   - SECCIÓN TRABAJOS: Es tu lista de videos. Para agregar uno nuevo, ve al final de la lista.
   
================================================================================== */

const CONFIG = {
    // --- ESTADO DE DISPONIBILIDAD ---
    estado: {
        plazas: 2, // <-- ¡CAMBIA ESTE NÚMERO! Si es > 0, está disponible. Si es 0, está ocupado.
        // Nota: El texto de "Cupos disponibles" ahora es automático en la sección Hero.
        textoNoDisponible: "Agenda Cerrada Temporalmente"
    },

    // --- TUS DATOS DE CONTACTO ---
    personal: {
        whatsapp: "8293918724", // Número para el botón de WhatsApp (sin + ni espacios)
        email: "ezequiel.designking@gmail.com", // Tu correo electrónico
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
        blog: "https://www.instagram.com/_gopassport/" // Link del botón "Blog Personal"
    },

    // --- TEXTOS DE LA PORTADA ---
    textos: {
        tituloPrincipal: "Transformo Vistas en Resultados Reales",
        subtitulo: "Más que edición: creo elementos visuales diseñados para retener la atención y transformar espectadores en clientes.",
    },

    // --- TUS HERRAMIENTAS (LOGOS) ---
    herramientas: [
        {
            nombre: "DaVinci Resolve",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/DaVinci_Resolve_Studio.png/1024px-DaVinci_Resolve_Studio.png",
            desc: "Color Grading & Montaje"
        },
        {
            nombre: "Adobe Premiere Pro",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/512px-Adobe_Premiere_Pro_CC_icon.svg.png",
            desc: "Edición Avanzada"
        },
        {
            nombre: "Adobe After Effects",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/512px-Adobe_After_Effects_CC_icon.svg.png",
            desc: "VFX & Motion Graphics"
        }
    ],

    /* --------------------------------------------------------------------------
       API DE PORTAFOLIO: CÓMO AGREGAR NUEVOS VIDEOS
       --------------------------------------------------------------------------
       Para agregar un trabajo, copia el siguiente bloque y pégalo dentro de la lista 'trabajos'.
       
       ¡NUEVO! Usa 'esVertical: true' para videos tipo Reels/TikToks (sin bordes negros en el reproductor).

       { 
           id: 99, 
           titulo: "Título de tu video", 
           categoria: "anuncios", 
           imagen: "nombre-de-tu-foto.jpg",
           vistas: "1M Vistas",
           videoUrl: "LINK_DEL_VIDEO",
           esVertical: true // <--- ¡AÑADE ESTO SI EL VIDEO ES VERTICAL!
       },
    -------------------------------------------------------------------------- */
    trabajos: [
        {
            id: 1,
            titulo: "Chilli Restaurant",
            categoria: "anuncios",
            imagen: "/img/Chilishack.webp",
            vistas: "200k+ Vistas",
            videoUrl: "https://player.vimeo.com/video/1141238978",
            esVertical: true, // Ejemplo: Este se verá alto en el celular
        },
        {
            id: 3,
            titulo: "¿Cómo destacar en la música?",
            categoria: "marca_personal",
            imagen: "/img/3pioneras.webp",
            vistas: "700+ Vistas",
            videoUrl: "https://player.vimeo.com/video/1157043890",
            esVertical: true
        },
        {
            id: 4,
            titulo: "Iman Gadzi editing style",
            categoria: "marca_personal",
            imagen: "/img/editing programs.webp",
            vistas: "105+ Vistas",
            esVertical: true,
            videoUrl: "https://player.vimeo.com/video/1157042955",
            esNuevo: true
            
        },
        {
            id: 6,
            titulo: "Como conseguir clientes?",
            categoria: "videos_largos",
            imagen: "/img/Clientes.webp",
            vistas: "300k Vistas",
            videoUrl: "https://player.vimeo.com/video/1118611689"
        }
    ],
    // --- TESTIMONIOS ---
    testimonios: [
        {
            id: 1,
            nombre: "Nathanael Santiago Vasquez",
            rol: "Influencer de Viajes",
            foto: "/img/tes-natha.webp",
            texto: "Trabajar con Ezequiel ha sido un cambio total para mi contenido. Su edición no solo es técnica, sino que entiende perfectamente la narrativa de mis viajes y gracias a eso mis resultados han mejorado enormemente.",
            instagram: "https://www.instagram.com/_gopassport/" // Pega aquí el link de Instagram
        },

    ],
    // --- PREGUNTAS FRECUENTES (FAQ) ---
    faq: [
        {
            id: 1,
            pregunta: "¿Cuánto tiempo tardas en entregar un video?",
            respuesta: "Depende de la complejidad del proyecto. Para videos cortos (Reels/TikToks), suelo entregar resultados entre 48-72 horas. Proyectos más largos o complejos pueden tomar de 3 a 5 días hábiles."
        },
        {
            id: 2,
            pregunta: "¿Incluyes revisiones en el servicio?",
            respuesta: "Sí, absolutamente. Todos mis paquetes incluyen hasta 2 rondas de revisiones gratuitas para asegurar que el resultado final sea exactamente lo que buscas y quedes 100% satisfecho."
        },
        {
            id: 3,
            pregunta: "¿Qué necesito para empezar a trabajar contigo?",
            respuesta: "Solo necesito el material en crudo (raw footage) en la mejor calidad posible y, si tienes, referencias o una idea clara del estilo que deseas. Si no tienes idea, ¡yo te ayudo a definirla!"
        },
        {
            id: 4,
            pregunta: "¿Ofreces paquetes mensuales o por volumen?",
            respuesta: "Sí. Si necesitas varios videos al mes, puedo ofrecerte tarifas especiales y paquetes personalizados para creadores, marcas y empresas."
        },
        {
            id: 5,
            pregunta: "¿Qué métodos de pago aceptas?",
            respuesta: "Acepto pagos por PayPal, BanReservas y Qik. Si tienes otro método de pago que te resulte más cómodo, podemos conversarlo y adaptarnos sin problema."
        },
        {
            id: 6,
            pregunta: "¿Puedo pedir un estilo de edición específico?",
            respuesta: "Por supuesto. Solo envíame ejemplos y puedo adaptarme al estilo que buscas: moderno, rápido, minimalista, cinematográfico, etc."
        }
    ]
};

/* ==================================================================================
   2. COMPONENTES VISUALES
================================================================================== */

// Componente simple para el icono de WhatsApp
const WhatsAppIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
);

// --- COMPONENTE LINK INSTAGRAM ---
const InstagramLink = ({ url }) => {
    if (!url) return null;
    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-gray-400 hover:text-pink-500 transition-colors text-xs mb-4"
        >
            <Instagram size={14} />
            <span>Ver Instagram</span>
        </a>
    );
};

// --- COMPONENTE DE ANIMACIÓN (REVEAL ON SCROLL) ---
const RevealSection = ({ children, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            });
        }, { threshold: 0.1 });

        const { current } = domRef;
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                } ${className}`}
        >
            {children}
        </div>
    );
};

// --- BARRA DE NAVEGACIÓN ---
const BarraNavegacion = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 border-b 
            ${scrolled
                    ? 'bg-black/90 backdrop-blur-md border-white/10 py-2 shadow-lg'
                    : 'bg-transparent border-transparent py-4 md:py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50 bg-black/0">
                <div className="flex justify-between items-center h-full">
                    <div className="text-2xl font-bold tracking-tighter cursor-pointer">
                        _editor_<span className="text-yellow-500">zeke</span>
                    </div>

                    {/* Menú PC */}
                    <div className="hidden lg:flex space-x-8 items-center">
                        <a href="#inicio" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm uppercase tracking-widest flex items-center gap-2">
                            <Home size={16} /> Inicio
                        </a>
                        <a href="#portafolio" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm uppercase tracking-widest flex items-center gap-2">
                            <Briefcase size={16} /> Trabajos
                        </a>
                        <a href="#contacto" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm uppercase tracking-widest flex items-center gap-2">
                            <Phone size={16} /> Contacto
                        </a>
                        <a href="https://www.instagram.com/visual_productions810/" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm uppercase tracking-widest flex items-center gap-2">
                            <Clapperboard size={16} /> Agencia de Video
                        </a>

                        <a href={CONFIG.personal.blog} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm uppercase tracking-widest flex items-center gap-2">
                            <BookOpen size={16} /> Blog Personal
                        </a>

                        <a href={`https://wa.me/${CONFIG.personal.whatsapp}`} target="_blank" rel="noreferrer" className="px-6 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 text-white transition-all rounded-full text-sm font-bold flex items-center gap-2">
                            <WhatsAppIcon className="text-white w-4 h-4" /> WhatsApp
                        </a>
                    </div>

                    {/* Botón Menú Móvil */}
                    <div className="lg:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú Desplegable Móvil (Animado Entrada/Salida) */}
            <div
                className={`lg:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 transition-all duration-300 ease-in-out transform origin-top -z-10 ${isMenuOpen
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-4 invisible'
                    }`}
            >
                <div className="px-4 pt-4 pb-8 space-y-4 flex flex-col items-center">
                    <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="px-3 py-2 text-white hover:text-yellow-500 text-lg flex items-center gap-2"><Home size={20} /> Inicio</a>
                    <a href="#portafolio" onClick={() => setIsMenuOpen(false)} className="px-3 py-2 text-white hover:text-yellow-500 text-lg flex items-center gap-2"><Briefcase size={20} /> Portafolio</a>
                    <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="px-3 py-2 text-white hover:text-yellow-500 text-lg flex items-center gap-2"><Phone size={20} /> Contacto</a>
                    <a href="https://www.instagram.com/visual_productions810/" target="_blank" rel="noreferrer" onClick={() => setIsMenuOpen(false)} className="px-3 py-2 text-white hover:text-yellow-500 text-lg flex items-center gap-2"><Clapperboard size={20} /> Agencia de Video</a>
                    <a href={CONFIG.personal.blog} target="_blank" rel="noreferrer" onClick={() => setIsMenuOpen(false)} className="px-3 py-2 text-white hover:text-yellow-500 text-lg flex items-center gap-2"><BookOpen size={20} /> Blog Personal</a>

                    {/* Botón WhatsApp */}
                    <a
                        href={`https://wa.me/${CONFIG.personal.whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-white font-bold flex items-center gap-2 hover:bg-white/10"
                    >
                        <WhatsAppIcon className="w-5 h-5" /> WhatsApp
                    </a>
                </div>
            </div>
        </nav>
    );
};

// --- SECCIÓN PRINCIPAL (HERO) ---
const SeccionHero = () => {
    // Lógica de estado basada en el número de plazas
    const plazas = CONFIG.estado.plazas;
    const estaDisponible = plazas > 0;

    // Paleta de colores verde esmeralda (estilo Matrix/Hacker)
    const estiloContainer = estaDisponible
        ? "bg-emerald-950/40 border-emerald-500/30"
        : "bg-orange-500/10 border-orange-500/30";

    const colorPunto = estaDisponible ? "bg-emerald-500" : "bg-orange-500";
    // CAMBIO: Añadido efecto 'animate-ping' para parpadeo
    const colorPing = estaDisponible ? "bg-emerald-400" : "hidden";
    const colorTexto = estaDisponible ? "text-emerald-400" : "text-gray-200";

    // LOGICA DE SINGULAR/PLURAL (AUTOMÁTICA)
    const textoCupos = plazas === 1 ? "Cupo disponible" : "Cupos disponibles";

    // Texto del estado dinámico: "X Cupos disponibles"
    const textoEstado = estaDisponible
        ? <><span className="font-bold">{plazas}</span> {textoCupos}</>
        : CONFIG.estado.textoNoDisponible;

    return (
        <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden min-h-screen flex items-center">
            <div className="absolute top-20 right-0 w-72 h-72 bg-yellow-600/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-800/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
                <RevealSection>
                    <div className="flex flex-col items-center justify-center gap-6 mb-10">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-700 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                            <img
                                src="image_874a98.png"
                                alt="Foto de Perfil"
                                className="relative w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-2 border-yellow-600/50 shadow-2xl"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://i.postimg.cc/zG2bZd2r/Archivo-i-Love-IMG.png"; }}
                            />
                            <div className="absolute bottom-1 right-1 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">Editor</div>
                        </div>

                        {/* Indicador de estado */}
                        <div className={`inline-flex items-center gap-3 px-5 py-3 border rounded-full backdrop-blur-sm transition-all cursor-default shadow-lg h-fit ${estiloContainer}`}>
                            <span className="relative flex h-3 w-3">
                                {/* Efecto de parpadeo (ping) solo para el punto verde */}
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorPing}`}></span>
                                <span className={`relative inline-flex rounded-full h-3 w-3 ${colorPunto}`}></span>
                            </span>
                            <span className={`text-sm font-medium tracking-wide ${colorTexto}`}>{textoEstado}</span>
                        </div>
                    </div>
                </RevealSection>

                <RevealSection className="delay-200">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        {CONFIG.textos.tituloPrincipal.split(' ').slice(0, 3).join(' ')} <br />
                        <span className="text-gold-gradient">{CONFIG.textos.tituloPrincipal.split(' ').slice(3).join(' ')}</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        {CONFIG.textos.subtitulo}
                    </p>
                </RevealSection>

                <RevealSection className="delay-300">
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#portafolio" className="btn-gold px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2">
                            Ver Trabajos <Play size={20} fill="black" />
                        </a>
                        <a href={`https://wa.me/${CONFIG.personal.whatsapp}`} target="_blank" rel="noreferrer" className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/30 transition-all text-white">
                            <WhatsAppIcon className="w-5 h-5 text-white" /> Contáctame
                        </a>
                    </div>
                </RevealSection>
            </div>
        </section>
    );
};

// --- SECCIÓN STACK/HERRAMIENTAS ---
const SeccionHerramientas = () => {
    return (
        <section className="py-12 bg-black border-y border-white/10">
            <div className="max-w-5xl mx-auto px-4">
                <RevealSection>
                    <div className="text-center mb-8">
                        <h3 className="text-gray-400 text-sm uppercase tracking-[0.2em] font-bold">Stack de Edición Profesional</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-center">
                        {CONFIG.herramientas.map((tool, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-yellow-500/30 transition-all hover:bg-white/10 group">
                                <div className="w-12 h-12 flex-shrink-0 bg-black/50 rounded-lg p-2 flex items-center justify-center border border-white/10">
                                    <img src={tool.logo} alt={tool.nombre} className="w-full h-full object-contain" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-white group-hover:text-yellow-400 transition-colors">{tool.nombre}</h4>
                                    <p className="text-xs text-gray-500">{tool.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </RevealSection>
            </div>
        </section>
    );
};

// --- SECCIÓN PORTAFOLIO (TARJETAS CLICKEABLES) ---
const SeccionPortafolio = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedVideo(null);
            }
        };

        if (selectedVideo) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedVideo]);

    const todasLasCategorias = [
        { id: 'all', label: 'Todos' },
        { id: 'anuncios', label: 'Anuncios' },
        { id: 'marca_personal', label: 'Marca Personal' },
        { id: 'videos_largos', label: 'Videos Largos' },
        { id: 'blogs', label: 'Blogs' }
    ];

    const categoriasVisibles = todasLasCategorias.filter(cat =>
        cat.id === 'all' || CONFIG.trabajos.some(trabajo => trabajo.categoria === cat.id)
    );

    const trabajosFiltrados = (activeTab === 'all'
        ? [...CONFIG.trabajos]
        : CONFIG.trabajos.filter(p => p.categoria === activeTab))
        .sort((a, b) => {
            if (a.esNuevo === b.esNuevo) return 0;
            return a.esNuevo ? -1 : 1;
        });

    return (
        <section id="portafolio" className="py-24 px-4 relative">
            <div className="max-w-7xl mx-auto">

                <RevealSection>
                    <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 text-center lg:text-left">
                        <div className="w-full lg:w-auto">
                            <h2 className="text-4xl font-bold mb-4">Mis <span className="text-yellow-500">Trabajos</span></h2>
                            <p className="text-gray-400">Una selección de mis mejores ediciones por categoría.</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-6 lg:mt-0 w-full lg:w-auto justify-center lg:justify-end">
                            {categoriasVisibles.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === cat.id ? 'bg-yellow-600 text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </RevealSection>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trabajosFiltrados.map((trabajo, index) => (
                        <RevealSection key={trabajo.id} className={`delay-${index * 100}`}>
                            <div
                                onClick={() => { if (trabajo.videoUrl) setSelectedVideo(trabajo); }}
                                className="group relative rounded-xl overflow-hidden aspect-square sm:aspect-video cursor-pointer border border-white/10 bg-gray-900 transition-all hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10"
                            >
                                <img src={trabajo.imagen} alt={trabajo.titulo} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-0"></div>

                                {/* Etiqueta NUEVO */}
                                {trabajo.esNuevo && (
                                    <div className="absolute top-4 right-4 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded-full z-10 transition-opacity duration-300 group-hover:opacity-0">
                                        NUEVO
                                    </div>
                                )}

                                <div className="absolute inset-0 flex items-end justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-16 h-16 bg-yellow-500/90 group-hover:bg-yellow-500/60 rounded-full flex items-center justify-center backdrop-blur-sm transform scale-50 group-hover:scale-100 transition-all duration-300 shadow-xl">
                                        <Play size={28} fill="black" className="ml-1 text-black" />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-all duration-300 group-hover:opacity-0">
                                    <span className="text-xs font-bold px-2 py-1 bg-white/20 backdrop-blur-md rounded text-white uppercase tracking-wider mb-2 inline-block">
                                        {trabajo.categoria.replace('_', ' ')}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-1 leading-tight">{trabajo.titulo}</h3>

                                </div>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>

            {selectedVideo && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-50">
                        <X size={40} />
                    </button>
                    <div className={`relative w-full ${selectedVideo.esVertical ? 'max-w-[400px] aspect-[9/16]' : 'max-w-4xl aspect-video'} rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black`}>
                        <iframe src={`${selectedVideo.videoUrl}?autoplay=1`} width="100%" height="100%" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="Video Player"></iframe>
                    </div>
                </div>
            )}
        </section>
    );
};

// --- SECCIÓN TESTIMONIOS ---
const SeccionTestimonios = () => {
    return (
        <section className="py-24 px-4 bg-black/50 relative overflow-hidden">
            {/* Fondo decorativo sutil */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/10 via-black to-black pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <RevealSection>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Lo que dicen <span className="text-yellow-500">mis clientes</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Resultados reales de personas que han confiado en mi trabajo para potenciar su contenido.
                        </p>
                    </div>
                </RevealSection>

                {/* Contenedor Slider en Móvil / Grid en Desktop -> AHORA: Flex Wrap Centrado */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                    {CONFIG.testimonios.map((testimonio, index) => (
                        <RevealSection key={testimonio.id} className={`delay-${index * 100} h-full w-full sm:w-[350px]`}>
                            <div className="h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/30 transition-all duration-300 flex flex-col items-center text-center group hover:bg-white/10">

                                {/* Foto de Perfil */}
                                <div className="mb-6 relative">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-500/50 p-1 shadow-lg shadow-yellow-500/10 group-hover:scale-105 transition-transform duration-300">
                                        <img
                                            src={testimonio.foto}
                                            alt={testimonio.nombre}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black p-1.5 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" /></svg>
                                    </div>
                                </div>

                                {/* Nombre y Rol */}
                                <h3 className="text-xl font-bold text-white mb-1">{testimonio.nombre}</h3>
                                {testimonio.rol && <p className="text-xs text-yellow-500 uppercase tracking-widest font-bold mb-2">{testimonio.rol}</p>}

                                {/* Instagram Link Component */}
                                <InstagramLink url={testimonio.instagram} />

                                {/* Estrellas */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                                    ))}
                                </div>

                                {/* Reseña */}
                                <p className="text-gray-300 italic leading-relaxed text-sm">
                                    "{testimonio.texto}"
                                </p>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- SECCIÓN FAQ (PREGUNTAS FRECUENTES) ---
const SeccionFAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 px-4 relative">
            <div className="max-w-3xl mx-auto">
                <RevealSection>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Preguntas <span className="text-yellow-500">Frecuentes</span></h2>
                        <p className="text-gray-400">Todo lo que necesitas saber antes de empezar.</p>
                    </div>
                </RevealSection>

                <div className="space-y-4">
                    {CONFIG.faq.map((item, index) => (
                        <RevealSection key={item.id} className={`delay-${index * 100}`}>
                            <div
                                className={`border border-white/10 rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-white/10 border-yellow-500/30' : 'bg-white/5 hover:bg-white/10'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                                >
                                    <span className={`font-bold text-lg ${openIndex === index ? 'text-yellow-500' : 'text-white'}`}>
                                        {item.pregunta}
                                    </span>
                                    {openIndex === index ? (
                                        <ChevronUp className="text-yellow-500" />
                                    ) : (
                                        <ChevronDown className="text-gray-400" />
                                    )}
                                </button>
                                <div
                                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-gray-300 leading-relaxed">
                                        {item.respuesta}
                                    </p>
                                </div>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- SECCIÓN CONTACTO ---
const SeccionContacto = () => {
    const plazas = CONFIG.estado.plazas;
    const estaDisponible = plazas > 0;
    const mesActual = new Date().toLocaleString('es-ES', { month: 'long' });

    // LOGICA DE SINGULAR/PLURAL PARA CONTACTO
    const textoCupos = plazas === 1 ? "CUPO DISPONIBLE" : "CUPOS DISPONIBLES";
    const textoLugares = plazas === 1 ? "lugar" : "lugares";

    return (
        <section id="contacto" className="py-24 px-4 bg-gradient-to-t from-[#0a0a0a] to-[#050505]">
            <div className="max-w-4xl mx-auto text-center">
                <RevealSection>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Listo para escalar tu contenido?</h2>

                    {/* DISPONIBILIDAD (Ajustada a la paleta naranja elegante) */}
                    {estaDisponible ? (
                        <div className="mb-12 inline-flex flex-col items-center">
                            <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-3xl md:text-4xl font-bold text-white">
                                <span className="text-orange-400 text-5xl md:text-6xl">{plazas}</span>
                                <span className="text-orange-400 uppercase tracking-wider">{textoCupos}</span>
                                <span className="text-gray-400">para este mes</span>
                            </div>
                            {/* Barra de progreso decorativa (naranja suave) */}
                            <div className="w-full h-1.5 bg-orange-900/20 rounded-full mt-4 overflow-hidden">
                                <div className="h-full bg-orange-400 w-2/3 rounded-full animate-pulse"></div>
                            </div>
                            <p className="text-gray-400 mt-4 text-lg">
                                Hablemos sobre tu proyecto y aseguremos tu lugar.
                            </p>
                        </div>
                    ) : (
                        <div className="mb-12 p-6 bg-orange-500/10 border border-orange-500/30 rounded-2xl">
                            <p className="text-orange-500 text-xl font-bold uppercase tracking-wider">Agenda Cerrada Temporalmente</p>
                            <p className="text-gray-400 mt-2">
                                Actualmente no tengo plazas disponibles. Contáctame para lista de espera.
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        {/* Botón WhatsApp */}
                        <a href={`https://wa.me/${CONFIG.personal.whatsapp}`} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-5 bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl flex items-center justify-center gap-4 hover:bg-[#25D366]/20 hover:border-[#25D366] transition-all group">
                            <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <WhatsAppIcon className="text-white w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-[#25D366] uppercase tracking-widest font-bold">WhatsApp</p>
                                <p className="text-lg font-bold text-white">Contáctame</p>
                            </div>
                        </a>

                        {/* Botón Email Clickeable */}
                        <a href={`mailto:${CONFIG.personal.email}`} className="w-full sm:w-auto px-8 py-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-4 hover:bg-white/10 hover:border-yellow-500/50 transition-all group cursor-pointer">
                            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                                <Mail size={24} className="text-white group-hover:text-black" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-gray-500 uppercase tracking-widest">Email</p>
                                <p className="text-sm sm:text-lg font-bold text-white whitespace-nowrap">{CONFIG.personal.email}</p>
                            </div>
                        </a>
                    </div>

                    {estaDisponible && (
                        <p className="text-gray-500 mt-8 flex items-center justify-center gap-2">
                            <Users size={18} className="text-yellow-500" />
                            Solo quedan <span className="text-yellow-500 font-bold">{plazas} {textoLugares}</span> para este mes.
                        </p>
                    )}

                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
                        <p>© 2024 {CONFIG.personal.email}. Todos los derechos reservados.</p>
                    </div>
                </RevealSection>
            </div>
        </section>
    );
};

/* ==================================================================================
   3. APLICACIÓN PRINCIPAL
================================================================================== */

const App = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-yellow-500 selection:text-black">
            {/* Estilos CSS Globales */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');
                html { scroll-behavior: smooth; }
                body { font-family: 'Inter', sans-serif; }
                .text-gold-gradient {
                    background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
                    -webkit-background-clip: text; background-clip: text; color: transparent;
                    background-size: 200% auto; animation: shine 4s linear infinite;
                }
                .btn-gold {
                    background: linear-gradient(45deg, #b38728, #fbf5b7, #aa771c); color: #000; transition: all 0.3s ease;
                }
                .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 20px -10px rgba(191, 149, 63, 0.5); }
                .btn-whatsapp { background: #25D366; color: white; transition: all 0.3s ease; }
                .btn-whatsapp:hover { background: #128C7E; transform: translateY(-2px); box-shadow: 0 10px 20px -10px rgba(37, 211, 102, 0.2); }
                @keyframes shine { to { background-position: 200% center; } }
                
                @keyframes slideDown { 
                    from { opacity: 0; transform: translateY(-10px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }

                .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #000; }
                ::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #b38728; }
                
                /* Ocultar scrollbar para el slider de testimonios */
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <BarraNavegacion />
            <SeccionHero />
            <SeccionHerramientas />
            <SeccionPortafolio />
            <SeccionTestimonios />
            <SeccionFAQ />
            <SeccionContacto />
        </div>
    );
};

export default App;
