import React from 'react';
import { ShieldCheck, Lock, FileText, UserCheck, Eye, Trash2, KeyRound, Scale } from 'lucide-react';

export default function LgpdComplianceSection() {
  const compliancePoints = [
    {
      icon: UserCheck,
      title: "Revisão Humana Obrigatória (Art. 20)",
      description: "Conforme determinação da ANPD, o candidato tem o direito de solicitar que decisões automatizadas de triagem sejam revistas por um recrutador humano."
    },
    {
      icon: Lock,
      title: "Criptografia de Ponta a Ponta",
      description: "Dados em trânsito e em repouso protegidos por algoritmos AES-256 e chaves de acesso estritas."
    },
    {
      icon: Eye,
      title: "Minimização de Dados",
      description: "Coleta restrita ao essencial: sem fotos obrigatórias, sem exigência de endereço completo nas fases iniciais, sem dados sensíveis supérfluos."
    },
    {
      icon: FileText,
      title: "Registro de Operações & Auditoria",
      description: "Logs imutáveis de todas as operações de consulta, processamento e cálculo de scores efetuados pelo sistema e pela IA."
    },
    {
      icon: Trash2,
      title: "Política de Retenção & Exclusão",
      description: "Canal desimpedido para o titular solicitar a exclusão ou anonimização definitiva de seus dados do banco de talentos."
    },
    {
      icon: Scale,
      title: "Não Discriminação Algorítmica",
      description: "Modelos treinados para neutralizar vieses de gênero, raça e idade, focando exclusivamente na viabilidade logística e habilidades de execução."
    }
  ];

  return (
    <section className="py-20 bg-slate-900/40 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy by Design & by Default</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
            Estratégia de Compliance LGPD Integrada
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Projetada desde a concepção para garantir a integridade dos dados e o total cumprimento da legislação brasileira e orientações da ANPD.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {compliancePoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-teal-500/30 transition-all group"
              >
                <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 w-fit mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-['Plus_Jakarta_Sans']">
                  {point.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Citação Oficial ANPD */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center max-w-4xl mx-auto">
          <p className="text-xs text-slate-300 italic">
            "Como a plataforma utilizará IA para matching, entrevistas ou avaliações, é especialmente importante manter mecanismos de revisão e transparência. A ANPD destaca o direito do titular de solicitar revisão de decisões tomadas unicamente com base em tratamento automatizado que afetem seus interesses."
          </p>
          <span className="block text-[11px] text-teal-400 font-bold mt-2">
            — Seção 1.4 do Plano Executivo do Software
          </span>
        </div>

      </div>
    </section>
  );
}
