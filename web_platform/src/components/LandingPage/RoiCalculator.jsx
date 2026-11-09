import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, DollarSign, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export default function RoiCalculator({ onGoToRh, onGoToAdmin, onGoToDashboard }) {
  const handleRhClick = onGoToRh || onGoToAdmin || onGoToDashboard;
  const [hiresPerMonth, setHiresPerMonth] = useState(35);
  const [turnoverCost, setTurnoverCost] = useState(3800); // R$ por perda precoce
  const [currentTurnoverRate, setCurrentTurnoverRate] = useState(48); // %

  // Cálculos de ROI
  const annualHires = hiresPerMonth * 12;
  const currentAnnualEarlyLosses = Math.round(annualHires * (currentTurnoverRate / 100));
  
  // Com a TalentFlow a taxa de perda nos 90 dias cai para cerca de 10.6% (89.4% retenção)
  const talentFlowLosses = Math.round(annualHires * 0.106);
  const avoidedEarlyLosses = currentAnnualEarlyLosses - talentFlowLosses;
  
  // Economia direta em turnover precoce (exames, EPIs, treinamento inicial perdido)
  const turnoverSavings = avoidedEarlyLosses * turnoverCost;

  // Economia direta no CAC de recrutamento (R$ 1.950 tradicional vs R$ 380 TalentFlow = R$ 1.570 por contratação)
  const cacSavings = annualHires * 1570;

  // Economia Total Anual
  const totalAnnualSavings = turnoverSavings + cacSavings;

  return (
    <section id="roi-calculator" className="py-20 bg-slate-900/80 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulador Financeiro de ROI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
            Quanto sua operação economiza eliminando o turnover precoce?
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Ajuste os parâmetros da sua empresa e veja o impacto financeiro imediato da TalentFlow na última linha do balanço.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders de Entrada */}
          <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
            
            {/* Slider 1: Contratações / Mês */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Contratações Operacionais por Mês</span>
                </label>
                <span className="text-lg font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                  {hiresPerMonth} vagas/mês
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                step="5"
                value={hiresPerMonth}
                onChange={(e) => setHiresPerMonth(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>5 (Pequena Operação)</span>
                <span>100 (Médio Porte)</span>
                <span>250+ (Grande CD / Fábrica)</span>
              </div>
            </div>

            {/* Slider 2: Custo por Turnover Precoce */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-teal-400" />
                  <span>Custo Médio de Perda Precoce por Colaborador</span>
                </label>
                <span className="text-lg font-black text-teal-400 bg-teal-500/10 px-3 py-1 rounded-xl border border-teal-500/20">
                  R$ {turnoverCost.toLocaleString('pt-BR')}
                </span>
              </div>
              <input
                type="range"
                min="1500"
                max="8000"
                step="200"
                value={turnoverCost}
                onChange={(e) => setTurnoverCost(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Inclui: exame admissional/demissional, kit EPI, tempo de treinamento perdido, ociosidade do posto e rescisão contratual.
              </p>
            </div>

            {/* Slider 3: Taxa Atual de Turnover nos 90 Dias */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                  <span>Sua Taxa Atual de Evasão nos Primeiros 90 Dias</span>
                </label>
                <span className="text-lg font-black text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-500/20">
                  {currentTurnoverRate}%
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="75"
                step="1"
                value={currentTurnoverRate}
                onChange={(e) => setCurrentTurnoverRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Média nacional do setor logístico e varejista varia entre 45% e 55% de abandono antes do 90º dia.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <span className="text-slate-400">Total de contratações anuais calculadas:</span>
              <strong className="text-white text-sm">{annualHires} colaboradores/ano</strong>
            </div>

          </div>

          {/* Resultado Financeiro */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-emerald-500/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Retorno Estimado Garantido</span>
            </div>

            <p className="text-xs text-slate-400">Economia Anual Total Projetada:</p>
            <div className="text-4xl sm:text-5xl font-black text-white mt-1 mb-6 font-['Plus_Jakarta_Sans'] tracking-tight">
              R$ {totalAnnualSavings.toLocaleString('pt-BR')}
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Rescisões precoces evitadas:</span>
                <span className="font-bold text-emerald-400 text-sm">
                  {avoidedEarlyLosses} colaboradores/ano
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Economia em perdas de experiência:</span>
                <span className="font-bold text-white">
                  R$ {turnoverSavings.toLocaleString('pt-BR')}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Economia direta em CAC de recrutamento:</span>
                <span className="font-bold text-white">
                  R$ {cacSavings.toLocaleString('pt-BR')}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Nova taxa estimada de retenção:</span>
                <span className="font-extrabold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  89.4% retidos no 90º dia
                </span>
              </div>
            </div>

            <button
              onClick={handleRhClick}
              className="mt-8 w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>Acessar Área do RH (/rh)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              Simulação baseada nos indicadores do Plano Executivo de Viabilidade e ROI.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
