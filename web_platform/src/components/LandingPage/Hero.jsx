import React, { useState } from 'react';
import { ArrowRight, Sparkles, MessageSquare, Compass, Shield, CheckCircle2, Clock, TrendingUp, Building2, MapPin, Users, Activity, Navigation, Radio, Check } from 'lucide-react';

export default function Hero({ onOpenRoiCalculator, onGoToRh }) {
  const [activeNode, setActiveNode] = useState('jau'); // 'jau' | 'barra' | 'bariri'

  const nodes = {
    jau: {
      city: "Jaú - SP",
      label: "Distrito Industrial & Centro Logístico",
      candidates: 142,
      activeJobs: 18,
      avgCommute: "18 min",
      topCandidate: {
        name: "Rodrigo Almeida",
        role: "Op. Logístico 12x36",
        score: "96%",
        match: "Linha Circular Direta (4.5 km)"
      }
    },
    barra: {
      city: "Barra Bonita - SP",
      label: "Polo Agroindustrial & Armazéns",
      candidates: 89,
      activeJobs: 11,
      avgCommute: "15 min",
      topCandidate: {
        name: "Juliana Ferreira",
        role: "Op. Empilhadeira NR-11",
        score: "94%",
        match: "Deslocamento de 3.2 km"
      }
    },
    bariri: {
      city: "Bariri - SP",
      label: "Corredor Rodoviário & Varejo",
      candidates: 64,
      activeJobs: 7,
      avgCommute: "12 min",
      topCandidate: {
        name: "Cleiton Barbosa",
        role: "Auxiliar de Carga 6x1",
        score: "91%",
        match: "Rota Central sem baldeação"
      }
    }
  };

  const currentNode = nodes[activeNode];

  return (
    <section className="relative pt-10 pb-20 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Company & Product Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6 shadow-sm backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>TalentFlow Systems • RH Tech Direcionada à Força Operacional e Logística</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] font-['Plus_Jakarta_Sans']">
          Contrate em até <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">72 Horas</span> e Estanque o <span className="underline decoration-emerald-500 decoration-wavy decoration-2">Turnover Precoce</span>.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Substituímos formulários longos e agências analógicas por <strong className="text-white font-bold">triagem rápida no WhatsApp</strong>, <strong className="text-white font-bold">matching por logística de deslocamento</strong> e <strong className="text-white font-bold">Guardião de Retenção dos Primeiros 90 Dias</strong>.
        </p>

        {/* Action CTAs (Admin button removed - accessible only by URL /admin) */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenRoiCalculator}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2.5"
          >
            <TrendingUp className="w-4 h-4 text-slate-950" />
            <span>Simular Economia de ROI</span>
          </button>

          <button
            onClick={onGoToRh}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl border border-slate-700/80 transition-all flex items-center justify-center space-x-2.5 hover:border-emerald-500/60 shadow-lg"
            title="Acesso ao Portal Operacional do RH"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Área do RH (/rh)</span>
          </button>
        </div>

        {/* MODERN HIGH-TECH VISUAL CENTERPIECE: Live Logistics & Matching Radar Console */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          <div className="rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-b from-[#09111e] via-[#060b14] to-[#040810] shadow-2xl p-6 sm:p-8 text-left relative overflow-hidden preserve-dark">
            
            {/* Ambient radar glow background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Radar Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-extrabold text-white font-['Plus_Jakarta_Sans']">
                      Radar de Matching Logístico & Disponibilidade
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Ao Vivo
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Telemetria de candidatos e rotas em tempo real nos polos regionais
                  </p>
                </div>
              </div>

              {/* Node selector buttons: Jaú, Barra Bonita, Bariri */}
              <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-2xl border border-slate-800 self-start sm:self-auto">
                {Object.keys(nodes).map((key) => {
                  const node = nodes[key];
                  const isActive = activeNode === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveNode(key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      {node.city.split(' - ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Radar Grid: Live Status & Telemetry */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
              
              {/* Left Column: Active Node Info & Metrics */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-semibold">Polo Selecionado:</span>
                    <span className="text-emerald-400 font-bold flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{currentNode.city}</span>
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-white">{currentNode.label}</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Candidatos</p>
                    <p className="text-lg font-black text-white mt-0.5">{currentNode.candidates}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Vagas Abertas</p>
                    <p className="text-lg font-black text-emerald-400 mt-0.5">{currentNode.activeJobs}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Deslocamento</p>
                    <p className="text-lg font-black text-teal-300 mt-0.5">{currentNode.avgCommute}</p>
                  </div>
                </div>

                {/* Candidate Spotlight Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Top Match Logístico</span>
                    <span className="text-xs font-black text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md">
                      {currentNode.topCandidate.score} Compatibilidade
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white">{currentNode.topCandidate.name}</p>
                  <p className="text-xs text-slate-300">{currentNode.topCandidate.role}</p>
                  <p className="text-[11px] text-emerald-300/90 mt-1 flex items-center space-x-1">
                    <Navigation className="w-3 h-3 shrink-0" />
                    <span>{currentNode.topCandidate.match}</span>
                  </p>
                </div>
              </div>

              {/* Right Column: Visual Radar Terminal */}
              <div className="lg:col-span-7 bg-[#050b12] p-5 rounded-2xl border border-slate-800/80 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-[11px]">
                  <span className="text-slate-400 font-mono flex items-center space-x-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span>LOGISTICS_ENGINE :: ONLINE</span>
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">LATÊNCIA &lt; 14ms</span>
                </div>

                {/* Visual Route Matching representation */}
                <div className="py-4 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-slate-200">Triagem WhatsApp</span>
                    </div>
                    <span className="text-emerald-400 font-bold text-[11px]">Média de resposta: 2min 40s</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span className="text-slate-200">Linha de Ônibus & Baldeação</span>
                    </div>
                    <span className="text-cyan-300 font-bold text-[11px]">Zero risco de atraso turno 06h</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-400" />
                      <span className="text-slate-200">Guardião 90 Dias</span>
                    </div>
                    <span className="text-indigo-300 font-bold text-[11px]">Check-ins dias 1, 15, 30, 60, 90</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Conexão direta com MariaDB & Flutter Mobile</span>
                  <span className="text-emerald-400 font-bold">89.4% Retenção Garantida</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
