export interface Course {
  id: string;
  title: string;
  description: string;
  banner: string;
}

export const MOCK_COURSES: Course[] = [
  { 
    id: '1', 
    title: 'IA Generativa para Iniciantes', 
    description: 'Aprenda o básico de IA.', 
    banner: 'https://picsum.photos/200/300' 
  },
  { 
    id: '2', 
    title: 'Gestão Ágil e Soft Skills', 
    description: 'Desenvolva habilidades de liderança.', 
    banner: 'https://picsum.photos/200/300' 
  },
  { 
    id: '3', 
    title: 'Sustentabilidade em TI', 
    description: 'Tecnologia verde e práticas ESG.', 
    banner: 'https://picsum.photos/200/300' 
  },
];