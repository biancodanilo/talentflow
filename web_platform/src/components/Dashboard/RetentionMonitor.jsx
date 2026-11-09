import React, { useState } from 'react';
import { onboardingCohorts as initialCohorts } from '../../data/mockData';
import { Clock, ShieldCheck, AlertTriangle, CheckCircle2, Users, Calendar, Award, HeartPulse, Sparkles } from 'lucide-react';

export default function RetentionMonitor() {
  const [cohorts, setCohorts] = useState(initialCohorts);
  const [selectedCohort, setSelectedCohort] = useState(cohorts[0]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Clock className="w-4 h-4" />
          <span>Mitigação do Turnover Precoce (Principal Gargalo Financeiro)</span>
        </div>
        <h2 className="text-2xl font-black text-white font-['Plus_Jakarta_Sans'] mt-0.5">
          Guardião dos Primeiros 90 Dias & Onboarding
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Acompanhamento ativo da adaptação dos colaboradores recém-contratados do Dia 1 ao Dia 90, preservando o investimento do empregador.
        </p>
      </div>

      {/* Cohort Selector Pills */}
      <div className="flex flex-wrap gap-3">
        {cohorts.map((cohort) => (
          <button
            key={cohort.id}
            onClick={() => setSelectedCohort(cohort)}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center space-x-3 ${
              selectedCohort.id === cohort.id
                ? 'bg-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className={`p-2.5 rounded-xl ${selectedCohort.id === cohort.id ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400'}`}>
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">{cohort.name}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {cohort.totalEmployees} colaboradores • Retenção: <strong className="text-emerald-400">{cohort.retentionRate}</strong>
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Main Selected Cohort View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: 90 Days Milestones Timeline */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
                Retrospectiva & Adaptação nos 90 Dias
              </h3>
              <p className="text-xs text-slate-400">{selectedCohort.name} • {selectedCohort.status}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {selectedCohort.retentionRate} RETIDOS
            </span>
          </div>

          <div className="space-y-4">
            {selectedCohort.checkpoints.map((cp, idx) => {
              const isCompleted = cp.status.includes('OK');
              const isProgress = cp.status.includes('andamento');

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                    isCompleted
                      ? 'bg-slate-950 border-emerald-500/30'
                      : isProgress
                      ? 'bg-slate-950 border-indigo-500/50'
                      : 'bg-slate-950/60 border-slate-850 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isCompleted ? 'bg-emerald-500/20 text-emerald-400' : isProgress ? 'bg-indigo-500/20 text-indigo-400 animate-pulse' : 'bg-slate-800 text-slate-500'
                    }`}>
                      D{cp.day}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white">{cp.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {cp.completed} de {cp.total} colaboradores responderam via WhatsApp
                      </p>
                    </div>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    isCompleted
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : isProgress
                      ? 'bg-indigo-500/10 text-indigo-400'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {cp.status}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span className="text-slate-400">Total de custos rescisórios evitados nesta turma:</span>
            <strong className="text-emerald-400 text-sm font-bold">R$ 57.000,00 preservados</strong>
          </div>
        </div>

        {/* Right: Early Warning Alerts & Interventions */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center space-x-2">
              <HeartPulse className="w-4 h-4 text-emerald-400" />
              <span>Intervenções Preventivas</span>
            </h3>

            <p className="text-xs text-slate-400">
              Quando a IA detecta descontentamento ou atrito com escala nas micro-pesquisas, um alerta imediato é emitido para o RH.
            </p>

            {selectedCohort.alerts.length > 0 ? (
              <div className="space-y-3">
                {selectedCohort.alerts.map((alert, aIdx) => (
                  <div key={aIdx} className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300">{alert.employee} (Dia {alert.day})</span>
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Resolvido
                      </span>
                    </div>

                    <p className="text-slate-300">{alert.issue}</p>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-emerald-400">
                      <strong>Ação do RH:</strong> {alert.actionTaken}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="font-bold text-white">Nenhum alerta crítico ativo</p>
                <p className="text-[11px]">Todos os colaboradores com adaptação acima de 90%.</p>
              </div>
            )}
          </div>

          {/* Retention Impact Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/30 text-xs space-y-3">
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">
              Diferencial da Plataforma
            </span>
            <h4 className="text-sm font-bold text-white">
              Por que os 90 Dias são Decisivos?
            </h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              O período de experiência contratual concentra 80% das perdas com exames admissionais, demissionais, fardamentos e postos ociosos. Ao agir antes do pedido de demissão, o ROI da contratação é blindado.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
