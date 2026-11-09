import 'package:flutter/material.dart';
import '../main.dart';
import '../theme/app_theme.dart';
import '../widgets/responsive_layout.dart';
import 'jobs_radar_screen.dart';
import 'onboarding_90_screen.dart';
import 'profile_lgpd_screen.dart';

class HomeShell extends StatefulWidget {
  const HomeShell({super.key});

  @override
  State<HomeShell> createState() => _HomeShellState();
}

class _HomeShellState extends State<HomeShell> {
  int _currentIndex = 0;

  void _toggleTheme() {
    final current = themeNotifier.value;
    themeNotifier.value =
        current == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
  }

  @override
  Widget build(BuildContext context) {
    final isDesktop = ResponsiveLayout.isDesktop(context);
    final isTablet = ResponsiveLayout.isTablet(context);
    final useRail = isDesktop || isTablet;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final screens = [
      JobsRadarScreen(
        onToggleTheme: _toggleTheme,
      ),
      Onboarding90Screen(onToggleTheme: _toggleTheme),
      ProfileLgpdScreen(onToggleTheme: _toggleTheme),
    ];

    return Scaffold(
      body: Row(
        children: [
          // NavigationRail para Tablets e Desktop/Web
          if (useRail)
            NavigationRail(
              backgroundColor: isDark ? AppTheme.darkSurface : Colors.white,
              selectedIndex: _currentIndex,
              onDestinationSelected: (index) {
                setState(() {
                  _currentIndex = index;
                });
              },
              extended: isDesktop,
              minExtendedWidth: 200,
              trailing: Expanded(
                child: Align(
                  alignment: Alignment.bottomCenter,
                  child: Padding(
                    padding: const EdgeInsets.only(bottom: 16),
                    child: IconButton(
                      onPressed: _toggleTheme,
                      icon: Icon(
                        isDark ? Icons.light_mode : Icons.dark_mode,
                        color: isDark ? AppTheme.amberWarning : const Color(0xFF6366F1),
                      ),
                      tooltip: isDark ? 'Ativar Modo Claro' : 'Ativar Modo Escuro',
                    ),
                  ),
                ),
              ),
              leading: Padding(
                padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 12),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: isDark
                            ? AppTheme.emeraldPrimary.withValues(alpha: 0.2)
                            : AppTheme.emeraldDark.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Icon(
                        Icons.bolt,
                        color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
                        size: 20,
                      ),
                    ),
                    if (isDesktop) ...[
                      const SizedBox(width: 10),
                      Text(
                        'TalentFlow',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: isDark ? Colors.white : const Color(0xFF0F172A),
                        ),
                      ),
                    ],
                  ],
                ),
              ),
              selectedIconTheme: IconThemeData(
                color: isDark ? AppTheme.emeraldPrimary : AppTheme.emeraldDark,
              ),
              selectedLabelTextStyle: TextStyle(
                color: isDark ? AppTheme.emeraldLight : AppTheme.emeraldDark,
                fontWeight: FontWeight.bold,
                fontSize: 12,
              ),
              unselectedLabelTextStyle: const TextStyle(
                color: Color(0xFF94A3B8),
                fontSize: 12,
              ),
              destinations: const [
                NavigationRailDestination(
                  icon: Icon(Icons.near_me_outlined),
                  selectedIcon: Icon(Icons.near_me),
                  label: Text('Radar de Vagas'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.calendar_today_outlined),
                  selectedIcon: Icon(Icons.calendar_today),
                  label: Text('90 Dias Onboarding'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.shield_outlined),
                  selectedIcon: Icon(Icons.shield),
                  label: Text('Perfil & LGPD'),
                ),
              ],
            ),

          if (useRail)
            VerticalDivider(
              thickness: 1,
              width: 1,
              color: isDark ? const Color(0xFF1E293B) : const Color(0xFFE2E8F0),
            ),

          // Screen Content
          Expanded(
            child: screens[_currentIndex],
          ),
        ],
      ),

      // Bottom NavigationBar para Mobile
      bottomNavigationBar: useRail
          ? null
          : NavigationBar(
              selectedIndex: _currentIndex,
              onDestinationSelected: (index) {
                setState(() {
                  _currentIndex = index;
                });
              },
              destinations: const [
                NavigationDestination(
                  icon: Icon(Icons.near_me_outlined),
                  selectedIcon: Icon(Icons.near_me),
                  label: 'Oportunidades',
                ),
                NavigationDestination(
                  icon: Icon(Icons.calendar_today_outlined),
                  selectedIcon: Icon(Icons.calendar_today),
                  label: '90 Dias',
                ),
                NavigationDestination(
                  icon: Icon(Icons.shield_outlined),
                  selectedIcon: Icon(Icons.shield),
                  label: 'Privacidade',
                ),
              ],
            ),
    );
  }
}
