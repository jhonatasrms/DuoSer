import { PlanConfig, Task } from './types';

export const APP_NAME = "Método Sereninho";
export const STORAGE_KEY = "sereninho_kids_v2";

export const PLANS: PlanConfig[] = [
  {
    id: '7days',
    name: 'Pacote Aventureiro',
    price: '17.90',
    currency: 'BRL',
    days: 7,
    highlight: false,
    description: 'Para começar a jornada'
  },
  {
    id: '14days',
    name: 'Baú do Tesouro',
    price: '47.90',
    currency: 'BRL',
    days: 14,
    highlight: true,
    description: 'O favorito dos heróis'
  },
  {
    id: '30days',
    name: 'Mestre Zen',
    price: '67.00',
    currency: 'BRL',
    days: 30,
    highlight: false,
    description: 'Poderes completos'
  }
];

export const DEFAULT_TASKS: Task[] = [
  {
    id: "t1",
    title: "Sopro do Dragão 🐲",
    points: 10,
    duration_min: 3,
    why: "Acalma o fogo da ansiedade",
    benefits: ["Calma", "Coragem"],
    icon: "wind"
  },
  {
    id: "t2",
    title: "Esticar como Gato 🐱",
    points: 10,
    duration_min: 5,
    why: "Tira a ferrugem do corpo",
    benefits: ["Flexibilidade", "Energia"],
    icon: "cat"
  },
  {
    id: "t3",
    title: "Missão Secreta do Dia 🕵️",
    points: 20,
    duration_min: 5,
    why: "Organiza a mente do herói",
    benefits: ["Foco", "Missão"],
    icon: "list"
  },
  {
    id: "t4",
    title: "Dança da Alegria 💃",
    points: 40,
    duration_min: 15,
    why: "Sacudir a tristeza",
    benefits: ["Diversão", "Sono Bom"],
    icon: "music"
  },
  {
    id: "t5",
    title: "Caça ao Tesouro (5 sentidos) 🖐️",
    points: 15,
    duration_min: 3,
    why: "Voltar para o planeta Terra",
    benefits: ["Atenção", "Controle"],
    icon: "eye"
  },
  {
    id: "t6",
    title: "Modo Avião ✈️",
    points: 40,
    duration_min: 30,
    why: "Recarregar a bateria sem telas",
    benefits: ["Criatividade", "Descanso"],
    icon: "wifi-off"
  },
  {
    id: "t7",
    title: "Diário do Capitão ⭐",
    points: 10,
    duration_min: 3,
    why: "Lembrar das vitórias do dia",
    benefits: ["Gratidão", "Bons Sonhos"],
    icon: "book"
  }
];