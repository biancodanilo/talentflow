import React, { useState } from 'react';
import { whatsAppSimulatorFlow, candidatesData } from '../../data/mockData';
import { 
  MessageSquare, Send, CheckCheck, Clock, Users, Sparkles, Smartphone, Bot, 
  ExternalLink, Phone, QrCode, CheckCircle2, Copy, RefreshCw, ChevronRight, Zap
} from 'lucide-react';

export default function WhatsAppTriagem() {
  const [candidatesList] = useState(candidatesData);
  const [selectedCandidateId, setSelectedCandidateId] = useState(candidatesData[0].id);
  const [messages, setMessages] = useState(whatsAppSimulatorFlow);
  const [newMessage, setNewMessage] = useState('');
  const [isConnectedToWhatsAppWeb, setIsConnectedToWhatsAppWeb] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const selectedCandidate = candidatesList.find(c => c.id === selectedCandidateId) || candidatesList[0];

  // Templates prontos para envio no WhatsApp
  const quickTemplates = [
    {
      title: "Triagem de Turno & Linha de Ônibus",
      text: `Olá ${selectedCandidate.name.split(' ')[0]}! Sou da equipe de RH da TalentFlow. Vimos seu interesse na vaga de ${selectedCandidate.appliedJob}. Você teria disponibilidade para escala 12x36 e circular direto até a unidade?`
    },
    {
      title: "Validação de CNH & NR-11",
      text: `Olá ${selectedCandidate.name.split(' ')[0]}! Para darmos andamento na vaga de ${selectedCandidate.appliedJob}, você poderia nos enviar foto da sua CNH e comprovante do curso NR-11 atualizado?`
    },
    {
      title: "Agendamento de Entrevista Presencial",
      text: `Olá ${selectedCandidate.name.split(' ')[0]}, parabéns! Seu perfil teve 96% de compatibilidade logística. Gostaria de confirmar sua entrevista presencial amanhã às 14h com o gestor da operação?`
    },
    {
      title: "Guardião 90 Dias - Check-in Semana 1",
      text: `Oi ${selectedCandidate.name.split(' ')[0]}, aqui é o acompanhamento de adaptação TalentFlow! Como foi sua primeira semana na empresa? Teve alguma dificuldade com transporte ou integração no posto?`
    }
  ];

  // Abertura Direta no WhatsApp Web
  const handleOpenWhatsAppWeb = (customText) => {
    const textToSend = customText || newMessage || quickTemplates[0].text;
    const cleanPhone = (selectedCandidate.phone || '14987412234').replace(/\D/g, '');
    const fullPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
    const url = `https://web.whatsapp.com/send?phone=${fullPhone}&text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleApplyTemplate = (tmplText) => {
    setNewMessage(tmplText);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = {
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: newMessage
    };

    setMessages([...messages, userMsg]);
    const currentInput = newMessage;
    setNewMessage('');

    // Resposta automática da Sofia no simulador
    setTimeout(() => {
      const botResponse = {
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: `Perfeito, ${selectedCandidate.name.split(' ')[0]}! Informação registrada com sucesso. Seus dados de turno e localização foram sincronizados no sistema com 96% de compatibilidade!`
      };
      setMessages(prev => [...prev, botResponse]);
    }, 700);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header com Conexão ao WhatsApp Web */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Conexão Direta WhatsApp Web & Triagem Inteligente</span>
          </div>
          <h2 className="text-2xl font-black text-white font-['Plus_Jakarta_Sans'] mt-0.5">
            Triagem Conversacional & Conexão WhatsApp Web
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Conecte seu WhatsApp Web corporativo, envie mensagens diretas para os candidatos e monitore a resposta automática da IA.
          </p>
        </div>

        {/* Action Button: Conectar / Abrir WhatsApp Web */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => handleOpenWhatsAppWeb(newMessage)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Abrir conversa do candidato diretamente no WhatsApp Web"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Abrir no WhatsApp Web</span>
          </button>

          <button
            onClick={() => setShowQrModal(!showQrModal)}
            className="flex items-center space-x-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-all"
            title="Ver status da conexão e QR Code"
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>Status da Sessão</span>
          </button>
        </div>
      </div>

      {/* Modal / Card de Status QR Code da Conexão */}
      {showQrModal && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/40">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Sessão WhatsApp Web Conectada</p>
              <p className="text-[11px] text-slate-400">Instância Corporativa TalentFlow • Telefone Operacional (14) 98741-2234</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ● Online & Sincronizado
            </span>
            <button
              onClick={() => setShowQrModal(false)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Seletor Rápido de Candidato */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold text-slate-300">Candidato em Atendimento:</span>
          <select
            value={selectedCandidateId}
            onChange={(e) => setSelectedCandidateId(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-semibold focus:outline-none focus:border-emerald-500"
          >
            {candidatesList.map((cand) => (
              <option key={cand.id} value={cand.id}>
                {cand.name} ({cand.phone}) • {cand.appliedJob}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Local: <strong className="text-white">{selectedCandidate.location}</strong></span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">{selectedCandidate.overallMatch}% Match</span>
        </div>
      </div>

      {/* WhatsApp Console Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Chat UI Conectado ao WhatsApp */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header WhatsApp Bar */}
          <div className="bg-[#075e54] px-6 py-4 flex items-center justify-between border-b border-emerald-800/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold text-sm">
                {selectedCandidate.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
                  <span>{selectedCandidate.name}</span>
                  <Bot className="w-4 h-4 text-emerald-200" />
                </h4>
                <p className="text-[11px] text-emerald-100">
                  {selectedCandidate.phone} • {selectedCandidate.appliedJob}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleOpenWhatsAppWeb(newMessage)}
                className="px-2.5 py-1 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-[11px] flex items-center space-x-1 shadow-sm transition-all"
                title="Abrir no WhatsApp Web"
              >
                <span>WhatsApp Web</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Messages list */}
          <div className="p-6 space-y-4 bg-[#0a1014] min-h-[360px] max-h-[440px] overflow-y-auto">
            {messages.map((msg, index) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={index} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs ${
                      isUser
                        ? 'bg-[#005c4b] text-white rounded-tr-none'
                        : 'bg-[#202c33] text-slate-100 rounded-tl-none border border-slate-700/50'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-line">{msg.message}</p>
                    <div className="flex items-center justify-end space-x-1 text-[9px] mt-1.5 opacity-70">
                      <span>{msg.time}</span>
                      {isUser && <CheckCheck className="w-3 h-3 text-cyan-300" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box & Actions */}
          <div className="p-3.5 bg-slate-900 border-t border-slate-800 space-y-2">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Digite a mensagem para o candidato ou clique em um template ao lado..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              
              {/* Botão de Envio no Simulador */}
              <button
                type="submit"
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl font-bold transition-all shrink-0"
                title="Testar resposta no simulador"
              >
                <Send className="w-4 h-4" />
              </button>

              {/* Botão Enviar Direto no WhatsApp Web */}
              <button
                type="button"
                onClick={() => handleOpenWhatsAppWeb(newMessage)}
                className="px-3.5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-black text-xs transition-all shrink-0 flex items-center space-x-1.5 shadow-md shadow-emerald-500/20"
                title="Enviar diretamente pelo WhatsApp Web oficial"
              >
                <span>Enviar no Web</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Right: Templates Rápidos & Roteiros de Triagem */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Templates de Mensagens Rápidas</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold">1-clique p/ WhatsApp</span>
            </div>

            <p className="text-xs text-slate-300">
              Clique em um template para preencher a mensagem e despachar direto para o WhatsApp Web do candidato:
            </p>

            <div className="space-y-2.5">
              {quickTemplates.map((tmpl, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all text-xs group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-emerald-400 text-[11px]">{tmpl.title}</span>
                    <button
                      onClick={() => handleOpenWhatsAppWeb(tmpl.text)}
                      className="text-[10px] font-bold text-slate-400 hover:text-emerald-300 flex items-center space-x-1"
                      title="Enviar direto no WhatsApp Web"
                    >
                      <span>Disparar</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-2">
                    {tmpl.text}
                  </p>
                  <button
                    onClick={() => handleApplyTemplate(tmpl.text)}
                    className="mt-2 text-[10px] font-bold text-teal-400 hover:underline flex items-center space-x-1"
                  >
                    <span>Usar no campo de texto</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Card Informativo Meta Business */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
            <strong className="block text-emerald-400">Integração WhatsApp Web & Cloud API:</strong>
            <p className="text-[11px] text-slate-300">
              Compatível com o aplicativo WhatsApp Web do navegador e aplicativo para desktop. Respostas dos candidatos atualizam automaticamente a pontuação logística de matching.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
