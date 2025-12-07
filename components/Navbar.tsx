import React from 'react';
import { User, ViewState } from '../types';
import { LayoutDashboard, Home, Crown } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, currentView, setView }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 md:top-0 md:bottom-auto md:border-t-0 md:border-b z-40">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile: Space Evenly | Desktop: Logo + Links */}
        
        <div className="hidden md:flex items-center gap-2 font-bold text-xl text-primary cursor-pointer" onClick={() => setView('home')}>
          <span className="text-2xl">🍃</span> Método Sereninho
        </div>

        <div className="flex w-full md:w-auto justify-around md:justify-end md:gap-8">
          <button 
            onClick={() => setView('home')} 
            className={`flex flex-col md:flex-row items-center gap-1 p-2 rounded-lg transition-colors ${currentView === 'home' ? 'text-primary' : 'text-textSec hover:text-primary'}`}
          >
            <Home size={20} />
            <span className="text-xs md:text-sm font-medium">Início</span>
          </button>

          {user && (
            <button 
              onClick={() => setView('dashboard')} 
              className={`flex flex-col md:flex-row items-center gap-1 p-2 rounded-lg transition-colors ${currentView === 'dashboard' ? 'text-primary' : 'text-textSec hover:text-primary'}`}
            >
              <LayoutDashboard size={20} />
              <span className="text-xs md:text-sm font-medium">Painel</span>
            </button>
          )}

          <button 
            onClick={() => setView('pricing')} 
            className={`flex flex-col md:flex-row items-center gap-1 p-2 rounded-lg transition-colors ${currentView === 'pricing' ? 'text-primary' : 'text-textSec hover:text-primary'}`}
          >
            <Crown size={20} />
            <span className="text-xs md:text-sm font-medium">Planos</span>
          </button>
        </div>
      </div>
    </nav>
  );
};