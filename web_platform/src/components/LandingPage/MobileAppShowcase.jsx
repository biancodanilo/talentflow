import React, { useState } from 'react';
import { Smartphone, MapPin, CheckCircle, Clock, Shield, Sparkles, Navigation, Calendar } from 'lucide-react';

export default function MobileAppShowcase({ onOpenFlutterApp }) {
  const [activeScreen, setActiveScreen] = useState('vagas'); // 'vagas' | 'onboarding' | 'perfil'

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            <span>App do Candidato & Colaborador (Flutter)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
            Interface Feita para o Trabalhador Real
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Desenvolvido em Flutter com responsividade total para Android, iOS e Web. Leve, rápido e sem burocracia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Coluna da esquerda: Explicações e seletor de tela */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-bold text-white">
              Do Primeiro Clique à Celebração dos 90 Dias
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              O aplicativo foi desenhado para ser intuitivo até mesmo para quem não tem familiaridade com tecnologia corporativa. Tudo é acessível em 1 toque, com foco em localização, rotas de ônibus e checklist de integração.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => setActiveScreen('vagas')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start space-x-4 ${
                  activeScreen === 'vagas'
                    ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-900/40 border-slate-850 hover:bg-slate-900 text-slate-400'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${activeScreen === 'vagas' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${activeScreen === 'vagas' ? 'text-white' : 'text-slate-300'}`}>
                    1. Radar de Vagas por Proximidade & Turno
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    O trabalhador vê as vagas próximas à sua casa, tempo de trajeto em minutos e escala compatível.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveScreen('onboarding')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start space-x-4 ${
                  activeScreen === 'onboarding'
                    ? 'bg-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-900/40 border-slate-850 hover:bg-slate-900 text-slate-400'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${activeScreen === 'onboarding' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${activeScreen === 'onboarding' ? 'text-white' : 'text-slate-300'}`}>
                    2. Jornada dos Primeiros 90 Dias
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Checklist de recebimento de EPIs, boas-vindas, data do primeiro adiantamento e canal direto para tirar dúvidas.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveScreen('perfil')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start space-x-4 ${
                  activeScreen === 'perfil'
                    ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/40 border-slate-850 hover:bg-slate-900 text-slate-400'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${activeScreen === 'perfil' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${activeScreen === 'perfil' ? 'text-white' : 'text-slate-300'}`}>
                    3. Minha Privacidade & Direitos LGPD
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Transparência total dos dados coletados, com botão para solicitar revisão humana de qualquer triagem.
                  </p>
                </div>
              </button>
            </div>

          </div>

          {/* Coluna da direita: Mockup interativo de Smartphone */}
          <div className="lg:col-span-6 flex justify-center">
            
            <div className="relative w-full max-w-[340px] h-[670px] bg-slate-950 rounded-[48px] p-3.5 shadow-2xl border-4 border-slate-800 shadow-emerald-500/10">
              {/* Notch / Dynamic Island */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-30" />

              {/* Screen Content */}
              <div className="w-full h-full bg-slate-900 rounded-[38px] overflow-hidden flex flex-col text-slate-100 pt-7 text-xs border border-slate-800">
                
                {/* App Topbar */}
                <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-extrabold text-white text-xs">TalentFlow</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Olá, Rodrigo 👋</span>
                </div>

                {/* Dynamic Screen Inside Smartphone */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  
                  {activeScreen === 'vagas' && (
                    <>
                      <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                        <p className="text-[10px] text-emerald-400 font-bold uppercase">Radar de Vagas Próximas</p>
                        <p className="text-xs font-bold text-white mt-0.5">3 oportunidades perto de você</p>
                      </div>

                      {/* Job 1 */}
                      <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-white text-xs block">Operador de Logística</span>
                            <span className="text-[10px] text-slate-400">CD Jaú • Mercado Sul</span>
                          </div>
                          <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            96% MATCH
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-300 space-y-1">
                          <p className="flex items-center space-x-1">
                            <Navigation className="w-3 h-3 text-cyan-400" />
                            <span><strong>4.5 km</strong> • Circular Linha 102 (18 min direto)</span>
                          </p>
                          <p className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-indigo-400" />
                            <span>Escala <strong>12x36 Noturno</strong> (19h às 07h)</span>
                          </p>
                          <p className="font-bold text-emerald-400 mt-1">
                            R$ 2.150,00 + Benefícios
                          </p>
                        </div>

                        <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] rounded-xl transition-all">
                          Candidatar em 1 Toque (WhatsApp)
                        </button>
                      </div>

                      {/* Job 2 */}
                      <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 opacity-80">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-white text-xs block">Operador de Empilhadeira</span>
                            <span className="text-[10px] text-slate-400">Barra Bonita • TransLog Paulista</span>
                          </div>
                          <span className="text-[10px] font-black text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">
                            91% MATCH
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400">12 km de distância • Turno Tarde</p>
                      </div>
                    </>
                  )}

                  {activeScreen === 'onboarding' && (
                    <>
                      <div className="p-3 rounded-2xl bg-indigo-500/20 border border-indigo-500/30">
                        <p className="text-[10px] text-indigo-300 font-bold uppercase">Sua Experiência de 90 Dias</p>
                        <p className="text-xs font-bold text-white mt-0.5">Dia 8 de 90 • Rumo à Efetivação!</p>
                      </div>

                      <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span className="text-[11px] text-white">Retirada do Kit EPI & Bota</span>
                          </div>
                          <span className="text-[9px] text-emerald-400 font-bold">Concluído</span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-950 border border-indigo-500/40 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-amber-400" />
                            <span className="text-[11px] text-white">Check-in Dia 15 com Líder</span>
                          </div>
                          <span className="text-[9px] text-amber-400 font-bold">Em 7 dias</span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between opacity-70">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-[11px] text-slate-400">Avaliação de 30 Dias</span>
                          </div>
                          <span className="text-[9px] text-slate-500">Agendado</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-slate-300">
                        💬 Dúvida sobre transporte ou uniforme? Fale com seu padrinho no WhatsApp em 1 clique.
                      </div>
                    </>
                  )}

                  {activeScreen === 'perfil' && (
                    <>
                      <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/30">
                        <p className="text-[10px] text-cyan-300 font-bold uppercase">Privacidade & Direitos (LGPD)</p>
                        <p className="text-xs font-bold text-white mt-0.5">Seus dados protegidos por lei</p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-[11px]">
                        <p className="text-slate-300"><strong>Dados Coletados:</strong> Bairro aproximado, turnos de preferência e certificações operacionais.</p>
                        <p className="text-slate-400">Nenhum dado desnecessário é solicitado ou compartilhado com terceiros.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-slate-300 space-y-2">
                        <p className="font-bold text-white">Direito de Revisão Humana (Art. 20):</p>
                        <p>Você pode solicitar que um recrutador humano revise a pontuação atribuída pela IA a qualquer momento.</p>
                        <button className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold">
                          Solicitar Revisão de Vaga
                        </button>
                      </div>
                    </>
                  )}

                </div>

                {/* Bottom App Navigation */}
                <div className="p-2 border-t border-slate-800 bg-slate-950 flex justify-around text-[10px] text-slate-400">
                  <span className={activeScreen === 'vagas' ? 'text-emerald-400 font-bold' : ''}>Oportunidades</span>
                  <span className={activeScreen === 'onboarding' ? 'text-indigo-400 font-bold' : ''}>Onboarding</span>
                  <span className={activeScreen === 'perfil' ? 'text-cyan-400 font-bold' : ''}>Privacidade</span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
