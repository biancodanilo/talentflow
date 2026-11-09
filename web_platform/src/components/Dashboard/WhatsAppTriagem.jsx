import React, { useState } from 'react';
import { whatsAppSimulatorFlow } from '../../data/mockData';
import { MessageSquare, Send, CheckCheck, Clock, Users, Sparkles, Smartphone, Bot, AlertCircle } from 'lucide-react';

export default function WhatsAppTriagem() {
  const [messages, setMessages] = useState(whatsAppSimulatorFlow);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = {
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: newMessage
    };

    setMessages([...messages, userMsg]);
    setNewMessage('');

    // Resposta automática da IA
    setTimeout(() => {
      const botResponse = {
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: "Perfeito! Informação salva com sucesso no sistema. Seus dados de turno e localização foram atualizados com compatibilidade de 96%!"
      };
      setMessages(prev => [...prev, botResponse]);
    }, 700);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <MessageSquare className="w-4 h-4" />
          <span>Canal de Triagem Acessível (WhatsApp Oficial)</span>
        </div>
        <h2 className="text-2xl font-black text-white font-['Plus_Jakarta_Sans'] mt-0.5">
          Simulador & Monitor de Triagem Conversacional
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Substituição de formulários longos por micro-perguntas no WhatsApp. Evasão menor que 3%.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">Taxa de Conclusão da Triagem</p>
          <p className="text-2xl font-black text-emerald-400 mt-1">96.8%</p>
          <p className="text-[10px] text-slate-500">Média em 380 candidatos</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">Tempo Médio de Resposta</p>
          <p className="text-2xl font-black text-teal-400 mt-1">3min 40s</p>
          <p className="text-[10px] text-slate-500">Fluidez instantânea</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">Índice de Evasão (Drop-off)</p>
          <p className="text-2xl font-black text-white mt-1">&lt; 3.2%</p>
          <p className="text-[10px] text-emerald-400">vs 82% em formulários web</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">Entrevistas Agendadas no Bot</p>
          <p className="text-2xl font-black text-indigo-400 mt-1">100%</p>
          <p className="text-[10px] text-slate-500">Sincronizado na agenda do líder</p>
        </div>
      </div>

      {/* WhatsApp Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Chat UI */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header WhatsApp Bar */}
          <div className="bg-emerald-900/80 px-6 py-4 flex items-center justify-between border-b border-emerald-800/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-sm">
                TF
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
                  <span>Sofia | Triagem Inteligente TalentFlow</span>
                  <Bot className="w-4 h-4 text-emerald-300" />
                </h4>
                <p className="text-[11px] text-emerald-200">Em conversa ativa com Rodrigo Almeida (CAND-001)</p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ● Online
            </span>
          </div>

          {/* Messages list */}
          <div className="p-6 space-y-4 bg-[#0a1014] min-h-[380px] max-h-[460px] overflow-y-auto">
            {messages.map((msg, index) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={index} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-xs ${
                      isUser
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-slate-850 text-slate-100 rounded-tl-none border border-slate-750'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.message}</p>
                    <div className="flex items-center justify-end space-x-1 text-[9px] mt-1.5 opacity-70">
                      <span>{msg.time}</span>
                      {isUser && <CheckCheck className="w-3 h-3 text-cyan-200" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Digite uma mensagem como candidato para testar o bot..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="p-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold transition-all shrink-0"
              title="Enviar mensagem"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right: Flow rules and automated questions */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-5">
          <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Roteiro de Triagem Automatizada</span>
          </h3>

          <p className="text-xs text-slate-300">
            Perguntas focadas estritamente nas variáveis críticas que evitam o turnover precoce:
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400">1. Validação de Escala & Turno</span>
              <p className="text-slate-400">
                Checa tolerância a trabalho noturno ou finais de semana (12x36 / 6x1) antes do envio da proposta.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400">2. Viabilidade de Deslocamento</span>
              <p className="text-slate-400">
                Pergunta qual linha de ônibus ou condução o candidato utilizará para chegar ao posto de trabalho.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-teal-400">3. Checagem Prática de Documento / Certificado</span>
              <p className="text-slate-400">
                OCR no WhatsApp para validar CNH e cursos obrigatórios (ex: NR-11 para empilhadeirista).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
            <strong className="block text-emerald-400">Integração Oficial Meta WhatsApp Business:</strong>
            <p className="text-[11px]">
              Templates homologados com 98% de taxa de entrega e conformidade completa com a LGPD.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
