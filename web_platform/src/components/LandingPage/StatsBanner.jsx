import React from 'react';
import { platformStats } from '../../data/mockData';
import { Timer, DollarSign, Users, ShieldAlert, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function StatsBanner() {
  return (
    <section className="py-12 bg-slate-900/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
            Resultados Comprovados no Chão de Fábrica, Logística e Lojas
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Impacto Mensurável nos 4 Indicadores Chave de ROI
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* KPI 1: Time to hire */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-lg hover:shadow-emerald-500/10 group">
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Timer className="w-5 h-5" />
              </span>
              <span className="inline-flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                {platformStats.timeToHire.reduction}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Tempo Médio de Contratação</p>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-3xl font-black text-white">{platformStats.timeToHire.current}</span>
              <span className="text-xs text-slate-500 line-through">antes: {platformStats.timeToHire.traditional}</span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Vagas fechadas antes do turno parar ou a linha atrasar.
            </p>
          </div>

          {/* KPI 2: Cost per hire */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-lg hover:shadow-emerald-500/10 group">
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
                <DollarSign className="w-5 h-5" />
              </span>
              <span className="inline-flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                {platformStats.costPerHire.reduction}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Custo por Contratação (CAC)</p>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-3xl font-black text-white">{platformStats.costPerHire.current}</span>
              <span className="text-xs text-slate-500 line-through">antes: {platformStats.costPerHire.traditional}</span>
            </div>
            <p className="mt-2 text-[11px] text-emerald-400 font-medium">
              {platformStats.costPerHire.savings}
            </p>
          </div>

          {/* KPI 3: Conversion Rate */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-lg hover:shadow-emerald-500/10 group">
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Users className="w-5 h-5" />
              </span>
              <span className="inline-flex items-center text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                {platformStats.conversionRate.growth}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Taxa de Conversão & Adesão</p>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-3xl font-black text-white">{platformStats.conversionRate.current}</span>
              <span className="text-xs text-slate-500 line-through">antes: {platformStats.conversionRate.traditional}</span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              {platformStats.conversionRate.dropoff}
            </p>
          </div>

          {/* KPI 4: 90 Days Retention */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-lg hover:shadow-emerald-500/10 group">
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <span className="inline-flex items-center text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                {platformStats.retention90Days.growth}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Retenção após 90 Dias</p>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-3xl font-black text-white">{platformStats.retention90Days.current}</span>
              <span className="text-xs text-slate-500 line-through">média: {platformStats.retention90Days.traditional}</span>
            </div>
            <p className="mt-2 text-[11px] text-emerald-400 font-medium">
              {platformStats.retention90Days.avoidedLosses}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
