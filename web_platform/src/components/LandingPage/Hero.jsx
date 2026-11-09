import React from 'react';
import { ArrowRight, Sparkles, MessageSquare, Compass, Shield, CheckCircle, Clock, TrendingUp, Lock, Building2, MapPin, Users } from 'lucide-react';

export default function Hero({ onOpenRoiCalculator, onGoToRh, onGoToAdmin }) {
  const handleRhClick = onGoToRh || onGoToAdmin;

  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Company & Product Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6 shadow-sm backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>TalentFlow Systems • RH Tech para Mão de Obra Operacional e de Alto Volume</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] font-['Plus_Jakarta_Sans']">
          Contrate em até <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">72 Horas</span> e Estanque o <span className="underline decoration-emerald-500 decoration-wavy decoration-2">Turnover Precoce</span>.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Chega de cadastros intermináveis, plataformas genéricas e custos inflacionados de agências. 
          Unimos <strong className="text-white">triagem rápida via WhatsApp</strong>, <strong className="text-white">matching por logística de escala/proximidade</strong> e <strong className="text-white">acompanhamento ativo dos primeiros 90 dias</strong>.
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={onOpenRoiCalculator}
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-2xl shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
          >
            <TrendingUp className="w-4 h-4 text-slate-950" />
            <span>Simular Economia de ROI</span>
          </button>

          <button
            onClick={handleRhClick}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-2xl border border-slate-700/80 transition-all flex items-center justify-center space-x-2 hover:border-emerald-500/50 shadow-lg"
            title="Acesso ao Portal Operacional do RH"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Área do RH (/rh)</span>
          </button>

          {onGoToAdmin && (
            <button
              onClick={onGoToAdmin}
              className="w-full sm:w-auto px-6 py-3.5 bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 hover:text-white font-bold text-xs sm:text-sm rounded-2xl border border-purple-800/80 transition-all flex items-center justify-center space-x-2 hover:border-purple-500 shadow-lg"
              title="Acesso ao Console Master de Administração"
            >
              <Shield className="w-4 h-4 text-purple-400" />
              <span>Painel Admin (/admin)</span>
            </button>
          )}
        </div>

        {/* Modern Visual Centerpiece: Real Logistics Hub & Floating UI Badges */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative group bg-slate-950">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
              alt="Centro de Distribuição Inteligente com TalentFlow"
              className="w-full h-[360px] sm:h-[440px] object-cover object-center brightness-90 group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

            {/* Floating UI Pill 1: Top Left */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 p-3 sm:p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-xl flex items-center space-x-3 text-left">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Polos Atendidos</p>
                <p className="text-xs sm:text-sm font-bold text-white">Jaú • Barra Bonita • Bariri</p>
              </div>
            </div>

            {/* Floating UI Pill 2: Bottom Right */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 p-3 sm:p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-xl flex items-center space-x-3 text-left">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Retenção de 90 Dias</p>
                <p className="text-xs sm:text-sm font-bold text-cyan-400">89.4% (vs. 52% tradicional)</p>
              </div>
            </div>

            {/* Floating UI Pill 3: Bottom Left */}
            <div className="hidden sm:flex absolute bottom-6 left-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-xl items-center space-x-3 text-left">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tempo até Contratação</p>
                <p className="text-sm font-bold text-indigo-300">3.4 dias úteis</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
