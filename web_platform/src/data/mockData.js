export const platformStats = {
  timeToHire: {
    current: "3.4 dias",
    traditional: "24.0 dias",
    reduction: "-85%",
    trend: "+12% mais rápido este mês"
  },
  costPerHire: {
    current: "R$ 380",
    traditional: "R$ 1.950",
    reduction: "-80.5%",
    savings: "R$ 1.570 por contratação"
  },
  conversionRate: {
    current: "74.8%",
    traditional: "18.2%",
    growth: "+4.1x adesão",
    dropoff: "< 3% evasão no WhatsApp"
  },
  retention90Days: {
    current: "89.4%",
    traditional: "52.0%",
    growth: "+37.4 p.p.",
    avoidedLosses: "R$ 412.000 preservados/ano"
  }
};

export const jobsData = [
  {
    id: "JOB-101",
    title: "Operador de Logística & Separação",
    company: "Mercado Sul Distribuidora",
    department: "Centro de Distribuição Jaú",
    location: "Jaú - SP",
    shift: "12x36 Noturno (19h às 07h)",
    openings: 25,
    candidatesCount: 142,
    shortlistedCount: 38,
    hiredCount: 18,
    salary: "R$ 2.150,00 + Adic. Noturno",
    status: "Ativa",
    priority: "Alta",
    requiredSkills: ["Separação por WMS", "Disponibilidade 12x36", "Residir em Jaú ou região", "Agilidade física"],
    deadline: "2026-10-25"
  },
  {
    id: "JOB-102",
    title: "Operador de Empilhadeira Retrátil",
    company: "TransLog Paulista",
    department: "Polo Logístico Barra Bonita",
    location: "Barra Bonita - SP",
    shift: "6x1 Tarde (14h às 22h20)",
    openings: 8,
    candidatesCount: 54,
    shortlistedCount: 16,
    hiredCount: 6,
    salary: "R$ 3.100,00 + Benefícios",
    status: "Ativa",
    priority: "Urgente",
    requiredSkills: ["CNH B válida", "Curso NR-11 atualizado", "Experiência prática empilhadeira", "Fácil acesso Barra Bonita"],
    deadline: "2026-10-18"
  },
  {
    id: "JOB-103",
    title: "Auxiliar de Operações & Caixa",
    company: "Rede Central Varejo",
    department: "Loja 14 - Bariri Centro",
    location: "Bariri - SP",
    shift: "6x1 Escala Revezamento",
    openings: 15,
    candidatesCount: 98,
    shortlistedCount: 32,
    hiredCount: 12,
    salary: "R$ 1.840,00 + Quebra de Caixa",
    status: "Ativa",
    priority: "Média",
    requiredSkills: ["Atendimento cordial", "Fechamento de caixa", "Fácil acesso Bariri Centro", "Disponibilidade final de semana"],
    deadline: "2026-11-05"
  },
  {
    id: "JOB-104",
    title: "Auxiliar de Produção Industrial",
    company: "Calçados & Couros Jaú S.A.",
    department: "Polo Calçadista Jaú",
    location: "Jaú - SP",
    shift: "5x2 Segunda a Sexta (07h às 16h48)",
    openings: 12,
    candidatesCount: 86,
    shortlistedCount: 22,
    hiredCount: 10,
    salary: "R$ 2.050,00 + Fretado",
    status: "Em Fechamento",
    priority: "Baixa",
    requiredSkills: ["Atenção a normas de segurança (EPI)", "Montagem manual", "Pontualidade", "Linha contínua"],
    deadline: "2026-10-12"
  }
];

