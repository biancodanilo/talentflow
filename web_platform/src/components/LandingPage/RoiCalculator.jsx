import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, DollarSign, Users, ShieldCheck, ArrowRight, CheckCircle2, Zap, BarChart3, Clock, HelpCircle } from 'lucide-react';

export default function RoiCalculator({ onGoToRh, onGoToAdmin, onGoToDashboard }) {
  const handleRhClick = onGoToRh || onGoToAdmin || onGoToDashboard;
  
  // Parâmetros Interativos
  const [hiresPerMonth, setHiresPerMonth] = useState(35);
  const [turnoverCost, setTurnoverCost] = useState(3800); // R$ por perda precoce
  const [currentTurnoverRate, setCurrentTurnoverRate] = useState(48); // % evasão 90 dias
  const [averageSalary, setAverageSalary] = useState(2150); // R$ salário base

  // Cálculos de ROI
  const annualHires = hiresPerMonth * 12;
  const currentAnnualEarlyLosses = Math.round(annualHires * (currentTurnoverRate / 100));
  
  // Com a TalentFlow a taxa de perda nos 90 dias cai para 10.6% (89.4% retenção)
  const talentFlowLosses = Math.round(annualHires * 0.106);
  const avoidedEarlyLosses = Math.max(0, currentAnnualEarlyLosses - talentFlowLosses);
  
  // Economia direta em turnover precoce (exames, EPIs, treinamento inicial perdido)
  const turnoverSavings = avoidedEarlyLosses * turnoverCost;

  // Economia direta no CAC de recrutamento (R$ 1.950 tradicional vs R$ 380 TalentFlow = R$ 1.570 por vaga)
  const cacSavings = annualHires * 1570;

  // Economia em horas do time de RH (estimado 14h economizadas por vaga x R$ 35/h)
  const rhHoursSavings = annualHires * 14 * 35;

  // Economia Total Anual
  const totalAnnualSavings = turnoverSavings + cacSavings + rhHoursSavings;

  // Custo estimado da plataforma TalentFlow
  const estimatedCost = Math.round(annualHires * 140);
  const calculatedRoi = Math.round(((totalAnnualSavings - estimatedCost) / Math.max(1, estimatedCost)) * 100);
  const paybackDays = Math.max(7, Math.round((estimatedCost / (totalAnnualSavings / 365))));

  return (
    <section id="roi-calculator" className="py-20 bg-slate-900/90 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulador Financeiro de Viabilidade & ROI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
            Quanto sua operação economiza eliminando o turnover precoce?
          </h2>
          <p className="text-slate-300 mt-2 text-sm sm:text-base">
            Simule os indicadores da sua empresa e comprove como a triagem precisa e o <strong className="text-emerald-400 font-semibold">Guardião dos 90 Dias</strong> convertem prejuízo em lucro operacional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Sliders de Entrada */}
          <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between space-y-8 preserve-dark">
            
            {/* Slider 1: Contratações / Mês */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Contratações Operacionais por Mês</span>
                </label>
                <span className="text-lg font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30">
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
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>5 (Pequeno Centro)</span>
                <span>100 (Médio Porte)</span>
                <span>250+ (Grande CD / Fábrica)</span>
              </div>
            </div>

            {/* Slider 2: Custo por Turnover Precoce */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-teal-400" />
                  <span>Custo Médio de Evasão nos 90 Dias (por pessoa)</span>
                </label>
                <span className="text-lg font-black text-teal-300 bg-teal-500/10 px-3 py-1 rounded-xl border border-teal-500/30">
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
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Considera exames admissionais/demissionais, kits de EPIs, treinamento inicial e ociosidade de maquinário.
              </p>
            </div>

            {/* Slider 3: Taxa Atual de Turnover nos 90 Dias */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                  <span>Sua Taxa Atual de Evasão nos Primeiros 90 Dias</span>
                </label>
                <span className="text-lg font-black text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-500/30">
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
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                A média do setor logístico e varejista na região varia de 45% a 55% de abandono antes do 90º dia.
              </p>
            </div>

            {/* Indicadores complementares em grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <p className="text-[11px] text-slate-400">Total Anual de Vagas</p>
                <p className="text-base font-bold text-white mt-0.5">{annualHires} contratações/ano</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <p className="text-[11px] text-slate-400">Retorno Estimado (ROI)</p>
                <p className="text-base font-bold text-emerald-400 mt-0.5">+{calculatedRoi}% sobre investimento</p>
              </div>
            </div>

          </div>

          {/* Resultado Financeiro Destacado com Contraste Perfeito */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#061e14] via-[#091823] to-[#040810] p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/60 shadow-2xl relative overflow-hidden flex flex-col justify-between preserve-dark">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Retorno Estimado Garantido</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Payback: {paybackDays} dias
                </span>
              </div>

              <p className="text-xs font-semibold text-slate-300">Economia Anual Total Projetada:</p>
              
              {/* Grande Valor Financeiro em Emerald Brilhante com contraste total */}
              <div className="text-4xl sm:text-5xl font-black text-emerald-300 drop-shadow-[0_2px_12px_rgba(16,185,129,0.4)] mt-2 mb-6 font-['Plus_Jakarta_Sans'] tracking-tight">
                R$ {totalAnnualSavings.toLocaleString('pt-BR')}
              </div>

              <div className="space-y-3.5 pt-4 border-t border-slate-800/80">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-200">Rescisões precoces evitadas:</span>
                  <span className="font-extrabold text-emerald-400 text-sm">
                    {avoidedEarlyLosses} colaboradores/ano
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-200">Economia em perdas de experiência:</span>
                  <span className="font-bold text-white text-xs">
                    R$ {turnoverSavings.toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-200">Economia direta em CAC de contratação:</span>
                  <span className="font-bold text-white text-xs">
                    R$ {cacSavings.toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-200">Produtividade de horas do RH:</span>
                  <span className="font-bold text-white text-xs">
                    R$ {rhHoursSavings.toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-slate-200 font-semibold">Nova taxa estimada de retenção:</span>
                  <span className="font-black text-emerald-300 bg-emerald-500/25 border border-emerald-400/40 px-3 py-1 rounded-full text-xs">
                    89.4% retidos no 90º dia
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleRhClick}
                className="w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Acessar Área do RH (/rh)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-2.5">
                Simulação baseada no Plano Executivo de Viabilidade e Redução de Custos TalentFlow.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
