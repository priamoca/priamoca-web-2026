export interface BlogPost {
  id: string;
  title: string;
  date: string;
  summary: string;
  category?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'calibracion-cromatic-gran-formato-roland',
    category: 'Producción & Tecnología',
    date: '18 Abr 2026',
    title: 'Precisión cromática en gran formato: por qué importa en la identidad visual',
    summary:
      'Cómo los perfiles ICC calibrados y las tintas eco-solventes de última generación garantizan fidelidad exacta entre el manual de marca y piezas monumentales en vinil o lona.',
  },
  {
    id: 'seleccion-sustratos-intemperie-fachadas',
    category: 'Materiales & Acabados',
    date: '04 Abr 2026',
    title: 'Cómo elegir el sustrato correcto para fachadas y señalética exterior',
    summary:
      'Criterios técnicos para combinar acrílico, alucobond, PVC espumado y láminas con protección UV según exposición solar, humedad urbana y vida útil esperada.',
  },
  {
    id: 'planificacion-stands-exhibiciones-comerciales',
    category: 'Arquitectura Efímera',
    date: '21 Mar 2026',
    title: 'Del plano 3D al montaje ferial: claves para un stand funcional y memorable',
    summary:
      'Recomendaciones estructurales, iluminación LED estratégica y flujos de circulación para aprovechar cada metro cuadrado en exposiciones corporativas y puntos de venta.',
  },
];