export const candidatesData = [
  {
    id: "CAND-001",
    name: "Rodrigo Almeida Santos",
    age: 26,
    location: "Jaú - Vila Maria (4.5 km da vaga)",
    transportTime: "18 min de circular direto",
    shiftPreference: "12x36 Noturno (Preferencial)",
    overallMatch: 96,
    matchBreakdown: {
      logistics: 98, // Proximidade e deslocamento
      shiftCompatibility: 100, // Turno perfeito
      practicalSkills: 92, // WMS e separação
      retentionProbability: 95 // IA prevê alta estabilidade
    },
    appliedJob: "Operador de Logística & Separação",
    phone: "(14) 98741-2234",
    status: "Aprovado p/ Onboarding",
    whatsAppStatus: "Triagem Concluída em 3min",
    skills: ["Coletor WMS", "Agilidade", "Residência próxima", "Disponível início imediato"],
    aiRationale: "Candidato reside a menos de 5 km do Distrito Industrial de Jaú, rota circular direta sem baldeação. Possui disponibilidade imediata para a escala 12x36 noturna.",
    humanReviewStatus: "Validado por Recrutador (LGPD Art. 20)",
    onboardingDay: "Dia 8",
    retentionRisk: "Baixo Risco (98% seguro)"
  },
  {
    id: "CAND-002",
    name: "Juliana Ferreira Lima",
    age: 31,
    location: "Barra Bonita - Habitação (3.2 km da vaga)",
    transportTime: "15 min a pé/bicicleta",
    shiftPreference: "6x1 Tarde (14h às 22h20)",
    overallMatch: 94,
    matchBreakdown: {
      logistics: 97,
      shiftCompatibility: 95,
      practicalSkills: 94,
      retentionProbability: 92
    },
    appliedJob: "Operador de Empilhadeira Retrátil",
    phone: "(14) 97412-5589",
    status: "Entrevista Agendada",
    whatsAppStatus: "Documento NR-11 Validado",
    skills: ["NR-11 Vigente", "CNH B", "Experiência Retrátil 3 anos", "Checklist Diário"],
    aiRationale: "Mora a 3.2 km do entreposto de Barra Bonita. Certificado NR-11 enviado e checado via OCR no WhatsApp com validade até 2027. Excelente histórico em operações industriais.",
    humanReviewStatus: "Pendente Revisão Humana",
    onboardingDay: "Pré-Admissão",
    retentionRisk: "Baixo Risco (95% seguro)"
  },
  {
    id: "CAND-003",
    name: "Cleiton Barbosa da Silva",
    age: 24,
    location: "Bariri - Centro (2.1 km da vaga)",
    transportTime: "10 min de circular linha urbana",
    shiftPreference: "6x1 Revezamento",
    overallMatch: 91,
    matchBreakdown: {
      logistics: 95,
      shiftCompatibility: 92,
      practicalSkills: 88,
      retentionProbability: 90
    },
    appliedJob: "Auxiliar de Operações & Caixa",
    phone: "(14) 96521-8840",
    status: "Em Onboarding (Dia 24)",
    whatsAppStatus: "Check-in 15 Dias Concluído",
    skills: ["Atendimento ao Público", "Operação de Caixa", "Pontualidade", "Facilidade com Tecnologia"],
    aiRationale: "Excelente proximidade física da Loja no centro de Bariri. Fez autoavaliação prática no simulador com 100% de acertos de troco e fechamento.",
    humanReviewStatus: "Aprovado com Revisão Humana",
    onboardingDay: "Dia 24",
    retentionRisk: "Baixo Risco (93% seguro)"
  },
  {
    id: "CAND-004",
    name: "Marcos Vinicius Tavares",
    age: 29,
    location: "Bauru - SP (54.0 km da vaga)",
    transportTime: "1h 50min com 3 ônibus intermunicipais",
    shiftPreference: "12x36 Noturno",
    overallMatch: 68,
    matchBreakdown: {
      logistics: 42, // Alerta vermelho de deslocamento!
      shiftCompatibility: 88,
      practicalSkills: 85,
      retentionProbability: 49 // Alto risco de evasão precoce
    },
    appliedJob: "Operador de Logística & Separação",
    phone: "(14) 95214-9901",
    status: "Alerta de Risco Logístico",
    whatsAppStatus: "Em Espera para Vaga Regional",
    skills: ["Carga e Descarga", "Separação", "Disposto a turnos"],
    aiRationale: "ATENÇÃO: Tempo de deslocamento excessivo (1h50min e 3 conduções no horário noturno entre Bauru e Jaú). Histórico estatístico indica 78% de evasão nos primeiros 30 dias para rotas dessa distância. Recomendado redirecionar para polo logístico de Bauru.",
    humanReviewStatus: "Sugerido Redirecionamento Humano",
    onboardingDay: "N/A",
    retentionRisk: "ALTO RISCO DE TURNOVER"
  }
];

