export interface AwardItem {
  id: string;
  year: string;
  title: string;
  issuer: string;
  category: string;
  description: string;
}

export interface MilestoneItem {
  id: string;
  year: string;
  title: string;
  description: string;
  tag?: string;
}

export const AWARDS: AwardItem[] = [
  {
    id: 'excelencia-gran-formato-2024',
    year: '2024',
    title: 'Reconocimiento a la Excelencia en Impresión Digital',
    issuer: 'Feria Internacional de Artes Gráficas y Publicidad',
    category: 'Gran Formato & Colorimetría',
    description:
      'Distinción por fidelidad cromática, precisión de corte Print & Cut y durabilidad UV aplicada en campañas comerciales de gran escala.',
  },
  {
    id: 'diseno-stands-feriales-2022',
    year: '2022',
    title: 'Mención Destacada en Arquitectura Efímera y Stands',
    issuer: 'Encuentro Empresarial de Exhibiciones Corporativas',
    category: 'Stands & Exhibiciones',
    description:
      'Reconocimiento al diseño estructural, integración de iluminación LED perimetral y optimización de flujos de circulación en pabellones corporativos.',
  },
  {
    id: 'aliado-produccion-corporativa-2019',
    year: '2019',
    title: 'Certificación de Proveedor Homologado de Marca',
    issuer: 'Red de Clientes Institucionales y Banca Nacional',
    category: 'Calidad & Cumplimiento',
    description:
      'Acreditación por cumplimiento técnico de manuales corporativos, montaje certificado en sitio y tiempos de entrega garantizados.',
  },
];

export const MILESTONES: MilestoneItem[] = [
  {
    id: 'hito-2014',
    year: '2014',
    tag: 'Fundación',
    title: 'Inicio de operaciones de PRIAMO Publicidad C.A.',
    description:
      'Nace Priamo en Venezuela con foco en producción publicitaria, comunicación visual y soluciones gráficas integrales para marcas exigentes.',
  },
  {
    id: 'hito-2017',
    year: '2017',
    tag: 'Tecnología Roland',
    title: 'Incorporación de línea de precisión Roland 1440 DPI',
    description:
      'Consolidación de taller propio con impresión digital de alta resolución, tintas eco-solventes UV y corte computarizado integrado.',
  },
  {
    id: 'hito-2019',
    year: '2019',
    tag: 'Expansión Estructural',
    title: 'Despliegue de divisiones de stands, fachadas y corpóreos LED',
    description:
      'Integración de carpintería, herrería publicitaria, acrílicos termomoldeados y cuadrillas técnicas propias de instalación nacional.',
  },
  {
    id: 'hito-2022',
    year: '2022',
    tag: 'Sector Institucional',
    title: 'Alianzas con banca, telecomunicaciones y sector público',
    description:
      'Ejecución de rotulación vehicular, señalética corporativa y renovaciones integrales de sedes comerciales en todo el país.',
  },
  {
    id: 'hito-2024',
    year: '2024',
    tag: 'Consolidación Nacional',
    title: 'Una década creando buena impresión',
    description:
      'Consolidamos nuestra primera década de operación continua combinando asesoría técnica, materiales homologados y acabado premium en cada entrega.',
  },
  {
    id: 'hito-2026',
    year: '2026',
    tag: '12 Años · Universo Priamo',
    title: '12 años de trayectoria y nueva plataforma digital',
    description:
      'Celebramos 12 años de trayectoria presentando nuestra experiencia interactiva 2026 con catálogo de 11 líneas integrales, especificaciones claras y acompañamiento técnico completo.',
  },
];
