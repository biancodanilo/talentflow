import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'home_shell.dart';

class LoginScreen extends StatefulWidget {
  final VoidCallback? onToggleTheme;

  const LoginScreen({super.key, this.onToggleTheme});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  // 'login' | 'register'
  String _mode = 'login';

  // Login controllers
  final TextEditingController _cpfController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool _obscurePassword = true;
  bool _rememberMe = true;

  // Cadastro de Candidato controllers & states
  final TextEditingController _regNameController = TextEditingController();
  final TextEditingController _regCpfController = TextEditingController();
  final TextEditingController _regPhoneController = TextEditingController();
  final TextEditingController _regBusLineController = TextEditingController();
  final TextEditingController _regPasswordController = TextEditingController();
  String _regCity = 'Jaú - SP';
  String _regShift = '12x36 Noturno';
  final Set<String> _regSkills = {'Coletor WMS', 'Início Imediato'};
  bool _regAcceptedLgpd = true;

  static const List<String> _availableSkills = [
    'Coletor WMS',
    'Empilhadeira NR-11',
    'Separação & Picking',
    'Operação de Caixa',
    'Produção Industrial',
    'CNH B',
    'Início Imediato',
  ];

  @override
  void dispose() {
    _cpfController.dispose();
    _passwordController.dispose();
    _regNameController.dispose();
    _regCpfController.dispose();
    _regPhoneController.dispose();
    _regBusLineController.dispose();
    _regPasswordController.dispose();
    super.dispose();
  }

