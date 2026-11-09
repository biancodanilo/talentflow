import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../models/job.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/responsive_layout.dart';

class JobsRadarScreen extends StatefulWidget {
  final Function(String jobTitle)? onStartChatWithJob;
  final VoidCallback? onToggleTheme;

  const JobsRadarScreen({
    super.key,
    this.onStartChatWithJob,
    this.onToggleTheme,
  });

  @override
  State<JobsRadarScreen> createState() => _JobsRadarScreenState();
}

class _JobsRadarScreenState extends State<JobsRadarScreen> {
  List<JobOpportunity> _allJobs = JobOpportunity.getSampleJobs();
  final TextEditingController _searchController = TextEditingController();

  String _selectedShiftFilter = 'Todas';
  String _selectedDistanceFilter = 'Todas';
  String _selectedCity = 'Todas'; // 'Todas', 'Jaú', 'Barra Bonita', 'Bariri'
  bool _onlyFavorites = false;

  final Set<String> _favoriteJobIds = {};
  final Set<String> _appliedJobIds = {};

  @override
  void initState() {
    super.initState();
    _loadJobsFromApi();
  }

  Future<void> _loadJobsFromApi({bool showToast = false}) async {
    final jobs = await ApiService.fetchJobs();
    if (mounted) {
      setState(() {
        _allJobs = jobs;
      });
      if (showToast) {
        ScaffoldMessenger.of(context).hideCurrentSnackBar();
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Vagas atualizadas com o MariaDB! (${jobs.length} vagas ativas) 🔄'),
            duration: const Duration(seconds: 1),
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    }
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  List<JobOpportunity> get _filteredJobs {
    return _allJobs.where((j) {
      final q = _searchController.text.trim().toLowerCase();
      if (q.isNotEmpty) {
        final matchTitle = j.title.toLowerCase().contains(q);
        final matchCompany = j.company.toLowerCase().contains(q);
        final matchLoc = j.location.toLowerCase().contains(q);
        final matchTags = j.tags.any((t) => t.toLowerCase().contains(q));
        if (!matchTitle && !matchCompany && !matchLoc && !matchTags) {
          return false;
        }
      }

      if (_selectedCity != 'Todas' && !j.location.toLowerCase().contains(_selectedCity.toLowerCase())) {
        return false;
      }

      if (_selectedShiftFilter != 'Todas' && !j.shift.contains(_selectedShiftFilter)) {
        return false;
      }

      if (_selectedDistanceFilter == 'Até 5km' && j.distanceKm > 5.0) return false;
      if (_selectedDistanceFilter == 'Até 10km' && j.distanceKm > 10.0) return false;
      if (_selectedDistanceFilter == 'Até 20km' && j.distanceKm > 20.0) return false;

      if (_onlyFavorites && !_favoriteJobIds.contains(j.id)) return false;

      return true;
    }).toList();
  }

  void _resetFilters() {
    setState(() {
      _searchController.clear();
      _selectedShiftFilter = 'Todas';
      _selectedDistanceFilter = 'Todas';
      _selectedCity = 'Todas';
      _onlyFavorites = false;
    });
  }

  void _showCityFilterModal() {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    showModalBottomSheet(
      context: context,
      backgroundColor: isDark ? AppTheme.darkCard : Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        final cities = [
          {'name': 'Todas as Cidades', 'subtitle': 'Jaú, Barra Bonita e Bariri', 'value': 'Todas'},
          {'name': 'Jaú', 'subtitle': 'Polo Industrial e Calçadista', 'value': 'Jaú'},
          {'name': 'Barra Bonita', 'subtitle': 'Entreposto Logístico e Portuário', 'value': 'Barra Bonita'},
          {'name': 'Bariri', 'subtitle': 'Comércio, Serviços e Indústria', 'value': 'Bariri'},
        ];

        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Selecionar Região',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: isDark ? Colors.white : const Color(0xFF0F172A),
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close),
                      onPressed: () => Navigator.pop(ctx),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                ...cities.map((c) {
                  final isSelected = _selectedCity == c['value'];
                  return ListTile(
                    contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    leading: Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: isSelected
                            ? AppTheme.emeraldPrimary.withValues(alpha: 0.15)
                            : (isDark ? const Color(0xFF1E293B) : const Color(0xFFF1F5F9)),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Icon(
                        Icons.location_city,
                        color: isSelected ? AppTheme.emeraldPrimary : (isDark ? Colors.white60 : Colors.black54),
                        size: 20,
                      ),
                    ),
                    title: Text(
                      c['name']!,
                      style: TextStyle(
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.w600,
                        color: isSelected
                            ? AppTheme.emeraldPrimary
                            : (isDark ? Colors.white : const Color(0xFF0F172A)),
                      ),
                    ),
                    subtitle: Text(
                      c['subtitle']!,
                      style: TextStyle(
                        fontSize: 12,
                        color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                      ),
                    ),
                    trailing: isSelected
                        ? const Icon(Icons.check_circle, color: AppTheme.emeraldPrimary)
                        : null,
                    onTap: () {
                      setState(() {
                        _selectedCity = c['value']!;
                      });
                      Navigator.pop(ctx);
                    },
                  );
                }),
              ],
            ),
          ),
        );
      },
    );
  }

  void _toggleFavorite(String jobId) {
    setState(() {
      if (_favoriteJobIds.contains(jobId)) {
        _favoriteJobIds.remove(jobId);
      } else {
        _favoriteJobIds.add(jobId);
      }
    });

    final isFav = _favoriteJobIds.contains(jobId);
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(isFav ? 'Vaga adicionada às favoritas! ⭐' : 'Vaga removida das favoritas.'),
        duration: const Duration(seconds: 1),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _applyToJob(JobOpportunity job) {
    setState(() {
      _appliedJobIds.add(job.id);
    });

    // Sincroniza candidatura via API com o MariaDB para o RH ver em tempo real
    ApiService.applyToJob(
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      matchScore: job.matchPercentage,
    );

    final isDark = Theme.of(context).brightness == Brightness.dark;
    showModalBottomSheet(
      context: context,
      backgroundColor: isDark ? AppTheme.darkSurface : Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(22),
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
                const SizedBox(height: 18),
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: const Color(0xFF25D366).withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: const Icon(
                        Icons.chat_bubble_rounded,
                        color: Color(0xFF25D366),
                        size: 24,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Triagem Direta no WhatsApp',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: isDark ? Colors.white : const Color(0xFF0F172A),
                            ),
                          ),
                          Text(
                            'Sem chat interno • Atendimento oficial via Zap',
                            style: TextStyle(
                              fontSize: 11,
                              color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                            ),
                          ),
                        ],
                      ),
                    ),
                    _buildMatchBatteryBadge(job.matchPercentage, isDark),
                  ],
                ),
                const SizedBox(height: 16),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: isDark ? AppTheme.darkCard : const Color(0xFFF0FDF4),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(
                      color: const Color(0xFF25D366).withValues(alpha: 0.4),
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Mensagem automática pronta para envio:',
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF25D366),
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        '"Olá! Quero concluir minha candidatura rápida para a vaga ${job.title} (${job.id}) na ${job.company}. Meu Match logístico no app é de ${job.matchPercentage}%."',
                        style: TextStyle(
                          fontSize: 12,
                          fontStyle: FontStyle.italic,
                          color: isDark ? Colors.white : const Color(0xFF0F172A),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 18),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: () {
                      Navigator.pop(ctx);
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text(
                            'Redirecionado para o WhatsApp Oficial da ${job.company}! Candidatura registrada. 📲',
                          ),
                          backgroundColor: const Color(0xFF25D366),
                          behavior: SnackBarBehavior.floating,
                        ),
                      );
                    },
                    icon: const Icon(Icons.open_in_new, size: 18),
                    label: const Text('Abrir no WhatsApp (1 Toque)'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF25D366),
                      foregroundColor: const Color(0xFF0B0F19),
                      padding: const EdgeInsets.symmetric(vertical: 14),
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  /// Constrói o indicador visual de Match com ícone de bateria + barras de carga
  Widget _buildMatchBatteryBadge(int matchPercentage, bool isDark, {bool large = false}) {
    IconData batteryIcon;
    Color badgeColor;
    int activeBars;
    String levelLabel;

    if (matchPercentage >= 90) {
      batteryIcon = Icons.battery_full_rounded;
      badgeColor = isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark;
      activeBars = 4;
      levelLabel = 'Carga Máxima';
    } else if (matchPercentage >= 80) {
      batteryIcon = Icons.battery_5_bar_rounded;
      badgeColor = isDark ? AppTheme.cyanAccent : const Color(0xFF0284C7);
      activeBars = 3;
      levelLabel = 'Match Alto';
    } else if (matchPercentage >= 70) {
      batteryIcon = Icons.battery_3_bar_rounded;
      badgeColor = AppTheme.amberWarning;
      activeBars = 2;
      levelLabel = 'Match Médio';
    } else {
      batteryIcon = Icons.battery_alert_rounded;
      badgeColor = const Color(0xFFF97316);
      activeBars = 1;
      levelLabel = 'Baixo Match';
    }

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: large ? 10 : 8,
        vertical: large ? 6 : 4,
      ),
      decoration: BoxDecoration(
        color: badgeColor.withValues(alpha: 0.14),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: badgeColor.withValues(alpha: 0.45),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            batteryIcon,
            size: large ? 18 : 15,
            color: badgeColor,
          ),
          const SizedBox(width: 4),
          // 4 mini barras de nível da bateria para leitura instantânea
          Row(
            mainAxisSize: MainAxisSize.min,
            children: List.generate(4, (i) {
              final filled = i < activeBars;
              return Container(
                width: large ? 4 : 3,
                height: large ? 11 : 9,
                margin: const EdgeInsets.only(right: 2),
                decoration: BoxDecoration(
                  color: filled ? badgeColor : badgeColor.withValues(alpha: 0.2),
                  borderRadius: BorderRadius.circular(1.5),
                ),
              );
            }),
          ),
          const SizedBox(width: 3),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                '$matchPercentage%',
                style: TextStyle(
                  color: badgeColor,
                  fontWeight: FontWeight.w900,
                  fontSize: large ? 12 : 10.5,
                  height: 1.0,
                ),
              ),
              if (large)
                Text(
                  levelLabel,
                  style: TextStyle(
                    color: badgeColor,
                    fontWeight: FontWeight.w600,
                    fontSize: 8.5,
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }

  void _showJobDetails(BuildContext context, JobOpportunity job) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final isApplied = _appliedJobIds.contains(job.id);
    final isFav = _favoriteJobIds.contains(job.id);

    showModalBottomSheet(
      context: context,
      backgroundColor: isDark ? AppTheme.darkSurface : Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      isScrollControlled: true,
      builder: (ctx) {
        return Padding(
          padding: EdgeInsets.only(
            top: 24,
            left: 20,
            right: 20,
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
              const SizedBox(height: 20),
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildCompanyLogoAvatar(job, isDark),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          job.title,
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: isDark ? Colors.white : const Color(0xFF0F172A),
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '${job.company} • ${job.location}',
                          style: TextStyle(
                            color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                            fontSize: 13,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        onPressed: () {
                          _toggleFavorite(job.id);
                          Navigator.pop(ctx);
                        },
                        icon: Icon(
                          isFav ? Icons.star : Icons.star_border,
                          color: isFav ? AppTheme.amberWarning : Colors.grey,
                        ),
                        tooltip: isFav ? 'Remover dos favoritos' : 'Favoritar',
                      ),
                      _buildMatchBatteryBadge(job.matchPercentage, isDark, large: true),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: isDark ? AppTheme.darkBg : const Color(0xFFF1F5F9),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                  ),
                ),
                child: Column(
                  children: [
                    _buildDetailRow(
                      Icons.directions_bus,
                      'Transporte Direto',
                      '${job.distanceKm} km • ${job.transportTime} (${job.busLine})',
                      isDark,
                    ),
                    Divider(color: isDark ? const Color(0xFF1E293B) : const Color(0xFFCBD5E1), height: 16),
                    _buildDetailRow(
                      Icons.access_time_filled,
                      'Escala de Trabalho',
                      job.shift,
                      isDark,
                    ),
                    Divider(color: isDark ? const Color(0xFF1E293B) : const Color(0xFFCBD5E1), height: 16),
                    _buildDetailRow(
                      Icons.payments,
                      'Salário & Benefícios',
                      job.salary,
                      isDark,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              Text(
                'Descrição e Requisitos Práticos:',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.bold,
                  color: isDark ? Colors.white : const Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 6),
              Text(
                job.description,
                style: TextStyle(
                  fontSize: 12,
                  color: isDark ? const Color(0xFFCBD5E1) : const Color(0xFF475569),
                  height: 1.4,
                ),
              ),
              const SizedBox(height: 20),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () {
                    Navigator.pop(ctx);
                    _applyToJob(job);
                  },
                  icon: Icon(isApplied ? Icons.check_circle : Icons.chat, size: 18),
                  label: Text(
                    isApplied
                        ? 'Continuar Triagem no WhatsApp'
                        : 'Candidatar em 1 Toque via WhatsApp',
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: isApplied ? const Color(0xFF10B981) : null,
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildDetailRow(IconData icon, String label, String value, bool isDark) {
    return Row(
      children: [
        Icon(icon, size: 16, color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark),
        const SizedBox(width: 8),
        Text(
          '$label: ',
          style: TextStyle(fontSize: 12, color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B)),
        ),
        Expanded(
          child: Text(
            value,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: isDark ? Colors.white : const Color(0xFF0F172A),
            ),
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDesktop = ResponsiveLayout.isDesktop(context);
    final isTablet = ResponsiveLayout.isTablet(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final filtered = _filteredJobs;

    return Scaffold(
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: () => _loadJobsFromApi(showToast: true),
          color: AppTheme.emeraldPrimary,
          child: CustomScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            slivers: [
            // Top Bar & Filters
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 16, 16, 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Top header row
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: isDark
                                ? AppTheme.emeraldPrimary.withValues(alpha: 0.15)
                                : AppTheme.emeraldDark.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Icon(
                            Icons.near_me,
                            color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
                            size: 20,
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Radar de Oportunidades',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: isDark ? Colors.white : const Color(0xFF0F172A),
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                              Text(
                                'Logística & Proximidade Real • Jaú, Barra Bonita & Bariri',
                                style: TextStyle(
                                  fontSize: 10,
                                  color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ],
                          ),
                        ),
                        InkWell(
                          onTap: _showCityFilterModal,
                          borderRadius: BorderRadius.circular(20),
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: isDark ? AppTheme.darkCard : Colors.white,
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(
                                color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                              ),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(Icons.location_on, size: 11, color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark),
                                const SizedBox(width: 3),
                                Text(
                                  _selectedCity == 'Todas' ? 'Jaú & Região' : _selectedCity,
                                  style: TextStyle(
                                    fontSize: 10,
                                    color: isDark ? Colors.white : const Color(0xFF0F172A),
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                const SizedBox(width: 2),
                                Icon(Icons.arrow_drop_down, size: 12, color: isDark ? Colors.white70 : Colors.black54),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(width: 2),
                        IconButton(
                          onPressed: widget.onToggleTheme,
                          constraints: const BoxConstraints(minWidth: 36, minHeight: 36),
                          padding: EdgeInsets.zero,
                          icon: Icon(
                            isDark ? Icons.light_mode : Icons.dark_mode,
                            color: isDark ? AppTheme.amberWarning : const Color(0xFF6366F1),
                            size: 20,
                          ),
                          tooltip: isDark ? 'Modo Claro' : 'Modo Escuro',
                        ),
                        const SizedBox(width: 2),
                        IconButton(
                          onPressed: () async {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Sincronizando vagas com o MariaDB... 🔄'),
                                duration: Duration(milliseconds: 700),
                              ),
                            );
                            await _loadJobsFromApi();
                          },
                          constraints: const BoxConstraints(minWidth: 36, minHeight: 36),
                          padding: EdgeInsets.zero,
                          icon: Icon(
                            Icons.sync_rounded,
                            color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
                            size: 20,
                          ),
                          tooltip: 'Sincronizar com MariaDB',
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),

                    // Barra de Busca Interativa
                    TextField(
                      controller: _searchController,
                      onChanged: (_) => setState(() {}),
                      decoration: InputDecoration(
                        hintText: 'Buscar cargo, empresa, bairro ou habilidade...',
                        hintStyle: TextStyle(
                          fontSize: 12,
                          color: isDark ? const Color(0xFF64748B) : const Color(0xFF94A3B8),
                        ),
                        prefixIcon: const Icon(Icons.search, size: 18),
                        suffixIcon: _searchController.text.isNotEmpty
                            ? IconButton(
                                icon: const Icon(Icons.clear, size: 16),
                                onPressed: () {
                                  setState(() {
                                    _searchController.clear();
                                  });
                                },
                              )
                            : null,
                        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                        isDense: true,
                        filled: true,
                        fillColor: isDark ? AppTheme.darkCard : const Color(0xFFF8FAFC),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(14),
                          borderSide: BorderSide(
                            color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                          ),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(14),
                          borderSide: BorderSide(
                            color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                          ),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(14),
                          borderSide: BorderSide(
                            color: isDark ? AppTheme.emeraldPrimary : AppTheme.emeraldDark,
                            width: 1.5,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),

                    // Filtros Rápidos (Chips)
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: [
                          // Favoritas Toggle
                          FilterChip(
                            label: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(
                                  _onlyFavorites ? Icons.star : Icons.star_border,
                                  size: 13,
                                  color: _onlyFavorites ? Colors.amber : (isDark ? Colors.white70 : Colors.black54),
                                ),
                                const SizedBox(width: 4),
                                Text('Favoritas (${_favoriteJobIds.length})'),
                              ],
                            ),
                            selected: _onlyFavorites,
                            onSelected: (val) {
                              setState(() {
                                _onlyFavorites = val;
                              });
                            },
                            selectedColor: isDark ? Colors.amber.withValues(alpha: 0.25) : Colors.amber.shade100,
                            labelStyle: TextStyle(
                              fontSize: 11,
                              fontWeight: _onlyFavorites ? FontWeight.bold : FontWeight.normal,
                              color: isDark ? Colors.white : Colors.black87,
                            ),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                            showCheckmark: false,
                          ),
                          const SizedBox(width: 8),

                          // Escalas
                          _buildShiftChip('Todas', isDark),
                          const SizedBox(width: 6),
                          _buildShiftChip('12x36', isDark),
                          const SizedBox(width: 6),
                          _buildShiftChip('6x1', isDark),
                          const SizedBox(width: 6),
                          _buildShiftChip('5x2', isDark),
                          const SizedBox(width: 8),

                          // Distância
                          _buildDistanceChip('Todas', 'Qualquer Distância', isDark),
                          const SizedBox(width: 6),
                          _buildDistanceChip('Até 5km', '≤ 5 km', isDark),
                          const SizedBox(width: 6),
                          _buildDistanceChip('Até 10km', '≤ 10 km', isDark),
                          const SizedBox(width: 6),
                          _buildDistanceChip('Até 20km', '≤ 20 km', isDark),
                        ],
                      ),
                    ),

                    // Contador de Resultados
                    Padding(
                      padding: const EdgeInsets.only(top: 10, bottom: 2),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            '${filtered.length} ${filtered.length == 1 ? 'vaga encontrada' : 'vagas encontradas'} no seu radar',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w600,
                              color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                            ),
                          ),
                          if (_searchController.text.isNotEmpty ||
                              _selectedShiftFilter != 'Todas' ||
                              _selectedDistanceFilter != 'Todas' ||
                              _onlyFavorites)
                            GestureDetector(
                              onTap: _resetFilters,
                              child: Text(
                                'Limpar filtros',
                                style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                  color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
                                ),
                              ),
                            ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Grid or List of Jobs, or Empty State
            if (filtered.isEmpty)
              SliverFillRemaining(
                hasScrollBody: false,
                child: Center(
                  child: Padding(
                    padding: const EdgeInsets.all(24.0),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: isDark ? AppTheme.darkCard : const Color(0xFFF1F5F9),
                            shape: BoxShape.circle,
                          ),
                          child: Icon(
                            Icons.search_off,
                            size: 40,
                            color: isDark ? Colors.white38 : Colors.black38,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'Nenhuma oportunidade encontrada',
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.bold,
                            color: isDark ? Colors.white : const Color(0xFF0F172A),
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          'Tente pesquisar outros termos ou ajustar seus filtros de escala e distância.',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 12,
                            color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                          ),
                        ),
                        const SizedBox(height: 16),
                        ElevatedButton(
                          onPressed: _resetFilters,
                          child: const Text('Limpar Todos os Filtros'),
                        ),
                      ],
                    ),
                  ),
                ),
              )
            else
              SliverPadding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                sliver: isDesktop || isTablet
                    ? SliverGrid(
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: isDesktop ? 3 : 2,
                          crossAxisSpacing: 14,
                          mainAxisSpacing: 14,
                          childAspectRatio: isDesktop ? 1.05 : 0.88,
                        ),
                        delegate: SliverChildBuilderDelegate(
                          (context, index) => _buildJobCard(filtered[index], isDark),
                          childCount: filtered.length,
                        ),
                      )
                    : SliverList(
                        delegate: SliverChildBuilderDelegate(
                          (context, index) => Padding(
                            padding: const EdgeInsets.only(bottom: 12),
                            child: _buildJobCard(filtered[index], isDark),
                          ),
                          childCount: filtered.length,
                        ),
                      ),
              ),
          ],
        ),
        ),
      ),
    );
  }

  Widget _buildShiftChip(String label, bool isDark) {
    final isSelected = _selectedShiftFilter == label;
    return ChoiceChip(
      label: Text(label),
      selected: isSelected,
      onSelected: (selected) {
        if (selected) {
          setState(() {
            _selectedShiftFilter = label;
          });
        }
      },
      selectedColor: isDark ? AppTheme.emeraldPrimary : AppTheme.emeraldDark,
      labelStyle: TextStyle(
        color: isSelected
            ? (isDark ? const Color(0xFF0B0F19) : Colors.white)
            : (isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B)),
        fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
        fontSize: 11,
      ),
      backgroundColor: isDark ? AppTheme.darkCard : Colors.white,
      side: BorderSide(
        color: isSelected
            ? (isDark ? AppTheme.emeraldPrimary : AppTheme.emeraldDark)
            : (isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
      ),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      showCheckmark: false,
    );
  }

  Widget _buildDistanceChip(String value, String label, bool isDark) {
    final isSelected = _selectedDistanceFilter == value;
    return ChoiceChip(
      label: Text(label),
      selected: isSelected,
      onSelected: (selected) {
        if (selected) {
          setState(() {
            _selectedDistanceFilter = value;
          });
        }
      },
      selectedColor: isDark ? AppTheme.cyanAccent : const Color(0xFF0284C7),
      labelStyle: TextStyle(
        color: isSelected
            ? (isDark ? const Color(0xFF0B0F19) : Colors.white)
            : (isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B)),
        fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
        fontSize: 11,
      ),
      backgroundColor: isDark ? AppTheme.darkCard : Colors.white,
      side: BorderSide(
        color: isSelected
            ? (isDark ? AppTheme.cyanAccent : const Color(0xFF0284C7))
            : (isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
      ),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      showCheckmark: false,
    );
  }

  Widget _buildCompanyLogoAvatar(JobOpportunity job, bool isDark) {
    final logo = job.companyLogo;
    if (logo != null && logo.isNotEmpty) {
      if (logo.startsWith('data:image/svg+xml')) {
        try {
          final commaIdx = logo.indexOf(',');
          if (commaIdx != -1) {
            final payload = logo.substring(commaIdx + 1);
            final svgString = Uri.decodeComponent(payload);
            return Container(
              width: 44,
              height: 44,
              padding: const EdgeInsets.all(5),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF0F172A) : Colors.white,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                  width: 1,
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: isDark ? 0.2 : 0.05),
                    blurRadius: 4,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: SvgPicture.string(
                svgString,
                width: 34,
                height: 34,
                fit: BoxFit.contain,
              ),
            );
          }
        } catch (_) {}
      } else if (logo.startsWith('data:image/png;base64,') ||
          logo.startsWith('data:image/jpeg;base64,')) {
        try {
          final commaIdx = logo.indexOf(',');
          if (commaIdx != -1) {
            final bytes = base64Decode(logo.substring(commaIdx + 1));
            return Container(
              width: 44,
              height: 44,
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF0F172A) : Colors.white,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                ),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.memory(bytes, fit: BoxFit.contain),
              ),
            );
          }
        } catch (_) {}
      } else if (logo.startsWith('http')) {
        return Container(
          width: 44,
          height: 44,
          padding: const EdgeInsets.all(4),
          decoration: BoxDecoration(
            color: isDark ? const Color(0xFF0F172A) : Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
            ),
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Image.network(
              logo,
              fit: BoxFit.contain,
              errorBuilder: (_, _, _) => _fallbackLogo(job, isDark),
            ),
          ),
        );
      }
    }
    return _fallbackLogo(job, isDark);
  }

  Widget _fallbackLogo(JobOpportunity job, bool isDark) {
    final words = job.company.trim().split(' ').where((w) => w.isNotEmpty).toList();
    final initials = words.length >= 2
        ? '${words[0][0]}${words[1][0]}'.toUpperCase()
        : (job.company.isNotEmpty ? job.company.substring(0, job.company.length >= 2 ? 2 : 1).toUpperCase() : 'TF');

    return Container(
      width: 44,
      height: 44,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: isDark
              ? [AppTheme.emeraldDark, const Color(0xFF0D9488)]
              : [AppTheme.emeraldPrimary, const Color(0xFF14B8A6)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: AppTheme.emeraldPrimary.withValues(alpha: 0.25),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      alignment: Alignment.center,
      child: Text(
        initials,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 13,
          fontWeight: FontWeight.bold,
          letterSpacing: 0.5,
        ),
      ),
    );
  }

  Widget _buildJobCard(JobOpportunity job, bool isDark) {
    final isFav = _favoriteJobIds.contains(job.id);
    final isApplied = _appliedJobIds.contains(job.id);

    return Card(
      color: isDark ? AppTheme.darkCard : Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
        side: BorderSide(
          color: isApplied
              ? (isDark ? AppTheme.emeraldPrimary.withValues(alpha: 0.6) : AppTheme.emeraldDark)
              : (isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
          width: isApplied ? 1.5 : 1,
        ),
      ),
      elevation: isDark ? 0 : 1,
      child: InkWell(
        onTap: () => _showJobDetails(context, job),
        borderRadius: BorderRadius.circular(20),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildCompanyLogoAvatar(job, isDark),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Flexible(
                                  child: Text(
                                    job.title,
                                    style: TextStyle(
                                      fontSize: 14,
                                      fontWeight: FontWeight.bold,
                                      color: isDark ? Colors.white : const Color(0xFF0F172A),
                                    ),
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                                if (isApplied) ...[
                                  const SizedBox(width: 6),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: AppTheme.emeraldPrimary.withValues(alpha: 0.2),
                                      borderRadius: BorderRadius.circular(6),
                                    ),
                                    child: Text(
                                      'Inscrito ✓',
                                      style: TextStyle(
                                        fontSize: 9,
                                        fontWeight: FontWeight.bold,
                                        color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
                                      ),
                                    ),
                                  ),
                                ],
                              ],
                            ),
                            const SizedBox(height: 2),
                            Text(
                              '${job.company} • ${job.location}',
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w500,
                                color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF475569),
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                      IconButton(
                        onPressed: () => _toggleFavorite(job.id),
                        constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
                        padding: EdgeInsets.zero,
                        icon: Icon(
                          isFav ? Icons.star : Icons.star_border,
                          size: 18,
                          color: isFav ? AppTheme.amberWarning : Colors.grey,
                        ),
                        tooltip: isFav ? 'Remover dos favoritos' : 'Favoritar',
                      ),
                      _buildMatchBatteryBadge(job.matchPercentage, isDark),
                    ],
                  ),
                  const SizedBox(height: 4),

                  // Commute info
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
                    decoration: BoxDecoration(
                      color: isDark ? AppTheme.darkBg : const Color(0xFFF1F5F9),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      children: [
                        Icon(
                          Icons.navigation,
                          size: 13,
                          color: isDark ? AppTheme.cyanAccent : const Color(0xFF0284C7),
                        ),
                        const SizedBox(width: 6),
                        Expanded(
                          child: Text(
                            '${job.distanceKm} km • ${job.transportTime}',
                            style: TextStyle(
                              fontSize: 10,
                              color: isDark ? const Color(0xFFE2E8F0) : const Color(0xFF1E293B),
                              fontWeight: FontWeight.w600,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 4),
                  Row(
                    children: [
                      const Icon(Icons.schedule, size: 13, color: AppTheme.indigoAccent),
                      const SizedBox(width: 6),
                      Expanded(
                        child: Text(
                          job.shift,
                          style: TextStyle(
                            fontSize: 10,
                            color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                ],
              ),

              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 4),
                  Text(
                    job.salary,
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton(
                          onPressed: () => _showJobDetails(context, job),
                          style: OutlinedButton.styleFrom(
                            foregroundColor: isDark ? Colors.white : const Color(0xFF0F172A),
                            side: BorderSide(
                              color: isDark ? const Color(0xFF334155) : const Color(0xFFCBD5E1),
                            ),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                            padding: const EdgeInsets.symmetric(vertical: 6),
                          ),
                          child: const Text(
                            'Detalhes',
                            style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                      const SizedBox(width: 6),
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: () => _applyToJob(job),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: isApplied
                                ? (isDark ? const Color(0xFF065F46) : const Color(0xFF059669))
                                : null,
                            padding: const EdgeInsets.symmetric(vertical: 6),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                          ),
                          icon: Icon(
                            isApplied ? Icons.check : Icons.chat,
                            size: 13,
                          ),
                          label: Text(
                            isApplied ? 'Inscrito' : 'Candidatar',
                            style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
