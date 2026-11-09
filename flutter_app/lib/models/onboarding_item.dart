class OnboardingMilestone {
  final int day;
  final String title;
  final String description;
  final bool isCompleted;
  final bool isCurrent;
  final String dateEstimated;
  final String feedbackStatus;
  final String retrospectiveNote;
  final List<String> retrospectiveLearnings;

  const OnboardingMilestone({
    required this.day,
    required this.title,
    required this.description,
    required this.isCompleted,
    required this.isCurrent,
    required this.dateEstimated,
    required this.feedbackStatus,
    this.retrospectiveNote = '',
    this.retrospectiveLearnings = const [],
  });

  static List<OnboardingMilestone> getSampleMilestones() {
    return const [
      OnboardingMilestone(
        day: 1,
        title: 'Recepção, Integração & Kit EPI',
        description: 'Entrega do calçado de segurança, colete, crachá e apresentação ao supervisor de turno.',
        isCompleted: true,
        isCurrent: false,
        dateEstimated: '01/10/2026',
        feedbackStatus: 'Retrospectiva: 100% Presença',
        retrospectiveNote: 'Acolhimento impecável no ponto de encontro. O supervisor Carlos apresentou a equipe e os EPIs ficaram perfeitamente ajustados.',
        retrospectiveLearnings: [
          'Conferência de rota e transporte (Linha 324)',
          'Assinatura da cautela de EPIs e crachá',
          'Tour guiado pelo CD Jaú e refeitório',
        ],
      ),
      OnboardingMilestone(
        day: 7,
        title: 'Adaptação de Transporte & Linha',
        description: 'Balanço da primeira semana: checagem de pontualidade da linha circular e adaptação ao turno.',
        isCompleted: true,
        isCurrent: false,
        dateEstimated: '07/10/2026',
        feedbackStatus: 'Retrospectiva: Adaptação Positiva',
        retrospectiveNote: 'A linha de ônibus 324 passou sem atrasos em todos os dias da semana. O ritmo de trabalho está sendo bem assimilado.',
        retrospectiveLearnings: [
          'Horários de embarque e retorno consolidados',
          'Adaptação ao intervalo de refeição',
          'Primeira meta diária de separação atingida',
        ],
      ),
      OnboardingMilestone(
        day: 15,
        title: 'Check-in de 15 Dias com Líder',
        description: 'Bate-papo de 10 minutos com o encarregado sobre ritmo de separação e dúvidas do dia a dia.',
        isCompleted: false,
        isCurrent: true,
        dateEstimated: '15/10/2026',
        feedbackStatus: 'Retrospectiva: Em Andamento',
        retrospectiveNote: 'Reunião rápida agendada para repassar as principais práticas do leitor WMS e tirar dúvidas sobre horas extras.',
        retrospectiveLearnings: [
          'Tirar dúvidas sobre o leitor coletor de dados',
          'Alinhamento de pontualidade no relógio de ponto',
          'Feedback de agilidade e segurança operacional',
        ],
      ),
      OnboardingMilestone(
        day: 30,
        title: 'Avaliação de Clima & Primeiro Mês',
        description: 'Balanço confidencial de 30 dias para identificar gargalos, entrosamento e adiantamento salarial.',
        isCompleted: false,
        isCurrent: false,
        dateEstimated: '30/10/2026',
        feedbackStatus: 'Aguardando Marco de 30 Dias',
        retrospectiveNote: 'Fechamento do primeiro mês com direito ao adiantamento do vale e validação do clima da equipe.',
        retrospectiveLearnings: [
          'Pesquisa de clima confidencial com Gente & Gestão',
          'Confirmação de recebimento do adiantamento',
          'Avaliação mútua de produtividade',
        ],
      ),
      OnboardingMilestone(
        day: 60,
        title: 'Revisão Intermediária da Experiência',
        description: 'Alinhamento de expectativas e maturidade antes da reta final do período probatório legal.',
        isCompleted: false,
        isCurrent: false,
        dateEstimated: '30/11/2026',
        feedbackStatus: 'Aguardando Marco de 60 Dias',
        retrospectiveNote: 'Avaliação de maturidade técnica e comportamental visando a efetivação definitiva.',
        retrospectiveLearnings: [
          'Revisão dos indicadores de assiduidade',
          'Feedback 1-on-1 com o gerente de operações',
          'Treinamento complementar em empilhadeira retrátil',
        ],
      ),
      OnboardingMilestone(
        day: 90,
        title: 'Celebração da Efetivação & Estabilidade',
        description: 'Retrospectiva final dos 90 dias com transição para o contrato de trabalho por prazo indeterminado!',
        isCompleted: false,
        isCurrent: false,
        dateEstimated: '30/12/2026',
        feedbackStatus: 'Meta Final da Jornada',
        retrospectiveNote: 'Conquista da efetivação plena na empresa com acesso ao pacote completo de benefícios corporativos.',
        retrospectiveLearnings: [
          'Assinatura do termo de efetivação contratual',
          'Inclusão no plano de saúde e previdência',
          'Certificado de conclusão do programa Guardião 90 Dias',
        ],
      ),
    ];
  }
}
