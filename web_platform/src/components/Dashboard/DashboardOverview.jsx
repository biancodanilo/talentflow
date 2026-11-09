import React from 'react';
import { platformStats, jobsData, candidatesData, onboardingCohorts } from '../../data/mockData';
import { Timer, DollarSign, Users, ShieldAlert, ArrowDownRight, ArrowUpRight, AlertTriangle, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';

export default function DashboardOverview({ setActiveTab, onSelectCandidate }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Painel Executivo • Operações & RH</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1 font-['Plus_Jakarta_Sans']">
            Visão Geral de Recrutamento & Retenção
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Monitorando 4 programas de talentos ativos em Jaú, Barra Bonita e Bariri.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('matching')}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all shrink-0"
        >
          Ver 38 Candidatos em Matching
        </button>
      </div>

      {/* 4 KPIs de ROI em Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Tempo Médio (Time-to-Hire)</span>
            <Timer className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white">{platformStats.timeToHire.current}</span>
            <span className="text-xs text-emerald-400 font-bold">{platformStats.timeToHire.reduction}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{platformStats.timeToHire.trend}</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Custo por Admissão (CAC)</span>
            <DollarSign className="w-4 h-4 text-teal-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white">{platformStats.costPerHire.current}</span>
            <span className="text-xs text-emerald-400 font-bold">{platformStats.costPerHire.reduction}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{platformStats.costPerHire.savings}</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Conversão no WhatsApp</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white">{platformStats.conversionRate.current}</span>
            <span className="text-xs text-cyan-400 font-bold">{platformStats.conversionRate.growth}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{platformStats.conversionRate.dropoff}</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Retenção após 90 Dias</span>
            <ShieldAlert className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white">{platformStats.retention90Days.current}</span>
            <span className="text-xs text-indigo-400 font-bold">{platformStats.retention90Days.growth}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{platformStats.retention90Days.avoidedLosses}</p>
        </div>

      </div>

      {/* Grid: Funil Operacional & Alertas Preditivos de Turnover */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Funil Visual */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
                Funil de Atração & Conversão Operacional
              </h3>
              <p className="text-xs text-slate-400">Eficiência de ponta a ponta sem formulários longos</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
              Zero Drop-off
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">1. Inscritos via QR Code / WhatsApp Oficial</span>
                <span className="font-bold text-white">380 candidatos (100%)</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">2. Triados pelo Bot (Turno, Escala & Bairro)</span>
                <span className="font-bold text-emerald-400">368 respostas (96.8% conclusão)</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full w-[96.8%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">3. Match Logístico Qualificado (Raio &lt; 20km)</span>
                <span className="font-bold text-cyan-400">114 qualificados (31% fit alto)</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full w-[31%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">4. Contratados & Integrados</span>
                <span className="font-bold text-indigo-400">46 contratados (100% das vagas)</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full w-[12.1%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">5. Retidos após o 90º dia de experiência</span>
                <span className="font-bold text-teal-300">42 estáveis (89.4% retenção)</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-teal-400 rounded-full w-[11%]" />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Reaproveitamento de banco de talentos ativo:</span>
            <strong className="text-emerald-400 font-bold">68 candidatos pré-qualificados guardados</strong>
          </div>
        </div>

        {/* Alertas Preditivos de Turnover & Casos Críticos */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 mb-1">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
                Radar de Risco & Intervenções
              </h3>
            </div>
            <p className="text-xs text-slate-400">Alertas identificados pelo Guardião dos 90 Dias</p>

            <div className="space-y-3 mt-4">
              
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/40 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300">Alerta de Trajeto (Dia 22)</span>
                  <span className="text-[10px] text-slate-500">CD Jaú</span>
                </div>
                <p className="text-slate-300">
                  Colaborador <strong>Leandro Souza</strong> relatou atraso recorrente na linha de circular das 18h no WhatsApp.
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400 font-semibold">✓ Ação: Rota alternativa ajustada</span>
                  <span className="text-[10px] text-slate-400">Turnover evitado</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300">Revisão Humana Solicitada (LGPD)</span>
                  <span className="text-[10px] text-slate-500">Bariri</span>
                </div>
                <p className="text-slate-300">
                  Candidato <strong>Marcos Vinicius</strong> solicitou revisão do match de distância.
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Pendente parecer</span>
                  <button
                    onClick={() => {
                      setActiveTab('matching');
                      onSelectCandidate(candidatesData[3]);
                    }}
                    className="text-[10px] text-emerald-400 font-bold hover:underline"
                  >
                    Analisar Agora →
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400">Celebração de 90 Dias</span>
                  <span className="text-[10px] text-slate-500">MaxVarejo</span>
                </div>
                <p className="text-slate-300">
                  Turma de Agosto completou os 90 dias com <strong>94.4% de efetivação</strong> estável.
                </p>
              </div>

            </div>
          </div>

          <button
            onClick={() => setActiveTab('retention')}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 transition-all mt-4"
          >
            <span>Ver Acompanhamento de Todas as Turmas</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Lista Rápida de Vagas Ativas */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
              Vagas Operacionais em Andamento
            </h3>
            <p className="text-xs text-slate-400">Acompanhamento de preenchimento e prazos</p>
          </div>
          <button
            onClick={() => setActiveTab('jobs')}
            className="text-xs text-emerald-400 hover:underline font-bold"
          >
            Gerenciar Todas as Vagas →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {jobsData.map((job) => (
            <div key={job.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {job.status}
                </span>
                <span className="text-[10px] text-slate-500">{job.location.split(' - ')[0]}</span>
              </div>
              <h4 className="text-xs font-bold text-white line-clamp-1">{job.title}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{job.shift.split(' (')[0]}</p>
              
              <div className="mt-3 pt-3 border-t border-slate-850 flex justify-between text-[11px]">
                <span className="text-slate-400">Preenchimento:</span>
                <span className="font-bold text-white">{job.hiredCount} / {job.openings} vagas</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
