import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './views/Home';
import { Dashboard } from './views/Dashboard';
import { Pricing } from './views/Pricing';
import { User, ViewState, PlanType } from './types';
import { getUser, checkDailyReset, updateUserPlan } from './services/storageService';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize App
  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      const updatedUser = checkDailyReset(storedUser);
      setUser(updatedUser);
      // If user has a plan or valid trial, go to dashboard logic could be here
      // But let's stay on home or dashboard based on history? 
      // For static app simplicity, stay Home unless strictly navigating.
      // Or if user exists, default to Dashboard? Let's default to Dashboard if user exists.
      setCurrentView('dashboard');
    }
    setIsLoading(false);
  }, []);

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handlePlanUnlock = (planId: string) => {
    if (!user) return; // Should catch this case (e.g. ask for email first)
    
    // In a real app, this would be inside the Pricing component success callback
    const updated = updateUserPlan(user, planId as PlanType);
    setUser(updated);
    setCurrentView('dashboard');
    alert(`Plano ${planId} ativado com sucesso! Bem-vindo ao Método Sereninho.`);
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-[#F7FAFB]">Carregando...</div>;

  return (
    <div className="min-h-screen bg-background font-sans text-textMain selection:bg-primary/20">
      
      {/* View Router */}
      <main className="min-h-screen">
        {currentView === 'home' && (
          <Home 
            onNavigate={setCurrentView} 
            onUserUpdate={handleUserUpdate} 
          />
        )}
        
        {currentView === 'dashboard' && user && (
          <Dashboard 
            user={user} 
            onUserUpdate={handleUserUpdate} 
            onNavigate={setCurrentView}
          />
        )}
        
        {/* Fallback if accessing dashboard without user */}
        {currentView === 'dashboard' && !user && (
          <div className="pt-32 text-center px-4">
            <h2 className="text-xl font-bold mb-4">Acesso restrito</h2>
            <p className="mb-6">Você precisa iniciar um teste grátis para ver o painel.</p>
            <button onClick={() => setCurrentView('home')} className="bg-primary text-white px-6 py-2 rounded-full">Ir para Início</button>
          </div>
        )}

        {currentView === 'pricing' && (
          <Pricing onUnlock={handlePlanUnlock} />
        )}
      </main>

      <Navbar 
        user={user} 
        currentView={currentView} 
        setView={setCurrentView} 
      />
    </div>
  );
};

export default App;