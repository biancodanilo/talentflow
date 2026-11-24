import React from 'react';
import { XCircle, CheckCircle2, AlertTriangle, Zap, MapPin, MessageSquare, Award, Clock } from 'lucide-react';

export default function ProblemSolution() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
          O Paradigma Antigo vs A Nova Solução
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 font-['Plus_Jakarta_Sans']">
          Por que soluções corporativas tradicionais falham em vagas operacionais?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base">
          Tratar vagas de alto volume e chão de fábrica com a mesma régua de vagas de escritório corporativo gera <strong className="text-red-600 dark:text-red-400">evasão em massa</strong> e um <strong className="text-red-600 dark:text-red-400">turnover precoce devastador</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Card: O Modo Tradicional (Dores) - Contraste perfeito no Claro e Escuro */}
        <div className="p-8 rounded-3xl bg-red-50/40 dark:bg-slate-950 border-2 border-red-200 dark:border-red-500/30 relative overflow-hidden flex flex-col justify-between shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 rounded-xl bg-red-500/20 text-red-600 dark:text-red-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Modelo Tradicional</h3>
                <p className="text-xs text-red-600 dark:text-red-400 font-semibold">Gupy, LinkedIn & Agências Físicas</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-slate-950 dark:text-white font-extrabold">Drop-off de 82% no Cadastro:</strong>
                  <p className="text-xs text-slate-800 dark:text-slate-200 mt-0.5 leading-relaxed font-medium">
                    Formulários de 40 minutos, testes teóricos de raciocínio abstrato incompatíveis com o perfil operacional.
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-slate-950 dark:text-white font-extrabold">Comissões Inflacionadas de Agências:</strong>
                  <p className="text-xs text-slate-800 dark:text-slate-200 mt-0.5 leading-relaxed font-medium">
                    Custos de até 1 salário por admissão cobrados por agências analógicas para triagens manuais lentas.
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-slate-950 dark:text-white font-extrabold">Ignora a Realidade Logística:</strong>
                  <p className="text-xs text-slate-800 dark:text-slate-200 mt-0.5 leading-relaxed font-medium">
                    Contrata quem mora a 2h de distância ou depende de 3 conduções para chegar no turno das 06h. O abandono é certo.
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-slate-950 dark:text-white font-extrabold">Abandono após a Assinatura:</strong>
                  <p className="text-xs text-slate-800 dark:text-slate-200 mt-0.5 leading-relaxed font-medium">
                    Nenhum acompanhamento nos primeiros 90 dias. A empresa gasta com exames e EPIs, e o colaborador desiste na 3ª semana.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-red-200 dark:border-red-500/20 text-center">
            <span className="text-xs font-bold text-red-600 dark:text-red-300 bg-red-100/60 dark:bg-transparent py-2 px-3 rounded-xl inline-block">
              Resultado: Turnover de 48% antes de completar a experiência de 90 dias.
            </span>
          </div>
        </div>

        {/* Card: A Solução TalentFlow */}
        <div className="p-8 rounded-3xl bg-emerald-50/40 dark:bg-gradient-to-b dark:from-[#061e14] dark:via-[#081b24] dark:to-[#040810] border-2 border-emerald-500/40 dark:border-emerald-500/50 relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-emerald-500/10">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Plataforma TalentFlow</h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">RH Tech Direcionada à Força Operacional</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-slate-900 dark:text-white font-bold">Triagem WhatsApp sem Atrito:</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-200 mt-0.5 leading-relaxed">
                    Candidato responde 3 perguntas rápidas pelo WhatsApp em 2 minutos. Evasão menor que 3%.
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-slate-900 dark:text-white font-bold">Matching Logístico Cirúrgico:</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-200 mt-0.5 leading-relaxed">
                    Cruza tempo real de deslocamento, linhas de ônibus, tolerância a escalas (12x36, 6x1) e habilidades práticas de execução.
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-slate-900 dark:text-white font-bold">Reaproveitamento Dinâmico do Banco:</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-200 mt-0.5 leading-relaxed">
                    Candidatos pré-qualificados são reativados automaticamente para novas vagas na região sem custos com novos anúncios.
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-slate-900 dark:text-white font-bold">Guardião dos Primeiros 90 Dias:</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-200 mt-0.5 leading-relaxed">
                    Check-ins inteligentes nos dias 1, 15, 30, 60 e 90 que identificam riscos de insatisfação precocemente e preservam o investimento.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-emerald-200 dark:border-emerald-500/30 text-center">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-transparent py-2 px-3 rounded-xl inline-block">
              Resultado: 89.4% de retenção na experiência e -80% no custo por contratação.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
