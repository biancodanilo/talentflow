# Guia de Usuário Oficial — TalentFlow HR Tech (Web & Mobile)

Este guia abrange a operação completa da plataforma **TalentFlow**, incluindo o **Guia Mobile para Candidatos**, fluxos de **Cadastro (Candidato, Empresa e Recrutador)**, **Recuperação de Senha ("Esqueceu a Senha")**, **Gestão Eletrônica de Documentos (GED) & Backup/Restore** e **Troubleshooting (Solução de Problemas)**.

---

## 1. Guia Completo da Parte Mobile para Candidatos (`flutter_app`)

O aplicativo mobile do **TalentFlow** foi desenhado especificamente para trabalhadores operacionais (logística, indústria e varejo), priorizando rapidez, leitura visual instantânea e **zero digitação em horário de serviço**.

### 1.1. Acesso Inicial: Login e Cadastro de Candidato
1. **Entrar na Conta (`Login`):**
   - Na tela inicial, mantenha a aba **"Entrar na Conta"** selecionada.
   - Informe seu **CPF ou Celular WhatsApp** e sua **Senha de Acesso**.
   - Toque em **"Entrar no TalentFlow"** (ou em *"Explorar Vagas sem Cadastro (Modo Demo)"* para visualização imediata).
2. **Criar Conta (`Cadastrar Candidato`):**
   - Toque na aba superior **"Cadastrar Candidato"** (ou no botão *"Novo por aqui? Criar Cadastro de Candidato"*).
   - Preencha:
     - **Nome Completo**, **CPF** e **WhatsApp**;
     - **Cidade / Polo** (`Jaú - SP`, `Barra Bonita - SP`, `Bariri - SP` ou `Bauru / Região`);
     - **Escala Preferida** (`12x36 Noturno`, `6x1 Revezamento` ou `5x2 Comercial`);
     - **Bairro ou Linha de Ônibus Principal** (ex: *Vila Maria • Circular Linha 102*);
     - **Experiências Práticas** (selecione com 1 toque nos chips: *Coletor WMS*, *Empilhadeira NR-11*, *Separação & Picking*, *Operação de Caixa*, *Produção Industrial*, *CNH B*, *Início Imediato*).
   - Marque o aceite do **Termo de Consentimento LGPD** e toque em **"Concluir Cadastro e Ver Vagas"**.

---

### 1.2. Aba 1: Oportunidades (Radar de Vagas com Ícone de Bateria de Match)
Para facilitar a visualização imediata de compatibilidade sem que o candidato precise interpretar tabelas complexas, cada card de vaga exibe um **Selo Visual de Bateria de Match** com **4 barras de carga**:

| Porcentagem de Match | Ícone de Bateria | Barras Ativas | Cor Visual | Significado Logístico e Operacional |
| :--- | :--- | :---: | :--- | :--- |
| **90% a 100%** | 🔋 Bateria Cheia (`battery_full`) | **4 de 4** | Verde Esmeralda | **Carga Máxima:** Linha circular direta ou distância ≤ 5 km e turno 100% compatível. |
| **80% a 89%** | 🔋 Bateria Alta (`battery_5_bar`) | **3 de 4** | Azul Ciano | **Match Alto:** Transporte rápido ou fretado gratuito da empresa na porta. |
| **70% a 79%** | 🪫 Bateria Média (`battery_3_bar`) | **2 de 4** | Âmbar | **Match Médio:** Distância moderada ou escala alternativa. |
| **Abaixo de 70%** | ⚠️ Alerta de Bateria (`battery_alert`) | **1 de 4** | Laranja / Alerta | **Baixo Match:** Risco logístico elevado (múltiplas conduções). |

- **Filtros Rápidos:** Filtre vagas por **Cidade/Região** (*Jaú, Barra Bonita, Bariri*), **Favoritas ⭐**, **Escala** (*12x36, 6x1, 5x2*) e **Distância** (*≤ 5 km, ≤ 10 km, ≤ 20 km*).

---

### 1.3. Candidatura em 1 Toque via WhatsApp (Sem Tela de Conversa Interna)
- **Por que não há tela de chat dentro do aplicativo?**
  A antiga aba de conversa interna foi **removida do aplicativo** e substituída pela integração direta com o **WhatsApp Oficial (Zap)** da plataforma. Isso evita que o candidato perca mensagens por não abrir o app diariamente.
- **Como se candidatar:**
  1. No card da vaga (ou dentro de *Detalhes*), toque em **"Candidatar"**.
  2. Um painel de confirmação será aberto exibindo a bateria de Match da vaga e a mensagem automática pronta para envio.
  3. Toque em **"Abrir no WhatsApp (1 Toque)"** para iniciar a triagem diretamente no seu WhatsApp.

---

