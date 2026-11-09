import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'login_screen.dart';

class ProfileLgpdScreen extends StatefulWidget {
  final VoidCallback? onToggleTheme;

  const ProfileLgpdScreen({super.key, this.onToggleTheme});

  @override
  State<ProfileLgpdScreen> createState() => _ProfileLgpdScreenState();
}

class _ProfileLgpdScreenState extends State<ProfileLgpdScreen> {
  double _maxDistanceKm = 20.0;
  bool _pref12x36 = true;
  bool _pref6x1 = false;
  bool _pref5x2 = true;
  bool _allowWhatsAppAlerts = true;

  void _showHumanReviewRequestDialog() {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    String selectedReason = 'Mudança recente de bairro / linha de ônibus direta';
    const predefinedReasons = [
      'Mudança recente de bairro / linha de ônibus direta',
      'Possuo transporte próprio (moto/carro) sem depender de ônibus',
      'Disponibilidade total para troca de turno (12x36 ou 6x1)',
      'Certificado técnico / NR atualizado recentemente',
    ];

    showDialog(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (context, setDialogState) {
          return AlertDialog(
            backgroundColor: isDark ? AppTheme.darkSurface : Colors.white,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            title: Row(
              children: [
                Icon(
                  Icons.gavel,
                  color: isDark ? AppTheme.tealAccent : const Color(0xFF0D9488),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Revisão Humana de IA (1 Toque)',
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
                  'Garantia do Artigo 20 da LGPD — Selecione o motivo pré-programado (sem digitar):',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    color: isDark ? AppTheme.tealAccent : const Color(0xFF0D9488),
                  ),
                ),
                const SizedBox(height: 10),
                ...predefinedReasons.map((r) {
                  final isSel = selectedReason == r;
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 6),
                    child: InkWell(
                      onTap: () {
                        setDialogState(() {
                          selectedReason = r;
                        });
                      },
                      borderRadius: BorderRadius.circular(10),
                      child: Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: isSel
                              ? AppTheme.tealAccent.withValues(alpha: 0.15)
                              : (isDark ? AppTheme.darkCard : const Color(0xFFF8FAFC)),
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                            color: isSel
                                ? AppTheme.tealAccent
                                : (isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
                          ),
                        ),
                        child: Row(
                          children: [
                            Icon(
                              isSel ? Icons.check_circle : Icons.radio_button_unchecked,
                              size: 16,
                              color: isSel ? AppTheme.tealAccent : Colors.grey,
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                r,
                                style: TextStyle(
                                  fontSize: 11.5,
                                  fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
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
                  Navigator.pop(ctx);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Revisão Humana protocolada ($selectedReason)!'),
                      backgroundColor: AppTheme.emeraldPrimary,
                      behavior: SnackBarBehavior.floating,
                    ),
                  );
                },
                child: const Text('Protocolar em 1 Toque'),
              ),
            ],
          );
        },
      ),
    );
  }

