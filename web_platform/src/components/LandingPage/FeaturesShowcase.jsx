import React, { useState } from 'react';
import { MessageSquare, MapPin, Clock, ShieldCheck, Check, Sparkles, UserCheck, Smartphone, Eye } from 'lucide-react';
import { whatsAppSimulatorFlow } from '../../data/mockData';

export default function FeaturesShowcase() {
  const [activeTab, setActiveTab] = useState('whatsapp');

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Tecnologia Projetada para o Mundo Real
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-['Plus_Jakarta_Sans']">
          Os 4 Pilares da Nova Contratação Operacional
        </h2>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Como eliminamos a fricção na entrada e blindamos a permanência do colaborador na empresa.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'whatsapp'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>1. Triagem via WhatsApp</span>
        </button>

        <button
          onClick={() => setActiveTab('logistics')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'logistics'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>2. Match Logístico & Escalas</span>
        </button>

        <button
          onClick={() => setActiveTab('onboarding')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'onboarding'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>3. Guardião dos 90 Dias</span>
        </button>

        <button
          onClick={() => setActiveTab('lgpd')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'lgpd'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>4. Compliance LGPD & IA</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
        
        {/* Tab 1: WhatsApp */}
        {activeTab === 'whatsapp' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Acessibilidade Máxima (Zero Drop-off)
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Conversa natural, sem login e sem senha. O candidato já está no WhatsApp.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                93% dos candidatos operacionais desistem quando solicitados a criar contas com senhas complexas ou preencher currículos em PDF. Nossa IA conversacional conduz a triagem em 2 minutos via WhatsApp oficial.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Triagem de requisitos básicos (idade, CNH, escala, bairro).</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Agendamento automático da entrevista com o supervisor.</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Taxa de resposta de 98% em menos de 10 minutos.</span>
                </div>
              </div>
            </div>

            {/* Simulação Visual do WhatsApp */}
            <div className="lg:col-span-6">
              <div className="max-w-md mx-auto bg-slate-950 rounded-3xl border border-slate-700/60 overflow-hidden shadow-2xl">
                {/* Header WhatsApp */}
                <div className="bg-emerald-800 p-3.5 flex items-center space-x-3 text-white">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
                    TF
                  </div>
                  <div>
                    <h4 className="text-sm font-bold flex items-center space-x-1">
                      <span>Sofia | TalentFlow RH</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    </h4>
                    <p className="text-[11px] text-emerald-200">Assistente Oficial de Triagem • Online</p>
                  </div>
                </div>

                {/* Messages Body */}
                <div className="p-4 space-y-3 bg-[#0d1418] max-h-80 overflow-y-auto">
                  {whatsAppSimulatorFlow.slice(0, 4).map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs ${
                          msg.sender === 'user'
                            ? 'bg-emerald-600 text-white rounded-tr-none'
                            : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
                        }`}
                      >
                        <p>{msg.message}</p>
                        <span className="block text-[9px] text-right mt-1 opacity-70">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-slate-900 border-t border-slate-800 text-center">
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    ✓ Resposta recebida • Candidato qualificado em 2min 40s
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Match Logístico */}
        {activeTab === 'logistics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                O Fim do Deslocamento Inviável
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Por que contratar alguém que mora a 3 horas de distância do turno da madrugada?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Mais de 70% das demissões nos primeiros 30 dias ocorrem por exaustão de transporte ou incompatibilidade de turno. Nosso algoritmo analisa o trajeto real de transporte público e as linhas ativas nos horários de entrada e saída.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="text-xs text-slate-400">Raio Inteligente</p>
                  <p className="text-base font-bold text-white mt-1">Até 40 min porta a porta</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="text-xs text-slate-400">Fit de Turno</p>
                  <p className="text-base font-bold text-emerald-400 mt-1">12x36, 6x1 e Noturno</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-300">Exemplo de Match Logístico em Ação</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400">
                    96% MATCH
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Distância Física:</span>
                    <span className="font-bold text-white">4.5 km (Jaú - Vila Maria → Distrito Industrial Jaú)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Transporte Circular:</span>
                    <span className="font-bold text-emerald-400">1 linha direta (Circular Linha 102) • 18 min</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Escala Desejada:</span>
                    <span className="font-bold text-white">12x36 Noturno (Total aderência)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Previsão de Retenção:</span>
                    <span className="font-bold text-emerald-400">95% de chance de estabilidade</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                  💡 A IA filtrou automaticamente outro candidato que morava a 30 km e dependia de 3 conexões, prevenindo o turnover antes mesmo da contratação.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Onboarding 90 Dias */}
        {activeTab === 'onboarding' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Protegendo o Período de Experiência
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Guardião dos Primeiros 90 Dias: Alerta preditivo antes da desistência
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                A contratação não acaba no primeiro dia de trabalho. A TalentFlow acompanha o novo colaborador com micro-perguntas no WhatsApp nos momentos críticos da experiência: Dia 1, 15, 30, 60 e 90.
              </p>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span><strong>Dia 1:</strong> Kit EPI entregue? Foi bem recebido pelo líder?</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span><strong>Dia 15:</strong> Como está a adaptação com o horário e colegas?</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span><strong>Dia 30 a 90:</strong> Alertas preventivos para o RH intervir e salvar a contratação.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>Linha do Tempo dos 90 Dias (Turma Operacional Jaú & Região)</span>
                </h4>

                <div className="relative pl-6 border-l border-slate-800 space-y-4">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950" />
                    <p className="text-xs font-bold text-white">Dia 1 • Recepção & EPIs</p>
                    <p className="text-[11px] text-slate-400">100% dos kits conferidos via app</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950" />
                    <p className="text-xs font-bold text-white">Dia 15 • Check-in de Adaptação</p>
                    <p className="text-[11px] text-slate-400">96% de satisfação confirmada no WhatsApp</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-950" />
                    <p className="text-xs font-bold text-amber-300">Dia 22 • Alerta Preventivo de Deslocamento</p>
                    <p className="text-[11px] text-slate-400">Ajuste de tolerância de ônibus evitou pedido de demissão</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-cyan-400 border-2 border-slate-950" />
                    <p className="text-xs font-bold text-white">Dia 90 • Efetivação Celebrada</p>
                    <p className="text-[11px] text-slate-400">Retenção de 91.6% (Recorde na operação)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: LGPD Compliance */}
        {activeTab === 'lgpd' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Segurança Jurídica & Ética
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Compliance LGPD Nativo e Revisão Humana de IA (Artigo 20)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                O Plano Executivo prevê respeito estrito à LGPD e diretrizes da ANPD. A IA nunca toma decisões finais arbitrárias sem permitir a contestação e revisão por recrutadores humanos.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Human-in-the-Loop:</strong> Recrutador pode revisar qualquer recomendação de matching.</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <Eye className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Transparência Algorítmica:</strong> O candidato sabe exatamente por que sua pontuação foi calculada.</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Minimização de Dados:</strong> Apenas dados essenciais para o trabalho operacional.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Painel de Auditoria e Decisão Ética</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                  <p className="text-slate-400">Solicitação do Titular (Art. 20 LGPD):</p>
                  <p className="text-white font-medium">"Marcos Vinicius solicitou reavaliação de vaga para polo próximo"</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-[10px] text-slate-400">Revisor: Carlos Mendes (RH)</span>
                    <span className="text-[10px] text-emerald-400 font-bold">Aprovado com Revisão Humana</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Todos os registros e justificativas são criptografados de ponta a ponta e ficam disponíveis para relatórios de conformidade.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

    </section>
  );
}