### 1.4. Aba 2: Guardião dos 90 Dias (Feedback Pré-Programado • Zero Digitação)
- **Por que não há campo para digitar texto livre no feedback?**
  Para **diminuir o tempo de uso do aplicativo e evitar que o colaborador utilize o celular digitando mensagens durante o horário de serviço** (prevenindo acidentes operacionais em CDs e fábricas), todas as interações de feedback foram convertidas para **mensagens pré-programadas de 1 toque**:
  1. **Como foi o seu dia hoje?:**
     - Escolha seu sentimento com 1 toque (*😄 Excelente*, *🙂 Bem*, *😐 Cansativo* ou *🆘 Preciso de Apoio*).
     - Toque em **"Trocar Frase"** e selecione uma das opções pré-programadas (ex: *"Dia produtivo no setor! Meta do turno concluída sem dificuldades."*).
  2. **Minha Primeira Impressão:**
     - Toque em **"Opções (1 Toque)"** e escolha a frase pronta que melhor descreve sua recepção no setor.
  3. **Retrospectiva dos Marcos (Dias 1, 7, 15, 30, 60 e 90):**
     - Toque no card do marco desejado, marque os aprendizados validados com 1 toque e selecione uma das **frases de feedback pré-programadas** antes de tocar em **"Confirmar Feedback Pré-Programado"**.
  4. **Apoio Confidencial em 1 Toque:**
     - Caso enfrente atraso na linha de ônibus, dúvida de escala ou necessidade de troca de EPI, toque em *"Dificuldade com transporte ou escala?"*, selecione o motivo pré-programado e envie em 1 toque.

---

### 1.5. Aba 3: Privacidade, Preferências & Direitos LGPD
- Ajuste o controle deslizante de **Distância máxima de deslocamento (5 km a 40 km)** e ative/desative as chaves de **Escalas de interesse (`12x36`, `6x1`, `5x2`)**.
- **Solicitar Revisão Humana de IA (Art. 20 da LGPD):** Toque no botão dedicado, escolha um motivo pré-programado em 1 toque (ex: *"Mudança recente de bairro / linha de ônibus direta"*) e protocole sua revisão sem precisar digitar.
- **Ver Meus Dados / Exportar JSON:** Consulte ou baixe imediatamente o comprovante dos dados tratados.

---

## 2. Cadastro de Perfis (Candidato, Empresa e Recrutador)

| Perfil | Onde Cadastrar | Campos Necessários |
| :--- | :--- | :--- |
| **1. Candidato Operacional** | App Mobile → Aba **"Cadastrar Candidato"** na tela de Login | Nome Completo, CPF, WhatsApp, Cidade/Polo, Escala Preferida, Bairro/Linha de Ônibus, Experiências Práticas (1 toque), Senha e Aceite LGPD. |
| **2. Empresa Parceira** | Plataforma Web (`/rh`) → Aba **"Nova Empresa"** no Login RH ou menu lateral **"Empresas & Recrutadores → Cadastrar Empresa"** | Razão Social, CNPJ, Cidade/Polo Principal (*Jaú, Barra Bonita, Bariri*), Setor Operacional, Gestor Responsável, E-mail Corporativo, Telefone/WhatsApp e Senha Master. |
| **3. Recrutador / Gestor RH** | Plataforma Web (`/rh`) → Aba **"Novo Recrutador"** no Login RH, menu **"Empresas & Recrutadores"** ou Console Admin (`/admin`) | Nome Completo, E-mail Corporativo, WhatsApp/Ramal, Cargo (*Recrutador, Analista, Gestor RH, Líder de Turno*), Polo Regional, Empresa Vinculada e Senha. |

---

## 3. Recuperação de Senha ("Esqueceu a Senha")

### 3.1. Candidato (App Mobile)
1. Na tela de Login do App Mobile, toque em **"Esqueci a senha?"**.
2. **Passo 1:** Informe seu **CPF ou Celular WhatsApp** e toque em **"Enviar Código no WhatsApp"**.
3. **Passo 2:** Digite o **Código de Verificação de 6 dígitos** recebido no WhatsApp/SMS, escolha sua **Nova Senha de Acesso** e toque em **"Confirmar Nova Senha"**.

### 3.2. Recrutador ou Empresa (Portal RH `/rh`)
1. Na tela de Login do Portal RH (`/rh`), clique em **"Esqueceu a senha?"** acima do campo de senha.
2. **Passo 1:** Informe seu **E-mail Corporativo ou CNPJ** e clique em **"Enviar Código de Recuperação"**.
3. **Passo 2:** Insira o código de segurança de 6 dígitos enviado para o e-mail/WhatsApp corporativo, defina a nova senha e clique em **"Confirmar Nova Senha"**.

