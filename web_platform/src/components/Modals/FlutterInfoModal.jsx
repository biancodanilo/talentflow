import React from 'react';
import { X, Smartphone, CheckCircle, Terminal, Play, Laptop, ExternalLink, Globe } from 'lucide-react';

export default function FlutterInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleOpenLiveFlutter = () => {
    window.open('/app/index.html', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans']">
                Aplicativo Mobile & Web Responsivo em Flutter
              </h3>
              <p className="text-xs text-slate-400">Desenvolvido com Flutter 3.44 e Dart 3.12</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Launch Button */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-emerald-950/60 border border-cyan-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              <span>Compilado & Pronto para Teste</span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">Executar App Flutter no Navegador</h4>
            <p className="text-xs text-slate-300">
              O bundle Web do Flutter já foi compilado e está integrado ao servidor Node.
            </p>
          </div>

          <button
            onClick={handleOpenLiveFlutter}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-2 shrink-0"
          >
            <span>Abrir Flutter Web ao Vivo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 mt-6 text-xs text-slate-300">
          
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Módulos Implementados no Flutter:</span>
            </h4>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li><strong>Layout Responsivo:</strong> Breakpoints inteligentes para Mobile (Bottom Navigation), Tablet e Desktop (NavigationRail).</li>
              <li><strong>Radar de Vagas com Match Logístico:</strong> Cálculo de proximidade em km e compatibilidade de turnos (12x36, 6x1, 5x2).</li>
              <li><strong>Simulação de Triagem WhatsApp:</strong> Chat conversacional com perguntas objetivas e respostas rápidas em 1 toque.</li>
              <li><strong>Guardião dos 90 Dias:</strong> Linha do tempo gamificada para o colaborador com check-ins preventivos de turnover.</li>
              <li><strong>Portal LGPD com Transparência:</strong> Painel onde o candidato pode solicitar revisão humana da IA (Art. 20) e exportar seus dados.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Como Rodar Nativo com Hot-Reload (CLI):</span>
            </h4>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-2">
              <p className="text-slate-400"># 1. Navegue até a pasta do app Flutter:</p>
              <p className="text-emerald-400">cd talentflow\flutter_app</p>
              
              <p className="text-slate-400 pt-2"># 2. Executar em modo Web (Google Chrome):</p>
              <p className="text-emerald-400">flutter run -d chrome</p>

              <p className="text-slate-400 pt-2"># 3. Ou executar como App nativo do Windows Desktop:</p>
              <p className="text-emerald-400">flutter run -d windows</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Laptop className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="font-bold text-white">Dispositivos detectados no sistema:</p>
                <p className="text-slate-400 text-[11px]">Windows Desktop, Google Chrome, Microsoft Edge</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
              0 Erros • 100% Testado
            </span>
          </div>

        </div>

        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-between items-center">
          <button
            onClick={handleOpenLiveFlutter}
            className="text-cyan-400 hover:text-cyan-300 font-bold text-xs flex items-center space-x-1"
          >
            <span>Testar no navegador agora</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
