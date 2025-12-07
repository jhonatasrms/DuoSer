import { User, PlanType } from '../types';
import { STORAGE_KEY } from '../constants';

export const getTodayStr = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const getFutureDate = (daysToAdd: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString();
};

export const getUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  
  try {
    const user: User = JSON.parse(stored);
    return user;
  } catch (e) {
    console.error("Failed to parse user data", e);
    return null;
  }
};

export const saveUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

// Simulates sending data to a CRM/Database via Webhook
const sendToExternalDB = async (data: any) => {
  console.log("------------------------------------------");
  console.log("🚀 SIMULANDO ENVIO PARA BANCO DE DADOS/CRM");
  console.log("📦 Payload:", data);
  console.log("ℹ️ Configure um webhook real aqui para salvar o lead.");
  console.log("------------------------------------------");
  
  // Exemplo de como seria com fetch real:
  // await fetch('https://seu-webhook-n8n-ou-zapier.com/lead', {
  //   method: 'POST',
  //   body: JSON.stringify(data)
  // });
};

export const registerTrial = (name: string, whatsapp: string): User => {
  const newUser: User = {
    name,
    whatsapp,
    plan: 'trial',
    trialEndDate: getFutureDate(1),
    points: 0,
    streak: 0,
    lastActiveDate: getTodayStr(),
    completedTasks: {},
    unlockedDays: 1
  };
  
  saveUser(newUser);
  
  // Async send to "DB"
  sendToExternalDB({
    event: 'new_trial',
    name,
    whatsapp,
    date: new Date().toISOString()
  });

  return newUser;
};

export const updateUserPlan = (user: User, planId: PlanType): User => {
  const updatedUser = {
    ...user,
    plan: planId,
    unlockedDays: planId === '7days' ? 7 : planId === '14days' ? 14 : 30
  };
  saveUser(updatedUser);
  
  sendToExternalDB({
    event: 'plan_upgrade',
    phone: user.whatsapp,
    plan: planId
  });

  return updatedUser;
};

export const checkDailyReset = (user: User): User => {
  const today = getTodayStr();
  
  if (user.lastActiveDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Simple streak logic
    let newStreak = user.streak;
    if (user.lastActiveDate === yesterdayStr) {
        // Keeps streak logic handled elsewhere usually, but if we just logged in:
    } 

    const updatedUser = {
      ...user,
      lastActiveDate: today,
    };
    saveUser(updatedUser);
    return updatedUser;
  }
  
  return user;
};

export const toggleTaskStatus = (user: User, taskId: string, points: number): User => {
  const today = getTodayStr();
  const currentTasks = user.completedTasks[today] || [];
  const isCompleted = currentTasks.includes(taskId);

  let newTasks: string[];
  let newPoints = user.points;

  if (isCompleted) {
    newTasks = currentTasks.filter(id => id !== taskId);
    newPoints -= points;
    if (newPoints < 0) newPoints = 0;
  } else {
    newTasks = [...currentTasks, taskId];
    newPoints += points;
  }

  const updatedUser: User = {
    ...user,
    points: newPoints,
    completedTasks: {
      ...user.completedTasks,
      [today]: newTasks
    }
  };

  saveUser(updatedUser);
  return updatedUser;
};