  void _showDataInspectionDialog() {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: isDark ? AppTheme.darkSurface : Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Row(
          children: [
            Icon(Icons.privacy_tip, color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark),
            const SizedBox(width: 8),
            Text(
              'Dados Cadastrados (Art. 18)',
              style: TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.bold,
                color: isDark ? Colors.white : const Color(0xFF0F172A),
              ),
            ),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildDataRow('Nome Completo:', 'Rodrigo Almeida', isDark),
            _buildDataRow('Telefone WhatsApp:', '(11) 98741-2234', isDark),
            _buildDataRow('Bairro / Cidade:', 'Santana de Parnaíba - SP', isDark),
            _buildDataRow('Linha de Ônibus Principal:', 'Linha 324 EMTU', isDark),
            _buildDataRow('Distância Máxima Aceita:', '${_maxDistanceKm.toInt()} km', isDark),
            _buildDataRow('Finalidade do Tratamento:', 'Intermediação e Matching Operacional', isDark),
            _buildDataRow('Base Legal LGPD:', 'Execução de Contrato e Consentimento Expresso', isDark),
          ],
        ),
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Entendido'),
          ),
        ],
      ),
    );
  }

  Widget _buildDataRow(String label, String value, bool isDark) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.bold,
              color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
            ),
          ),
          const SizedBox(width: 6),
          Expanded(
            child: Text(
              value,
              style: TextStyle(
                fontSize: 11,
                color: isDark ? Colors.white : const Color(0xFF0F172A),
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header do Perfil com botão de Tema
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 54,
                        height: 54,
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: isDark
                                ? [AppTheme.emeraldPrimary, AppTheme.tealAccent]
                                : [AppTheme.emeraldDark, AppTheme.tealAccent],
                          ),
                          shape: BoxShape.circle,
                        ),
                        child: Center(
                          child: Text(
                            'RA',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: isDark ? const Color(0xFF0B0F19) : Colors.white,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 14),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Rodrigo Almeida',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: isDark ? Colors.white : const Color(0xFF0F172A),
                            ),
                          ),
                          Text(
                            'Santana de Parnaíba - SP • (11) 98741-2234',
                            style: TextStyle(
                              fontSize: 11,
                              color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                            ),
                          ),
                          const SizedBox(height: 2),
                          Row(
                            children: [
                              Icon(
                                Icons.check_circle,
                                size: 12,
                                color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
                              ),
                              const SizedBox(width: 4),
                              Text(
                                'Perfil Validado via WhatsApp',
                                style: TextStyle(
                                  fontSize: 10,
                                  color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        ],
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
              const SizedBox(height: 24),

              // Preferências Logísticas de Trabalho
              Text(
                'Preferências de Trabalho & Logística',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: isDark ? Colors.white : const Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 8),
              Material(
                color: isDark ? AppTheme.darkCard : Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                  side: BorderSide(
                    color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                  ),
                ),
                elevation: isDark ? 0 : 1,
                shadowColor: Colors.black.withValues(alpha: 0.05),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Distância máxima de deslocamento:',
                          style: TextStyle(
                            fontSize: 12,
                            color: isDark ? const Color(0xFFCBD5E1) : const Color(0xFF475569),
                          ),
                        ),
                        Text(
                          '${_maxDistanceKm.toInt()} km',
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.bold,
                            color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
                          ),
                        ),
                      ],
                    ),
                    Slider(
                      value: _maxDistanceKm,
                      min: 5,
                      max: 40,
                      divisions: 7,
                      activeColor: isDark ? AppTheme.emeraldPrimary : AppTheme.emeraldDark,
                      inactiveColor: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                      onChanged: (val) {
                        setState(() {
                          _maxDistanceKm = val;
                        });
                      },
                    ),
                    Divider(
                      color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                      height: 16,
                    ),
                    Text(
                      'Escalas de interesse:',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: isDark ? Colors.white : const Color(0xFF0F172A),
                      ),
                    ),
                    const SizedBox(height: 8),
                    SwitchListTile(
                      title: Text(
                        '12x36 Noturno (19h às 07h)',
                        style: TextStyle(
                          fontSize: 12,
                          color: isDark ? Colors.white : const Color(0xFF0F172A),
                        ),
                      ),
                      value: _pref12x36,
                      activeThumbColor: isDark ? AppTheme.emeraldPrimary : AppTheme.emeraldDark,
                      contentPadding: EdgeInsets.zero,
                      onChanged: (v) => setState(() => _pref12x36 = v),
                    ),
                    SwitchListTile(
                      title: Text(
                        '6x1 Revezamento Diurno',
                        style: TextStyle(
                          fontSize: 12,
                          color: isDark ? Colors.white : const Color(0xFF0F172A),
                        ),
                      ),
                      value: _pref6x1,
                      activeThumbColor: isDark ? AppTheme.emeraldPrimary : AppTheme.emeraldDark,
                      contentPadding: EdgeInsets.zero,
                      onChanged: (v) => setState(() => _pref6x1 = v),
                    ),
                    SwitchListTile(
                      title: Text(
                        '5x2 Comercial (Segunda a Sexta)',
                        style: TextStyle(
                          fontSize: 12,
                          color: isDark ? Colors.white : const Color(0xFF0F172A),
                        ),
                      ),
                      value: _pref5x2,
                      activeThumbColor: isDark ? AppTheme.emeraldPrimary : AppTheme.emeraldDark,
                      contentPadding: EdgeInsets.zero,
                      onChanged: (v) => setState(() => _pref5x2 = v),
                    ),
                    SwitchListTile(
                      title: Text(
                        'Alertas de novas vagas no WhatsApp',
                        style: TextStyle(
                          fontSize: 12,
                          color: isDark ? Colors.white : const Color(0xFF0F172A),
                        ),
                      ),
                      value: _allowWhatsAppAlerts,
                      activeThumbColor: isDark ? AppTheme.emeraldPrimary : AppTheme.emeraldDark,
                      contentPadding: EdgeInsets.zero,
                      onChanged: (v) => setState(() => _allowWhatsAppAlerts = v),
                    ),
                  ],
                ),
              ),
            ),
              const SizedBox(height: 24),

              // Portal LGPD & ANPD
              Text(
                'Transparência & Direitos LGPD',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: isDark ? Colors.white : const Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: isDark ? AppTheme.darkCard : Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: isDark
                        ? AppTheme.tealAccent.withValues(alpha: 0.4)
                        : const Color(0xFF0D9488).withValues(alpha: 0.3),
                  ),
                  boxShadow: isDark
                      ? null
                      : [
                          BoxShadow(
                            color: Colors.black.withValues(alpha: 0.02),
                            blurRadius: 4,
                            offset: const Offset(0, 2),
                          )
                        ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(
                          Icons.shield,
                          color: isDark ? AppTheme.tealAccent : const Color(0xFF0D9488),
                          size: 18,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'Seus Dados Estão Seguros',
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.bold,
                            color: isDark ? Colors.white : const Color(0xFF0F172A),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'Coletamos apenas o estritamente essencial para encontrar vagas que respeitem seu trajeto. Sem perguntas invasivas e sem comercialização de dados pessoais.',
                      style: TextStyle(
                        fontSize: 11,
                        color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                        height: 1.3,
                      ),
                    ),
                    const SizedBox(height: 14),

                    // Botão Revisão Humana LGPD
                    OutlinedButton.icon(
                      onPressed: _showHumanReviewRequestDialog,
                      icon: Icon(
                        Icons.person_search,
                        size: 16,
                        color: isDark ? AppTheme.tealAccent : const Color(0xFF0D9488),
                      ),
                      label: Text(
                        'Solicitar Revisão Humana de IA (Art. 20 LGPD)',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          color: isDark ? Colors.white : const Color(0xFF0F172A),
                        ),
                      ),
                      style: OutlinedButton.styleFrom(
                        side: BorderSide(
                          color: isDark
                              ? AppTheme.tealAccent.withValues(alpha: 0.6)
                              : const Color(0xFF0D9488).withValues(alpha: 0.5),
                        ),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 14),
                      ),
                    ),
                    const SizedBox(height: 8),

                    Row(
                      children: [
                        Expanded(
                          child: OutlinedButton.icon(
                            onPressed: _showDataInspectionDialog,
                            icon: const Icon(Icons.visibility_outlined, size: 14),
                            label: const Text('Ver Meus Dados', style: TextStyle(fontSize: 10)),
                            style: OutlinedButton.styleFrom(
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
                                  content: Text('Comprovante de Direitos LGPD exportado com sucesso! 📄'),
                                  behavior: SnackBarBehavior.floating,
                                ),
                              );
                            },
                            icon: const Icon(Icons.download, size: 14),
                            label: const Text('Exportar JSON', style: TextStyle(fontSize: 10)),
                            style: OutlinedButton.styleFrom(
                              padding: const EdgeInsets.symmetric(vertical: 8),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Botão Sair da Conta
              SizedBox(
                width: double.infinity,
                child: OutlinedButton.icon(
                  onPressed: () {
                    Navigator.of(context).pushAndRemoveUntil(
                      MaterialPageRoute(
                        builder: (context) => LoginScreen(onToggleTheme: widget.onToggleTheme),
                      ),
                      (route) => false,
                    );
                  },
                  icon: const Icon(Icons.logout, size: 16, color: Colors.redAccent),
                  label: const Text(
                    'Sair da Conta / Trocar Usuário',
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.redAccent),
                  ),
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: Colors.redAccent, width: 0.8),
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  ),
                ),
              ),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}
