import React, { useState, useRef } from 'react';
import {
  lgpdAuditLogs as initialLogs,
  gedDocumentsData as initialDocuments,
  jobsData,
  candidatesData,
  initialCompaniesData
} from '../../data/mockData';
import {
  ShieldCheck, Lock, FileText, UserCheck, Eye, Download, Upload, Search,
  CheckCircle, Plus, Edit3, Clock, Building2, User, Check, X, RefreshCw,
  Database, FileSpreadsheet, AlertCircle, Sparkles, CheckSquare
} from 'lucide-react';

export default function LgpdGovernance() {
  const [activeSubTab, setActiveSubTab] = useState('ged'); // 'ged' | 'backup' | 'audit'
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('tf_ged_documents');
    return saved ? JSON.parse(saved) : initialDocuments;
  });
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('tf_lgpd_logs');
    return saved ? JSON.parse(saved) : initialLogs;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [toast, setToast] = useState(null);

  // Modal Criar / Editar Termo GED
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [docForm, setDocForm] = useState({
    title: '',
    category: 'Privacidade & LGPD (Art. 7º e 20)',
    company: 'Mercado Sul Distribuidora S.A.',
    unit: 'CD Jaú - SP',
    version: 'v1.0',
    launchedBy: '',
    launchedByRole: 'Gestor de RH / Empresa',
    workflowStatus: 'Vigente / Em Coleta',
    totalTargets: 50,
    acceptedCount: 0,
    mandatory: true,
    summary: ''
  });

  // Modal Detalhes de Assinaturas do Termo
  const [selectedDocDetails, setSelectedDocDetails] = useState(null);

  // Backup & Restore state
  const [lastBackupDate, setLastBackupDate] = useState(
    () => localStorage.getItem('tf_last_backup') || '2026-10-27 18:30:00'
  );
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const saveDocsToStorage = (updated) => {
    setDocuments(updated);
    localStorage.setItem('tf_ged_documents', JSON.stringify(updated));
  };

  // Abrir modal para Novo Documento
  const handleOpenNewDoc = () => {
    setEditingDoc(null);
    setDocForm({
      title: '',
      category: 'Privacidade & LGPD (Art. 7º e 20)',
      company: 'Mercado Sul Distribuidora S.A.',
      unit: 'CD Jaú - SP',
      version: 'v1.0',
      launchedBy: 'Rafael Mendes',
      launchedByRole: 'Gestor de RH Corporativo',
      workflowStatus: 'Vigente / Em Coleta',
      totalTargets: 50,
      acceptedCount: 1,
      mandatory: true,
      summary: ''
    });
    setIsDocModalOpen(true);
  };

  // Abrir modal para Editar Documento existente
  const handleOpenEditDoc = (doc) => {
    setEditingDoc(doc);
    setDocForm({
      title: doc.title,
      category: doc.category,
      company: doc.company,
      unit: doc.unit,
      version: doc.version,
      launchedBy: doc.launchedBy,
      launchedByRole: doc.launchedByRole,
      workflowStatus: doc.workflowStatus,
      totalTargets: doc.totalTargets,
      acceptedCount: doc.acceptedCount,
      mandatory: doc.mandatory,
      summary: doc.summary
    });
    setIsDocModalOpen(true);
  };

  // Salvar (Criar ou Editar) Termo / Documento
  const handleSaveDocument = (e) => {
    e.preventDefault();
    if (!docForm.title.trim() || !docForm.launchedBy.trim()) return;

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const total = Math.max(1, Number(docForm.totalTargets) || 1);
    const accepted = Math.min(total, Math.max(0, Number(docForm.acceptedCount) || 0));
    const progress = Math.round((accepted / total) * 100);

    if (editingDoc) {
      const updated = documents.map((d) =>
        d.id === editingDoc.id
          ? {
              ...d,
              ...docForm,
              totalTargets: total,
              acceptedCount: accepted,
              progressPercent: progress,
              lastUpdatedAt: nowStr
            }
          : d
      );
      saveDocsToStorage(updated);
      showToast(`Termo "${docForm.title}" atualizado pela empresa com sucesso!`);
    } else {
      const newDoc = {
        id: `GED-2026-00${documents.length + 1}`,
        ...docForm,
        totalTargets: total,
        acceptedCount: accepted,
        progressPercent: progress,
        launchedAt: nowStr,
        lastUpdatedAt: nowStr,
        userAccepted: true,
        recentSigners: [
          {
            name: docForm.launchedBy,
            role: `${docForm.launchedByRole} (Emissor)`,
            status: 'Aceito',
            date: nowStr
          }
        ]
      };
      saveDocsToStorage([newDoc, ...documents]);
      showToast(`Novo termo "${newDoc.title}" lançado por ${newDoc.launchedBy}!`);
    }

    setIsDocModalOpen(false);
  };

  // Alternar "Aceita os termos?" para o usuário/empresa atual ou registrar novo aceite
  const handleToggleAcceptTerm = (docId) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const updated = documents.map((d) => {
      if (d.id === docId) {
        const nextAccepted = !d.userAccepted;
        const nextCount = nextAccepted
          ? Math.min(d.totalTargets, d.acceptedCount + 1)
          : Math.max(0, d.acceptedCount - 1);
        const nextProgress = Math.round((nextCount / d.totalTargets) * 100);

        const nextSigners = nextAccepted
          ? [
              {
                name: 'Representante RH / Candidato Validado',
                role: 'Aceite Eletrônico Registrado',
                status: 'Aceito',
                date: nowStr
              },
              ...(d.recentSigners || [])
            ]
          : d.recentSigners;

        showToast(
          nextAccepted
            ? `Termo ${d.id} ACEITO e assinado digitalmente!`
            : `Aceite do termo ${d.id} revogado para revisão.`
        );

        return {
          ...d,
          userAccepted: nextAccepted,
          acceptedCount: nextCount,
          progressPercent: nextProgress,
          lastUpdatedAt: nowStr,
          recentSigners: nextSigners
        };
      }
      return d;
    });
    saveDocsToStorage(updated);
  };

  // Alterar rapidamente o andamento do termo
  const handleQuickStatusChange = (docId, newStatus) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const updated = documents.map((d) =>
      d.id === docId ? { ...d, workflowStatus: newStatus, lastUpdatedAt: nowStr } : d
    );
    saveDocsToStorage(updated);
    showToast(`Andamento do termo ${docId} alterado para "${newStatus}".`);
  };

  // --- FUNÇÕES DE EXTRAÇÃO DE DADOS (BACKUP & RESTORE) ---
  const handleExportFullBackupJson = () => {
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
    const backupPayload = {
      system: 'TalentFlow RH Tech Platform',
      version: '2.0-GED',
      exportedAt: timestamp,
      gedDocuments: documents,
      lgpdAuditLogs: logs,
      jobs: JSON.parse(localStorage.getItem('tf_jobs') || JSON.stringify(jobsData)),
      candidates: JSON.parse(localStorage.getItem('tf_candidates') || JSON.stringify(candidatesData)),
      companies: JSON.parse(localStorage.getItem('tf_companies') || JSON.stringify(initialCompaniesData))
    };

    const blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `talentflow_backup_${now.toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    localStorage.setItem('tf_last_backup', timestamp);
    localStorage.setItem('tf_snapshot_backup', JSON.stringify(backupPayload));
    setLastBackupDate(timestamp);
    showToast('Backup completo (.JSON) extraído e salvo com sucesso!');
  };

  const handleExportCsvReport = () => {
    const headers = [
      'ID',
      'Titulo do Termo',
      'Categoria',
      'Empresa',
      'Unidade',
      'Versao',
      'Quem Lancou',
      'Cargo Emissor',
      'Andamento do Termo',
      'Aceita os Termos (Status)',
      'Aceites Confirmados',
      'Total Destinatarios',
      'Progresso (%)'
    ];
    const rows = documents.map((d) => [
      d.id,
      `"${d.title.replace(/"/g, '""')}"`,
      `"${d.category}"`,
      `"${d.company}"`,
      `"${d.unit}"`,
      d.version,
      `"${d.launchedBy}"`,
      `"${d.launchedByRole}"`,
      `"${d.workflowStatus}"`,
      d.userAccepted ? 'ACEITO' : 'PENDENTE',
      d.acceptedCount,
      d.totalTargets,
      `${d.progressPercent}%`
    ]);

    const csvContent =
      '\uFEFF' + [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_ged_termos_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Planilha CSV de Termos e Aceites exportada com sucesso!');
  };

  const handleImportBackupFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.gedDocuments && Array.isArray(parsed.gedDocuments)) {
          saveDocsToStorage(parsed.gedDocuments);
        }
        if (parsed.lgpdAuditLogs && Array.isArray(parsed.lgpdAuditLogs)) {
          setLogs(parsed.lgpdAuditLogs);
          localStorage.setItem('tf_lgpd_logs', JSON.stringify(parsed.lgpdAuditLogs));
        }
        if (parsed.companies && Array.isArray(parsed.companies)) {
          localStorage.setItem('tf_companies', JSON.stringify(parsed.companies));
        }
        showToast(`Restore concluído com sucesso a partir de "${file.name}"!`);
      } catch (err) {
        showToast('Erro ao ler arquivo de backup. Verifique se é um JSON válido.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleRestoreDefaults = () => {
    saveDocsToStorage(initialDocuments);
    setLogs(initialLogs);
    localStorage.setItem('tf_lgpd_logs', JSON.stringify(initialLogs));
    showToast('Dados de Governança e Termos GED restaurados para o padrão original!');
  };

  // Filtros de documentos
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.launchedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || doc.workflowStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPIs
  const totalTerms = documents.length;
  const acceptedByUserCount = documents.filter((d) => d.userAccepted).length;
  const totalSignaturesCollected = documents.reduce((acc, d) => acc + d.acceptedCount, 0);
  const totalSignaturesTarget = documents.reduce((acc, d) => acc + d.totalTargets, 0);
  const globalAcceptanceRate =
    totalSignaturesTarget > 0
      ? Math.round((totalSignaturesCollected / totalSignaturesTarget) * 100)
      : 100;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="px-4 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center space-x-2 border border-emerald-400">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{toast}</span>
          </div>
        </div>
      )}

      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Gestão Eletrônica de Documentos (GED) & Governança LGPD</span>
          </div>
          <h2 className="text-2xl font-black text-white font-['Plus_Jakarta_Sans'] mt-0.5">
            Controle de Termos, Assinaturas & Backup de Dados
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Gerencie quem lançou os termos, acompanhe o andamento de assinaturas, registre o aceite digital e extraia backups completos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleExportFullBackupJson}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 transition-all"
            title="Extrair Backup Completo em JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup (.JSON)</span>
          </button>

          <button
            onClick={handleOpenNewDoc}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Lançar Novo Termo / Documento</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards do GED */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Termos & Documentos</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{totalTerms} ativos</p>
          <p className="text-[11px] text-slate-400 mt-1">
            Editáveis pelas empresas parceiras e RH
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Taxa Global de Aceite</span>
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-400">{globalAcceptanceRate}%</p>
          <p className="text-[11px] text-slate-400 mt-1">
            {totalSignaturesCollected} de {totalSignaturesTarget} assinaturas coletadas
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Meus Aceites Registrados</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-indigo-400">
            {acceptedByUserCount} / {totalTerms}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Termos aceitos na sessão atual
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Último Backup Extraído</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <p className="text-sm font-mono font-bold text-cyan-400 mt-1">{lastBackupDate}</p>
          <p className="text-[11px] text-slate-400 mt-2">
            Snapshot seguro JSON / CSV ativo
          </p>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('ged')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeSubTab === 'ged'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Gestão Eletrônica de Documentos & Termos ({documents.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('backup')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeSubTab === 'backup'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Extrair Dados (Backup & Restore)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('audit')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeSubTab === 'audit'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Trilha de Auditoria ANPD ({logs.length})</span>
        </button>
      </div>

      {/* SUB-ABA 1: GESTÃO ELETRÔNICA DE DOCUMENTOS (GED) */}
      {activeSubTab === 'ged' && (
        <div className="space-y-4">
          {/* Search & Status Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar termo por título, quem lançou, empresa ou código GED..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">Todos os Andamentos</option>
              <option value="Vigente / Em Coleta">Vigente / Em Coleta</option>
              <option value="Em Assinatura Digital">Em Assinatura Digital</option>
              <option value="Em Revisão Jurídica">Em Revisão Jurídica</option>
              <option value="Concluído / Arquivado">Concluído / Arquivado</option>
            </select>

            <button
              onClick={handleExportCsvReport}
              className="flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Exportar Planilha CSV</span>
            </button>
          </div>

          {/* Lista de Cards GED */}
          <div className="grid grid-cols-1 gap-4">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-800 text-emerald-400 border border-slate-700">
                        {doc.id} • {doc.version}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                        {doc.category}
                      </span>
                      {doc.mandatory && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          Obrigatório na Admissão
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                      {doc.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {doc.summary}
                    </p>
                  </div>

                  {/* Right Actions: Aceita os Termos? + Editar */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleAcceptTerm(doc.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all border ${
                        doc.userAccepted
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/25'
                          : 'bg-amber-500 text-slate-950 border-amber-400 hover:bg-amber-400 shadow-lg shadow-amber-500/20'
                      }`}
                    >
                      {doc.userAccepted ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span>Termo Aceito ✓ (Clique p/ Revisar)</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Aceitar os Termos Agora</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenEditDoc(doc)}
                        className="px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 transition-all"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Alterar Informações</span>
                      </button>

                      <button
                        onClick={() => setSelectedDocDetails(doc)}
                        className="px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center space-x-1.5 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Ver Assinaturas</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Grid com as 3 Perguntas-Chave da Gestão Eletrônica de Documentos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80">
                  {/* 1. QUEM LANÇOU OS TERMOS? */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800/90">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      1. Quem Lançou os Termos?
                    </span>
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{doc.launchedBy}</p>
                        <p className="text-[11px] text-purple-400 font-medium">{doc.launchedByRole}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {doc.company} ({doc.unit}) • {doc.launchedAt}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. QUAL O ANDAMENTO DO TERMO? */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800/90">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        2. Qual o Andamento do Termo?
                      </span>
                      <span className="text-xs font-black text-cyan-400">{doc.progressPercent}%</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <select
                        value={doc.workflowStatus}
                        onChange={(e) => handleQuickStatusChange(doc.id, e.target.value)}
                        className="w-full px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-cyan-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
                      >
                        <option value="Vigente / Em Coleta">🟢 Vigente / Em Coleta</option>
                        <option value="Em Assinatura Digital">🔵 Em Assinatura Digital</option>
                        <option value="Em Revisão Jurídica">🟡 Em Revisão Jurídica</option>
                        <option value="Concluído / Arquivado">⚪ Concluído / Arquivado</option>
                      </select>
                    </div>

                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
                        style={{ width: `${doc.progressPercent}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {doc.acceptedCount} de {doc.totalTargets} colaboradores/candidatos assinaram
                    </p>
                  </div>

                  {/* 3. ACEITA OS TERMOS? */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800/90 flex flex-col justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      3. Aceita os Termos? (Status de Aceite)
                    </span>
                    <div className="flex items-center justify-between">
                      <div>
                        <span
                          className={`inline-flex items-center space-x-1.5 text-xs font-extrabold ${
                            doc.userAccepted ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        >
                          {doc.userAccepted ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>SIM • Termo Aceito</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-4 h-4" />
                              <span>PENDENTE DE ACEITE</span>
                            </>
                          )}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-1">
                          Última atualização: {doc.lastUpdatedAt}
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggleAcceptTerm(doc.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 border border-slate-700"
                      >
                        Alternar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-ABA 2: EXTRAIR DADOS (BACKUP & RESTORE) */}
      {activeSubTab === 'backup' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card Exportação / Backup */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-400">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                  Extrair Dados & Gerar Backup Completo
                </h3>
                <p className="text-xs text-slate-400">
                  Exporte todas as informações de vagas, candidatos, empresas e termos GED.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
              <p className="font-bold text-emerald-400">O que está incluído no pacote de extração:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Termos e Documentos Eletrônicos (GED) + Lista de Aceites ({documents.length} registros)</li>
                <li>Trilha de Auditoria LGPD & Revisões Humanas ({logs.length} eventos)</li>
                <li>Banco de Vagas Operacionais e Candidatos em Triagem</li>
                <li>Cadastro de Empresas Parceiras e Recrutadores</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleExportFullBackupJson}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Baixar Backup Completo (.JSON)</span>
              </button>

              <button
                onClick={handleExportCsvReport}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center space-x-2 border border-slate-700 transition-all"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Extrair Planilha Excel (.CSV)</span>
              </button>
            </div>
          </div>

          {/* Card Restore / Importação */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-400">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                  Restaurar Dados (Restore de Sistema)
                </h3>
                <p className="text-xs text-slate-400">
                  Importe um arquivo de backup JSON anterior ou restaure o ponto de segurança.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Último ponto de restauração salvo:</span>
                <span className="font-mono font-bold text-cyan-400">{lastBackupDate}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                O processo de Restore valida automaticamente a integridade dos Termos GED e preserva os logs obrigatórios da ANPD.
              </p>
            </div>

            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleImportBackupFile}
              className="hidden"
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>Carregar Arquivo de Backup (.JSON)</span>
              </button>

              <button
                onClick={handleRestoreDefaults}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center space-x-1.5 border border-slate-700 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restaurar Padrão</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-ABA 3: AUDITORIA LGPD */}
      {activeSubTab === 'audit' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
                Registro Imutável de Operações de Tratamento (Art. 20 LGPD)
              </h3>
              <p className="text-xs text-slate-400">
                Trilha de auditoria para prestação de contas à ANPD e revisão humana de IA
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800/80">
                  <th className="py-3 px-3 font-semibold">ID / Timestamp</th>
                  <th className="py-3 px-3 font-semibold">Ação Realizada</th>
                  <th className="py-3 px-3 font-semibold">Titular / Candidato</th>
                  <th className="py-3 px-3 font-semibold">Base Legal (LGPD)</th>
                  <th className="py-3 px-3 font-semibold">Revisão Humana</th>
                  <th className="py-3 px-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-3 font-mono text-[11px] text-slate-400">
                      <span className="text-white block font-bold">{log.id}</span>
                      <span>{log.timestamp}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-white block">{log.action}</span>
                      <span className="text-[11px] text-slate-400">{log.dataProcessed}</span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-300 font-medium">{log.candidateId}</td>
                    <td className="py-3.5 px-3 text-slate-400 text-[11px]">{log.legalBasis}</td>
                    <td className="py-3.5 px-3">
                      {log.humanReviewed ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-400 text-[11px] font-bold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{log.reviewer}</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Automatizado</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL CRIAR / EDITAR DOCUMENTO OU TERMO (PELA EMPRESA) */}
      {isDocModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsDocModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans'] mb-1">
              {editingDoc ? 'Alterar Informações do Termo / Documento' : 'Lançar Novo Termo ou Documento (GED)'}
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              A empresa pode adicionar cláusulas, atualizar quem lançou o termo e definir o status de andamento.
            </p>

            <form onSubmit={handleSaveDocument} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Título do Termo / Documento *</label>
                <input
                  type="text"
                  required
                  value={docForm.title}
                  onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                  placeholder="Ex: Termo de Consentimento LGPD & Escala Operacional"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Empresa Responsável</label>
                  <input
                    type="text"
                    value={docForm.company}
                    onChange={(e) => setDocForm({ ...docForm, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Unidade / Polo</label>
                  <input
                    type="text"
                    value={docForm.unit}
                    onChange={(e) => setDocForm({ ...docForm, unit: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Quem Lançou o Termo? (Nome) *</label>
                  <input
                    type="text"
                    required
                    value={docForm.launchedBy}
                    onChange={(e) => setDocForm({ ...docForm, launchedBy: e.target.value })}
                    placeholder="Ex: Mariana Albuquerque"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Cargo do Emissor</label>
                  <input
                    type="text"
                    value={docForm.launchedByRole}
                    onChange={(e) => setDocForm({ ...docForm, launchedByRole: e.target.value })}
                    placeholder="Ex: DPO / Gestor de RH"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Qual o Andamento?</label>
                  <select
                    value={docForm.workflowStatus}
                    onChange={(e) => setDocForm({ ...docForm, workflowStatus: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Vigente / Em Coleta">Vigente / Em Coleta</option>
                    <option value="Em Assinatura Digital">Em Assinatura Digital</option>
                    <option value="Em Revisão Jurídica">Em Revisão Jurídica</option>
                    <option value="Concluído / Arquivado">Concluído / Arquivado</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Aceites Confirmados</label>
                  <input
                    type="number"
                    min="0"
                    value={docForm.acceptedCount}
                    onChange={(e) => setDocForm({ ...docForm, acceptedCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Meta Total de Pessoas</label>
                  <input
                    type="number"
                    min="1"
                    value={docForm.totalTargets}
                    onChange={(e) => setDocForm({ ...docForm, totalTargets: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Resumo / Cláusulas do Termo</label>
                <textarea
                  rows={3}
                  value={docForm.summary}
                  onChange={(e) => setDocForm({ ...docForm, summary: e.target.value })}
                  placeholder="Descreva o objetivo do termo e as condições de aceite..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsDocModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                >
                  {editingDoc ? 'Salvar Alterações' : 'Publicar Termo no GED'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DETALHES DE ASSINATURAS DO TERMO */}
      {selectedDocDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl relative">
            <button
              onClick={() => setSelectedDocDetails(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
              {selectedDocDetails.id} • {selectedDocDetails.workflowStatus}
            </span>
            <h3 className="text-base font-bold mt-1">{selectedDocDetails.title}</h3>
            <p className="text-xs text-slate-400 mt-1">
              Lançado por: <strong className="text-white">{selectedDocDetails.launchedBy}</strong> ({selectedDocDetails.launchedByRole})
            </p>

            <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
              <p className="text-xs font-bold text-slate-300">Últimos Registros de Aceite / Assinatura:</p>
              {(selectedDocDetails.recentSigners || []).map((sig, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-white">{sig.name}</p>
                    <p className="text-[11px] text-slate-400">{sig.role}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        sig.status === 'Aceito'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-amber-500/15 text-amber-400'
                      }`}
                    >
                      {sig.status}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1">{sig.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedDocDetails(null)}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
