export interface SceneDef {
  id: number;
  title: string;
  subtitle: string;
  startProgress: number;
  endProgress: number;
  concept: string;
}

export const SCENES: SceneDef[] = [
  {
    id: 1,
    title: 'Stand Arquitectónico',
    subtitle: 'El espacio corporativo de Priamo Publicidad con el televisor apagado',
    startProgress: 0.0,
    endProgress: 0.03,
    concept: 'ENTRAR'
  },
  {
    id: 2,
    title: 'Acercamiento & Encendido',
    subtitle: 'Acercamiento cinematográfico y encendido electrónico de la pantalla',
    startProgress: 0.03,
    endProgress: 0.11,
    concept: 'ACTIVAR'
  },
  {
    id: 3,
    title: 'Aparición de Priamito',
    subtitle: 'Priamito aparece mirando al visitante e inicia el recorrido automático',
    startProgress: 0.11,
    endProgress: 0.14,
    concept: 'CONECTAR'
  },
  {
    id: 4,
    title: 'Invitación con la Mano',
    subtitle: 'Priamito invita con la mano hacia el portal sin alterar su tamaño',
    startProgress: 0.14,
    endProgress: 0.17,
    concept: 'INVITAR'
  },
  {
    id: 5,
    title: 'Giro e Inmersión al Túnel',
    subtitle: 'Completa el giro totalmente de espaldas alejándose hacia la profundidad',
    startProgress: 0.17,
    endProgress: 0.36,
    concept: 'ADENTRAR'
  },
  {
    id: 6,
    title: 'Vuelo de Espalda & Materiales POP',
    subtitle: 'Flotación por el túnel azul y verde con exhibición de productos publicitarios',
    startProgress: 0.36,
    endProgress: 0.68,
    concept: 'EXPLORAR'
  },
  {
    id: 7,
    title: 'Ruptura & Umbral Plotter',
    subtitle: 'Desfragmentación cristalina y preparación hacia el centro de producción',
    startProgress: 0.68,
    endProgress: 0.70,
    concept: 'IRRUMPIR'
  },
  {
    id: 8,
    title: 'Cabezal Roland TrueVIS',
    subtitle: 'Macro visión del cabezal de impresión de gran formato en acción',
    startProgress: 0.70,
    endProgress: 0.88,
    concept: 'PRODUCIR'
  },
  {
    id: 9,
    title: 'Creamos Buena Impresión',
    subtitle: 'Cierre cinematográfico y bienvenida a proyectos publicitarios de gran escala',
    startProgress: 0.88,
    endProgress: 1.0,
    concept: 'IMPACTAR'
  }
];

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: 'Stands y exhibiciones' | 'Fachadas y espacios comerciales' | 'Avisos corpóreos y señalética' | 'Rotulación vehicular' | 'Impresión en gran formato' | 'Publicidad para eventos' | 'Merchandising & Artículos';
  description: string;
  impact: string;
  image: string;
  badge: 'FOTOGRAFÍA REAL' | 'PROYECTO EN EJECUCIÓN' | 'CASO DE ÉXITO' | 'CATÁLOGO 2026';
  year: string;
  specs: string[];
}

export interface ServiceCategory {
  id: string;
  index: string;
  title: string;
  summary: string;
  keyApplications: string[];
  materials: string[];
  ctaLabel: string;
  quotePrompt: string;
  featured?: boolean;
}

export interface ProcessStage {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}
