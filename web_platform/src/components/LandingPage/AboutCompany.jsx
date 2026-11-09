import React from 'react';
import { Building2, Award, Users, ShieldCheck, MapPin, Sparkles, CheckCircle2, Globe, HeartHandshake, PhoneCall } from 'lucide-react';

export default function AboutCompany() {
  const leadership = [
    {
      name: 'Dr. Marcos Silveira',
      role: 'CEO & Co-fundador',
      bio: 'Ex-VP de Operações e Supply Chain em grandes multinacionais. Especialista em gestão de alta densidade e produtividade fabril.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Dra. Beatriz Prado',
      role: 'CTO & Head de Inteligência Artificial',
      bio: 'PhD em Otimização de Grafos e Algoritmos Preditivos pela USP. Liderou times de inteligência artificial em fintechs e supply chain tech.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Rafael Mendes',
      role: 'Chief People Officer (CPO)',
      bio: 'Mais de 18 anos à frente de Gente & Gestão em gigantes de varejo e centros de distribuição com mais de 25 mil colaboradores.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Mariana Albuquerque',
      role: 'DPO & Head de Governança Digital',
      bio: 'Advogada especialista em Direito Digital Trabalhista, conformidade com a LGPD e auditoria de algoritmos nos termos do Artigo 20.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const pillars = [
    {
      icon: HeartHandshake,
      title: 'Humanização Operacional',
      desc: 'Eliminamos a humilhação de formulários acadêmicos para cargos operacionais. Triagem acessível e digna via WhatsApp.',
    },
    {
      icon: MapPin,
      title: 'Logística como Fator Humano',
      desc: 'Não contratamos apenas competências: calculamos o tempo de deslocamento real para proteger o descanso e a família do trabalhador.',
    },
    {
      icon: ShieldCheck,
      title: 'Governança e Não Discriminação',
      desc: 'Nossa IA segue diretrizes rigorosas da ANPD com supervisão humana permanente (Human-in-the-Loop) em 100% das decisões.',
    },
    {
      icon: Award,
      title: 'Compromisso com o 90º Dia',
      desc: 'Nosso sucesso não é o preenchimento da vaga, mas a permanência e realização do profissional após o período probatório.',
    },
  ];

  return (
    <section id="sobre-nos" className="py-24 border-t border-slate-800/80 bg-slate-950/60 relative overflow-hidden">
      
      {/* Glow ambient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Sobre a Empresa Criadora</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
            Conheça a <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">TalentFlow Systems</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            Uma RH Tech brasileira fundada com a missão de erradicar o turnover precoce e humanizar a contratação de mão de obra operacional através de tecnologia preditiva e inteligência logística.
          </p>
        </div>

        {/* Big Manifesto Card with Real Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20 p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-teal-400">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Nossa História & Propósito</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans'] leading-tight">
              Nascemos para revolucionar a contratação e retenção operacional em Jaú, Barra Bonita, Bariri e região.
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Em 2026, nossos fundadores identificaram uma contradição alarmante: enquanto milhares de trabalhadores buscam oportunidades nas indústrias calçadistas, usinas sucroalcooleiras, centros de distribuição e varejo da região de Jaú, as empresas enfrentavam taxas de abandono de quase <strong>50% nos primeiros 90 dias</strong>, gastando rios de dinheiro com agências analógicas e exames admissionais perdidos.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Criamos a <strong>TalentFlow</strong> unindo algoritmos de viabilidade de transporte coletivo e circular, inteligência conversacional nativa no WhatsApp e um programa ativo de acompanhamento e suporte durante todo o período probatório legal.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-['Plus_Jakarta_Sans']">+1.8M</p>
                <p className="text-xs text-slate-400 mt-0.5">Triagens Concluídas</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-teal-300 font-['Plus_Jakarta_Sans']">89.4%</p>
                <p className="text-xs text-slate-400 mt-0.5">Retenção aos 90 Dias</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-indigo-400 font-['Plus_Jakarta_Sans']">&lt; 72h</p>
                <p className="text-xs text-slate-400 mt-0.5">Tempo Médio de Vaga</p>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl relative group">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"
                alt="Centro de Distribuição Inteligente TalentFlow"
                className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Hub Regional Jaú, Barra Bonita & Bariri</p>
                  <p className="text-[11px] text-slate-400">Atendendo polos industriais, usinas e centros logísticos</p>
                </div>
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>

        </div>

        {/* 4 Cultural & Technological Pillars */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">
              Nossos Pilares Institucionais
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Os compromissos éticos e técnicos que regem cada linha de código que escrevemos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 font-['Plus_Jakarta_Sans']">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership Team Grid */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Corpo Diretivo</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">
              Liderança com Experiência Real de Chão de Fábrica e Tecnologia
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((member, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col items-center text-center group hover:border-emerald-500/40 transition-all">
                <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 border-2 border-slate-700 group-hover:border-emerald-400 transition-colors shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="text-sm font-bold text-white font-['Plus_Jakarta_Sans']">
                  {member.name}
                </h4>
                <p className="text-xs font-semibold text-emerald-400 mt-0.5 mb-2">
                  {member.role}
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Offices & Enterprise Certifications Bar */}
        <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white text-sm block">Sede Corporativa</strong>
              <p className="text-slate-400 mt-0.5">Av. Brigadeiro Faria Lima, 3477 - 14º Andar</p>
              <p className="text-slate-500 text-[11px]">Itaim Bibi, São Paulo - SP</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Building2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white text-sm block">Hub Regional Operacional</strong>
              <p className="text-slate-400 mt-0.5">Distrito Industrial - Jaú - SP</p>
              <p className="text-slate-500 text-[11px]">Atendimento Integrado: Jaú, Barra Bonita e Bariri</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white text-sm block">Certificações & Compliance</strong>
              <p className="text-slate-400 mt-0.5">ISO/IEC 27001 • ANPD Conforme • Meta Tech Partner</p>
              <p className="text-slate-500 text-[11px]">Auditado periodicamente por firmas independentes</p>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
