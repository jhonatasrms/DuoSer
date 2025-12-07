import React, { useState } from 'react';
import { ArrowRight, Check, Star, Shield, Heart } from 'lucide-react';
import { PLANS } from '../constants';
import { ViewState } from '../types';
import { Modal } from '../components/Modal';
import { registerTrial } from '../services/storageService';
import { playSound } from '../services/audioService';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
  onUserUpdate: (user: any) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onUserUpdate }) => {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const openModal = () => {
    playSound('click');
    setIsTrialModalOpen(true);
  };

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (whatsapp.length >= 8 && name.length > 2) {
      playSound('unlock');
      const newUser = registerTrial(name, whatsapp);
      onUserUpdate(newUser);
      setIsTrialModalOpen(false);
      onNavigate('dashboard');
    } else {
      playSound('error');
      alert('Por favor, preencha seu nome e um WhatsApp válido.');
    }
  };

  return (
    <div className="pb-24 pt-6 md:pt-16 space-y-16 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="px-4 max-w-4xl mx-auto text-center space-y-8 relative">
        {/* Floating elements */}
        <div className="absolute top-0 left-0 text-4xl animate-bounce delay-100 hidden md:block">🦄</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-bounce delay-700 hidden md:block">⭐</div>

        <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 border-2 border-yellow-400 text-sm font-extrabold rounded-2xl uppercase tracking-wider transform -rotate-2">
          Novo Método Divertido!
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-textMain leading-tight">
          Aprenda a <span className="text-secondary">calma</span> <br/> brincando!
        </h1>
        <p className="text-lg md:text-xl text-textSec max-w-2xl mx-auto font-medium">
          7 dias de missões secretas para crianças (e adultos!) dominarem a ansiedade e dormirem como pedras.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button 
            onClick={openModal}
            className="btn-bouncy bg-primary text-white border-b-4 border-primaryDark font-extrabold py-4 px-10 rounded-2xl shadow-xl flex items-center justify-center gap-3 text-lg hover:bg-green-500 transition-colors"
          >
            COMEÇAR AGORA <ArrowRight size={24} strokeWidth={3} />
          </button>
          <button 
            onClick={() => { playSound('click'); onNavigate('pricing'); }}
            className="btn-bouncy bg-white text-secondary border-2 border-gray-200 border-b-4 hover:border-gray-300 font-bold py-4 px-10 rounded-2xl transition-colors uppercase tracking-wide"
          >
            Ver Tesouros
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {[
          { title: "Missões Rápidas", desc: "Desafios de 3 minutinhos que cabem na rotina.", icon: "🚀", color: "bg-blue-100 border-blue-300" },
          { title: "Ganhe Prêmios", desc: "Junte XP, suba de nível e ganhe medalhas.", icon: "🏆", color: "bg-yellow-100 border-yellow-300" },
          { title: "Zero Choro", desc: "Técnicas reais de psicologia disfarçadas de brincadeira.", icon: "😎", color: "bg-green-100 border-green-300" }
        ].map((item, idx) => (
          <div key={idx} className={`p-6 rounded-3xl border-2 border-b-4 ${item.color} text-center transform hover:-translate-y-1 transition-transform`}>
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-extrabold text-textMain mb-2">{item.title}</h3>
            <p className="text-textSec font-medium">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* How it Works */}
      <section className="px-4 max-w-4xl mx-auto text-center space-y-12">
        <h2 className="text-3xl font-extrabold text-textMain">Como Funciona a Jornada?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-surface rounded-2xl border-2 border-gray-200 mx-auto flex items-center justify-center text-2xl font-black text-gray-400">1</div>
            <h3 className="font-bold text-textMain text-lg">Cadastro Grátis</h3>
            <p className="text-textSec font-medium">Coloque seu Zap e libere a primeira missão.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-surface rounded-2xl border-2 border-gray-200 mx-auto flex items-center justify-center text-2xl font-black text-gray-400">2</div>
            <h3 className="font-bold text-textMain text-lg">Cumpra Missões</h3>
            <p className="text-textSec font-medium">Faça os desafios do dia e clique para ganhar pontos.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-surface rounded-2xl border-2 border-gray-200 mx-auto flex items-center justify-center text-2xl font-black text-gray-400">3</div>
            <h3 className="font-bold text-textMain text-lg">Vire Mestre</h3>
            <p className="text-textSec font-medium">Desbloqueie fases novas e ganhe super poderes.</p>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="bg-secondary/10 py-16 border-t-2 border-b-2 border-secondary/20">
        <div className="px-4 max-w-4xl mx-auto space-y-8 text-center">
          <h2 className="text-3xl font-extrabold text-textMain">Escolha seu Baú</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map(plan => (
              <div key={plan.id} className={`p-6 rounded-3xl border-2 border-b-4 ${plan.highlight ? 'border-primary bg-white ring-4 ring-primary/20' : 'border-gray-200 bg-white'} text-left relative`}>
                 {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-highlight text-yellow-900 border-2 border-yellow-500 text-xs font-black px-4 py-1 rounded-full shadow-sm uppercase">
                    Mais Legal
                  </div>
                )}
                <h3 className="font-black text-textMain text-lg">{plan.name}</h3>
                <div className="mt-2 text-3xl font-black text-primary">R$ {plan.price}</div>
                <p className="text-sm text-textSec mt-1 mb-4 font-bold">{plan.description}</p>
                <button 
                  onClick={() => { playSound('click'); onNavigate('pricing'); }}
                  className="w-full py-2 rounded-xl font-extrabold bg-gray-100 text-gray-500 hover:bg-gray-200 uppercase text-xs tracking-wider"
                >
                  Ver Detalhes
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="px-4 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-extrabold text-textMain">O que tem na mochila?</h2>
          <ul className="space-y-4">
            {[
              "Painel divertido estilo videogame",
              "Histórico de vitórias",
              "Explicações fáceis para crianças",
              "Garantia de cancelamento fácil"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-textMain font-bold bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <div className="bg-green-100 p-1 rounded-full"><Check className="text-primary stroke-[4]" size={16} /></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 bg-highlight rounded-3xl p-8 border-b-8 border-yellow-500 flex items-center justify-center transform rotate-2">
          <div className="text-center text-yellow-900">
            <Star className="w-20 h-20 text-white mx-auto mb-4 drop-shadow-md" fill="white" />
            <div className="text-4xl font-black">4.9/5</div>
            <p className="font-bold opacity-80">Nota dos pais e heróis</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 pb-24 text-center text-textSec text-sm">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <p className="font-extrabold text-textMain text-lg">Método Sereninho 🍃</p>
          <div className="flex justify-center gap-4 font-bold">
            <span className="cursor-pointer hover:text-primary">Termos</span>
            <span className="cursor-pointer hover:text-primary">Privacidade</span>
            <span className="cursor-pointer hover:text-primary">Ajuda</span>
          </div>
          <p className="opacity-70 font-medium">Feito com 💚 para famílias.</p>
        </div>
      </footer>

      {/* Trial Modal */}
      <Modal isOpen={isTrialModalOpen} onClose={() => setIsTrialModalOpen(false)} title="Criar Perfil de Herói">
        <form onSubmit={handleTrialSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">🦸</div>
            <p className="text-textSec font-bold">
              Preencha para começar sua aventura grátis!
            </p>
          </div>
          
          <div>
            <label className="block text-xs font-black text-textSec uppercase mb-2 ml-1">Nome do Herói (ou seu nome)</label>
            <input 
              type="text" 
              required
              placeholder="Ex: Joãozinho ou Mãe do João"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-2xl border-2 border-gray-200 bg-surface focus:border-secondary focus:bg-white outline-none transition-all font-bold text-textMain placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-textSec uppercase mb-2 ml-1">WhatsApp (Para salvar o progresso)</label>
            <input 
              type="tel" 
              required
              placeholder="(11) 99999-9999"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full p-4 rounded-2xl border-2 border-gray-200 bg-surface focus:border-secondary focus:bg-white outline-none transition-all font-bold text-textMain placeholder-gray-400"
            />
          </div>

          <button type="submit" className="btn-bouncy w-full bg-primary border-b-4 border-primaryDark text-white font-extrabold py-4 rounded-2xl hover:bg-green-500 transition-all text-lg shadow-bouncy-primary">
            LIBERAR MISSÃO 1
          </button>
        </form>
      </Modal>

    </div>
  );
};