# TalentFlow HR Tech — Plataforma de Programas de Talentos Operacionais

> **Solução completa desenvolvida com base no Plano Executivo do Software**:
> - **App Responsivo em Flutter** (Mobile, Tablet, Desktop e Web) — Com **Ícone de Bateria de Match**, **Candidatura Direta via WhatsApp (sem chat interno)**, **Feedback 1-Toque Pré-Programado (zero digitação em horário de serviço)**, **Cadastro de Candidato** e **Recuperação de Senha**.
> - **Página de Propaganda (Marketing & Landing Page de Alto Impacto)** em Node.js / React / Tailwind
> - **Página de Controle (Painel de Gestão, GED LGPD, Backup/Restore e Recrutamento do RH)** em Node.js / React / Tailwind
> - 📖 **[Consulte o Guia de Usuário Completo (GUIA_DE_USUARIO.md)](./GUIA_DE_USUARIO.md)** (ou acesse `/guia` na plataforma web).

---

## 1. Análise do Plano Executivo & Dores Solucionadas

O documento estratégico identifica a contratação de mão de obra operacional e de alto volume (logística, chão de fábrica, varejo) como um setor penalizado por soluções corporativas inadequadas e agências analógicas caras.

### Principais Pilares Implementados:
1. **Acessibilidade & Drop-off Zero (< 3%):** Eliminação de formulários longos e testes teóricos incompatíveis. Triagem rápida via canais acessíveis (WhatsApp).
2. **Eficiência Operacional & Redução do CAC de RH:** Automação centralizada com redução de mais de **80% no custo por admissão** (R$ 380 vs R$ 1.950 tradicional).
3. **Reaproveitamento Dinâmico do Banco de Talentos:** Candidatos qualificados prévios são reativados para vagas recorrentes sem novo custo com anúncios.
4. **Mitigação do Turnover Precoce (Primeiros 90 Dias):** O maior gargalo financeiro reside nas demissões na experiência. A plataforma cruza:
   - Proximidade geográfica / tempo real de ônibus;
   - Disponibilidade real de escalas (12x36 Noturno, 6x1 Tarde, 5x2);
   - Acompanhamento ativo com micro-check-ins nos dias 1, 15, 30, 60 e 90.
5. **Estratégia de Compliance LGPD & ANPD:**
   - Transparência algorítmica e explicabilidade do score;
   - Minimização de dados;
   - **Garantia de Revisão Humana de IA (Artigo 20 da LGPD)** com botões dedicados tanto no App Flutter quanto no Painel do RH.

---

## 2. Estrutura do Projeto

```
talentflow/
├── backend/                         # REST API Gateway Node.js + Express + MariaDB
│   ├── config/db.js                 # Conexão Pool MariaDB (100.121.197.37:3306)
│   ├── database/schema.js           # Criação automática de tabelas e Seed de dados
│   ├── server.js                    # Endpoints REST (Jobs, Candidates, Applications, GED, Auth)
│   ├── .env                         # Configurações de porta e credenciais
│   └── package.json
│
├── flutter_app/                     # Aplicativo Responsivo em Flutter
│   ├── lib/
│   │   ├── services/api_service.dart # Sincronização em tempo real com a REST API
│   │   ├── models/                  # Modelos de Vagas e Onboarding
│   │   ├── screens/                 # Telas do App (Radar com Bateria, 90 Dias 1-Toque, Login/Cadastro)
│   │   ├── theme/app_theme.dart     # Design System moderno Dark/Emerald
│   │   └── main.dart
│   └── test/widget_test.dart
│
└── web_platform/                    # Frontend em Node.js (Vite + React + Tailwind)
    ├── vite.config.js               # Proxy transparente /api -> http://localhost:3001
    ├── src/
    │   ├── services/apiClient.js    # Conexão direta com a REST API / MariaDB
    │   ├── components/              # Dashboard RH, GED LGPD, Empresas/Recrutadores
    │   └── data/mockData.js         # Mocks e dados de contingência offline
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx           # Alternador Propaganda <-> Painel
    │   │   ├── LandingPage/         # Página de Propaganda de Alta Conversão
    │   │   │   ├── Hero.jsx
    │   │   │   ├── StatsBanner.jsx  # 4 KPIs de ROI do plano
    │   │   │   ├── ProblemSolution.jsx # Comparativo Gupy/LinkedIn vs TalentFlow
    │   │   │   ├── RoiCalculator.jsx   # Calculadora interativa de economia
    │   │   │   ├── FeaturesShowcase.jsx# Os 4 pilares tecnológicos
    │   │   │   ├── MobileAppShowcase.jsx # Mockup interativo do celular
    │   │   │   ├── RoadmapSection.jsx  # Roadmap das 4 Fases (MVP a IA)
    │   │   │   ├── LgpdComplianceSection.jsx # Compliance ANPD & LGPD
    │   │   │   └── Footer.jsx
    │   │   ├── Dashboard/           # Página de Controle do RH
    │   │   │   ├── Sidebar.jsx
    │   │   │   ├── DashboardOverview.jsx # Visão executiva e alertas
    │   │   │   ├── JobsManagement.jsx    # Gestão de vagas operacionais
    │   │   │   ├── MatchingCandidates.jsx # Motor de matching logístico
    │   │   │   ├── WhatsAppTriagem.jsx   # Simulador ao vivo do bot
    │   │   │   ├── RetentionMonitor.jsx  # Monitor de turmas e 90 dias
    │   │   │   └── LgpdGovernance.jsx    # Auditoria e revisão humana
    │   │   └── Modals/
    │   │       ├── CandidateDetailModal.jsx # Detalhe + Revisão Humana
    │   │       ├── NewJobModal.jsx          # Publicação de vaga
    │   │       └── FlutterInfoModal.jsx     # Launcher do app Flutter
    │   ├── data/mockData.js
    │   ├── App.jsx
    │   └── index.css
    └── public/app/                  # Bundle Web compilado do Flutter
```

---

## 3. Como Visualizar e Executar

### A. Web Platform (Página de Propaganda & Painel de Controle)
O servidor de desenvolvimento já está ativo:
- **URL Local:** [http://localhost:5173/](http://localhost:5173/)
- **Página de Propaganda:** Acesse a raiz para ver a apresentação comercial, métricas, calculadora de ROI e demonstrações.
- **Painel de Controle:** Clique em **"Painel de Controle (RH)"** na barra superior para navegar pelas vagas, candidatos, simulador WhatsApp e compliance LGPD.

### B. Aplicativo Flutter (Mobile / Tablet / Desktop)
O bundle web já está compilado e integrado diretamente na web em:
- **Flutter Web ao Vivo:** [http://localhost:5173/app/index.html](http://localhost:5173/app/index.html)

Para executar nativamente no terminal:
```bash
# 1. Entrar na pasta do Flutter:
cd talentflow\flutter_app

# 2. Rodar no Chrome com hot-reload:
flutter run -d chrome

# 3. Ou rodar como Desktop nativo no Windows:
flutter run -d windows
```
