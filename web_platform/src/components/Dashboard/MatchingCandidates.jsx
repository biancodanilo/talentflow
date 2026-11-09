import React, { useState } from 'react';
import { candidatesData as initialCandidates } from '../../data/mockData';
import { Sparkles, MapPin, Clock, Phone, ShieldCheck, UserCheck, AlertTriangle, CheckCircle, Search, Filter, Eye } from 'lucide-react';

export default function MatchingCandidates({ onSelectCandidate }) {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [filterMatch, setFilterMatch] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = candidates.filter((cand) => {
    const matchesSearch = cand.name.toLowerCase().includes(search.toLowerCase()) ||
                          cand.appliedJob.toLowerCase().includes(search.toLowerCase()) ||
                          cand.location.toLowerCase().includes(search.toLowerCase());
    
    if (filterMatch === 'all') return matchesSearch;
    if (filterMatch === 'high') return matchesSearch && cand.overallMatch >= 90;
    if (filterMatch === 'risk') return matchesSearch && cand.overallMatch < 75;
    if (filterMatch === 'pendingReview') return matchesSearch && cand.humanReviewStatus.includes('Pendente');
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Motor de Matching Logístico & Prático</span>
          </div>
          <h2 className="text-2xl font-black text-white font-['Plus_Jakarta_Sans'] mt-0.5">
            Banco de Talentos & Compatibilidade de Vagas
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Ranqueamento baseado em variáveis reais: tempo de deslocamento em ônibus, escalas de interesse e estabilidade estimada.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Supervisão Humana LGPD Ativa</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por candidato, vaga ou bairro..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setFilterMatch('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filterMatch === 'all' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            Todos ({candidates.length})
          </button>
          <button
            onClick={() => setFilterMatch('high')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filterMatch === 'high' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            Match Alto (&gt; 90%)
          </button>
          <button
            onClick={() => setFilterMatch('pendingReview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filterMatch === 'pendingReview' ? 'bg-teal-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            Pendente Revisão Humana
          </button>
          <button
            onClick={() => setFilterMatch('risk')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filterMatch === 'risk' ? 'bg-red-500 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            Risco de Deslocamento
          </button>
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="space-y-4">
        {filtered.map((cand) => {
          const isHighMatch = cand.overallMatch >= 90;
          const isRisk = cand.overallMatch < 75;

          return (
            <div
              key={cand.id}
              className={`p-6 rounded-3xl bg-slate-900/90 border transition-all shadow-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-slate-700 ${
                isRisk ? 'border-red-500/30 bg-red-950/10' : 'border-slate-800'
              }`}
            >
              
              {/* Candidate Info */}
              <div className="flex items-start space-x-4 max-w-xl">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shrink-0 ${
                  isRisk ? 'bg-red-500/20 text-red-400' : 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950'
                }`}>
                  {cand.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
                      {cand.name}
                    </h3>
                    <span className="text-xs text-slate-400">({cand.age} anos)</span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded">
                      {cand.id}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-emerald-400">{cand.appliedJob}</p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 pt-1">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{cand.location}</span>
                    </span>

                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{cand.shiftPreference}</span>
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 pt-1">
                    <strong className="text-slate-300">Tempo de Trajeto:</strong> {cand.transportTime}
                  </p>
                </div>
              </div>

              {/* Match Score & Breakdown Pills */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full lg:w-auto justify-between lg:justify-end">
                
                <div className="text-center sm:text-right">
                  <div className="flex items-center sm:justify-end space-x-2">
                    <span className={`text-3xl font-black font-['Plus_Jakarta_Sans'] ${
                      isHighMatch ? 'text-emerald-400' : isRisk ? 'text-red-400' : 'text-amber-400'
                    }`}>
                      {cand.overallMatch}%
                    </span>
                    <span className="text-xs text-slate-400 font-semibold block text-left">
                      Índice de<br />Compatibilidade
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1.5 justify-start sm:justify-end text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      Rota: {cand.matchBreakdown.logistics}%
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      Escala: {cand.matchBreakdown.shiftCompatibility}%
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      Retenção: {cand.matchBreakdown.retentionProbability}%
                    </span>
                  </div>

                  <div className="mt-2 text-[11px]">
                    <span className={`font-semibold ${
                      cand.humanReviewStatus.includes('Validado') || cand.humanReviewStatus.includes('Aprovado')
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}>
                      {cand.humanReviewStatus}
                    </span>
                  </div>
                </div>

                {/* Botão Ver Detalhes & Revisão Humana */}
                <button
                  onClick={() => onSelectCandidate(cand)}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 shrink-0 border border-slate-700 hover:border-emerald-500/50"
                >
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>Ver Detalhes & Decisão LGPD</span>
                </button>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
