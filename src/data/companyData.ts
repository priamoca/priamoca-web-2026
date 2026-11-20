import { ProjectItem, ServiceCategory, ProcessStage } from '../types';

export const COMPANY_INFO = {
  name: 'PRIAMO PUBLICIDAD C.A.',
  tagline: 'IDEAS QUE SE VEN. MARCAS QUE DESTACAN.',
  slogan: 'CREAMOS BUENA IMPRESIÓN.',
  rif: 'J-40393065-1',
  email: 'priamopublicidad@gmail.com',
  instagram: '@priamopublicidad',
  instagramUrl: 'https://instagram.com/priamopublicidad',
  website: 'www.priamopublicidad.com',
  yearsExperience: '10+',
  yearFounded: '2014',
  whatsappNumber: '584126026814',
  whatsappDisplay: '+58 412-6026814',
  whatsappUrl: 'https://wa.me/584126026814?text=Hola%2C%20quisiera%20cotizar%20un%20proyecto%20con%20Priamo%20Publicidad',
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'thundernet-fitelven',
    title: 'Pabellón Tecnológico & Stand Inmersivo',
    client: 'THUNDERNET',
    category: 'Stands y exhibiciones',
    description: 'Estructura monumental, identidad visual luminosa y gráfica integradas en un espacio de marca futurista para la Feria Internacional de Telecomunicaciones (FITELVEN).',
    impact: 'Espacio insignia premiado por concurrencia e impacto visual con arquitectura de doble anillo y pantallas curvas.',
    image: '/assets/aistudio/Thundernet-Stand-FITELVEN-2025-2_87b15456.jpg',
    badge: 'FOTOGRAFÍA REAL',
    year: '2024 - 2025',
    specs: ['Estructura tridimensional modular', 'Iluminación perimetral LED neón', 'Impresión textil backlight', 'Pantallas envolventes']
  },
  {
    id: 'cantv-gigantografia',
    title: 'Gigantografía Urbana Aba Ultra 100% Fibra',
    client: 'CANTV',
    category: 'Impresión en gran formato',
    description: 'Impresión en gran escala y montaje de alta resistencia para la campaña masiva de fibra óptica en ubicación de alto tráfico en Caracas.',
    impact: 'Alta fidelidad de gradientes cian-magenta sobre lona vinílica microperforada resistente a intemperie y rayos UV.',
    image: '/assets/aistudio/CANTV-Warairarepano_ac4e7ec0.jpg',
    badge: 'FOTOGRAFÍA REAL',
    year: '2024',
    specs: ['Lona Mesh 500D microporosa', 'Tinta solvente Roland TrueVIS UV-resistant', 'Montaje estructural en altura']
  },
  {
    id: 'seniat-sede',
    title: 'Intervención de Fachada e Iluminación Monumental',
    client: 'SENIAT',
    category: 'Fachadas y espacios comerciales',
    description: 'Composición arquitectónica luminosa de gran formato sobre la torre corporativa, combinando señalización institucional e intervenciones gráficas especiales.',
    impact: 'Máxima visibilidad nocturna en uno de los edificios institucionales más emblemáticos de la capital.',
    image: '/assets/aistudio/Seniat-Decoraci_n_f5d9e8de.jpg',
    badge: 'FOTOGRAFÍA REAL',
    year: '2024',
    specs: ['Líneas LED de alta potencia', 'Rotulación en panel compuesto de aluminio', 'Instalación técnica certificada']
  },
  {
    id: 'palazzo-fachada',
    title: 'Rotulación & Pendón Arquitectónico de Fachada',
    client: 'PALAZZO EYEWEAR',
    category: 'Fachadas y espacios comerciales',
    description: 'Visual publicitario de moda óptica impreso en alta definición para punto de venta en Warairarepano.',
    impact: 'Definición fotográfica de textura de piel y lentes bajo luz diurna directa.',
    image: '/assets/aistudio/Palazzo-Warairarepano_03b452bd.jpg',
    badge: 'FOTOGRAFÍA REAL',
    year: '2024',
    specs: ['Impresión fotográfica 1440 dpi', 'Bastidor tensado perimetral', 'Acabado mate antirreflejo']
  },
  {
    id: 'thundernet-stand-portal',
    title: 'Túnel Geométrico & Espacio Interactivo',
    client: 'THUNDERNET FITELVEN',
    category: 'Stands y exhibiciones',
    description: 'Pórticos angulares concéntricos con iluminación integrada y revestimiento en acabado metálico automotriz.',
    impact: 'Diseño arquitectónico que inspiró el túnel inmersivo de la experiencia digital Priamo.',
    image: '/assets/aistudio/Thundernet-Stand-FITELVEN-2024_33a218c6.jpg',
    badge: 'FOTOGRAFÍA REAL',
    year: '2024',
    specs: ['Pórticos poligonales biselados', 'Guías de luz difusa 6500K', 'Piso laminado de alta resistencia']
  },
  {
    id: 'corpoelec-instalacion',
    title: 'Señalización & Revestimiento de Atención al Usuario',
    client: 'CORPOELEC',
    category: 'Avisos corpóreos y señalética',
    description: 'Instalación de vinil de corte y polimérico laminado en mostradores y módulos de atención presencial.',
    impact: 'Renovación completa de imagen institucional con aplicación precisa sin burbujas ni uniones visibles.',
    image: '/assets/aistudio/Corpoelec-Instalaci_n_187338b9.jpg',
    badge: 'FOTOGRAFÍA REAL',
    year: '2024',
    specs: ['Vinil polimérico con adhesivo reposicionable', 'Laminado mate antigrasa', 'Aplicación en sitio']
  },
  {
    id: 'corpoelec-pendones',
    title: 'Sistemas de Exhibición & Roll-ups Corporativos',
    client: 'CORPOELEC',
    category: 'Publicidad para eventos',
    description: 'Pendones de alta tensión en banners retráctiles con mensaje institucional de seguridad y servicio.',
    impact: 'Equipos portátiles livianos para eventos, convenciones y salas de espera a nivel nacional.',
    image: '/assets/aistudio/Corpoelec-Pendones_b06ead96.jpg',
    badge: 'FOTOGRAFÍA REAL',
    year: '2024',
    specs: ['Estructuras Roll-Up aluminio anodizado', 'Lona frontlight 13oz no-curl', 'Bolsa de transporte reforzada']
  },
  {
    id: 'stickers-brillantes',
    title: 'Stickers Troquelados & Etiquetas Holográficas',
    client: 'ZIONE & DIVERSAS MARCAS',
    category: 'Merchandising & Artículos',
    description: 'Producción en serie de calcomanías y stickers con corte computarizado preciso en plotter Roland TrueVIS.',
    impact: 'Acabados holográficos y vinil cristalino para packaging y sellos de garantía.',
    image: '/assets/aistudio/Stickers-Brillantes_18788ae9.jpg',
    badge: 'FOTOGRAFÍA REAL',
    year: '2024',
    specs: ['Troquelado preciso Print & Cut', 'Vinil holográfico y vinil blanco brillo', 'Resistencia al agua y fricción']
  },
  {
    id: 'merchandising-llaveros',
    title: 'Llaveros de Goma en Relieve 3D & Merchandising',
    client: 'PRIAMO EDICIÓN 2026',
    category: 'Merchandising & Artículos',
    description: 'Llaveros moldeados en PVC flexible con el isotipo \'P\' en alto relieve y aro reforzado.',
    impact: 'Alta fidelidad de color azul marino corporativo y verde fluorescente.',
    image: '/assets/aistudio/Priamo-Llaveros_3a6222cd.jpg',
    badge: 'FOTOGRAFÍA REAL',
    year: '2024 - 2026',
    specs: ['PVC microinyección en relieve 3D', 'Aro niquelado plano', 'Resistente a deformación y decoloración']
  },
  {
    id: 'lanyards-casupo',
    title: 'Cintas Porta-Carnets & Lanyards Sublimados',
    client: 'CASUPO AGENCY',
    category: 'Merchandising & Artículos',
    description: 'Cintas de satén suave de alta densidad con broche de seguridad y mosquetón giratorio.',
    impact: 'Combinación neón y negro mate para identificación de eventos corporativos.',
    image: '/assets/aistudio/Casupo-Lanyards_67affb3c.jpg',
    badge: 'FOTOGRAFÍA REAL',
    year: '2024',
    specs: ['Sublimación térmica textil doble cara', 'Broche antiahogo desprendible', 'Mosquetón metálico con cordel']
  },
  {
    id: 'priamo-totebags',
    title: 'Bolsas Ecológicas & Packaging de Marca',
    client: 'PRIAMO PUBLICIDAD',
    category: 'Merchandising & Artículos',
    description: 'Tote bags ecológicas de tela no tejida con serigrafía de alto contraste y asas reforzadas.',
    impact: 'Empaque de cortesía reutilizable con el lema \'#CreamosBuenaImpresión\'.',
    image: '/assets/aistudio/Priamo-Totebag_5ef5003a.jpg',
    badge: 'FOTOGRAFÍA REAL',
    year: '2024',
    specs: ['Polipropileno no tejido (cambrel) 80g', 'Serigrafía textil blanca y azul', 'Termosellado ultrasónico']
  }
];