export const onboardingCohorts = [
  {
    id: "COHORT-2026-09",
    name: "Turma Operacional CD Jaú - Setembro",
    totalEmployees: 24,
    activeAtDay30: 23,
    activeAtDay60: 22,
    activeAtDay90: 22,
    retentionRate: "91.6%",
    status: "Em Acompanhamento (Dia 42)",
    checkpoints: [
      { day: 1, title: "Kit Boas-Vindas & EPI", completed: 24, total: 24, status: "100% OK" },
      { day: 7, title: "Adaptação à Escala & Transporte", completed: 24, total: 24, status: "100% OK" },
      { day: 15, title: "Feedback com Líder Imediato", completed: 23, total: 24, status: "96% OK" },
      { day: 30, title: "Pesquisa de Clima & Bem-Estar", completed: 23, total: 23, status: "95% OK" },
      { day: 60, title: "Revisão Intermediária Experiência", completed: 18, total: 22, status: "Em andamento" },
      { day: 90, title: "Confirmação de Efetivação", completed: 0, total: 22, status: "Agendado" }
    ],
    alerts: [
      {
        employee: "Leandro Souza",
        day: 22,
        issue: "Relatou atraso frequente de 15min na linha circular das 18h em Jaú",
        actionTaken: "Ajustada tolerância de entrada e oferecido auxílio rota alternativa",
        resolved: true
      }
    ]
  },
  {
    id: "COHORT-2026-08",
    name: "Turma Varejo Central Bariri - Agosto",
    totalEmployees: 18,
    activeAtDay30: 18,
    activeAtDay60: 17,
    activeAtDay90: 17,
    retentionRate: "94.4%",
    status: "Concluído (Dia 90 Superado!)",
    checkpoints: [
      { day: 1, title: "Integração & Uniforme", completed: 18, total: 18, status: "100% OK" },
      { day: 15, title: "Check-in Caixa & Treinamento", completed: 18, total: 18, status: "100% OK" },
      { day: 30, title: "Avaliação 30 Dias", completed: 18, total: 18, status: "100% OK" },
      { day: 60, title: "Avaliação 60 Dias", completed: 17, total: 17, status: "100% OK" },
      { day: 90, title: "Celebração 90 Dias & Efetivação", completed: 17, total: 17, status: "100% OK" }
    ],
    alerts: []
  }
];

export const whatsAppSimulatorFlow = [
  {
    sender: "bot",
    time: "10:02",
    message: "Oi, Rodrigo! Aqui é a Sofia da TalentFlow para a vaga de Operador de Logística no CD Jaú. Vi que você busca trabalho em Jaú e região. Posso fazer 3 perguntinhas rápidas de 1 minuto?"
  },
  {
    sender: "user",
    time: "10:03",
    message: "Oi Sofia, pode sim! Tenho interesse."
  },
  {
    sender: "bot",
    time: "10:03",
    message: "Maravilha! A vaga é na escala 12x36 (trabalha um dia, folga o outro), no turno noturno das 19h às 07h. Você tem total disponibilidade para esse horário?"
  },
  {
    sender: "user",
    time: "10:04",
    message: "Sim, perfeito! Prefiro trabalhar à noite e já trabalhei nessa escala antes."
  },
  {
    sender: "bot",
    time: "10:04",
    message: "Ótimo! Você mora em Jaú, certo? Como você viria para o CD no Distrito Industrial?"
  },
  {
    sender: "user",
    time: "10:05",
    message: "Vou de circular Linha 102, passa na porta de casa e me deixa na frente do CD em 18 minutos."
  },
  {
    sender: "bot",
    time: "10:05",
    message: "Sensacional! 🎉 Seu perfil deu 96% de compatibilidade! Quer agendar sua visita ao CD Jaú para amanhã às 14h com o supervisor Carlos?"
  },
  {
    sender: "user",
    time: "10:06",
    message: "Quero sim, estarei lá!"
  }
];

