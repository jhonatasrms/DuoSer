import React, { useState } from 'react';
import { PLANS } from '../constants';
import { Check, Lock } from 'lucide-react';
import { Modal } from '../components/Modal';

interface PricingProps {
  onUnlock: (planId: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onUnlock }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const confirmPayment = () => {
    if (selectedPlan) {
      // Simulate payment process
      setTimeout(() => {
        onUnlock(selectedPlan);
        setSelectedPlan(null);
      }, 1000);
    }
  };

  return (
    <div className="pt-24 pb-24 px-4 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-textMain">Invista na sua paz mental</h2>
        <p className="text-textSec max-w-xl mx-auto">Escolha o plano ideal para desbloquear sua jornada completa e transformar seus hábitos.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        {PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative bg-white rounded-3xl p-8 border-2 transition-transform hover:-translate-y-1 ${plan.highlight ? 'border-primary shadow-xl ring-4 ring-primary/10' : 'border-gray-100 shadow-sm'}`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-highlight text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm">
                MAIS VENDIDO
              </div>
            )}

            <h3 className="text-xl font-bold text-textMain">{plan.name}</h3>
            <p className="text-sm text-textSec mt-1 mb-6">{plan.description}</p>
            
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-sm text-textSec">R$</span>
              <span className="text-4xl font-bold text-textMain">{plan.price}</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-sm text-textSec">
                <Check size={16} className="text-success" /> Acesso por {plan.days} dias
              </li>
              <li className="flex items-center gap-3 text-sm text-textSec">
                <Check size={16} className="text-success" /> Painel completo
              </li>
              <li className="flex items-center gap-3 text-sm text-textSec">
                {plan.id === '7days' ? (
                  <Lock size={16} className="text-gray-300" />
                ) : (
                  <Check size={16} className="text-success" /> 
                )}
                <span className={plan.id === '7days' ? 'text-gray-400 line-through' : ''}>Badges exclusivas</span>
              </li>
            </ul>

            <button 
              onClick={() => handleSelectPlan(plan.id)}
              className={`w-full py-3 rounded-xl font-bold transition-colors ${plan.highlight ? 'bg-primary text-white hover:bg-blue-600' : 'bg-gray-100 text-textMain hover:bg-gray-200'}`}
            >
              Desbloquear
            </button>
            
            {plan.id !== '7days' && (
              <p className="text-center text-xs text-success mt-3 font-medium">Economia garantida</p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <h4 className="font-bold text-lg mb-2">Garantia incondicional</h4>
        <p className="text-textSec text-sm">Se não sentir diferença na primeira semana, devolvemos seu dinheiro.</p>
      </div>

      {/* Payment Simulation Modal */}
      <Modal isOpen={!!selectedPlan} onClose={() => setSelectedPlan(null)} title="Finalizar Desbloqueio">
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 bg-green-50 text-success rounded-full flex items-center justify-center mx-auto">
            <Lock size={32} />
          </div>
          <div>
            <h4 className="font-bold text-lg text-textMain">Ambiente Seguro</h4>
            <p className="text-textSec text-sm mt-2">
              Esta é uma simulação. Ao clicar abaixo, seu plano será ativado imediatamente.
            </p>
          </div>
          <button 
            onClick={confirmPayment}
            className="w-full bg-success hover:bg-green-600 text-white font-bold py-3 rounded-lg shadow-lg shadow-green-200 transition-all"
          >
            Confirmar Pagamento
          </button>
        </div>
      </Modal>
    </div>
  );
};