export const SERVICES: ServiceCategory[] = [
  {
    id: 'impresion-gran-formato',
    index: '01',
    title: 'Impresión en Gran Formato',
    summary: 'Gráficas de alta escala para comunicar con máxima definición en fachadas, vidrieras, vallas y espacios comerciales.',
    keyApplications: ['Gigantografías y vallas de carretera', 'Pendones y pancartas para interiores y exteriores', 'Lona mesh microporosa para fachadas', 'Vinil microperforado para vidrieras'],
    materials: ['Banner 13oz / 15oz', 'Vinil brillante / mate', 'Lona Mesh', 'Backlight'],
    ctaLabel: 'Cotizar Gran Formato',
    quotePrompt: 'Me interesa cotizar Impresión en Gran Formato (medidas y ubicación)',
    featured: true
  },
  {
    id: 'fachadas-espacios',
    index: '02',
    title: 'Fachadas y Espacios Comerciales',
    summary: 'Dale presencia arquitectónica a tu negocio y coherencia visual a cada punto de contacto de tus instalaciones.',
    keyApplications: ['Revestimiento en paneles compuestos (Alucobond)', 'Frentes comerciales y marquesinas', 'Rotulación integral de cristales', 'Revestimientos gráficos interiores'],
    materials: ['Panel ACM / Alucobond', 'Acrílico fundido', 'Vinil polimérico con protección UV', 'Perfiles metálicos'],
    ctaLabel: 'Cotizar Fachada Comercial',
    quotePrompt: 'Me interesa cotizar Fachada o Espacio Comercial'
  },
  {
    id: 'avisos-corporeos',
    index: '03',
    title: 'Avisos, Corpóreos y Señalética',
    summary: 'Letras volumétricas en 3D, logotipos con retroiluminación LED y sistemas de señalización que hacen inconfundible tu marca.',
    keyApplications: ['Letras corpóreas de acero inoxidable y acrílico', 'Cajas de luz (lightboxes) perimetrales', 'Avisos de neón LED flexible', 'Señalética arquitectónica y de evacuación'],
    materials: ['Acero cepillado', 'Acrílico 3mm a 10mm', 'Módulos LED Samsung IP67', 'PVC espumado (Sintra)'],
    ctaLabel: 'Cotizar Aviso Corpóreo',
    quotePrompt: 'Me interesa cotizar Aviso Corpóreo o Señalética',
    featured: true
  },
  {
    id: 'rotulacion-vehicular',
    index: '04',
    title: 'Rotulación Vehicular de Flotas',
    summary: 'Convierte tus vehículos de trabajo y transporte corporativo en puntos de contacto móviles de alto impacto.',
    keyApplications: ['Rotulación total (Full Wrap) automotriz', 'Rotulación comercial parcial en puertas y laterales', 'Branding de furgonetas, camiones y autobuses', 'Adhesivos reflectivos de seguridad'],
    materials: ['Vinil fundido Cast de grado automotriz', 'Laminado UV ultra-conformable', 'Vinil reflectivo grado ingeniería'],
    ctaLabel: 'Cotizar Rotulación de Flota',
    quotePrompt: 'Me interesa cotizar Rotulación Vehicular'
  },
  {
    id: 'stands-exhibiciones',
    index: '05',
    title: 'Stands y Exhibiciones para Ferias',
    summary: 'Espacios experienciales a medida para presentar tu marca en encuentros comerciales, ferias y convenciones.',
    keyApplications: ['Diseño y construcción de stands modulares y custom', 'Tótems interactivos y portales luminosos', 'Pisos tarimas y pasarelas de exhibición', 'Mobiliario corporativo a medida'],
    materials: ['Estructuras de acero y aluminio', 'Madera MDF lacada', 'Gráfica textil backlight', 'Pisos vinílicos pulidos'],
    ctaLabel: 'Cotizar Stand o Exhibición',
    quotePrompt: 'Me interesa cotizar un Stand para Feria o Exposición',
    featured: true
  },
  {
    id: 'publicidad-eventos',
    index: '06',
    title: 'Publicidad para Eventos y Encuentros',
    summary: 'Presencia visual coherente y profesional en cada zona del evento: accesos, tarimas, prensa y acreditaciones.',
    keyApplications: ['Backings fotográficos y photocalls para prensa', 'Portapendones roll-up y arañas telescópicas', 'Banderolas tipo gota y pluma', 'Arcos inflables y portales de llegada'],
    materials: ['Lona mate antirreflejo', 'Tejido textil stretch antiplegado', 'Estructuras de aluminio telescópico'],
    ctaLabel: 'Cotizar Evento',
    quotePrompt: 'Me interesa cotizar Publicidad para Eventos'
  },
  {
    id: 'stickers-etiquetas',
    index: '07',
    title: 'Stickers y Etiquetas Troqueladas',
    summary: 'Pequeñas piezas de alta precisión que llevan tu marca a empaques, productos, sobres y puntos de venta.',
    keyApplications: ['Etiquetas adhesivas en rollo o pliegos', 'Stickers die-cut y kiss-cut con formas especiales', 'Stickers holográficos y transparentes', 'Sellos de seguridad inviolables'],
    materials: ['Vinil PVC adhesivo', 'Película holográfica tornasol', 'Vinil metalizado oro/plata', 'Papel adhesivo couché'],
    ctaLabel: 'Cotizar Stickers',
    quotePrompt: 'Me interesa cotizar Stickers o Etiquetas'
  },
  {
    id: 'productos-personalizados',
    index: '08',
    title: 'Artículos de Marca y Merchandising',
    summary: 'Tu identidad en cada detalle: artículos corporativos para colaboradores, fidelización y regalos institucionales.',
    keyApplications: ['Tazas, termos y botellas con grabado o impresión', 'Llaveros de goma 3D inyectada y metálicos', 'Memorias USB personalizadas', 'Camisetas, gorras y textiles bordados o estampados'],
    materials: ['Cerámica y acero inoxidable', 'PVC blando flexible', 'Algodón peinado y poliéster dry-fit'],
    ctaLabel: 'Cotizar Merchandising',
    quotePrompt: 'Me interesa cotizar Artículos de Marca o Regalos Corporativos'
  },
  {
    id: 'papeleria-impresa',
    index: '09',
    title: 'Papelería y Material Impreso',
    summary: 'Material comercial e institucional para presentar, informar y acompañar tu marca con acabados de primera.',
    keyApplications: ['Carpetas corporativas con bolsillo troquelado', 'Tarjetas de presentación con acabados especiales (Soft Touch, UV brillo sectorizado)', 'Trípticos, dípticos y catálogos de producto', 'Tacos de notas y papelería membretada'],
    materials: ['Glaseado 300g / 350g', 'Laminado Soft Touch y mate', 'Barniz UV sectorizado en relieve'],
    ctaLabel: 'Cotizar Papelería',
    quotePrompt: 'Me interesa cotizar Papelería Corporativa'
  },
  {
    id: 'dummies-especiales',
    index: '10',
    title: 'Dummies y Piezas Especiales',
    summary: 'Réplicas volumétricas y figuras tridimensionales a gran escala para activaciones BTL y lanzamientos.',
    keyApplications: ['Dummies gigantes de botellas, empaques y productos', 'Mascotas de marca corpóreas', 'Letras gigantes para fotos y activaciones', 'Exhibidores temáticos en punto de venta'],
    materials: ['Poliestireno expandido de alta densidad (Anime)', 'Fibra de vidrio y resina', 'Revestimiento polimérico resistente'],
    ctaLabel: 'Cotizar Pieza Especial',
    quotePrompt: 'Me interesa cotizar un Dummy o Pieza Especial'
  },
  {
    id: 'proyectos-temporada',
    index: '11',
    title: 'Proyectos de Temporada y Festividades',
    summary: 'Gráfica, ambientación e iluminación para vestir espacios comerciales durante navidades, aniversarios y campañas.',
    keyApplications: ['Iluminación monumental de edificios y fachadas', 'Árboles y figuras luminosas gigantes', 'Decoración temática en centros comerciales', 'Campañas temporales en vitrinas'],
    materials: ['Mangueras LED neón flexible IP68', 'Estructuras soldadas de hierro liviano', 'Viniles decorativos removibles'],
    ctaLabel: 'Cotizar Proyecto de Temporada',
    quotePrompt: 'Me interesa cotizar Proyecto de Temporada o Iluminación'
  }
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: '01',
    title: 'Cuéntanos tu idea',
    description: 'Conocemos a fondo tu marca, el producto, los objetivos de comunicación, cantidades, el espacio donde se ubicará y la fecha límite de entrega.',
    deliverable: 'Recepción del requerimiento y análisis de viabilidad técnica.'
  },
  {
    number: '02',
    title: 'Definimos la solución',
    description: 'Revisamos medidas reales en sitio, selección de materiales ideales según intemperie o tráfico, y requerimientos de diseño gráfico y estructural.',
    deliverable: 'Propuesta técnica y recomendaciones de sustratos y acabados.'
  },
  {
    number: '03',
    title: 'Cotizamos y acordamos',
    description: 'Presentamos una cotización clara y detallada, definiendo alcances, condiciones comerciales, tiempos de fabricación e instalación.',
    deliverable: 'Presupuesto formal y cronograma de ejecución.'
  },
  {
    number: '04',
    title: 'Validamos el diseño',
    description: 'Revisión exhaustiva de artes finales, ortografía, resolución de imágenes, perfiles de color CMYK Roland y aprobación de muestras o planos.',
    deliverable: 'Arte final aprobado listo para producción.'
  },
  {
    number: '05',
    title: 'Producimos y coordinamos',
    description: 'Impresión en equipos Roland de última generación, corte computarizado, confección, ensamblado estructural y coordinación de cuadrillas de instalación.',
    deliverable: 'Fabricación y montaje bajo estrictos controles de calidad.'
  },
  {
    number: '06',
    title: 'Revisamos el resultado',
    description: 'Inspección final junto al cliente verificando que cada detalle cumpla rigurosamente con las especificaciones y acabados acordados.',
    deliverable: 'Entrega formal y conformidad del cliente.'
  }
];

export const TRUSTED_CLIENTS = [
  { name: 'Síragon', category: 'Tecnología & Consumo' },
  { name: 'Centro Comercial City Market', category: 'Centros Comerciales' },
  { name: 'Forum Super Mayorista', category: 'Retail & Supermercados' },
  { name: 'Thundernet', category: 'Telecomunicaciones & Fibra' },
  { name: 'Bancamiga', category: 'Banca & Finanzas' },
  { name: 'Hotel Humboldt', category: 'Hospitalidad & Turismo' },
  { name: 'Cruz Roja de Venezuela', category: 'Institucional & Salud' },
  { name: 'CANTV', category: 'Telecomunicaciones' },
  { name: 'Metro de Caracas', category: 'Transporte & Movilidad' },
  { name: 'SENIAT', category: 'Sector Público & Tributario' },
  { name: 'Corporación Suiche 7B', category: 'Servicios Financieros' },
  { name: 'Seguros Horizonte', category: 'Seguros' }
];