export const lgpdAuditLogs = [
  {
    id: "LOG-8812",
    timestamp: "2026-10-07 08:32:14",
    action: "Matching Automatizado Realizado",
    candidateId: "CAND-001 (Rodrigo Almeida)",
    legalBasis: "Execução de Procedimentos Pré-Contratuais (Art. 7, V)",
    dataProcessed: "Geolocalização aproximada (bairro em Jaú), escala de trabalho, habilidades práticas",
    humanReviewed: true,
    reviewer: "Ana Paula (RH Senior)",
    status: "Conforme"
  },
  {
    id: "LOG-8813",
    timestamp: "2026-10-07 08:35:50",
    action: "Revisão Humana Solicitada pelo Candidato (Art. 20 LGPD)",
    candidateId: "CAND-004 (Marcos Vinicius)",
    legalBasis: "Direito de Explicação e Revisão Humana",
    dataProcessed: "Reavaliação do trajeto logístico de 54km (Bauru x Jaú) e indicação para polo regional parceiro",
    humanReviewed: true,
    reviewer: "Carlos Mendes (Gestor Operacional)",
    status: "Revisado com Sucesso"
  },
  {
    id: "LOG-8814",
    timestamp: "2026-10-07 08:41:22",
    action: "Consentimento e Minimização de Dados",
    candidateId: "CAND-002 (Juliana Ferreira)",
    legalBasis: "Consentimento Expresso e Específico",
    dataProcessed: "Eliminação automática de dados sensíveis não pertinentes (estado civil, foto, dados de parentes)",
    humanReviewed: false,
    reviewer: "Sistema Automático",
    status: "Higienizado"
  }
];

export const accessLevels = [
  {
    id: "SUPER_ADMIN",
    level: 1,
    title: "Nível 1: Administrador Geral (Super Admin)",
    shortTitle: "Nível 1: Administrador",
    description: "Acesso master irrestrito via URL /admin. Gestão global do sistema, configurações de tenant, criação de gerentes e auditoria ANPD.",
    badgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    iconName: "ShieldAlert",
    userCount: 2
  },
  {
    id: "GERENTE_RH",
    level: 2,
    title: "Nível 2: Gerente de RH & Operações",
    shortTitle: "Nível 2: Gerente de RH",
    description: "Gestão executiva da empresa contratante. Cadastra e gerencia novos usuários (recrutadores, analistas e líderes), aprova vagas e orçamentos.",
    badgeColor: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
    iconName: "Briefcase",
    userCount: 4
  },
  {
    id: "RECRUTADOR",
    level: 3,
    title: "Nível 3: Recrutador Operacional",
    shortTitle: "Nível 3: Recrutador",
    description: "Criação de vagas, triagem rápida no WhatsApp Web, matching de candidatos por logística e agendamento de entrevistas.",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    iconName: "UserCheck",
    userCount: 8
  },
  {
    id: "ANALISTA_90DIAS",
    level: 4,
    title: "Nível 4: Analista de Retenção (Guardião 90 Dias)",
    shortTitle: "Nível 4: Analista 90 Dias",
    description: "Acompanhamento ativo dos marcos dos primeiros 90 dias (dias 1, 15, 30, 60 e 90), controle de evasão e check-ins de adaptação.",
    badgeColor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    iconName: "Clock",
    userCount: 5
  },
  {
    id: "GESTOR_LOJA",
    level: 5,
    title: "Nível 5: Líder de Turno / Gestor de Loja",
    shortTitle: "Nível 5: Gestor / Consulta",
    description: "Consulta de candidatos aprovados para o turno, validação de escala no chão de fábrica e feedback direto de período de experiência.",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    iconName: "Users",
    userCount: 6
  }
];

