import 'package:flutter/material.dart';
import '../models/onboarding_item.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';

class Onboarding90Screen extends StatefulWidget {
  final VoidCallback? onToggleTheme;

  const Onboarding90Screen({super.key, this.onToggleTheme});

  @override
  State<Onboarding90Screen> createState() => _Onboarding90ScreenState();
}

class _Onboarding90ScreenState extends State<Onboarding90Screen> {
  late List<OnboardingMilestone> _milestones;

  // Humor do dia selecionado
  String? _selectedMood = 'excelente';
  
  // Como foi o dia (nota / resumo)
  String _dailyNote =
      'Dia focado no manuseio do coletor WMS e separação no setor de picking. Consegui cumprir a meta do turno!';

  // Primeira impressão (editável)
  String _firstImpression =
      'Fui muito bem acolhido no CD Jaú! O supervisor Carlos me apresentou todo o setor de separação, a equipe foi receptiva no refeitório e a linha de ônibus 324 passou pontualmente.';

  // Map para guardar notas pré-programadas de retrospectiva de cada dia
  final Map<int, String> _customRetrospectiveNotes = {};

  // Mensagens Pré-Programadas para Feedback Diário (Zero Digitação em Horário de Serviço)
  static const List<String> _predefinedDailyFeedbacks = [
    'Dia produtivo no setor! Meta do turno concluída sem dificuldades.',
    'Rotina tranquila, linha de ônibus pontual e boa integração com a equipe.',
    'Ritmo intenso de operação hoje, mas EPIs e equipamentos funcionaram 100%.',
    'Tive pequena dúvida operacional no turno, já alinhada com o líder imediato.',
    'Atraso pontual na linha de transporte público hoje, preciso registrar ao RH.',
  ];

  // Mensagens Pré-Programadas para Primeira Impressão (Zero Digitação)
  static const List<String> _predefinedFirstImpressions = [
    'Fui muito bem acolhido no CD Jaú! Supervisor apresentou o setor, equipe receptiva e linha de ônibus pontual.',
    'Ótima recepção no primeiro dia! Kit de EPI entregue completo e instruções de segurança muito claras.',
    'Ambiente organizado e colegas prestativos. Adaptação inicial ao turno e refeitório foi excelente.',
    'Boa integração inicial, porém senti necessidade de mais prática no coletor WMS durante a primeira semana.',
  ];

  // Mensagens Pré-Programadas para Retrospectiva de Marcos (Zero Digitação)
  static const List<String> _predefinedRetrospectiveNotes = [
    'Adaptação 100% positiva neste marco! Horários, transporte e rotina operacional consolidados.',
    'Boa evolução técnica no setor e ótimo relacionamento com o supervisor e colegas de turno.',
    'Meta de produtividade atingida com segurança; gostaria apenas de reforço prático no equipamento.',
    'Necessito de breve alinhamento com o RH sobre escala de revezamento ou rota de ônibus.',
  ];

  // Motivos Pré-Programados para Pedido de Apoio Confidencial
  static const List<String> _predefinedAssistanceReasons = [
    '🚌 Atraso ou mudança na linha de ônibus / fretado',
    '⏰ Dúvida ou dificuldade de adaptação ao horário da escala',
    '🦺 Solicitação de troca ou ajuste de EPI / Uniforme',
    '🤝 Pedido de orientação com o líder de turno ou RH',
  ];
  String _selectedAssistanceReason = '🚌 Atraso ou mudança na linha de ônibus / fretado';

  final Set<String> _checkedLearnings = {
    '1-0', '1-1', '1-2', // Dia 1 itens concluídos
    '7-0', '7-1', '7-2', // Dia 7 itens concluídos
  };

  @override
  void initState() {
    super.initState();
    _milestones = OnboardingMilestone.getSampleMilestones();
  }

