class JobOpportunity {
  final String id;
  final String title;
  final String company;
  final String? companyLogo;
  final String location;
  final double distanceKm;
  final String transportTime;
  final String busLine;
  final String shift;
  final String salary;
  final int matchPercentage;
  final List<String> tags;
  final String description;

  const JobOpportunity({
    required this.id,
    required this.title,
    required this.company,
    this.companyLogo,
    required this.location,
    required this.distanceKm,
    required this.transportTime,
    required this.busLine,
    required this.shift,
    required this.salary,
    required this.matchPercentage,
    required this.tags,
    required this.description,
  });

  static List<JobOpportunity> getSampleJobs() {
    return const [
      JobOpportunity(
        id: 'JOB-101',
        title: 'Operador de Logística & Separação',
        company: 'Mercado Sul Distribuidora',
        location: 'CD Jaú - SP',
        distanceKm: 4.5,
        transportTime: '18 min direto',
        busLine: 'Circular Linha 102 (Direto Centro - Distrito)',
        shift: '12x36 Noturno (19h às 07h)',
        salary: 'R\$ 2.150,00 + Adic. Noturno',
        matchPercentage: 96,
        tags: ['Coletor WMS', 'Escala 12x36', 'Distrito Industrial Jaú'],
        description: 'Atuação na separação e expedição de pedidos no Distrito Industrial de Jaú. Linha circular direta e fácil acesso.',
      ),
      JobOpportunity(
        id: 'JOB-102',
        title: 'Operador de Empilhadeira Retrátil',
        company: 'TransLog Paulista',
        location: 'Polo Logístico Barra Bonita - SP',
        distanceKm: 12.0,
        transportTime: '25 min de ônibus',
        busLine: 'Intermunicipal Jaú x Barra Bonita',
        shift: '6x1 Tarde (14h às 22h20)',
        salary: 'R\$ 3.100,00 + Benefícios',
        matchPercentage: 91,
        tags: ['NR-11 Vigente', 'CNH B', 'Experiência Retrátil'],
        description: 'Movimentação e verticalização de cargas industriais no entreposto de Barra Bonita. Exige NR-11 atualizado e CNH B.',
      ),
      JobOpportunity(
        id: 'JOB-103',
        title: 'Auxiliar de Operações & Caixa',
        company: 'Rede Central Varejo',
        location: 'Loja 14 - Bariri Centro',
        distanceKm: 3.2,
        transportTime: '12 min a pé / ônibus',
        busLine: 'Linha Urbana Centro Bariri',
        shift: '6x1 Revezamento',
        salary: 'R\$ 1.840,00 + Quebra de Caixa',
        matchPercentage: 89,
        tags: ['Atendimento', 'Fácil Acesso Bariri', 'Início Rápido'],
        description: 'Operação de caixa e reposição de mercadorias no centro de Bariri. Excelente localização para moradores da cidade e região.',
      ),
      JobOpportunity(
        id: 'JOB-104',
        title: 'Auxiliar de Produção Industrial',
        company: 'Calçados & Couros Jaú S.A.',
        location: 'Polo Calçadista - Jaú - SP',
        distanceKm: 5.8,
        transportTime: '20 min com Fretado',
        busLine: 'Fretado da Empresa (Pontos em Jaú e Bariri)',
        shift: '5x2 Segunda a Sexta (07h às 16h48)',
        salary: 'R\$ 2.050,00 + Cesta Básica',
        matchPercentage: 78,
        tags: ['Fretado Gratuito', 'Finais de Semana Livres', 'Polo Regional'],
        description: 'Montagem e acabamento em linha contínua no tradicional polo industrial de Jaú. Empresa oferece transporte fretado para Jaú, Barra Bonita e Bariri.',
      ),
      JobOpportunity(
        id: 'JOB-105',
        title: 'Conferente de Expedição Noturno',
        company: 'AgroLog Centro-Oeste',
        location: 'Distrito Industrial - Bauru/Jaú',
        distanceKm: 18.5,
        transportTime: '45 min (2 conduções)',
        busLine: 'Linha Suburbana 410 + Circular',
        shift: '12x36 Noturno (19h às 07h)',
        salary: 'R\$ 2.480,00 + Adic. Noturno',
        matchPercentage: 62,
        tags: ['Conferência', 'Nota Fiscal', 'Escala 12x36'],
        description: 'Conferência de cargas e notas fiscais na doca de expedição. Distância moderada com necessidade de baldeação.',
      ),
    ];
  }
}
