import React, { useState } from 'react';
import { Smartphone, MapPin, CheckCircle, Clock, Shield, Sparkles, Navigation, Calendar } from 'lucide-react';

export default function MobileAppShowcase({ onOpenFlutterApp }) {
  const [activeScreen, setActiveScreen] = useState('vagas'); // 'vagas' | 'onboarding' | 'perfil'

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            <span>App do Candidato & Colaborador (Flutter)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
            Interface Feita para o Trabalhador Real
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
            Desenvolvido em Flutter com responsividade total para Android, iOS e Web. Leve, rápido e sem burocracia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Coluna da esquerda: Explicações e seletor de tela */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Do Primeiro Clique à Celebração dos 90 Dias
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              O aplicativo foi desenhado para ser intuitivo até mesmo para quem não tem familiaridade com tecnologia corporativa. Tudo é acessível em 1 toque, com foco em localização, rotas de ônibus e checklist de integração.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => setActiveScreen('vagas')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start space-x-4 ${
                  activeScreen === 'vagas'
                    ? 'bg-white dark:bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                    : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${activeScreen === 'vagas' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${activeScreen === 'vagas' ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    1. Radar de Vagas por Proximidade & Turno
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    O trabalhador vê as vagas próximas à sua casa, tempo de trajeto em minutos e escala compatível.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveScreen('onboarding')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start space-x-4 ${
                  activeScreen === 'onboarding'
                    ? 'bg-white dark:bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                    : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${activeScreen === 'onboarding' ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${activeScreen === 'onboarding' ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    2. Jornada dos Primeiros 90 Dias
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Checklist de recebimento de EPIs, boas-vindas, data do primeiro adiantamento e canal direto para tirar dúvidas.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveScreen('perfil')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start space-x-4 ${
                  activeScreen === 'perfil'
                    ? 'bg-white dark:bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                    : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${activeScreen === 'perfil' ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${activeScreen === 'perfil' ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    3. Transparência & LGPD Simplificada
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Painel direto onde o candidato visualiza quais dados foram coletados e pode pedir revisão humana a qualquer momento.
                  </p>
                </div>
              </button>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onOpenFlutterApp}
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm rounded-2xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
              >
                <Smartphone className="w-4 h-4" />
                <span>Testar App Flutter Interativo</span>
              </button>
            </div>
          </div>

          {/* Coluna da direita: Mockup interativo de Smartphone com Contraste Perfeito */}
          <div className="lg:col-span-6 flex justify-center">
            
            <div className="relative w-full max-w-[340px] h-[670px] bg-slate-900 dark:bg-slate-950 rounded-[48px] p-3.5 shadow-2xl border-4 border-slate-700 dark:border-slate-800 shadow-emerald-500/10">
              {/* Notch / Dynamic Island */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 dark:bg-slate-900 rounded-full z-30" />

              {/* Screen Content */}
              <div className="w-full h-full bg-slate-50 dark:bg-slate-900 rounded-[38px] overflow-hidden flex flex-col text-slate-800 dark:text-slate-100 pt-7 text-xs border border-slate-200 dark:border-slate-800">
                
                {/* App Topbar */}
                <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-extrabold text-slate-900 dark:text-white text-xs">TalentFlow</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Olá, Rodrigo 👋</span>
                </div>

                {/* Smartphone Dynamic Content Body */}
                <div className="flex-1 p-4 space-y-3.5 overflow-y-auto">
                  
                  {activeScreen === 'vagas' && (
                    <>
                      <div className="p-3 rounded-2xl bg-emerald-100/70 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30">
                        <p className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider">Radar de Vagas Próximas</p>
                        <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">3 oportunidades perto de você</p>
                      </div>

                      {/* Job 1 */}
                      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950 border border-emerald-300 dark:border-emerald-500/40 space-y-2 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white text-xs block">Operador de Logística</span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">CD Jaú • Mercado Sul</span>
                          </div>
                          <span className="text-[9px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/30">
                            96% Match
                          </span>
                        </div>
                        <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                          <p className="flex items-center space-x-1 text-slate-700 dark:text-slate-300 font-semibold">
                            <Navigation className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                            <span><strong>4.5 km</strong> • Circular Linha 102 (18 min direto)</span>
                          </p>
                          <p className="flex items-center space-x-1 text-slate-600 dark:text-slate-400">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>Escala <strong>12×36 Noturno</strong> (19h às 07h)</span>
                          </p>
                        </div>
                        <div className="pt-1 flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">R$ 2.150,00 + Benefícios</span>
                        </div>
                        <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl font-bold text-[11px] transition-all shadow-sm">
                          Candidatar em 1 Toque (WhatsApp)
                        </button>
                      </div>

                      {/* Job 2 */}
                      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 opacity-90 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white text-xs block">Operador de Empilhadeira</span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">Barra Bonita • TransLog Paulista</span>
                          </div>
                          <span className="text-[9px] font-bold text-cyan-800 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-300 dark:border-cyan-500/30">
                            91% Match
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">12 km de distância • Turno Tarde</p>
                      </div>
                    </>
                  )}

                  {activeScreen === 'onboarding' && (
                    <>
                      <div className="p-3 rounded-2xl bg-indigo-100/70 dark:bg-indigo-500/20 border border-indigo-300 dark:border-indigo-500/30">
                        <p className="text-[10px] text-indigo-800 dark:text-indigo-300 font-bold uppercase tracking-wider">Sua Experiência de 90 Dias</p>
                        <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Dia 8 de 90 • Rumo à Efetivação!</p>
                      </div>

                      <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                            <span className="text-[11px] text-slate-800 dark:text-white font-medium">Retirada do Kit EPI & Bota</span>
                          </div>
                          <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">Concluído</span>
                        </div>

                        <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-indigo-200 dark:border-indigo-500/40 flex items-center justify-between shadow-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                            <span className="text-[11px] text-slate-800 dark:text-white font-medium">Check-in Dia 15 com Líder</span>
                          </div>
                          <span className="text-[9px] text-amber-600 dark:text-amber-400 font-bold">Em 7 dias</span>
                        </div>

                        <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between opacity-80 shadow-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-[11px] text-slate-600 dark:text-slate-400">Avaliação de 30 Dias</span>
                          </div>
                          <span className="text-[9px] text-slate-500">Agendado</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-300 shadow-sm">
                        💬 Dúvida sobre transporte ou uniforme? Fale com seu padrinho no WhatsApp em 1 clique.
                      </div>
                    </>
                  )}

                  {activeScreen === 'perfil' && (
                    <>
                      <div className="p-3 rounded-2xl bg-cyan-100/70 dark:bg-cyan-500/20 border border-cyan-300 dark:border-cyan-500/30">
                        <p className="text-[10px] text-cyan-800 dark:text-cyan-300 font-bold uppercase tracking-wider">Privacidade & Direitos (LGPD)</p>
                        <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Seus dados protegidos por lei</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-[11px] shadow-sm">
                        <p className="text-slate-700 dark:text-slate-300"><strong>Dados Coletados:</strong> Bairro aproximado, turnos de preferência e certificações operacionais.</p>
                        <p className="text-slate-500 dark:text-slate-400">Nenhum dado desnecessário é solicitado ou compartilhado com terceiros.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-300 space-y-2 shadow-sm">
                        <p className="font-bold text-slate-900 dark:text-white">Direito de Revisão Humana (Art. 20):</p>
                        <p>Você pode solicitar que um recrutador humano revise a pontuação atribuída pela IA a qualquer momento.</p>
                        <button className="w-full py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-lg font-semibold transition-all">
                          Solicitar Revisão de Vaga
                        </button>
                      </div>
                    </>
                  )}

                </div>

                {/* Bottom App Navigation */}
                <div className="p-2.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex justify-around text-[10px]">
                  <span className={`transition-colors cursor-pointer ${activeScreen === 'vagas' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500 dark:text-slate-400 font-medium'}`} onClick={() => setActiveScreen('vagas')}>Oportunidades</span>
                  <span className={`transition-colors cursor-pointer ${activeScreen === 'onboarding' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400 font-medium'}`} onClick={() => setActiveScreen('onboarding')}>Onboarding</span>
                  <span className={`transition-colors cursor-pointer ${activeScreen === 'perfil' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-500 dark:text-slate-400 font-medium'}`} onClick={() => setActiveScreen('perfil')}>Privacidade</span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