export const initialUsersData = [
  {
    id: "USR-001",
    name: "Dr. Marcos Silveira",
    email: "marcos.silveira@talentflow.com.br",
    role: "CEO & Co-fundador",
    accessLevel: "SUPER_ADMIN",
    unit: "Matriz Faria Lima - SP",
    status: "Ativo",
    twoFactorEnabled: true,
    lastLogin: "2026-10-20 21:10:45",
    lastIp: "189.122.45.10",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "USR-002",
    name: "Dra. Beatriz Prado",
    email: "beatriz.prado@talentflow.com.br",
    role: "CTO & Head de IA",
    accessLevel: "SUPER_ADMIN",
    unit: "Polo Tecnológico - SP",
    status: "Ativo",
    twoFactorEnabled: true,
    lastLogin: "2026-10-20 20:45:12",
    lastIp: "177.34.89.201",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "USR-003",
    name: "Rafael Mendes",
    email: "rafael.mendes@talentflow.com.br",
    role: "Gerente Geral de Gente & Operações",
    accessLevel: "GERENTE_RH",
    unit: "Hub Regional Jaú - SP",
    status: "Ativo",
    twoFactorEnabled: true,
    lastLogin: "2026-10-20 19:15:33",
    lastIp: "187.54.12.98",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "USR-004",
    name: "Mariana Albuquerque",
    email: "mariana.albuquerque@talentflow.com.br",
    role: "Analista de Retenção & Guardião 90 Dias",
    accessLevel: "ANALISTA_90DIAS",
    unit: "Compliance Matriz - SP",
    status: "Ativo",
    twoFactorEnabled: true,
    lastLogin: "2026-10-20 18:02:19",
    lastIp: "201.88.76.14",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "USR-005",
    name: "Camila Rocha Neves",
    email: "camila.recrutamento@talentflow.com.br",
    role: "Analista de Atração e Seleção",
    accessLevel: "RECRUTADOR",
    unit: "Distrito Industrial Jaú - SP",
    status: "Ativo",
    twoFactorEnabled: true,
    lastLogin: "2026-10-20 21:05:00",
    lastIp: "189.122.45.10",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "USR-006",
    name: "Felipe Antunes Lima",
    email: "felipe.triagem@talentflow.com.br",
    role: "Recrutador Operacional",
    accessLevel: "RECRUTADOR",
    unit: "Polo Logístico Barra Bonita - SP",
    status: "Ativo",
    twoFactorEnabled: false,
    lastLogin: "2026-10-19 16:30:11",
    lastIp: "186.230.14.77",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "USR-007",
    name: "Carlos Ferreira",
    email: "carlos.supervisor@mercadosul.com.br",
    role: "Encarregado de Operações & Turno",
    accessLevel: "GESTOR_LOJA",
    unit: "CD Jaú - SP",
    status: "Ativo",
    twoFactorEnabled: true,
    lastLogin: "2026-10-20 14:22:05",
    lastIp: "179.184.22.41",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "USR-008",
    name: "Luciana Duarte",
    email: "luciana.bariri@talentflow.com.br",
    role: "Supervisora de Varejo & Loja",
    accessLevel: "GESTOR_LOJA",
    unit: "Loja Centro Bariri - SP",
    status: "Bloqueado",
    twoFactorEnabled: false,
    lastLogin: "2026-09-28 11:14:02",
    lastIp: "189.44.11.23",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
  }
];

export const permissionsMatrix = [
  {
    module: "Gestão de Vagas",
    action: "Criar, editar e pausar vagas operacionais",
    roles: { SUPER_ADMIN: true, GERENTE_RH: true, RECRUTADOR: true, ANALISTA_90DIAS: false, GESTOR_LOJA: false }
  },
  {
    module: "Cadastro de Usuários da Equipe",
    action: "Cadastrar novos recrutadores, analistas e gestores no Portal",
    roles: { SUPER_ADMIN: true, GERENTE_RH: true, RECRUTADOR: false, ANALISTA_90DIAS: false, GESTOR_LOJA: false }
  },
  {
    module: "Triagem & Matching WhatsApp Web",
    action: "Visualizar candidatos, disparar WhatsApp Web e agendar entrevistas",
    roles: { SUPER_ADMIN: true, GERENTE_RH: true, RECRUTADOR: true, ANALISTA_90DIAS: false, GESTOR_LOJA: false }
  },
  {
    module: "Aprovação de Contratação",
    action: "Aprovar contratação final e validar elegibilidade salarial",
    roles: { SUPER_ADMIN: true, GERENTE_RH: true, RECRUTADOR: false, ANALISTA_90DIAS: false, GESTOR_LOJA: false }
  },
  {
    module: "Guardião dos 90 Dias",
    action: "Acompanhar check-ins e registrar feedback de adaptação do colaborador",
    roles: { SUPER_ADMIN: true, GERENTE_RH: true, RECRUTADOR: true, ANALISTA_90DIAS: true, GESTOR_LOJA: true }
  },
  {
    module: "Auditoria & LGPD Art. 20",
    action: "Exportar relatórios de conformidade e revisar pontuações algorítmicas",
    roles: { SUPER_ADMIN: true, GERENTE_RH: true, RECRUTADOR: false, ANALISTA_90DIAS: false, GESTOR_LOJA: false }
  },
  {
    module: "Controle de Perfis Master & 2FA",
    action: "Alterar níveis de acesso administrativos e resetar credenciais",
    roles: { SUPER_ADMIN: true, GERENTE_RH: false, RECRUTADOR: false, ANALISTA_90DIAS: false, GESTOR_LOJA: false }
  }
];

