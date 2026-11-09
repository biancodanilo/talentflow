import React, { useState } from 'react';
import {
  BookOpen, Smartphone, UserPlus, Key, Wrench, ShieldCheck, BatteryCharging,
  MessageSquare, Clock, Database, CheckCircle2, AlertTriangle, HelpCircle
} from 'lucide-react';

export default function UserGuideView() {
  const [section, setSection] = useState('mobile'); // 'mobile' | 'register' | 'password' | 'ged_backup' | 'troubleshooting'

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Documentação Oficial & Manual Operacional v2.0</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white font-['Plus_Jakarta_Sans'] mt-0.5">
          Guia de Usuário Completo — TalentFlow Web & Mobile
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manual passo a passo do Aplicativo Mobile para Candidatos, Cadastro (Candidato, Empresa e Recrutador), Recuperação de Senha, GED/Backup e Troubleshooting.
        </p>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap gap-2 pb-3 border-b border-slate-800">
        <button
          onClick={() => setSection('mobile')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            section === 'mobile'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>1. Guia Mobile Completo (Candidatos)</span>
        </button>

        <button
          onClick={() => setSection('register')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            section === 'register'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>2. Cadastro (Candidato, Empresa, Recrutador)</span>
        </button>

        <button
          onClick={() => setSection('password')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            section === 'password'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>3. Esqueceu a Senha</span>
        </button>

        <button
          onClick={() => setSection('ged_backup')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            section === 'ged_backup'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>4. GED (Termos) & Backup/Restore</span>
        </button>

        <button
          onClick={() => setSection('troubleshooting')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            section === 'troubleshooting'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>5. Troubleshooting (Solução de Problemas)</span>
        </button>
      </div>

      {/* SEÇÃO 1: GUIA COMPLETO MOBILE PARA CANDIDATOS */}
      {section === 'mobile' && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-emerald-400 font-['Plus_Jakarta_Sans']">
              Guia Completo do Aplicativo Mobile (Candidatos Operacionais)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              O aplicativo mobile do TalentFlow foi projetado para máxima rapidez, zero digitação durante o horário de serviço e leitura visual imediata da compatibilidade logística. O app possui <strong>3 abas principais</strong> na barra inferior (a antiga aba de chat interno foi removida e substituída pelo redirecionamento direto ao WhatsApp oficial).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                  <BatteryCharging className="w-5 h-5" />
                  <span>Aba 1: Oportunidades & Ícone de Bateria de Match</span>
                </div>
                <p className="text-xs text-slate-400">
                  Cada vaga exibe um <strong>Indicador de Bateria com 4 barras visuais</strong> que traduz instantaneamente a porcentagem de compatibilidade entre o endereço/linha de ônibus do candidato e a empresa:
                </p>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  <li><strong className="text-emerald-400">90% a 100% (4 barras • Verde):</strong> Carga Máxima / Linha de ônibus direta (&lt; 20 min).</li>
                  <li><strong className="text-cyan-400">80% a 89% (3 barras • Ciano):</strong> Match Alto / Fretado ou 1 condução rápida.</li>
                  <li><strong className="text-amber-400">70% a 79% (2 barras • Âmbar):</strong> Match Médio / Distância intermediária.</li>
                  <li><strong className="text-orange-400">Abaixo de 70% (1 barra • Alerta):</strong> Baixo Match / Risco logístico de baldeação.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-green-400 font-bold text-sm">
                  <MessageSquare className="w-5 h-5" />
                  <span>Candidatura Direta via WhatsApp (Sem Chat no App)</span>
                </div>
                <p className="text-xs text-slate-400">
                  Para evitar que o candidato precise acompanhar dois aplicativos de mensagem diferentes, a tela de conversa interna foi removida do app:
                </p>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  <li>Ao tocar em <strong>"Candidatar"</strong> em qualquer vaga, abre-se o cartão de confirmação do WhatsApp.</li>
                  <li>A mensagem já vem preenchida com o código da vaga e a porcentagem de Match.</li>
                  <li>Basta tocar em <strong>"Abrir no WhatsApp (1 Toque)"</strong> para concluir a triagem diretamente no Zap.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
                  <Clock className="w-5 h-5" />
                  <span>Aba 2: Guardião dos 90 Dias (Feedback Pré-Programado)</span>
                </div>
                <p className="text-xs text-slate-400">
                  Durante os primeiros 90 dias de contrato, o colaborador registra sua adaptação <strong>sem digitar nenhuma mensagem</strong>, reduzindo o tempo de uso do celular em horário de serviço:
                </p>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  <li><strong>Sentimento do Turno:</strong> 1 toque em <em>Excelente, Bem, Cansativo ou Preciso de Apoio</em>.</li>
                  <li><strong>Frases Pré-Programadas:</strong> Ao tocar em <em>"Trocar Frase"</em>, <em>"Opções (1 Toque)"</em> ou nos marcos de 1, 7, 15, 30, 60 e 90 dias, o colaborador apenas seleciona uma frase pronta em 2 segundos.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-teal-400 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Aba 3: Privacidade, Preferências & LGPD</span>
                </div>
                <p className="text-xs text-slate-400">
                  Permite ajustar a distância máxima de deslocamento (5 a 40 km), escalas aceitas (`12x36`, `6x1`, `5x2`) e acionar direitos da LGPD:
                </p>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  <li><strong>Solicitar Revisão Humana de IA (Art. 20):</strong> Selecionando um motivo pré-programado em 1 toque.</li>
                  <li><strong>Ver Meus Dados / Exportar JSON:</strong> Transparência imediata sobre os dados armazenados.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEÇÃO 2: CADASTRO (CANDIDATO, EMPRESA, RECRUTADOR) */}
      {section === 'register' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Perfil 1 • Mobile App
            </span>
            <h3 className="text-base font-bold text-white">Cadastro de Candidato</h3>
            <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside">
              <li>Abra o aplicativo Mobile TalentFlow na tela inicial de Login.</li>
              <li>Toque na aba superior <strong>"Cadastrar Candidato"</strong> (ou no botão <em>"Novo por aqui? Criar Cadastro de Candidato"</em>).</li>
              <li>Preencha <strong>Nome Completo, CPF e WhatsApp</strong>.</li>
              <li>Selecione sua <strong>Cidade/Polo</strong> (Jaú, Barra Bonita, Bariri) e <strong>Escala Preferida</strong> (12x36, 6x1 ou 5x2).</li>
              <li>Informe seu bairro/linha de ônibus e marque suas experiências práticas com 1 toque.</li>
              <li>Aceite o Termo LGPD e toque em <strong>"Concluir Cadastro e Ver Vagas"</strong>.</li>
            </ol>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
              Perfil 2 • Plataforma Web (/rh)
            </span>
            <h3 className="text-base font-bold text-white">Cadastro de Empresa Parceira</h3>
            <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside">
              <li>Acesse <strong>Área do RH (/rh)</strong> no menu superior da plataforma web.</li>
              <li>Na tela de acesso, selecione a aba <strong>"Nova Empresa"</strong> (ou acesse a aba <em>Empresas & Recrutadores</em> dentro do painel).</li>
              <li>Informe a <strong>Razão Social, CNPJ, Cidade/Polo Principal e Setor Operacional</strong>.</li>
              <li>Preencha o nome do Gestor Responsável, E-mail Corporativo, Telefone e Senha Master.</li>
              <li>Clique em <strong>"Cadastrar Empresa e Acessar Painel"</strong>. A empresa já poderá publicar vagas e lançar termos no GED.</li>
            </ol>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
              Perfil 3 • RH & Console Admin
            </span>
            <h3 className="text-base font-bold text-white">Cadastro de Recrutador / Gestor</h3>
            <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside">
              <li>Acesse <strong>Área do RH (/rh)</strong> e clique na aba <strong>"Novo Recrutador"</strong> (ou pelo menu <em>Empresas & Recrutadores</em> / <em>Console Admin</em>).</li>
              <li>Informe <strong>Nome Completo, E-mail Corporativo e WhatsApp/Ramal</strong>.</li>
              <li>Escolha o <strong>Cargo</strong> (Recrutador, Analista, Gestor RH ou Líder de Turno) e o <strong>Polo Regional</strong>.</li>
              <li>Informe a Empresa Vinculada e defina a senha corporativa.</li>
              <li>Clique em <strong>"Concluir Cadastro de Recrutador e Entrar"</strong>.</li>
            </ol>
          </div>
        </div>
      )}

      {/* SEÇÃO 3: ESQUECEU A SENHA */}
      {section === 'password' && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-emerald-400 font-['Plus_Jakarta_Sans']">
            Procedimento de Recuperação de Senha ("Esqueceu a Senha")
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">1. No App Mobile (Para Candidatos)</h4>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                <li>Na tela de Login do App, toque em <strong>"Esqueci a senha?"</strong>.</li>
                <li><strong>Passo 1:</strong> Digite seu CPF ou número de WhatsApp cadastrado e toque em <em>"Enviar Código no WhatsApp"</em>.</li>
                <li><strong>Passo 2:</strong> Insira o código de 6 dígitos recebido no seu WhatsApp/SMS e digite a nova senha desejada.</li>
                <li>Toque em <strong>"Confirmar Nova Senha"</strong> para liberar o acesso imediatamente.</li>
              </ol>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">2. Na Plataforma Web (Para RH, Empresas e Admin)</h4>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                <li>Na tela de Login do Portal RH (`/rh`), clique em <strong>"Esqueceu a senha?"</strong> acima do campo de senha.</li>
                <li><strong>Passo 1:</strong> Informe seu E-mail Corporativo ou CNPJ da empresa e clique em <em>"Enviar Código de Recuperação"</em>.</li>
                <li><strong>Passo 2:</strong> Valide o token de segurança de 6 dígitos enviado ao e-mail/WhatsApp corporativo e defina a nova senha.</li>
                <li>Para contas Super Admin (`/admin`), o reset de hardware 2FA também notifica automaticamente o DPO.</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* SEÇÃO 4: GED & BACKUP / RESTORE */}
      {section === 'ged_backup' && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-lg font-bold text-emerald-400 font-['Plus_Jakarta_Sans']">
            Gestão Eletrônica de Documentos (GED) & Extração de Dados (Backup / Restore)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Como usar o GED (Documentos & Termos LGPD)</h4>
              <p className="text-slate-400">
                Acesse a aba <strong>"Documentos & Termos (GED)"</strong> na barra lateral do Portal RH:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li><strong>Quem lançou os termos:</strong> Cada documento exibe o nome, cargo, empresa, unidade e data/hora de emissão.</li>
                <li><strong>Qual o andamento do termo:</strong> Acompanhe a barra de progresso de assinaturas e altere o status (<em>Vigente, Em Assinatura, Em Revisão Jurídica, Concluído</em>).</li>
                <li><strong>Aceita os termos?:</strong> Clique no botão de aceite para assinar eletronicamente ou consultar a lista nominal de quem já aceitou.</li>
                <li><strong>Adicionar / Alterar:</strong> Clique em <em>"Lançar Novo Termo"</em> ou <em>"Alterar Informações"</em> para editar cláusulas e metas.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Como Extrair Dados (Backup) e Restaurar (Restore)</h4>
              <p className="text-slate-400">
                Dentro de <strong>Documentos & Termos (GED) → aba "Extrair Dados (Backup & Restore)"</strong>:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li><strong>Backup Completo (.JSON):</strong> Clique em <em>"Baixar Backup Completo (.JSON)"</em> para extrair todos os termos, aceites, vagas, candidatos e empresas.</li>
                <li><strong>Relatório Planilha (.CSV):</strong> Clique em <em>"Extrair Planilha Excel (.CSV)"</em> para abrir os dados diretamente no Excel.</li>
                <li><strong>Restore (Importação):</strong> Clique em <em>"Carregar Arquivo de Backup (.JSON)"</em> e selecione um arquivo salvo anteriormente para restaurar todo o estado do sistema.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SEÇÃO 5: TROUBLESHOOTING */}
      {section === 'troubleshooting' && (
        <div className="space-y-3">
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-amber-400 font-['Plus_Jakarta_Sans'] flex items-center space-x-2">
              <Wrench className="w-5 h-5" />
              <span>Troubleshooting — Solução Rápida de Problemas</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <p className="font-bold text-white flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>1. Emulador Android não inicia ou exibe erro "code 1"</span>
                </p>
                <p className="text-slate-400">
                  <strong>Causa:</strong> O dispositivo virtual (`emulator-5554`) já está aberto em segundo plano ou travado no ADB.
                </p>
                <p className="text-emerald-400">
                  <strong>Solução:</strong> Execute `flutter devices` para confirmar se `emulator-5554` já está conectado e rode `flutter run -d emulator-5554`. Se necessário, reinicie o servidor ADB com `adb kill-server && adb start-server`.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <p className="font-bold text-white flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>2. Candidato não encontra onde digitar mensagem no App</span>
                </p>
                <p className="text-slate-400">
                  <strong>Causa:</strong> Por diretriz operacional e segurança no trabalho, a digitação livre e o chat interno foram desativados.
                </p>
                <p className="text-emerald-400">
                  <strong>Solução:</strong> Na aba <em>90 Dias</em>, basta tocar em <strong>"Trocar Frase"</strong> ou <strong>"Opções (1 Toque)"</strong> e selecionar uma das mensagens pré-programadas. Para conversar com o RH sobre vagas, toque em <strong>"Candidatar"</strong> para abrir o WhatsApp oficial.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <p className="font-bold text-white flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>3. Alterações no GED ou Cadastros sumiram após limpar navegador</span>
                </p>
                <p className="text-slate-400">
                  <strong>Causa:</strong> A limpeza de cache do navegador remove o armazenamento local (`localStorage`).
                </p>
                <p className="text-emerald-400">
                  <strong>Solução:</strong> Acesse <em>Documentos & Termos (GED) → Extrair Dados (Backup & Restore)</em> e clique em <strong>"Carregar Arquivo de Backup (.JSON)"</strong> para restaurar seus dados, ou clique em <strong>"Restaurar Padrão"</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <p className="font-bold text-white flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>4. Porta 5173 ocupada ao iniciar a Plataforma Web</span>
                </p>
                <p className="text-slate-400">
                  <strong>Causa:</strong> Já existe uma instância do servidor Vite rodando em segundo plano.
                </p>
                <p className="text-emerald-400">
                  <strong>Solução:</strong> Acesse diretamente `http://localhost:5173/` no navegador ou encerre processos Node anteriores antes de rodar `npm run dev`.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
