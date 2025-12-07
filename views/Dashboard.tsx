import React, { useState } from 'react';
import { User, Task } from '../types';
import { DEFAULT_TASKS } from '../constants';
import { toggleTaskStatus, getTodayStr } from '../services/storageService';
import { playSound } from '../services/audioService';
import { ChevronDown, ChevronUp, Lock, Check, Clock, Flame, Award, Zap } from 'lucide-react';

interface DashboardProps {
  user: User;
  onUserUpdate: (user: User) => void;
  onNavigate: (view: any) => void;
}

const TaskCard: React.FC<{
  task: Task;
  isCompleted: boolean;
  onToggle: () => void;
}> = ({ task, isCompleted, onToggle }) => {
  const [expanded, setExpanded] = useState(false);

  const handleInteract = () => {
    playSound(isCompleted ? 'click' : 'success');
    onToggle();
  };

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('click');
    setExpanded(!expanded);
  };

  return (
    <div 
      className={`
        relative rounded-2xl border-2 border-b-4 transition-all duration-200 transform
        ${isCompleted 
          ? 'border-success bg-green-50 scale-[0.98] opacity-80' 
          : 'border-gray-200 bg-white hover:-translate-y-1 hover:border-gray-300'
        }
      `}
      onClick={handleExpand}
    >
      <div className="p-4 flex items-center gap-4 cursor-pointer">
        <button 
          onClick={(e) => { e.stopPropagation(); handleInteract(); }}
          className={`
            shrink-0 w-12 h-12 rounded-xl border-2 border-b-4 flex items-center justify-center transition-all
            ${isCompleted 
              ? 'bg-success border-green-600 text-white shadow-inner' 
              : 'bg-white border-gray-200 text-gray-200 hover:border-primary hover:text-primary'
            }
          `}
        >
          <Check size={28} strokeWidth={4} />
        </button>
        
        <div className="flex-1">
          <h4 className={`font-extrabold text-lg ${isCompleted ? 'text-gray-400 line-through' : 'text-textMain'}`}>
             {task.title}
          </h4>
          <div className="flex items-center gap-3 text-xs font-bold text-textSec mt-1">
            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md"><Clock size={12} /> {task.duration_min} min</span>
            <span className="text-highlight bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">+{task.points} XP</span>
          </div>
        </div>

        <button className="text-gray-300 hover:text-gray-500">
          {expanded ? <ChevronUp size={24} strokeWidth={3} /> : <ChevronDown size={24} strokeWidth={3} />}
        </button>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-0 text-sm animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 bg-surface rounded-xl space-y-3 border-2 border-gray-100">
            <p className="text-textMain"><span className="font-extrabold text-secondary">Missão:</span> {task.why}</p>
            <div className="flex flex-wrap gap-2">
              {task.benefits.map(b => (
                <span key={b} className="px-2 py-1 bg-white border-2 border-gray-200 rounded-lg text-xs font-bold text-textSec uppercase tracking-wide">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ user, onUserUpdate, onNavigate }) => {
  const todayStr = getTodayStr();
  const completedToday = user.completedTasks[todayStr] || [];
  
  // Calculate progress
  const totalPoints = DEFAULT_TASKS.reduce((acc, t) => acc + t.points, 0);
  const currentPoints = DEFAULT_TASKS
    .filter(t => completedToday.includes(t.id))
    .reduce((acc, t) => acc + t.points, 0);
  const progressPercent = Math.round((completedToday.length / DEFAULT_TASKS.length) * 100);

  const handleToggle = (task: Task) => {
    const updatedUser = toggleTaskStatus(user, task.id, task.points);
    onUserUpdate(updatedUser);
  };

  const daysList = Array.from({ length: 7 }, (_, i) => i + 1);

  return (
    <div className="pb-32 pt-4 md:pt-24 max-w-2xl mx-auto px-4 space-y-6">
      
      {/* Header Stats */}
      <header className="bg-secondary text-white p-6 rounded-3xl shadow-bouncy-secondary border-b-4 border-secondaryDark flex flex-col gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl transform translate-x-10 -translate-y-10 rotate-12">🎮</div>
        
        <div className="flex justify-between items-start z-10">
          <div>
            <h1 className="text-2xl font-black">Olá, {user.name.split(' ')[0]}! 👋</h1>
            <p className="text-sm font-bold opacity-90">{user.plan === 'trial' ? 'Modo Teste (Dia 1)' : 'Herói Premium'}</p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl font-black text-sm border-2 border-white/30">
             <Zap size={18} fill="yellow" className="text-yellow-300" /> {user.points} XP
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 z-10">
          <div className="flex justify-between text-xs font-bold opacity-90">
            <span>Energia do Dia</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-4 w-full bg-black/20 rounded-full overflow-hidden p-1">
            <div 
              className="h-full bg-highlight rounded-full transition-all duration-500 ease-out shadow-sm" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Badges/Streak */}
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide z-10">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-lg text-xs font-bold whitespace-nowrap">
            <Flame size={14} fill="orange" className="text-orange-500" /> {user.streak} dias seguidos
          </div>
          {user.points > 100 && (
            <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-lg text-xs font-bold whitespace-nowrap">
              🌟 Super Foco
            </div>
          )}
        </div>
      </header>

      {/* Days Navigation (Map style) */}
      <div className="flex gap-3 overflow-x-auto py-2 px-1 scrollbar-hide">
        {daysList.map(day => {
          const isLocked = day > user.unlockedDays;
          const isActive = day === 1; 
          return (
            <button 
              key={day} 
              onClick={() => { if(isLocked) { playSound('error'); onNavigate('pricing'); } else { playSound('click'); } }}
              className={`
                flex-shrink-0 w-14 h-16 rounded-2xl flex flex-col items-center justify-center text-sm font-black border-2 border-b-4 transition-all active:scale-95
                ${isActive ? 'bg-primary text-white border-primaryDark' : 
                  isLocked ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-white text-secondary border-secondary'}
              `}
            >
              <span>{day}</span>
              {isLocked ? <Lock size={14} className="mt-1 opacity-50" /> : <Award size={14} className="mt-1" />}
            </button>
          );
        })}
      </div>

      {/* Trial Banner */}
      {user.plan === 'trial' && (
        <div className="bg-highlight/10 border-2 border-highlight/50 p-4 rounded-2xl flex items-center justify-between">
          <div className="text-sm text-yellow-800 font-bold leading-tight">
            👀 Só olhando? <br/> Libere o mapa completo!
          </div>
          <button 
            onClick={() => { playSound('click'); onNavigate('pricing'); }}
            className="bg-highlight text-yellow-900 border-b-4 border-yellow-600 px-4 py-2 rounded-xl text-xs font-black shadow-sm uppercase tracking-wide active:mt-1 active:border-b-0"
          >
            Ver Pacotes
          </button>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-textMain text-xl px-2">Missões de Hoje</h3>
        {DEFAULT_TASKS.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            isCompleted={completedToday.includes(task.id)}
            onToggle={() => handleToggle(task)}
          />
        ))}
      </div>

      {/* Locked Future */}
      <div className="relative overflow-hidden pt-4 opacity-80">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-sm text-center space-y-4 rounded-3xl border-2 border-dashed border-gray-300">
          <div className="bg-gray-100 p-4 rounded-full">
            <Lock className="text-gray-400 w-8 h-8" />
          </div>
          <div>
            <h4 className="font-black text-textMain text-lg">Dia 2: Poder da Manhã</h4>
            <p className="text-sm text-textSec font-bold mt-1">Desbloqueie para ganhar +40 XP e continuar a sequência!</p>
          </div>
          <button 
            onClick={() => { playSound('click'); onNavigate('pricing'); }}
            className="btn-bouncy bg-primary text-white border-b-4 border-primaryDark px-8 py-3 rounded-2xl font-black shadow-lg uppercase"
          >
            Destrancar Fase
          </button>
        </div>
        
        {/* Fake content behind blur */}
        <div className="space-y-4 pointer-events-none select-none blur-sm">
           <div className="bg-white p-4 rounded-2xl border-2 border-gray-100 flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-gray-200"></div>
             <div className="h-4 bg-gray-200 rounded w-1/2"></div>
           </div>
        </div>
      </div>

    </div>
  );
};