export const securityAuditLogs = [
  {
    id: "SEC-901",
    timestamp: "2026-10-20 21:12:04",
    user: "Dr. Marcos Silveira (Super Admin)",
    action: "Acesso ao Painel Administrativo",
    target: "Módulo Controle de Acesso",
    ip: "189.122.45.10",
    status: "Sucesso",
    severity: "Normal"
  },
  {
    id: "SEC-902",
    timestamp: "2026-10-20 19:40:15",
    user: "Rafael Mendes (Gestor de RH)",
    action: "Criação de Nova Vaga",
    target: "Operador de Logística (CD Jaú)",
    ip: "187.54.12.98",
    status: "Sucesso",
    severity: "Normal"
  },
  {
    id: "SEC-903",
    timestamp: "2026-10-20 17:15:30",
    user: "Sistema Automático",
    action: "Bloqueio Temporário por Inatividade",
    target: "Usuário Luciana Duarte",
    ip: "189.44.11.23",
    status: "Bloqueado",
    severity: "Aviso"
  },
  {
    id: "SEC-904",
    timestamp: "2026-10-20 15:02:18",
    user: "Dra. Beatriz Prado (Super Admin)",
    action: "Alteração de Nível de Acesso",
    target: "Felipe Antunes (Promovido a Recrutador)",
    ip: "177.34.89.201",
    status: "Sucesso",
    severity: "Crítico"
  }
];

export const initialCompaniesData = [
  {
    id: "EMP-001",
    name: "Mercado Sul Distribuidora S.A.",
    cnpj: "14.528.901/0001-42",
    city: "Jaú - SP",
    sector: "Logística & Distribuição",
    contactName: "Roberto Vasconcelos",
    contactEmail: "rh@mercadosul.com.br",
    phone: "(14) 3622-8800",
    activeJobs: 4,
    status: "Ativa",
    createdAt: "2026-08-12"
  },
  {
    id: "EMP-002",
    name: "TransLog Paulista Logística Integrada",
    cnpj: "28.901.334/0001-19",
    city: "Barra Bonita - SP",
    sector: "Operações Portuárias & Armazenagem",
    contactName: "Fernanda Azevedo",
    contactEmail: "gente@translogpaulista.com.br",
    phone: "(14) 3641-5510",
    activeJobs: 2,
    status: "Ativa",
    createdAt: "2026-08-25"
  },
  {
    id: "EMP-003",
    name: "Rede Central Varejo & Supermercados",
    cnpj: "41.220.778/0001-88",
    city: "Bariri - SP",
    sector: "Varejo Alimentar",
    contactName: "Luciana Duarte",
    contactEmail: "selecao@redecentralvarejo.com.br",
    phone: "(14) 3662-1900",
    activeJobs: 3,
    status: "Ativa",
    createdAt: "2026-09-04"
  },
  {
    id: "EMP-004",
    name: "Calçados & Couros Jaú S.A.",
    cnpj: "07.119.450/0001-05",
    city: "Jaú - SP",
    sector: "Indústria Calçadista",
    contactName: "Henrique Bastos",
    contactEmail: "dp@calcadosjau.com.br",
    phone: "(14) 3624-7100",
    activeJobs: 2,
    status: "Ativa",
    createdAt: "2026-09-18"
  }
];

