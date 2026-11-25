export type InfoVerticalSlug = 'impresion' | 'experiencias' | 'imagen-de-marca';

export type InfoRoutePath =
  | '/info'
  | '/info/impresion'
  | '/info/experiencias'
  | '/info/imagen-de-marca';

export interface InfoProjectPhoto {
  image: string;
  alt: string;
  title: string;
  workType: string;
  summary: string;
}

export interface InfoVerticalData {
  slug: InfoVerticalSlug;
  route: InfoRoutePath;
  index: string;
  columnLabel: string;
  navLabel: string;
  panelTitle: string;
  panelDescription: string;
  monumentalTitle: string;
  introHighlight: string;
  introRest: string;
  projects: InfoProjectPhoto[];
  whatsappPrefill: string;
}

export const INFO_VERTICALS: Record<InfoVerticalSlug, InfoVerticalData> = {
  impresion: {
    slug: 'impresion',
    route: '/info/impresion',
    index: '01',
    columnLabel: 'Impresión a Gran Escala',
    navLabel: 'IMPRESIÓN',
    panelTitle: 'Impresión sin límites',
    panelDescription:
      'Impresión digital de gran formato que transforma ideas en piezas visuales para marcas, espacios y campañas.',
    monumentalTitle: 'IMPRESIÓN',
    introHighlight: 'Transformamos ideas en gráficas de gran formato',
    introRest:
      'que comunican, destacan y conectan marcas con sus públicos mediante impresión digital 1440 dpi, viniles adhesivos, banners, microperforados, pendones, stickers y gráficas para espacios comerciales.',
    projects: [
      {
        image: '/assets/aistudio/CANTV-Warairarepano_ac4e7ec0.jpg',
        alt: 'Instalación de gigantografía institucional CANTV en Warairarepano',
        title: 'CANTV — WARAIRAREPANO',
        workType: 'Impresión digital en gran formato.',
        summary: 'Producción gráfica de alta resistencia instalada en estación de montaña.',
      },
      {
        image: '/assets/aistudio/Impresora_Roland_TrueVIS_con_banner_azul_286c8d4c.png',
        alt: 'Producción en equipo industrial Roland TrueVIS dentro de taller PRIAMO',
        title: 'PRIAMO — ROLAND TRUEVIS',
        workType: 'Banners, lonas y viniles de alta definición.',
        summary: 'Calibración cromática a 1440 dpi reales en planta propia.',
      },
      {
        image: '/assets/aistudio/Stickers-Brillantes_18788ae9.jpg',
        alt: 'Stickers y etiquetas brillantes troqueladas de alta definición',
        title: 'ETIQUETAS Y STICKERS',
        workType: 'Stickers troquelados y vinil adhesivo.',
        summary: 'Corte de contorno milimétrico para empaques y campañas promocionales.',
      },
      {
        image: '/assets/aistudio/Palazzo-Warairarepano_03b452bd.jpg',
        alt: 'Gráfica comercial instalada para Palazzo en Warairarepano',
        title: 'PALAZZO — WARAIRAREPANO',
        workType: 'Gráficas para espacios comerciales.',
        summary: 'Revestimiento visual y viniles impresos integrados al punto de venta.',
      },
      {
        image: '/assets/aistudio/Forum-PVC.jpg',
        alt: 'Impresión gráfica montada sobre lámina de PVC rígido para Forum',
        title: 'FORUM — SOPORTE PVC',
        workType: 'Impresión aplicada sobre sustrato rígido.',
        summary: 'Pieza promocional ligera lista para exhibición comercial.',
      },
      {
        image: '/assets/aistudio/Corpoelec-Pendones_b06ead96.jpg',
        alt: 'Despliegue de pendones y pancartas institucionales CORPOELEC',
        title: 'CORPOELEC — PENDONES',
        workType: 'Pendones, pancartas y gráficas de evento.',
        summary: 'Producción coordinada para actos y espacios institucionales.',
      },
    ],
    whatsappPrefill:
      'Hola PRIAMO, me interesa cotizar un proyecto en el área de Impresión a Gran Escala.',
  },
  experiencias: {
    slug: 'experiencias',
    route: '/info/experiencias',
    index: '02',
    columnLabel: 'Espacios y Experiencias',
    navLabel: 'EXPERIENCIAS',
    panelTitle: 'Espacios que impactan',
    panelDescription:
      'Stands, exhibiciones y experiencias de marca que convierten espacios en oportunidades para conectar con las personas.',
    monumentalTitle: 'EXPERIENCIAS',
    introHighlight: 'Diseñamos y producimos espacios',
    introRest:
      'que generan encuentros memorables entre las marcas y las personas a través de stands personalizados, exhibiciones comerciales, activaciones de marca, publicidad para eventos, estructuras, dummies y proyectos de temporada.',
    projects: [
      {
        image: '/assets/aistudio/Thundernet-Stand-FITELVEN-2025-2_87b15456.jpg',
        alt: 'Stand corporativo diseñado y montado para Thundernet en FITELVEN 2025',
        title: 'THUNDERNET — FITELVEN 2025',
        workType: 'Diseño y producción de stand para exhibición comercial.',
        summary: 'Estructura a medida con iluminación LED integrada y áreas de experiencia.',
      },
      {
        image: '/assets/aistudio/Thundernet-Stand-FITELVEN-2024_33a218c6.jpg',
        alt: 'Stand corporativo Thundernet en FITELVEN 2024 ejecutado por PRIAMO',
        title: 'THUNDERNET — FITELVEN 2024',
        workType: 'Pabellón ferial y arquitectura efímera.',
        summary: 'Montaje integral llave en mano en congreso nacional de telecomunicaciones.',
      },
      {
        image: '/assets/aistudio/Seniat-Decoraci_n_f5d9e8de.jpg',
        alt: 'Ambientación y decoración institucional desarrollada para SENIAT',
        title: 'SENIAT — AMBIENTACIÓN',
        workType: 'Ambientación de espacios y proyectos de temporada.',
        summary: 'Intervención escenográfica integral en instalaciones institucionales.',
      },
      {
        image: '/assets/aistudio/Corpoelec-Pendones_b06ead96.jpg',
        alt: 'Publicidad y ambientación para evento corporativo CORPOELEC',
        title: 'CORPOELEC — EVENTOS',
        workType: 'Publicidad para eventos y despliegues corporativos.',
        summary: 'Señalización visual y pendones de respaldo para jornadas oficiales.',
      },
      {
        image: '/assets/aistudio/Rollup_Priamo_5363491f.png',
        alt: 'Exhibidor portátil roll-up producido por PRIAMO Publicidad',
        title: 'ESTRUCTURAS Y DISPLAYS',
        workType: 'Estructuras, exhibidores y activaciones de marca.',
        summary: 'Sistemas portátiles de armado inmediato para puntos de contacto.',
      },
      {
        image: '/assets/aistudio/Palazzo-Warairarepano_03b452bd.jpg',
        alt: 'Ambientación de punto comercial Palazzo en Warairarepano',
        title: 'PALAZZO — EXPERIENCIA EN PUNTO',
        workType: 'Exhibición comercial y ambientación interior.',
        summary: 'Integración de marca en recorrido comercial de alto tráfico.',
      },
    ],
    whatsappPrefill:
      'Hola PRIAMO, quiero cotizar un proyecto en el área de Espacios y Experiencias.',
  },
  'imagen-de-marca': {
    slug: 'imagen-de-marca',
    route: '/info/imagen-de-marca',
    index: '03',
    columnLabel: 'Imagen de Marca',
    navLabel: 'IMAGEN DE MARCA',
    panelTitle: 'Marcas que destacan',
    panelDescription:
      'Identidad visual aplicada a fachadas, vehículos, señalética y materiales que hacen reconocible cada marca.',
    monumentalTitle: 'IMAGEN DE MARCA',
    introHighlight: 'Llevamos la identidad de cada empresa',
    introRest:
      'a los espacios, materiales y elementos que la hacen reconocible mediante avisos corpóreos, letras y logotipos 3D, señalética comercial, rotulación vehicular, fachadas, identificación institucional y productos personalizados.',
    projects: [
      {
        image: '/assets/aistudio/Corpoelec-Instalaci_n_187338b9.jpg',
        alt: 'Instalación de aviso institucional CORPOELEC ejecutado por PRIAMO',
        title: 'CORPOELEC — FACHADA',
        workType: 'Identificación institucional y montaje en altura.',
        summary: 'Fabricación e instalación técnica de rótulo corporativo.',
      },
      {
        image: '/assets/aistudio/TRANSVALOR-Rotulado.jpg',
        alt: 'Rotulación vehicular corporativa sobre unidad de TRANSVALOR',
        title: 'TRANSVALOR — ROTULACIÓN VEHICULAR',
        workType: 'Rotulación integral de flota operativa.',
        summary: 'Aplicación precisa de vinil conformable de larga duración.',
      },
      {
        image: '/assets/aistudio/Aviso-Warairarepano.jpg',
        alt: 'Aviso comercial y señalización en complejo Warairarepano',
        title: 'WARAIRAREPANO — SEÑALÉTICA',
        workType: 'Avisos y señalética comercial exterior.',
        summary: 'Pieza estructural resistente a condiciones climáticas de altura.',
      },
      {
        image: '/assets/aistudio/Conatel-Agendas.jpg',
        alt: 'Agendas corporativas personalizadas para CONATEL',
        title: 'CONATEL — AGENDAS CORPORATIVAS',
        workType: 'Productos publicitarios personalizados.',
        summary: 'Dotación institucional con acabado fiel al manual de marca.',
      },
      {
        image: '/assets/aistudio/Casupo-Lanyards_67affb3c.jpg',
        alt: 'Lanyards corporativos impresos para Casupo',
        title: 'CASUPO — IDENTIFICACIÓN',
        workType: 'Aplicaciones de identidad corporativa.',
        summary: 'Lanyards personalizados con impresión nítida y herrajes duraderos.',
      },
      {
        image: '/assets/aistudio/Priamo-Totebag_5ef5003a.jpg',
        alt: 'Totebags personalizadas producidas por PRIAMO',
        title: 'PRIAMO — ARTÍCULOS DE MARCA',
        workType: 'Productos promocionales y merchandising.',
        summary: 'Totebags y piezas textiles para campañas e identidad empresarial.',
      },
    ],
    whatsappPrefill:
      'Hola PRIAMO, me interesa cotizar un proyecto en el área de Imagen de Marca.',
  },
};

export const INFO_VERTICAL_LIST: InfoVerticalData[] = [
  INFO_VERTICALS.impresion,
  INFO_VERTICALS.experiencias,
  INFO_VERTICALS['imagen-de-marca'],
];
