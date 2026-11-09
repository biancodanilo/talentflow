import React from 'react';
import { Sparkles, ArrowUp, Building2, ShieldCheck, MapPin, Users, Shield } from 'lucide-react';

export default function Footer({ onGoToRh, onGoToAdmin, onGoToDashboard }) {
  const handleRhClick = onGoToRh || onGoToAdmin || onGoToDashboard;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-14 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-900">
          
          {/* Coluna 1: Sobre & Polos */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                Talent<span className="text-emerald-400">Flow</span>
              </span>
            </div>
            
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Plataforma de inteligência artificial aplicada à contratação e blindagem de retenção para operações de alta escala e logística.
            </p>

            <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Polos: Jaú, Barra Bonita, Bariri & Centros de Distribuição</span>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-white font-bold text-xs uppercase tracking-wider">
              Navegação Institucional
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#solucao" className="hover:text-emerald-400 transition-colors">
                  Dores do Mercado & Nossa Solução
                </a>
              </li>
              <li>
                <a href="#roi-calculator" className="hover:text-emerald-400 transition-colors">
                  Calculadora de Redução de Custos
                </a>
              </li>
              <li>
                <a href="#pilares" className="hover:text-emerald-400 transition-colors">
                  Triagem WhatsApp, Matching & 90 Dias
                </a>
              </li>
              <li>
                <a href="#sobre-nos" className="hover:text-emerald-400 transition-colors">
                  História da Empresa & Liderança
                </a>
              </li>
              <li>
                <a href="#lgpd" className="hover:text-emerald-400 transition-colors">
                  Supervisão Humana & LGPD Art. 20
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Acesso Restrito & Compliance */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-white font-bold text-xs uppercase tracking-wider">
              Acesso Corporativo
            </p>
            
            {/* Botão RH */}
            <button
              onClick={handleRhClick}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs border border-slate-700/80 hover:border-emerald-500/50 transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>Acessar Área do RH (/rh)</span>
            </button>

            {/* Botão Admin */}
            {onGoToAdmin && (
              <button
                onClick={onGoToAdmin}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 hover:text-white font-bold text-xs border border-purple-800/80 hover:border-purple-500 transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Console Admin (/admin)</span>
              </button>
            )}

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[10px] text-slate-400 space-y-1">
              <div className="flex items-center space-x-1 text-emerald-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Supervisão Humana LGPD</span>
              </div>
              <p>Garantia integral do Artigo 20 da Lei 13.709/2018. Todos os dados são criptografados com TLS 1.3.</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 TalentFlow Systems S.A. Todos os direitos reservados. CNPJ: 54.892.102/0001-44.</p>
          <div className="flex items-center space-x-4">
            <span>ISO/IEC 27001 Certified</span>
            <span>•</span>
            <span>Meta Tech Partner</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all shadow-sm flex items-center space-x-1"
              title="Voltar ao topo"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Topo</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