### 3.3. Administrador Master (Console `/admin`)
1. Na tela de acesso `/admin`, clique em **"Esqueceu a senha / Recuperar chave?"**.
2. Confirme o e-mail do Super Admin para disparo do protocolo ao DPO, insira o token recebido e redefina a Senha Master.

---

## 4. Gestão Eletrônica de Documentos (GED) & Backup / Restore (`/rh`)

A antiga aba *"Governança & LGPD"* do Portal RH foi evoluída para uma central completa de **Gestão Eletrônica de Documentos & Termos (`Documentos & Termos (GED)`)**:

### 4.1. Perguntas-Chave Respondidas em Cada Documento
1. **Quem lançou os termos?**
   - Exibe o nome completo do emissor, cargo (ex: *DPO & Head Jurídico*, *Gestor de RH*), empresa responsável, unidade/polo e data/hora de publicação.
2. **Qual o andamento do termo?**
   - Exibe o status atual do fluxo (*🟢 Vigente / Em Coleta*, *🔵 Em Assinatura Digital*, *🟡 Em Revisão Jurídica*, *⚪ Concluído / Arquivado*) e a barra de progresso com o número exato de assinaturas coletadas versus a meta total.
3. **Aceita os termos?**
   - Exibe claramente se o termo está **ACEITO** ou **PENDENTE DE ACEITE**, permitindo alternar o aceite eletronicamente em 1 clique e consultar a lista nominal de assinantes clicando em **"Ver Assinaturas"**.

### 4.2. Adicionar e Alterar Informações de Termos pela Empresa
- **Adicionar Novo Termo:** Clique em **"+ Lançar Novo Termo / Documento"** no topo da tela GED e preencha título, empresa, unidade, quem lançou, andamento, meta de assinaturas e resumo das cláusulas.
- **Alterar Termo Existente:** Clique em **"Alterar Informações"** em qualquer card de documento para editar cláusulas, atualizar contadores de aceite ou mudar o responsável.

### 4.3. Extração de Dados (Backup & Restore)
Na sub-aba **"Extrair Dados (Backup & Restore)"** dentro de *Documentos & Termos (GED)*:
- **Baixar Backup Completo (`.JSON`):** Extrai um arquivo `.json` com todos os Termos GED, Logs LGPD, Vagas, Candidatos e Empresas cadastradas.
- **Extrair Planilha Excel (`.CSV`):** Exporta uma planilha compatível com Microsoft Excel e Google Sheets contendo o status de todos os termos, quem lançou, andamento e taxa de aceite.
- **Restaurar Dados (`Restore`):** Clique em **"Carregar Arquivo de Backup (.JSON)"** para importar um backup salvo anteriormente, ou em **"Restaurar Padrão"** para redefinir os dados de demonstração.

---

## 5. Troubleshooting (Solução de Problemas Comuns)

| Problema / Sintoma | Causa Provável | Solução Passo a Passo |
| :--- | :--- | :--- |
| **1. Emulador Android exibe `exited with code 1 during startup` ao rodar `flutter emulators --launch`** | O emulador (`emulator-5554`) já está aberto e em execução em segundo plano. | 1. Execute `flutter devices` no terminal.<br>2. Verifique que `emulator-5554` já aparece na lista.<br>3. Execute diretamente `flutter run -d emulator-5554`. |
| **2. O candidato não encontra caixa de texto para digitar mensagem no App Mobile** | Comportamento intencional do sistema para reduzir tempo de tela no turno operacional e substituir o chat interno pelo WhatsApp. | - Para **falar sobre vagas**: toque em **Candidatar** e use o botão **"Abrir no WhatsApp (1 Toque)"**.<br>- Para **enviar feedback de 90 dias**: toque em **"Trocar Frase"** ou **"Opções (1 Toque)"** e selecione uma mensagem pré-programada. |
| **3. Termos GED ou Empresas cadastradas sumiram após trocar de navegador** | Os dados dinâmicos de demonstração ficam persistidos no `localStorage` do navegador utilizado. | 1. Antes de trocar de navegador ou limpar o cache, acesse **GED → Extrair Dados** e clique em **Baixar Backup Completo (.JSON)**.<br>2. No novo navegador, clique em **Carregar Arquivo de Backup (.JSON)** para restaurar tudo em 1 segundo. |
| **4. Erro de porta `5173` em uso ao iniciar a Web Platform (`npm run dev`)** | Já existe um servidor Node/Vite ativo rodando na máquina. | Acesse diretamente `http://localhost:5173/` no navegador ou encerre o processo Node anterior antes de iniciar um novo. |
| **5. Código 2FA ou recuperação de senha não chega em ambiente local offline** | O ambiente roda em modo local simulado sem gateway SMTP/SMS externo configurado. | O modal de **"Esqueceu a Senha"** e o **Login 2FA** já preenchem automaticamente um código de demonstração válido (ex: `849-204` ou `739201`) para permitir testes completos offline. |