export const gedDocumentsData = [
  {
    id: "GED-2026-001",
    title: "Termo de Consentimento LGPD & Tratamento Logístico",
    category: "Privacidade & LGPD (Art. 7º e 20)",
    company: "Mercado Sul Distribuidora S.A.",
    unit: "CD Jaú - SP",
    version: "v2.4",
    launchedBy: "Mariana Albuquerque",
    launchedByRole: "DPO & Head Jurídico",
    launchedAt: "2026-10-01 09:00",
    lastUpdatedAt: "2026-10-18 14:20",
    workflowStatus: "Vigente / Em Coleta",
    progressPercent: 97,
    acceptedCount: 138,
    totalTargets: 142,
    mandatory: true,
    userAccepted: true,
    summary: "Autoriza o cálculo de compatibilidade geográfica entre o bairro/linha de ônibus do candidato e o polo operacional, garantindo direito à revisão humana (Art. 20 da LGPD) e descarte automático de dados sensíveis.",
    recentSigners: [
      { name: "Rodrigo Almeida Santos", role: "Candidato (CAND-001)", status: "Aceito", date: "2026-10-20 10:06" },
      { name: "Juliana Ferreira Lima", role: "Candidata (CAND-002)", status: "Aceito", date: "2026-10-20 11:15" },
      { name: "Marcos Vinicius Tavares", role: "Candidato (CAND-004)", status: "Pendente", date: "Aguardando assinatura" }
    ]
  },
  {
    id: "GED-2026-002",
    title: "Termo de Responsabilidade, Entrega e Uso de EPIs",
    category: "Segurança do Trabalho (NR-06)",
    company: "TransLog Paulista Logística Integrada",
    unit: "Polo Barra Bonita - SP",
    version: "v1.8",
    launchedBy: "Rafael Mendes",
    launchedByRole: "Diretor de Gente & Gestão",
    launchedAt: "2026-10-03 11:30",
    lastUpdatedAt: "2026-10-19 16:45",
    workflowStatus: "Vigente / Em Coleta",
    progressPercent: 100,
    acceptedCount: 54,
    totalTargets: 54,
    mandatory: true,
    userAccepted: true,
    summary: "Comprova o recebimento e treinamento de uso de calçado de segurança, colete refletivo, protetor auricular e luvas de movimentação no Dia 1 do Onboarding.",
    recentSigners: [
      { name: "Juliana Ferreira Lima", role: "Operadora Empilhadeira", status: "Aceito", date: "2026-10-19 08:30" },
      { name: "Carlos Ferreira", role: "Encarregado de Turno", status: "Aceito", date: "2026-10-05 09:12" }
    ]
  },
  {
    id: "GED-2026-003",
    title: "Termo de Adesão à Escala 12x36 & Política de Uso de Celular no Turno",
    category: "Contrato Operacional & Conduta",
    company: "Mercado Sul Distribuidora S.A.",
    unit: "CD Jaú - SP",
    version: "v3.0",
    launchedBy: "Camila Rocha Neves",
    launchedByRole: "Analista de Atração e Seleção (RH)",
    launchedAt: "2026-10-10 08:15",
    lastUpdatedAt: "2026-10-21 10:00",
    workflowStatus: "Em Assinatura Digital",
    progressPercent: 83,
    acceptedCount: 20,
    totalTargets: 24,
    mandatory: true,
    userAccepted: false,
    summary: "Estabelece as diretrizes da jornada 12x36 noturna, intervalos intrajornada e o uso de feedbacks pré-programados de 1 toque no App TalentFlow para evitar digitação em horário de serviço.",
    recentSigners: [
      { name: "Rodrigo Almeida Santos", role: "Operador Logística", status: "Aceito", date: "2026-10-20 19:02" },
      { name: "Leandro Souza", role: "Operador Logística", status: "Pendente", date: "Notificado via WhatsApp" }
    ]
  },
  {
    id: "GED-2026-004",
    title: "Aditivo de Fretado & Auxílio Deslocamento Regional",
    category: "Benefícios & Mobilidade",
    company: "Calçados & Couros Jaú S.A.",
    unit: "Polo Calçadista Jaú / Bariri",
    version: "v1.2",
    launchedBy: "Henrique Bastos",
    launchedByRole: "Gestor de DP (Empresa Parceira)",
    launchedAt: "2026-10-15 14:00",
    lastUpdatedAt: "2026-10-20 17:10",
    workflowStatus: "Em Revisão Jurídica",
    progressPercent: 45,
    acceptedCount: 9,
    totalTargets: 20,
    mandatory: false,
    userAccepted: false,
    summary: "Regulamenta os pontos de embarque e horários das linhas fretadas gratuitas entre Jaú, Barra Bonita e Bariri para o turno comercial 5x2.",
    recentSigners: [
      { name: "Cleiton Barbosa da Silva", role: "Auxiliar Operacional", status: "Aceito", date: "2026-10-18 07:45" }
    ]
  }
];
