
import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { MessageCircle, Bot, Send, X } from 'lucide-react';
import { Input } from '@/Components/ui/input';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const quickActions = [
    { label: 'Resumo do dia', action: 'resumo' },
    { label: 'Alertas críticos', action: 'alertas' },
    { label: 'Análise de riscos', action: 'riscos' },
    { label: 'Sugestões de ação', action: 'sugestoes' }
  ];

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-18 h-18 rounded-full bg-gradient-to-r from-lumen-gold to-lumen-gold-light text-lumen-blue shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 group hover:scale-110"
      >
        <div className="relative">
          <Bot className="h-8 w-8 font-bold" />
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
            <span className="text-white text-xs font-bold">3</span>
          </div>
        </div>
      </Button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 w-96 max-w-[90vw]">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-lumen-gold/20 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-lumen-blue to-lumen-blue-light text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-lumen-gold rounded-xl flex items-center justify-center">
                <Bot className="h-6 w-6 text-lumen-blue" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-montserrat">IA-LUX</h3>
                <p className="text-xs text-blue-100 font-roboto">Assistente Inteligente LUMEN</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-10 w-10 p-0 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="text-sm text-gray-700 font-roboto leading-relaxed">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-lumen-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="h-4 w-4 text-lumen-blue" />
                </div>
                <div>
                  <p className="font-medium text-lumen-blue">Olá, Prefeito! 👋</p>
                  <p className="mt-2">
                    Sou a IA-LUX, sua assistente inteligente para gestão municipal. 
                    Posso ajudá-lo com análises, relatórios e insights estratégicos.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-600 font-roboto">Ações Rápidas:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-2 border-lumen-blue/20 hover:bg-lumen-blue hover:text-white transition-all duration-200 font-roboto"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  placeholder="Digite sua pergunta..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 border-lumen-blue/20 focus:border-lumen-blue font-roboto"
                />
                <Button 
                  size="sm" 
                  className="bg-lumen-gold hover:bg-lumen-gold-light text-lumen-blue px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 font-roboto">
                💡 Experimente: "Qual o status da execução orçamentária?" ou "Mostre os alertas críticos"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
