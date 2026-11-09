import React from 'react';
import { Layers, CheckCircle2, PlayCircle, Rocket, BrainCircuit, ShieldCheck } from 'lucide-react';

export default function RoadmapSection() {
  const phases = [
    {
      phase: "Fase 1 — MVP",
      badge: "Disponível no MVP",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      icon: CheckCircle2,
      iconColor: "text-emerald-400",
      objective: "Validar o fluxo principal de recrutamento",
      items: [
        "Cadastro de empresas e perfis operacionais",
        "Criação de programas de talentos",
        "Cadastro de vagas e especificação de turnos",
        "Cadastro simplificado de candidatos",
        "Banco de talentos ativo e reaproveitável",
        "Matching logístico básico (geolocalização e turno)",
        "Painel gerencial de recrutamento"
      ]
    },
    {
      phase: "Fase 2 — Automação",
      badge: "Operando",
      badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/30",
      icon: PlayCircle,
      iconColor: "text-teal-400",
      objective: "Eliminar a evasão e automatizar a triagem inicial",
      items: [
        "Entrevistas e micro-perguntas via WhatsApp",
        "Notificações instantâneas de status ao candidato",
        "Avaliação rápida de habilidades práticas de execução",
        "Automação integral do fluxo seletivo",
        "Dashboards executivos de indicadores de ROI"
      ]
    },
    {
      phase: "Fase 3 — Desenvolvimento",
      badge: "Integrado",
      badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      icon: Rocket,
      iconColor: "text-indigo-400",
      objective: "Acompanhar a curva de integração e mitigar o turnover",
      items: [
        "Trilhas de micro-treinamento prático",
        "Jornada de Onboarding dos 90 dias",
        "Acompanhamento ativo da adaptação do colaborador",
        "Painel de indicadores de retenção precoce"
      ]
    },
    {
      phase: "Fase 4 — Inteligência",
      badge: "IA Ativa",
      badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      icon: BrainCircuit,
      iconColor: "text-cyan-400",
      objective: "Maximizar a precisão com IA preditiva e ética",
      items: [
        "Matching inteligente multidimensional",
        "Recomendações ativas de oportunidades",
        "Análise preditiva de risco de turnover",
        "Apoio de IA nas avaliações com supervisão humana",
        "Governança e auditoria LGPD de ponta a ponta"
      ]
    }
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
          Evolução Incremental (Scrum / Ágil)
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-['Plus_Jakarta_Sans']">
          Roadmap Estratégico do Software
        </h2>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Conforme detalhado no Plano Executivo: evolução sólida partindo da validação do MVP até a inteligência preditiva.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {phases.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-slate-900/50"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <Icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>

                <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                  {item.phase}
                </h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">
                  {item.objective}
                </p>

                <ul className="space-y-2.5 pt-3 border-t border-slate-800/80">
                  {item.items.map((sub, sIdx) => (
                    <li key={sIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0 group-hover:bg-emerald-400 transition-colors" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/50 text-[10px] text-slate-500 font-mono">
                Ciclo {idx + 1} • Arquitetura Modular
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
