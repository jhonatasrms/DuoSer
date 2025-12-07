export type PlanType = 'trial' | '7days' | '14days' | '30days';

export interface Task {
  id: string;
  title: string;
  points: number;
  duration_min: number;
  why: string;
  benefits: string[];
  icon: string; // Emoji or icon name
}

export interface User {
  name: string;
  whatsapp: string; // Changed/Added from email only
  email?: string; // Optional now
  plan: PlanType;
  trialEndDate: string | null; // ISO Date string
  points: number;
  streak: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  completedTasks: Record<string, string[]>; // Date (YYYY-MM-DD) -> Array of Task IDs
  unlockedDays: number;
}

export interface PlanConfig {
  id: PlanType;
  name: string;
  price: string;
  currency: string;
  days: number;
  highlight: boolean;
  description: string;
}

export type ViewState = 'home' | 'dashboard' | 'pricing';