  // --- SELETOR DE HUMOR DIÁRIO ---
  void _onSelectMood(String mood, String label) {
    setState(() {
      _selectedMood = mood;
    });

    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          mood == 'cansado' || mood == 'ajuda'
              ? 'Seu relato foi registrado. A equipe de Gente & Gestão oferecerá apoio preventivo.'
              : 'Maravilha! Seu registro diário ($label) foi computado na sua jornada! ⭐',
        ),
        backgroundColor: mood == 'cansado' || mood == 'ajuda'
            ? AppTheme.amberWarning
            : AppTheme.emeraldPrimary,
        behavior: SnackBarBehavior.floating,
      ),
    );

    if (mood == 'ajuda') {
      _showAssistanceDialog();
    }
  }

  // --- MODAL PARA SELECIONAR COMO FOI O DIA (APENAS OPÇÕES PRÉ-PROGRAMADAS) ---
  void _showEditDailyNoteDialog() {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: isDark ? AppTheme.darkSurface : Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 20, 20, 24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 40,
                    height: 4,
                    decoration: BoxDecoration(
                      color: isDark ? Colors.white24 : Colors.black12,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    const Icon(Icons.touch_app, color: AppTheme.emeraldPrimary, size: 22),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Feedback Rápido em 1 Toque',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: isDark ? Colors.white : const Color(0xFF0F172A),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  'Toque em uma mensagem pré-programada abaixo (sem digitação para evitar uso do celular durante o turno de serviço):',
                  style: TextStyle(
                    fontSize: 11.5,
                    color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                  ),
                ),
                const SizedBox(height: 14),
                ..._predefinedDailyFeedbacks.map((msg) {
                  final isSelected = _dailyNote == msg;
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: InkWell(
                      onTap: () {
                        setState(() {
                          _dailyNote = msg;
                        });
                        Navigator.pop(ctx);
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('Feedback rápido registrado em 1 toque! ⭐'),
                            backgroundColor: AppTheme.emeraldPrimary,
                            behavior: SnackBarBehavior.floating,
                          ),
                        );
                      },
                      borderRadius: BorderRadius.circular(14),
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: isSelected
                              ? AppTheme.emeraldPrimary.withValues(alpha: 0.15)
                              : (isDark ? AppTheme.darkCard : const Color(0xFFF8FAFC)),
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(
                            color: isSelected
                                ? AppTheme.emeraldPrimary
                                : (isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
                            width: isSelected ? 1.5 : 1,
                          ),
                        ),
                        child: Row(
                          children: [
                            Icon(
                              isSelected ? Icons.check_circle : Icons.radio_button_unchecked,
                              color: isSelected
                                  ? AppTheme.emeraldPrimary
                                  : (isDark ? Colors.white54 : Colors.black45),
                              size: 18,
                            ),
                            const SizedBox(width: 10),
                            Expanded(
                              child: Text(
                                msg,
                                style: TextStyle(
                                  fontSize: 12,
                                  fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                                  color: isDark ? Colors.white : const Color(0xFF0F172A),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                }),
              ],
            ),
          ),
        );
      },
    );
  }

  // --- MODAL PARA SELECIONAR PRIMEIRA IMPRESSÃO (APENAS OPÇÕES PRÉ-PROGRAMADAS) ---
  void _showEditFirstImpressionModal() {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: isDark ? AppTheme.darkSurface : Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 20, 20, 24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 40,
                    height: 4,
                    decoration: BoxDecoration(
                      color: isDark ? Colors.white24 : Colors.black12,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(6),
                      decoration: BoxDecoration(
                        color: AppTheme.indigoAccent.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Icon(Icons.rate_review, color: AppTheme.indigoAccent, size: 20),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Text(
                        'Selecionar Primeira Impressão (1 Toque)',
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: isDark ? Colors.white : const Color(0xFF0F172A),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  'Escolha a opção pré-programada que melhor resume sua recepção no setor (sem necessidade de digitar):',
                  style: TextStyle(
                    fontSize: 11.5,
                    color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                  ),
                ),
                const SizedBox(height: 14),
                ..._predefinedFirstImpressions.map((msg) {
                  final isSelected = _firstImpression == msg;
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: InkWell(
                      onTap: () {
                        setState(() {
                          _firstImpression = msg;
                        });
                        Navigator.pop(ctx);
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('Primeira impressão atualizada em 1 toque! ✨'),
                            backgroundColor: AppTheme.emeraldPrimary,
                            behavior: SnackBarBehavior.floating,
                          ),
                        );
                      },
                      borderRadius: BorderRadius.circular(14),
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: isSelected
                              ? AppTheme.indigoAccent.withValues(alpha: 0.15)
                              : (isDark ? AppTheme.darkCard : const Color(0xFFF8FAFC)),
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(
                            color: isSelected
                                ? AppTheme.indigoAccent
                                : (isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
                            width: isSelected ? 1.5 : 1,
                          ),
                        ),
                        child: Row(
                          children: [
                            Icon(
                              isSelected ? Icons.check_circle : Icons.radio_button_unchecked,
                              color: isSelected
                                  ? AppTheme.indigoAccent
                                  : (isDark ? Colors.white54 : Colors.black45),
                              size: 18,
                            ),
                            const SizedBox(width: 10),
                            Expanded(
                              child: Text(
                                msg,
                                style: TextStyle(
                                  fontSize: 12,
                                  fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                                  color: isDark ? Colors.white : const Color(0xFF0F172A),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                }),
              ],
            ),
          ),
        );
      },
    );
  }

  // --- MODAL DE RETROSPECTIVA DO MARCO (APENAS MENSAGENS PRÉ-PROGRAMADAS) ---
  void _showRetrospectiveModal(BuildContext context, OnboardingMilestone item) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    String selectedRetroNote = _customRetrospectiveNotes[item.day] ?? item.retrospectiveNote;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: isDark ? AppTheme.darkSurface : Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return SafeArea(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 24),
                child: SingleChildScrollView(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Center(
                        child: Container(
                          width: 40,
                          height: 4,
                          decoration: BoxDecoration(
                            color: isDark ? Colors.white24 : Colors.black12,
                            borderRadius: BorderRadius.circular(2),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),

                      // Header da Retrospectiva
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: item.isCompleted
                                  ? (isDark ? AppTheme.emeraldPrimary.withValues(alpha: 0.2) : const Color(0xFFD1FAE5))
                                  : (isDark ? AppTheme.indigoAccent.withValues(alpha: 0.2) : const Color(0xFFE0E7FF)),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Text(
                              'RETROSPECTIVA • DIA ${item.day}',
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: item.isCompleted
                                    ? (isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark)
                                    : AppTheme.indigoAccent,
                              ),
                            ),
                          ),
                          const Spacer(),
                          Text(
                            item.dateEstimated,
                            style: TextStyle(
                              fontSize: 11,
                              color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),

                      Text(
                        item.title,
                        style: TextStyle(
                          fontSize: 17,
                          fontWeight: FontWeight.bold,
                          color: isDark ? Colors.white : const Color(0xFF0F172A),
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        item.description,
                        style: TextStyle(
                          fontSize: 12,
                          color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                          height: 1.3,
                        ),
                      ),
                      const SizedBox(height: 16),

                      // Aprendizados e Conquistas do Período
                      Text(
                        'Balanço & Aprendizados Validados (1 Toque):',
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.bold,
                          color: isDark ? Colors.white : const Color(0xFF0F172A),
                        ),
                      ),
                      const SizedBox(height: 8),

                      ...item.retrospectiveLearnings.asMap().entries.map((entry) {
                        final key = '${item.day}-${entry.key}';
                        final isDone = _checkedLearnings.contains(key);

                        return InkWell(
                          onTap: () {
                            setState(() {
                              if (isDone) {
                                _checkedLearnings.remove(key);
                              } else {
                                _checkedLearnings.add(key);
                              }
                            });
                            setModalState(() {});
                          },
                          borderRadius: BorderRadius.circular(10),
                          child: Padding(
                            padding: const EdgeInsets.symmetric(vertical: 4),
                            child: Row(
                              children: [
                                Icon(
                                  isDone ? Icons.check_circle : Icons.radio_button_unchecked,
                                  color: isDone ? AppTheme.emeraldPrimary : (isDark ? Colors.white38 : Colors.black26),
                                  size: 18,
                                ),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: Text(
                                    entry.value,
                                    style: TextStyle(
                                      fontSize: 12,
                                      decoration: isDone ? TextDecoration.lineThrough : null,
                                      color: isDone
                                          ? (isDark ? Colors.white70 : Colors.black87)
                                          : (isDark ? Colors.white38 : Colors.black38),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      }),

                      const SizedBox(height: 16),

                      // Seleção de Feedback Pré-Programado da Retrospectiva
                      Text(
                        'Feedback Pré-Programado do Marco (Zero Digitação):',
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.bold,
                          color: isDark ? Colors.white : const Color(0xFF0F172A),
                        ),
                      ),
                      const SizedBox(height: 8),

                      ..._predefinedRetrospectiveNotes.map((msg) {
                        final isSelected = selectedRetroNote == msg;
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 8),
                          child: InkWell(
                            onTap: () {
                              setModalState(() {
                                selectedRetroNote = msg;
                              });
                            },
                            borderRadius: BorderRadius.circular(12),
                            child: Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: isSelected
                                    ? AppTheme.emeraldPrimary.withValues(alpha: 0.15)
                                    : (isDark ? AppTheme.darkCard : const Color(0xFFF8FAFC)),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(
                                  color: isSelected
                                      ? AppTheme.emeraldPrimary
                                      : (isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
                                ),
                              ),
                              child: Row(
                                children: [
                                  Icon(
                                    isSelected ? Icons.check_circle : Icons.radio_button_unchecked,
                                    size: 16,
                                    color: isSelected
                                        ? AppTheme.emeraldPrimary
                                        : (isDark ? Colors.white54 : Colors.black45),
                                  ),
                                  const SizedBox(width: 8),
                                  Expanded(
                                    child: Text(
                                      msg,
                                      style: TextStyle(
                                        fontSize: 11.5,
                                        fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                                        color: isDark ? Colors.white : const Color(0xFF0F172A),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        );
                      }),

                      const SizedBox(height: 10),

                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: () {
                            setState(() {
                              _customRetrospectiveNotes[item.day] = selectedRetroNote;
                            });
                            // Sincroniza feedback com a API e o MariaDB
                            ApiService.sendFeedback(
                              candidateName: 'Rodrigo Almeida Santos',
                              day: 'Dia ${item.day}',
                              category: 'Retrospectiva',
                              message: selectedRetroNote,
                            );
                            Navigator.pop(ctx);
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text('Retrospectiva do Dia ${item.day} registrada em 1 toque! 🚀'),
                                backgroundColor: AppTheme.emeraldPrimary,
                                behavior: SnackBarBehavior.floating,
                              ),
                            );
                          },
                          icon: const Icon(Icons.check, size: 18),
                          label: const Text('Confirmar Feedback Pré-Programado'),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        );
      },
    );
  }

  // --- DIALOG DE PEDIDO DE APOIO CONFIDENCIAL (OPÇÕES PRÉ-PROGRAMADAS) ---
  void _showAssistanceDialog() {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    showDialog(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (context, setDialogState) {
          return AlertDialog(
            backgroundColor: isDark ? AppTheme.darkSurface : Colors.white,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            title: Row(
              children: [
                const Icon(Icons.support_agent, color: AppTheme.amberWarning),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Apoio Rápido (1 Toque)',
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: isDark ? Colors.white : const Color(0xFF0F172A),
                    ),
                  ),
                ),
              ],
            ),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Selecione o motivo abaixo com apenas 1 toque (sem digitar). O RH entrará em contato via WhatsApp:',
                  style: TextStyle(
                    fontSize: 11.5,
                    color: isDark ? const Color(0xFFCBD5E1) : const Color(0xFF475569),
                  ),
                ),
                const SizedBox(height: 12),
                ..._predefinedAssistanceReasons.map((reason) {
                  final selected = _selectedAssistanceReason == reason;
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 6),
                    child: InkWell(
                      onTap: () {
                        setDialogState(() {
                          _selectedAssistanceReason = reason;
                        });
                      },
                      borderRadius: BorderRadius.circular(10),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                        decoration: BoxDecoration(
                          color: selected
                              ? AppTheme.amberWarning.withValues(alpha: 0.15)
                              : (isDark ? AppTheme.darkCard : const Color(0xFFF8FAFC)),
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                            color: selected
                                ? AppTheme.amberWarning
                                : (isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
                          ),
                        ),
                        child: Row(
                          children: [
                            Icon(
                              selected ? Icons.check_circle : Icons.radio_button_unchecked,
                              size: 16,
                              color: selected ? AppTheme.amberWarning : Colors.grey,
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                reason,
                                style: TextStyle(
                                  fontSize: 11.5,
                                  fontWeight: selected ? FontWeight.bold : FontWeight.normal,
                                  color: isDark ? Colors.white : const Color(0xFF0F172A),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                }),
              ],
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: Text(
                  'Cancelar',
                  style: TextStyle(color: isDark ? Colors.white60 : Colors.black54),
                ),
              ),
              ElevatedButton(
                onPressed: () {
                  // Sincroniza alerta com MariaDB via API
                  ApiService.sendFeedback(
                    candidateName: 'Rodrigo Almeida Santos',
                    day: 'Dia 8 (Turno)',
                    category: 'Apoio/Alerta Operacional',
                    message: _selectedAssistanceReason,
                  );
                  Navigator.pop(ctx);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Alerta enviado: "$_selectedAssistanceReason". RH acionado no WhatsApp!'),
                      backgroundColor: AppTheme.emeraldPrimary,
                      behavior: SnackBarBehavior.floating,
                    ),
                  );
                },
                child: const Text('Enviar em 1 Toque'),
              ),
            ],
          );
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    
                    // Top row with theme switch
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(6),
                              decoration: BoxDecoration(
                                color: isDark
                                    ? AppTheme.indigoAccent.withValues(alpha: 0.2)
                                    : const Color(0xFFE0E7FF),
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: const Icon(Icons.verified, color: AppTheme.indigoAccent, size: 18),
                            ),
                            const SizedBox(width: 8),
                            Text(
                              'Guardião dos 90 Dias',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: isDark ? Colors.white : const Color(0xFF0F172A),
                              ),
                            ),
                          ],
                        ),
                        IconButton(
                          onPressed: widget.onToggleTheme,
                          icon: Icon(
                            isDark ? Icons.light_mode : Icons.dark_mode,
                            color: isDark ? AppTheme.amberWarning : const Color(0xFF6366F1),
                            size: 20,
                          ),
                          tooltip: isDark ? 'Modo Claro' : 'Modo Escuro',
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),

                    // ==========================================
                    // 1. MENSAGEM DE BOAS-VINDAS
                    // ==========================================
                    Container(
                      padding: const EdgeInsets.all(18),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: isDark
                              ? [const Color(0xFF1E293B), const Color(0xFF0F172A)]
                              : [const Color(0xFFEFF6FF), const Color(0xFFDBEAFE)],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(22),
                        border: Border.all(
                          color: isDark
                              ? AppTheme.indigoAccent.withValues(alpha: 0.3)
                              : const Color(0xFF93C5FD),
                        ),
                        boxShadow: isDark
                            ? null
                            : [
                                BoxShadow(
                                  color: const Color(0xFF3B82F6).withValues(alpha: 0.08),
                                  blurRadius: 10,
                                  offset: const Offset(0, 4),
                                )
                              ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Container(
                                width: 42,
                                height: 42,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  gradient: const LinearGradient(
                                    colors: [AppTheme.emeraldLight, AppTheme.indigoAccent],
                                  ),
                                  border: Border.all(color: Colors.white24, width: 2),
                                ),
                                child: const Center(
                                  child: Text('👋', style: TextStyle(fontSize: 20)),
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Seja muito bem-vindo(a)! 🎉',
                                      style: TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold,
                                        color: isDark ? Colors.white : const Color(0xFF0F172A),
                                      ),
                                    ),
                                    const SizedBox(height: 2),
                                    Text(
                                      'Carlos Henrique • Operador de Logística',
                                      style: TextStyle(
                                        fontSize: 12,
                                        fontWeight: FontWeight.w600,
                                        color: isDark ? const Color(0xFFA5B4FC) : const Color(0xFF3B82F6),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 12),
                          Text(
                            'Estamos muito felizes em ter você no time do CD Jaú! Este é o seu espaço diário de acolhimento e retrospectiva para garantir uma adaptação tranquila até sua efetivação.',
                            style: TextStyle(
                              fontSize: 11.5,
                              color: isDark ? const Color(0xFFCBD5E1) : const Color(0xFF334155),
                              height: 1.4,
                            ),
                          ),
                          const SizedBox(height: 10),
                          Wrap(
                            spacing: 6,
                            runSpacing: 6,
                            children: [
                              _buildPillBadge('Polo: CD Jaú - SP', Icons.location_on, isDark),
                              _buildPillBadge('Turno: 12x36 Noturno', Icons.schedule, isDark),
                              _buildPillBadge('Supervisor: Carlos M.', Icons.person_outline, isDark),
                            ],
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 14),

                    // ==========================================
                    // 2. CARD PRINCIPAL DE PROGRESSO (8 DE 90)
                    // ==========================================
                    Container(
                      padding: const EdgeInsets.all(18),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: isDark
                              ? [const Color(0xFF1E1B4B), const Color(0xFF0F172A)]
                              : [const Color(0xFF312E81), const Color(0xFF1E1B4B)],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(22),
                        border: Border.all(
                          color: AppTheme.indigoAccent.withValues(alpha: 0.4),
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                decoration: BoxDecoration(
                                  color: AppTheme.indigoAccent.withValues(alpha: 0.25),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: const Text(
                                  'JORNADA DE 90 DIAS',
                                  style: TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                    color: Color(0xFFA5B4FC),
                                  ),
                                ),
                              ),
                              const Text(
                                'Dia 8 de 90',
                                style: TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 10),
                          const Text(
                            'Rumo à Efetivação Estável',
                            style: TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 3),
                          const Text(
                            'Seu período de experiência está em dia e com 100% de assiduidade.',
                            style: TextStyle(
                              fontSize: 11,
                              color: Color(0xFFCBD5E1),
                            ),
                          ),
                          const SizedBox(height: 14),

                          // Barra de Progresso
                          ClipRRect(
                            borderRadius: BorderRadius.circular(8),
                            child: const LinearProgressIndicator(
                              value: 8 / 90,
                              minHeight: 7,
                              backgroundColor: Color(0xFF334155),
                              valueColor: AlwaysStoppedAnimation<Color>(
                                AppTheme.emeraldLight,
                              ),
                            ),
                          ),
                          const SizedBox(height: 8),
                          const Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Início (01/10/2026)',
                                style: TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
                              ),
                              Text(
                                'Efetivação (30/12/2026)',
                                style: TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.bold,
                                  color: AppTheme.emeraldLight,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 14),

                    // ==========================================
                    // 3. CAMPO PARA EDITAR PRIMEIRA IMPRESSÃO
                    // ==========================================
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: isDark ? AppTheme.darkCard : Colors.white,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: isDark
                              ? AppTheme.indigoAccent.withValues(alpha: 0.35)
                              : const Color(0xFFE2E8F0),
                        ),
                        boxShadow: isDark
                            ? null
                            : [
                                BoxShadow(
                                  color: Colors.black.withValues(alpha: 0.03),
                                  blurRadius: 8,
                                  offset: const Offset(0, 2),
                                )
                              ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                children: [
                                  Container(
                                    padding: const EdgeInsets.all(6),
                                    decoration: BoxDecoration(
                                      color: isDark
                                          ? AppTheme.indigoAccent.withValues(alpha: 0.2)
                                          : const Color(0xFFEEF2FF),
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    child: const Icon(
                                      Icons.rate_review_outlined,
                                      color: AppTheme.indigoAccent,
                                      size: 18,
                                    ),
                                  ),
                                  const SizedBox(width: 8),
                                  Text(
                                    'Minha Primeira Impressão',
                                    style: TextStyle(
                                      fontSize: 13.5,
                                      fontWeight: FontWeight.bold,
                                      color: isDark ? Colors.white : const Color(0xFF0F172A),
                                    ),
                                  ),
                                ],
                              ),
                              InkWell(
                                onTap: _showEditFirstImpressionModal,
                                borderRadius: BorderRadius.circular(8),
                                child: Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                                  decoration: BoxDecoration(
                                    color: isDark
                                        ? AppTheme.indigoAccent.withValues(alpha: 0.2)
                                        : const Color(0xFFEEF2FF),
                                    borderRadius: BorderRadius.circular(8),
                                    border: Border.all(
                                      color: AppTheme.indigoAccent.withValues(alpha: 0.4),
                                    ),
                                  ),
                                  child: const Row(
                                    children: [
                                      Icon(Icons.touch_app, size: 12, color: AppTheme.indigoAccent),
                                      SizedBox(width: 4),
                                      Text(
                                        'Opções (1 Toque)',
                                        style: TextStyle(
                                          fontSize: 10,
                                          fontWeight: FontWeight.bold,
                                          color: AppTheme.indigoAccent,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 10),
                          Container(
                            width: double.infinity,
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC),
                              borderRadius: BorderRadius.circular(14),
                              border: Border.all(
                                color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                              ),
                            ),
                            child: Text(
                              '"$_firstImpression"',
                              style: TextStyle(
                                fontSize: 11.5,
                                fontStyle: FontStyle.italic,
                                color: isDark ? const Color(0xFFCBD5E1) : const Color(0xFF475569),
                                height: 1.4,
                              ),
                            ),
                          ),
                          const SizedBox(height: 6),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Registrado no Dia 1 de Integração',
                                style: TextStyle(
                                  fontSize: 10,
                                  color: isDark ? const Color(0xFF64748B) : const Color(0xFF94A3B8),
                                ),
                              ),
                              Text(
                                'Visível para Gente & Gestão',
                                style: TextStyle(
                                  fontSize: 10,
                                  color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 14),

                    // ==========================================
                    // 4. COMO FOI O SEU DIA HOJE?
                    // ==========================================
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: isDark ? AppTheme.darkCard : Colors.white,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                children: [
                                  const Icon(Icons.wb_sunny_outlined, color: AppTheme.amberWarning, size: 18),
                                  const SizedBox(width: 8),
                                  Text(
                                    'Como foi o seu dia hoje?',
                                    style: TextStyle(
                                      fontSize: 13.5,
                                      fontWeight: FontWeight.bold,
                                      color: isDark ? Colors.white : const Color(0xFF0F172A),
                                    ),
                                  ),
                                ],
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                                decoration: BoxDecoration(
                                  color: isDark ? Colors.white10 : const Color(0xFFF1F5F9),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Text(
                                  'Diário • Confidencial',
                                  style: TextStyle(
                                    fontSize: 9,
                                    fontWeight: FontWeight.w600,
                                    color: isDark ? Colors.white70 : const Color(0xFF64748B),
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 6),
                          Text(
                            'Selecione seu humor e uma frase pré-programada em 1 toque (sem digitar em horário de serviço).',
                            style: TextStyle(
                              fontSize: 11,
                              color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                            ),
                          ),
                          const SizedBox(height: 12),

                          // Botões de Humor
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              _buildMoodOption('excelente', '😄 Excelente', isDark),
                              _buildMoodOption('tranquilo', '🙂 Bem', isDark),
                              _buildMoodOption('cansado', '😐 Cansativo', isDark),
                              _buildMoodOption('ajuda', '🆘 Preciso de Apoio', isDark),
                            ],
                          ),
                          const SizedBox(height: 10),

                          // Resumo de Como Foi o Dia (Toque para escolher frase pré-programada)
                          InkWell(
                            onTap: _showEditDailyNoteDialog,
                            borderRadius: BorderRadius.circular(12),
                            child: Container(
                              width: double.infinity,
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(
                                  color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                                ),
                              ),
                              child: Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      _dailyNote,
                                      style: TextStyle(
                                        fontSize: 11,
                                        color: isDark ? const Color(0xFFCBD5E1) : const Color(0xFF475569),
                                      ),
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                  const SizedBox(width: 8),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
                                    decoration: BoxDecoration(
                                      color: AppTheme.emeraldPrimary.withValues(alpha: 0.15),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: const Row(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        Icon(
                                          Icons.touch_app,
                                          size: 13,
                                          color: AppTheme.emeraldPrimary,
                                        ),
                                        SizedBox(width: 4),
                                        Text(
                                          'Trocar Frase',
                                          style: TextStyle(
                                            fontSize: 9.5,
                                            fontWeight: FontWeight.bold,
                                            color: AppTheme.emeraldPrimary,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 14),

                    // Card de Ajuda com Transporte / Escala
                    InkWell(
                      onTap: _showAssistanceDialog,
                      borderRadius: BorderRadius.circular(16),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        decoration: BoxDecoration(
                          color: isDark ? AppTheme.darkCard : Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: isDark
                                ? AppTheme.amberWarning.withValues(alpha: 0.3)
                                : AppTheme.amberWarning.withValues(alpha: 0.5),
                          ),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.help_outline, color: AppTheme.amberWarning, size: 20),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Dificuldade com transporte ou escala?',
                                    style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                      color: isDark ? Colors.white : const Color(0xFF0F172A),
                                    ),
                                  ),
                                  Text(
                                    'Fale com o suporte de Gente & Gestão antes de qualquer decisão.',
                                    style: TextStyle(
                                      fontSize: 10,
                                      color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Icon(Icons.chevron_right, color: isDark ? const Color(0xFF64748B) : const Color(0xFF94A3B8), size: 18),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),

                    // ==========================================
                    // 5. CABEÇALHO DA RETROSPECTIVA DOS 90 DIAS
                    // (SUBSTITUINDO OS CHECKPOINTS)
                    // ==========================================
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Retrospectiva dos 90 Dias',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: isDark ? Colors.white : const Color(0xFF0F172A),
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              'Balanço e evolução contínua em cada marco',
                              style: TextStyle(
                                fontSize: 11,
                                color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                              ),
                            ),
                          ],
                        ),
                        Text(
                          'Toque para abrir',
                          style: TextStyle(
                            fontSize: 10,
                            color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            // ==========================================
            // LISTA DE CARDS DE RETROSPECTIVA
            // ==========================================
            SliverPadding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              sliver: SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) {
                    final item = _milestones[index];
                    return _buildRetrospectiveCard(item, isDark);
                  },
                  childCount: _milestones.length,
                ),
              ),
            ),
            const SliverToBoxAdapter(child: SizedBox(height: 24)),
          ],
        ),
      ),
    );
  }

  // --- WIDGET HELPER: BADGE PILL ---
  Widget _buildPillBadge(String label, IconData icon, bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: isDark ? Colors.white10 : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: isDark ? Colors.white12 : const Color(0xFFE2E8F0),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 11, color: isDark ? const Color(0xFFA5B4FC) : const Color(0xFF4F46E5)),
          const SizedBox(width: 4),
          Text(
            label,
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w500,
              color: isDark ? const Color(0xFFCBD5E1) : const Color(0xFF475569),
            ),
          ),
        ],
      ),
    );
  }

  // --- WIDGET HELPER: OPÇÃO DE HUMOR ---
  Widget _buildMoodOption(String key, String label, bool isDark) {
    final isSelected = _selectedMood == key;
    return InkWell(
      onTap: () => _onSelectMood(key, label),
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected
              ? (isDark ? AppTheme.emeraldPrimary.withValues(alpha: 0.2) : const Color(0xFFD1FAE5))
              : (isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC)),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected
                ? AppTheme.emeraldPrimary
                : (isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
            width: isSelected ? 1.5 : 1,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 10,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
            color: isSelected
                ? (isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark)
                : (isDark ? Colors.white70 : Colors.black87),
          ),
        ),
      ),
    );
  }

  // --- WIDGET HELPER: CARD DE RETROSPECTIVA ---
  Widget _buildRetrospectiveCard(OnboardingMilestone item, bool isDark) {
    final note = _customRetrospectiveNotes[item.day] ?? item.retrospectiveNote;

    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: () => _showRetrospectiveModal(context, item),
        borderRadius: BorderRadius.circular(18),
        child: Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: isDark ? AppTheme.darkCard : Colors.white,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(
              color: item.isCompleted
                  ? (isDark ? AppTheme.emeraldPrimary.withValues(alpha: 0.4) : AppTheme.emeraldDark.withValues(alpha: 0.3))
                  : item.isCurrent
                  ? AppTheme.indigoAccent
                  : (isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
            ),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Badge de Dia
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: item.isCompleted
                      ? (isDark
                          ? AppTheme.emeraldPrimary.withValues(alpha: 0.15)
                          : AppTheme.emeraldDark.withValues(alpha: 0.1))
                      : item.isCurrent
                      ? AppTheme.indigoAccent.withValues(alpha: 0.2)
                      : (isDark ? const Color(0xFF1E293B) : const Color(0xFFF1F5F9)),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Center(
                  child: item.isCompleted
                      ? Icon(
                          Icons.check_circle,
                          color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
                          size: 20,
                        )
                      : Text(
                          'D${item.day}',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: item.isCurrent
                                ? const Color(0xFFA5B4FC)
                                : (isDark ? const Color(0xFF64748B) : const Color(0xFF94A3B8)),
                          ),
                        ),
                ),
              ),
              const SizedBox(width: 12),

              // Conteúdo da Retrospectiva
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            'Retrospectiva • ${item.title}',
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                              color: item.isCompleted || item.isCurrent
                                  ? (isDark ? Colors.white : const Color(0xFF0F172A))
                                  : (isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B)),
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        Text(
                          item.dateEstimated,
                          style: TextStyle(
                            fontSize: 10,
                            color: isDark ? const Color(0xFF64748B) : const Color(0xFF94A3B8),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      item.description,
                      style: TextStyle(
                        fontSize: 11,
                        color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                        height: 1.3,
                      ),
                    ),
                    if (note.isNotEmpty) ...[
                      const SizedBox(height: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF0F172A) : const Color(0xFFF1F5F9),
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(
                            color: isDark ? const Color(0xFF1E293B) : const Color(0xFFE2E8F0),
                          ),
                        ),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('💬 ', style: TextStyle(fontSize: 10)),
                            Expanded(
                              child: Text(
                                note,
                                style: TextStyle(
                                  fontSize: 10.5,
                                  fontStyle: FontStyle.italic,
                                  color: isDark ? const Color(0xFFCBD5E1) : const Color(0xFF475569),
                                ),
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                    const SizedBox(height: 6),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: item.isCompleted
                                ? (isDark
                                    ? AppTheme.emeraldPrimary.withValues(alpha: 0.1)
                                    : AppTheme.emeraldDark.withValues(alpha: 0.08))
                                : (isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC)),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            item.feedbackStatus,
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.w600,
                              color: item.isCompleted
                                  ? (isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark)
                                  : item.isCurrent
                                  ? const Color(0xFFA5B4FC)
                                  : (isDark ? const Color(0xFF64748B) : const Color(0xFF94A3B8)),
                            ),
                          ),
                        ),
                        Text(
                          'Ver Retrospectiva →',
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: isDark ? AppTheme.indigoAccent : const Color(0xFF4338CA),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