  void _navigateToHome({String? welcomeMessage}) {
    if (welcomeMessage != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(welcomeMessage),
          backgroundColor: AppTheme.emeraldPrimary,
          behavior: SnackBarBehavior.floating,
        ),
      );
    }
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (context) => const HomeShell()),
    );
  }

  void _handleRegisterCandidate() {
    final name = _regNameController.text.trim();
    final cpfOrPhone = _regCpfController.text.trim().isNotEmpty
        ? _regCpfController.text.trim()
        : _regPhoneController.text.trim();

    if (name.isEmpty || cpfOrPhone.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Preencha ao menos seu Nome Completo e CPF ou WhatsApp para concluir o cadastro.'),
          backgroundColor: AppTheme.amberWarning,
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    if (!_regAcceptedLgpd) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('É necessário aceitar o Termo de Consentimento LGPD para continuar.'),
          backgroundColor: AppTheme.amberWarning,
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    _navigateToHome(
      welcomeMessage: 'Cadastro de $name realizado com sucesso! Bem-vindo(a) ao TalentFlow ($_regCity). 🎉',
    );
  }

  void _showForgotPasswordModal() {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final phoneCtrl = TextEditingController(text: _cpfController.text);
    final codeCtrl = TextEditingController(text: '482910');
    final newPassCtrl = TextEditingController();
    int step = 1; // 1: Solicitar código, 2: Validar código e nova senha

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
                padding: EdgeInsets.only(
                  left: 20,
                  right: 20,
                  top: 20,
                  bottom: MediaQuery.of(ctx).viewInsets.bottom + 24,
                ),
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
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: AppTheme.emeraldPrimary.withValues(alpha: 0.15),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Icon(Icons.lock_reset, color: AppTheme.emeraldPrimary, size: 22),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Recuperação de Senha',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: isDark ? Colors.white : const Color(0xFF0F172A),
                                ),
                              ),
                              Text(
                                step == 1
                                    ? 'Passo 1 de 2 • Receba um código via WhatsApp ou SMS'
                                    : 'Passo 2 de 2 • Confirme o código e defina sua nova senha',
                                style: TextStyle(
                                  fontSize: 11,
                                  color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    if (step == 1) ...[
                      Text(
                        'Informe seu CPF ou Celular WhatsApp cadastrado:',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: isDark ? const Color(0xFFCBD5E1) : const Color(0xFF334155),
                        ),
                      ),
                      const SizedBox(height: 6),
                      TextField(
                        controller: phoneCtrl,
                        keyboardType: TextInputType.phone,
                        decoration: const InputDecoration(
                          hintText: '000.000.000-00 ou (14) 98888-0000',
                          prefixIcon: Icon(Icons.phone_android, size: 18),
                        ),
                      ),
                      const SizedBox(height: 16),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: () {
                            setModalState(() {
                              step = 2;
                            });
                          },
                          icon: const Icon(Icons.send_to_mobile, size: 18),
                          label: const Text('Enviar Código no WhatsApp'),
                        ),
                      ),
                    ] else ...[
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: AppTheme.emeraldPrimary.withValues(alpha: 0.12),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Row(
                          children: [
                            Icon(Icons.check_circle, color: AppTheme.emeraldPrimary, size: 16),
                            SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                'Código de 6 dígitos enviado para seu WhatsApp! (Preenchido para demonstração)',
                                style: TextStyle(fontSize: 11, color: AppTheme.emeraldPrimary),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        'Código de Verificação (6 dígitos)',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: isDark ? const Color(0xFFCBD5E1) : const Color(0xFF334155),
                        ),
                      ),
                      const SizedBox(height: 6),
                      TextField(
                        controller: codeCtrl,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          hintText: '482910',
                          prefixIcon: Icon(Icons.verified_outlined, size: 18),
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        'Nova Senha de Acesso',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: isDark ? const Color(0xFFCBD5E1) : const Color(0xFF334155),
                        ),
                      ),
                      const SizedBox(height: 6),
                      TextField(
                        controller: newPassCtrl,
                        obscureText: true,
                        decoration: const InputDecoration(
                          hintText: 'Digite sua nova senha (mín. 6 caracteres)',
                          prefixIcon: Icon(Icons.lock_outline, size: 18),
                        ),
                      ),
                      const SizedBox(height: 16),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: () {
                            Navigator.pop(ctx);
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Senha redefinida com sucesso! Você já pode acessar sua conta. 🔐'),
                                backgroundColor: AppTheme.emeraldPrimary,
                                behavior: SnackBarBehavior.floating,
                              ),
                            );
                          },
                          icon: const Icon(Icons.check_circle_outline, size: 18),
                          label: const Text('Confirmar Nova Senha'),
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 440),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Top bar with Theme toggle
                  Align(
                    alignment: Alignment.topRight,
                    child: IconButton(
                      onPressed: widget.onToggleTheme,
                      icon: Icon(
                        isDark ? Icons.light_mode : Icons.dark_mode,
                        color: isDark ? AppTheme.amberWarning : const Color(0xFF6366F1),
                        size: 22,
                      ),
                      tooltip: isDark ? 'Modo Claro' : 'Modo Escuro',
                    ),
                  ),

                  // App Logo & Brand Header
                  Center(
                    child: Container(
                      width: 62,
                      height: 62,
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(
                          colors: [AppTheme.emeraldPrimary, AppTheme.tealAccent],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: [
                          BoxShadow(
                            color: AppTheme.emeraldPrimary.withValues(alpha: 0.3),
                            blurRadius: 18,
                            offset: const Offset(0, 6),
                          ),
                        ],
                      ),
                      child: const Center(
                        child: Icon(
                          Icons.bolt_rounded,
                          size: 34,
                          color: Color(0xFF0B0F19),
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 14),

                  Text(
                    'TalentFlow',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 25,
                      fontWeight: FontWeight.w900,
                      letterSpacing: -0.5,
                      color: isDark ? Colors.white : const Color(0xFF0F172A),
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    'Portal Mobile do Candidato Operacional',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 12.5,
                      fontWeight: FontWeight.w500,
                      color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Seletor de Modo: Entrar vs Cadastrar Candidato
                  Container(
                    padding: const EdgeInsets.all(4),
                    decoration: BoxDecoration(
                      color: isDark ? AppTheme.darkCard : const Color(0xFFE2E8F0),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Row(
                      children: [
                        Expanded(
                          child: GestureDetector(
                            onTap: () => setState(() => _mode = 'login'),
                            child: Container(
                              padding: const EdgeInsets.symmetric(vertical: 10),
                              decoration: BoxDecoration(
                                color: _mode == 'login'
                                    ? AppTheme.emeraldPrimary
                                    : Colors.transparent,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Text(
                                'Entrar na Conta',
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                  color: _mode == 'login'
                                      ? const Color(0xFF0B0F19)
                                      : (isDark ? Colors.white70 : Colors.black54),
                                ),
                              ),
                            ),
                          ),
                        ),
                        Expanded(
                          child: GestureDetector(
                            onTap: () => setState(() => _mode = 'register'),
                            child: Container(
                              padding: const EdgeInsets.symmetric(vertical: 10),
                              decoration: BoxDecoration(
                                color: _mode == 'register'
                                    ? AppTheme.emeraldPrimary
                                    : Colors.transparent,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Text(
                                'Cadastrar Candidato',
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                  color: _mode == 'register'
                                      ? const Color(0xFF0B0F19)
                                      : (isDark ? Colors.white70 : Colors.black54),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 18),

                  // Card Principal (Login ou Cadastro)
                  Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: isDark ? AppTheme.darkCard : Colors.white,
                      borderRadius: BorderRadius.circular(24),
                      border: Border.all(
                        color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                      ),
                      boxShadow: isDark
                          ? null
                          : [
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.04),
                                blurRadius: 12,
                                offset: const Offset(0, 4),
                              ),
                            ],
                    ),
                    child: _mode == 'login'
                        ? _buildLoginForm(isDark)
                        : _buildRegisterForm(isDark),
                  ),

                  const SizedBox(height: 18),

                  // Selo de Segurança e LGPD
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.verified_user_outlined,
                        size: 14,
                        color: isDark ? AppTheme.tealAccent : const Color(0xFF0D9488),
                      ),
                      const SizedBox(width: 6),
                      Flexible(
                        child: Text(
                          'Ambiente Seguro • Dados Protegidos pela LGPD (Art. 20)',
                          style: TextStyle(
                            fontSize: 11,
                            color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildLoginForm(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          'Acesse sua Conta',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: isDark ? Colors.white : const Color(0xFF0F172A),
          ),
        ),
        const SizedBox(height: 4),
        Text(
          'Entre com seu CPF ou WhatsApp cadastrado para ver seu Match Logístico.',
          style: TextStyle(
            fontSize: 11,
            color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
          ),
        ),
        const SizedBox(height: 16),

        // Campo CPF / WhatsApp
        Text(
          'CPF ou Celular WhatsApp',
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: isDark ? const Color(0xFFCBD5E1) : const Color(0xFF334155),
          ),
        ),
        const SizedBox(height: 6),
        TextField(
          controller: _cpfController,
          keyboardType: TextInputType.phone,
          decoration: const InputDecoration(
            hintText: '000.000.000-00 ou (14) 98741-2234',
            prefixIcon: Icon(Icons.person_outline, size: 20),
            contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 12),
          ),
        ),

        const SizedBox(height: 14),

        // Campo Senha / Código
        Text(
          'Senha de Acesso',
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: isDark ? const Color(0xFFCBD5E1) : const Color(0xFF334155),
          ),
        ),
        const SizedBox(height: 6),
        TextField(
          controller: _passwordController,
          obscureText: _obscurePassword,
          decoration: InputDecoration(
            hintText: '••••••••',
            prefixIcon: const Icon(Icons.lock_outline, size: 20),
            suffixIcon: IconButton(
              icon: Icon(
                _obscurePassword ? Icons.visibility_off : Icons.visibility,
                size: 18,
              ),
              onPressed: () {
                setState(() {
                  _obscurePassword = !_obscurePassword;
                });
              },
            ),
            contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
          ),
        ),

        const SizedBox(height: 10),

        // Lembrar de mim e Esqueci a Senha
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                SizedBox(
                  width: 22,
                  height: 22,
                  child: Checkbox(
                    value: _rememberMe,
                    activeColor: AppTheme.emeraldPrimary,
                    onChanged: (val) {
                      setState(() {
                        _rememberMe = val ?? true;
                      });
                    },
                  ),
                ),
                const SizedBox(width: 6),
                Text(
                  'Lembrar acesso',
                  style: TextStyle(
                    fontSize: 11,
                    color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                  ),
                ),
              ],
            ),
            TextButton(
              onPressed: _showForgotPasswordModal,
              style: TextButton.styleFrom(
                padding: EdgeInsets.zero,
                minimumSize: Size.zero,
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
              ),
              child: Text(
                'Esqueci a senha?',
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.bold,
                  color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
                ),
              ),
            ),
          ],
        ),

        const SizedBox(height: 16),

        // Botão Entrar
        ElevatedButton.icon(
          onPressed: () => _navigateToHome(),
          icon: const Icon(Icons.login, size: 18),
          label: const Text('Entrar no TalentFlow'),
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(vertical: 14),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(14),
            ),
          ),
        ),

        const SizedBox(height: 10),

        // Botão Ir para Cadastro
        OutlinedButton.icon(
          onPressed: () => setState(() => _mode = 'register'),
          icon: const Icon(Icons.person_add_alt_1, size: 16),
          label: const Text('Novo por aqui? Criar Cadastro de Candidato'),
          style: OutlinedButton.styleFrom(
            padding: const EdgeInsets.symmetric(vertical: 12),
            foregroundColor: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
            side: BorderSide(
              color: isDark
                  ? AppTheme.emeraldPrimary.withValues(alpha: 0.5)
                  : AppTheme.emeraldDark.withValues(alpha: 0.4),
            ),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(14),
            ),
          ),
        ),

        const SizedBox(height: 8),

        // Botão Entrar como Convidado
        TextButton.icon(
          onPressed: () => _navigateToHome(),
          icon: const Icon(Icons.explore_outlined, size: 15),
          label: const Text(
            'Explorar Vagas sem Cadastro (Modo Demo)',
            style: TextStyle(fontSize: 11.5),
          ),
        ),
      ],
    );
  }

  Widget _buildRegisterForm(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          'Cadastro Rápido de Candidato',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: isDark ? Colors.white : const Color(0xFF0F172A),
          ),
        ),
        const SizedBox(height: 4),
        Text(
          'Cadastre seu perfil em 1 minuto para calcular a bateria de Match com vagas perto da sua casa.',
          style: TextStyle(
            fontSize: 11,
            color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
          ),
        ),
        const SizedBox(height: 14),

        // Nome Completo
        TextField(
          controller: _regNameController,
          decoration: const InputDecoration(
            labelText: 'Nome Completo *',
            hintText: 'Ex: Rodrigo Almeida Santos',
            prefixIcon: Icon(Icons.badge_outlined, size: 18),
            isDense: true,
          ),
        ),
        const SizedBox(height: 10),

        // CPF e WhatsApp
        Row(
          children: [
            Expanded(
              child: TextField(
                controller: _regCpfController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: 'CPF *',
                  hintText: '000.000.000-00',
                  prefixIcon: Icon(Icons.credit_card, size: 18),
                  isDense: true,
                ),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: TextField(
                controller: _regPhoneController,
                keyboardType: TextInputType.phone,
                decoration: const InputDecoration(
                  labelText: 'WhatsApp *',
                  hintText: '(14) 99999-0000',
                  prefixIcon: Icon(Icons.chat_outlined, size: 18),
                  isDense: true,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),

        // Cidade / Polo e Escala
        Row(
          children: [
            Expanded(
              child: DropdownButtonFormField<String>(
                initialValue: _regCity,
                decoration: const InputDecoration(
                  labelText: 'Cidade / Polo',
                  isDense: true,
                  contentPadding: EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                ),
                items: const [
                  DropdownMenuItem(value: 'Jaú - SP', child: Text('Jaú - SP', style: TextStyle(fontSize: 12))),
                  DropdownMenuItem(value: 'Barra Bonita - SP', child: Text('Barra Bonita - SP', style: TextStyle(fontSize: 12))),
                  DropdownMenuItem(value: 'Bariri - SP', child: Text('Bariri - SP', style: TextStyle(fontSize: 12))),
                  DropdownMenuItem(value: 'Bauru / Região', child: Text('Bauru / Região', style: TextStyle(fontSize: 12))),
                ],
                onChanged: (v) {
                  if (v != null) setState(() => _regCity = v);
                },
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: DropdownButtonFormField<String>(
                initialValue: _regShift,
                decoration: const InputDecoration(
                  labelText: 'Escala Preferida',
                  isDense: true,
                  contentPadding: EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                ),
                items: const [
                  DropdownMenuItem(value: '12x36 Noturno', child: Text('12x36 Noturno', style: TextStyle(fontSize: 12))),
                  DropdownMenuItem(value: '6x1 Revezamento', child: Text('6x1 Revezamento', style: TextStyle(fontSize: 12))),
                  DropdownMenuItem(value: '5x2 Comercial', child: Text('5x2 Comercial', style: TextStyle(fontSize: 12))),
                ],
                onChanged: (v) {
                  if (v != null) setState(() => _regShift = v);
                },
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),

        // Bairro / Linha de Ônibus
        TextField(
          controller: _regBusLineController,
          decoration: const InputDecoration(
            labelText: 'Bairro ou Linha de Ônibus Principal',
            hintText: 'Ex: Vila Maria • Circular Linha 102',
            prefixIcon: Icon(Icons.directions_bus_outlined, size: 18),
            isDense: true,
          ),
        ),
        const SizedBox(height: 10),

        // Senha
        TextField(
          controller: _regPasswordController,
          obscureText: true,
          decoration: const InputDecoration(
            labelText: 'Criar Senha de Acesso *',
            hintText: 'Mínimo de 6 caracteres',
            prefixIcon: Icon(Icons.lock_outline, size: 18),
            isDense: true,
          ),
        ),
        const SizedBox(height: 12),

        // Habilidades Práticas (1 Toque)
        Text(
          'Suas Experiências Práticas (Toque para marcar):',
          style: TextStyle(
            fontSize: 11.5,
            fontWeight: FontWeight.w600,
            color: isDark ? const Color(0xFFCBD5E1) : const Color(0xFF334155),
          ),
        ),
        const SizedBox(height: 6),
        Wrap(
          spacing: 6,
          runSpacing: 6,
          children: _availableSkills.map((skill) {
            final selected = _regSkills.contains(skill);
            return FilterChip(
              label: Text(skill, style: const TextStyle(fontSize: 10.5)),
              selected: selected,
              selectedColor: AppTheme.emeraldPrimary.withValues(alpha: 0.25),
              checkmarkColor: AppTheme.emeraldPrimary,
              onSelected: (val) {
                setState(() {
                  if (val) {
                    _regSkills.add(skill);
                  } else {
                    _regSkills.remove(skill);
                  }
                });
              },
            );
          }).toList(),
        ),
        const SizedBox(height: 10),

        // Aceite LGPD
        Row(
          children: [
            SizedBox(
              width: 22,
              height: 22,
              child: Checkbox(
                value: _regAcceptedLgpd,
                activeColor: AppTheme.emeraldPrimary,
                onChanged: (val) => setState(() => _regAcceptedLgpd = val ?? false),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                'Aceito os Termos de Uso e o Tratamento de Dados Logísticos conforme a LGPD (Art. 7º e 20).',
                style: TextStyle(
                  fontSize: 10.5,
                  color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 14),

        ElevatedButton.icon(
          onPressed: _handleRegisterCandidate,
          icon: const Icon(Icons.check_circle_outline, size: 18),
          label: const Text('Concluir Cadastro e Ver Vagas'),
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(vertical: 14),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(14),
            ),
          ),
        ),
      ],
    );
  }
}
