import 'package:flutter/material.dart';
import '../models/chat_message.dart';
import '../theme/app_theme.dart';

class ChatScreeningScreen extends StatefulWidget {
  final String? initialJobTitle;
  final VoidCallback? onToggleTheme;

  const ChatScreeningScreen({
    super.key,
    this.initialJobTitle,
    this.onToggleTheme,
  });

  @override
  State<ChatScreeningScreen> createState() => _ChatScreeningScreenState();
}

class _ChatScreeningScreenState extends State<ChatScreeningScreen> {
  final TextEditingController _controller = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  bool _isTyping = false;
  bool _isPlayingAudio = false;
  int _step = 0;

  late List<ChatMessage> _messages;

  @override
  void initState() {
    super.initState();
    _resetChat();
  }

  @override
  void dispose() {
    _controller.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _resetChat() {
    setState(() {
      _step = 0;
      _isTyping = false;
      _isPlayingAudio = false;
      _messages = [
        const ChatMessage(
          text: 'Olá! Sou a Sofia, assistente de triagem da TalentFlow para vagas operacionais. Vi seu interesse na oportunidade!',
          isUser: false,
          time: '10:00',
        ),
        const ChatMessage(
          text: 'Para garantir que a vaga seja excelente para você e evite cansaço com transporte, vou te fazer 3 perguntas bem rápidas (leva menos de 1 minuto). Vamos lá?',
          isUser: false,
          time: '10:00',
          quickReplies: ['Sim, pode perguntar!', 'Qual é o salário antes?'],
        ),
      ];
    });
  }

  void _sendMessage(String text) {
    if (text.trim().isEmpty) return;

    setState(() {
      _messages.add(
        ChatMessage(
          text: text,
          isUser: true,
          time: '10:0${_messages.length + 1}',
        ),
      );
      _isTyping = true;
    });

    _controller.clear();
    _scrollToBottom();

    Future.delayed(const Duration(milliseconds: 700), () {
      if (!mounted) return;
      setState(() {
        _isTyping = false;
        if (_step == 0) {
          _messages.add(
            const ChatMessage(
              text: 'Maravilha! A vaga opera na escala 12x36 (trabalha um dia, folga o outro), no turno noturno das 19h às 07h. Você tem disponibilidade para essa escala?',
              isUser: false,
              time: '10:02',
              quickReplies: [
                'Sim, tenho total disponibilidade!',
                'Prefiro escala 6x1 diurna',
              ],
            ),
          );
          _step = 1;
        } else if (_step == 1) {
          _messages.add(
            const ChatMessage(
              text: 'Ótimo! Em qual bairro ou cidade você mora atualmente? E qual transporte costuma usar (ônibus, trem, moto ou a pé)?',
              isUser: false,
              time: '10:03',
              quickReplies: [
                'Jaú (Distrito Industrial / Linha 102)',
                'Barra Bonita (Intermunicipal direto)',
                'Bariri Centro (Linha Municipal)',
              ],
            ),
          );
          _step = 2;
        } else if (_step == 2) {
          _messages.add(
            const ChatMessage(
              text: 'Sensacional! 🎉 Seu perfil atingiu 96% de compatibilidade logística e operacional! A vaga fica a menos de 20 min da sua casa na linha circular direta sem baldeação.',
              isUser: false,
              time: '10:04',
            ),
          );
          _messages.add(
            const ChatMessage(
              text: 'Gostaria de agendar sua apresentação presencial com o supervisor Carlos para amanhã às 14h no CD Jaú?',
              isUser: false,
              time: '10:04',
              quickReplies: [
                'Sim, confirmo amanhã às 14h!',
                'Gostaria de outro horário',
              ],
            ),
          );
          _step = 3;
        } else {
          _messages.add(
            const ChatMessage(
              text: 'Perfeito! Seus dados foram validados com sucesso no sistema. Você receberá um lembrete com a rota de ônibus direto no seu WhatsApp! Boa sorte!',
              isUser: false,
              time: '10:05',
            ),
          );
          _step = 4;
        }
      });
      _scrollToBottom();
    });
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  void _togglePlayAudio() {
    setState(() {
      _isPlayingAudio = !_isPlayingAudio;
    });

    if (_isPlayingAudio) {
      Future.delayed(const Duration(seconds: 4), () {
        if (mounted && _isPlayingAudio) {
          setState(() {
            _isPlayingAudio = false;
          });
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: isDark ? AppTheme.emeraldPrimary : AppTheme.emeraldDark,
                shape: BoxShape.circle,
              ),
              child: Center(
                child: Text(
                  'TF',
                  style: TextStyle(
                    color: isDark ? const Color(0xFF0B0F19) : Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.initialJobTitle != null
                        ? 'Triagem: ${widget.initialJobTitle}'
                        : 'Sofia | Triagem Rápida',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: isDark ? Colors.white : const Color(0xFF0F172A),
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  Row(
                    children: [
                      Icon(
                        Icons.circle,
                        size: 8,
                        color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        _isTyping ? 'Sofia está digitando...' : 'Online • Oficial TalentFlow',
                        style: TextStyle(
                          fontSize: 10,
                          color: _isTyping
                              ? (isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark)
                              : (isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B)),
                          fontWeight: _isTyping ? FontWeight.bold : FontWeight.normal,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            onPressed: _resetChat,
            icon: const Icon(Icons.refresh, size: 20),
            tooltip: 'Reiniciar Triagem',
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
      body: Column(
        children: [
          // Banner de Acessibilidade & Áudio Simulado
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: isDark ? const Color(0xFF1E293B) : const Color(0xFFF1F5F9),
            child: Row(
              children: [
                Icon(
                  Icons.verified_user,
                  size: 14,
                  color: isDark ? AppTheme.tealAccent : const Color(0xFF0D9488),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Triagem de 1 minuto sem currículo longo. Perguntas diretas no estilo WhatsApp.',
                    style: TextStyle(
                      fontSize: 10,
                      color: isDark ? const Color(0xFFCBD5E1) : const Color(0xFF475569),
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Player de Áudio Simulado de Acessibilidade
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF0F172A) : const Color(0xFFE2E8F0),
              border: Border(
                bottom: BorderSide(
                  color: isDark ? const Color(0xFF334155) : const Color(0xFFCBD5E1),
                ),
              ),
            ),
            child: Row(
              children: [
                IconButton(
                  onPressed: _togglePlayAudio,
                  constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
                  padding: EdgeInsets.zero,
                  icon: Icon(
                    _isPlayingAudio ? Icons.pause_circle_filled : Icons.play_circle_filled,
                    color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
                    size: 24,
                  ),
                ),
                const SizedBox(width: 6),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _isPlayingAudio ? 'Reproduzindo mensagem de voz da Sofia...' : 'Ouvir mensagem de voz explicativa (0:18)',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          color: isDark ? Colors.white : const Color(0xFF0F172A),
                        ),
                      ),
                      Text(
                        'Acessibilidade por áudio para maior facilidade',
                        style: TextStyle(
                          fontSize: 9,
                          color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                        ),
                      ),
                    ],
                  ),
                ),
                Icon(
                  Icons.graphic_eq,
                  color: _isPlayingAudio
                      ? (isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark)
                      : Colors.grey,
                  size: 20,
                ),
              ],
            ),
          ),

          // Lista de Mensagens
          Expanded(
            child: Container(
              color: isDark ? const Color(0xFF0B0F19) : const Color(0xFFF8FAFC),
              child: ListView.builder(
                controller: _scrollController,
                padding: const EdgeInsets.all(16),
                itemCount: _messages.length + (_isTyping ? 1 : 0) + (_step >= 3 ? 1 : 0),
                itemBuilder: (context, index) {
                  if (index < _messages.length) {
                    final msg = _messages[index];
                    return _buildMessageItem(msg, isDark);
                  }

                  if (_isTyping && index == _messages.length) {
                    return _buildTypingIndicator(isDark);
                  }

                  // Card de Agendamento Concluído no Final
                  return _buildScheduleSuccessCard(isDark);
                },
              ),
            ),
          ),

          // Input e envio
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: isDark ? AppTheme.darkSurface : Colors.white,
              border: Border(
                top: BorderSide(
                  color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                ),
              ),
            ),
            child: SafeArea(
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      onSubmitted: _sendMessage,
                      decoration: InputDecoration(
                        hintText: 'Digite sua resposta ou toque nos botões acima...',
                        hintStyle: TextStyle(
                          color: isDark ? const Color(0xFF64748B) : const Color(0xFF94A3B8),
                          fontSize: 12,
                        ),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      ),
                      style: TextStyle(
                        fontSize: 13,
                        color: isDark ? Colors.white : const Color(0xFF0F172A),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    decoration: BoxDecoration(
                      color: isDark ? AppTheme.emeraldPrimary : AppTheme.emeraldDark,
                      shape: BoxShape.circle,
                    ),
                    child: IconButton(
                      icon: Icon(
                        Icons.send,
                        color: isDark ? const Color(0xFF0B0F19) : Colors.white,
                        size: 18,
                      ),
                      onPressed: () => _sendMessage(_controller.text),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTypingIndicator(bool isDark) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 6),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: isDark ? const Color(0xFF1E293B) : Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(
              width: 14,
              height: 14,
              child: CircularProgressIndicator(
                strokeWidth: 2,
                color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
              ),
            ),
            const SizedBox(width: 8),
            Text(
              'Sofia está digitando...',
              style: TextStyle(
                fontSize: 11,
                fontStyle: FontStyle.italic,
                color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildScheduleSuccessCard(bool isDark) {
    return Container(
      margin: const EdgeInsets.only(top: 12, bottom: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF064E3B).withValues(alpha: 0.3) : const Color(0xFFD1FAE5),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: isDark ? AppTheme.emeraldPrimary.withValues(alpha: 0.4) : const Color(0xFF059669),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.check_circle, color: Color(0xFF10B981), size: 20),
              const SizedBox(width: 8),
              Text(
                'Entrevista Pré-Agendada!',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: isDark ? Colors.white : const Color(0xFF064E3B),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            'Data: Amanhã às 14:00\nLocal: CD Jaú (Portaria 2 - RH Operacional)\nSupervisor: Carlos Ferreira\nLinha de Transporte: Circular Linha 102 (Ponto a 50m)',
            style: TextStyle(
              fontSize: 11,
              height: 1.4,
              color: isDark ? const Color(0xFFCBD5E1) : const Color(0xFF065F46),
            ),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Lembrete salvo na agenda do seu aparelho! 📅'),
                        backgroundColor: AppTheme.emeraldPrimary,
                        behavior: SnackBarBehavior.floating,
                      ),
                    );
                  },
                  icon: const Icon(Icons.calendar_today, size: 14),
                  label: const Text('Salvar na Agenda', style: TextStyle(fontSize: 11)),
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Rota da Linha 324 carregada com sucesso! 🚌'),
                        behavior: SnackBarBehavior.floating,
                      ),
                    );
                  },
                  icon: const Icon(Icons.directions, size: 14),
                  label: const Text('Ver no Mapa', style: TextStyle(fontSize: 11)),
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMessageItem(ChatMessage msg, bool isDark) {
    return Column(
      crossAxisAlignment:
          msg.isUser ? CrossAxisAlignment.end : CrossAxisAlignment.start,
      children: [
        Container(
          margin: const EdgeInsets.symmetric(vertical: 4),
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
          constraints: BoxConstraints(
            maxWidth: MediaQuery.of(context).size.width * 0.8,
          ),
          decoration: BoxDecoration(
            color: msg.isUser
                ? (isDark ? AppTheme.emeraldPrimary : AppTheme.emeraldDark)
                : (isDark ? const Color(0xFF1E293B) : Colors.white),
            borderRadius: BorderRadius.only(
              topLeft: const Radius.circular(16),
              topRight: const Radius.circular(16),
              bottomLeft: Radius.circular(msg.isUser ? 16 : 4),
              bottomRight: Radius.circular(msg.isUser ? 4 : 16),
            ),
            border: Border.all(
              color: msg.isUser
                  ? (isDark ? AppTheme.emeraldPrimary : AppTheme.emeraldDark)
                  : (isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
            ),
            boxShadow: isDark
                ? null
                : [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.03),
                      blurRadius: 4,
                      offset: const Offset(0, 2),
                    )
                  ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                msg.text,
                style: TextStyle(
                  color: msg.isUser
                      ? (isDark ? const Color(0xFF0B0F19) : Colors.white)
                      : (isDark ? Colors.white : const Color(0xFF0F172A)),
                  fontSize: 13,
                  fontWeight: msg.isUser ? FontWeight.w600 : FontWeight.normal,
                  height: 1.35,
                ),
              ),
              const SizedBox(height: 4),
              Align(
                alignment: Alignment.bottomRight,
                child: Text(
                  msg.time,
                  style: TextStyle(
                    fontSize: 9,
                    color: msg.isUser
                        ? (isDark ? Colors.black54 : Colors.white70)
                        : (isDark ? Colors.white38 : const Color(0xFF94A3B8)),
                  ),
                ),
              ),
            ],
          ),
        ),

        // Quick Reply Buttons (Pills)
        if (!msg.isUser && msg.quickReplies != null)
          Padding(
            padding: const EdgeInsets.only(top: 4, bottom: 8),
            child: Wrap(
              spacing: 6,
              runSpacing: 6,
              children: msg.quickReplies!.map((reply) {
                return ActionChip(
                  label: Text(
                    reply,
                    style: TextStyle(
                      fontSize: 11,
                      color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  backgroundColor: isDark ? AppTheme.darkCard : Colors.white,
                  side: BorderSide(
                    color: isDark ? AppTheme.emeraldPrimary : AppTheme.emeraldDark,
                    width: 0.8,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  onPressed: () => _sendMessage(reply),
                );
              }).toList(),
            ),
          ),
      ],
    );
  }
}
