import React, { useState } from 'react';
import { 
  Users, Shield, ShieldCheck, UserPlus, Search, Filter, Key, CheckCircle2, 
  XCircle, AlertTriangle, ArrowRight, ArrowLeft, RefreshCw, Lock, Unlock, 
  Sliders, Eye, Edit3, Trash2, ShieldAlert, Building2, MapPin, Check, X,
  FileText, Activity, Clock, ShieldX, UserCheck, ChevronDown
} from 'lucide-react';
import { initialUsersData, accessLevels, permissionsMatrix, securityAuditLogs } from '../../data/mockData';

export default function UserManagement({ onLogout, onGoToRh, onBackToSite, theme }) {
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'matrix' | 'audit'
  const [users, setUsers] = useState(initialUsersData);
  const [auditLogs, setAuditLogs] = useState(securityAuditLogs);
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('ALL');
  const [selectedUnitFilter, setSelectedUnitFilter] = useState('ALL');

  // Modal State
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    accessLevel: 'RECRUTADOR',
    unit: 'CD Jaú - SP',
    twoFactorEnabled: true
  });

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle user status (Ativo / Bloqueado)
  const handleToggleStatus = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Ativo' ? 'Bloqueado' : 'Ativo';
        
        // Add log
        const newLog = {
          id: `SEC-${Date.now().toString().slice(-3)}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          user: "Super Admin (Sessão Atual)",
          action: nextStatus === 'Ativo' ? 'Desbloqueio de Usuário' : 'Bloqueio de Segurança',
          target: `${u.name} (${u.email})`,
          ip: "189.122.45.10",
          status: nextStatus === 'Ativo' ? 'Sucesso' : 'Bloqueado',
          severity: nextStatus === 'Ativo' ? 'Normal' : 'Aviso'
        };
        setAuditLogs(logs => [newLog, ...logs]);
        showToast(`Status de ${u.name} alterado para ${nextStatus}!`);

        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  // Change access level directly
  const handleChangeRole = (userId, newRole) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const newLog = {
          id: `SEC-${Date.now().toString().slice(-3)}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          user: "Super Admin (Sessão Atual)",
          action: 'Alteração de Nível RBAC',
          target: `${u.name} -> ${newRole}`,
          ip: "189.122.45.10",
          status: 'Sucesso',
          severity: 'Crítico'
        };
        setAuditLogs(logs => [newLog, ...logs]);
        showToast(`Nível de acesso de ${u.name} alterado para ${newRole}!`);

        return { ...u, accessLevel: newRole };
      }
      return u;
    }));
  };

  // Toggle 2FA
  const handleToggle2FA = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const next2fa = !u.twoFactorEnabled;
        showToast(`2FA de ${u.name} agora está ${next2fa ? 'Habilitado' : 'Desabilitado'}.`);
        return { ...u, twoFactorEnabled: next2fa };
      }
      return u;
    }));
  };

  // Handle Add User
  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const created = {
      id: `USR-00${users.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role || 'Colaborador Corporativo',
      accessLevel: newUser.accessLevel,
      unit: newUser.unit,
      status: 'Ativo',
      twoFactorEnabled: newUser.twoFactorEnabled,
      lastLogin: 'Nunca acessou',
      lastIp: '0.0.0.0',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`
    };

    setUsers([created, ...users]);
    setIsAddUserOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: '',
      accessLevel: 'RECRUTADOR',
      unit: 'CD Jaú - SP',
      twoFactorEnabled: true
    });

    const newLog = {
      id: `SEC-${Date.now().toString().slice(-3)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: "Super Admin (Sessão Atual)",
      action: 'Criação de Usuário',
      target: `${created.name} (${created.accessLevel})`,
      ip: "189.122.45.10",
      status: 'Sucesso',
      severity: 'Normal'
    };
    setAuditLogs(logs => [newLog, ...logs]);
    showToast(`Usuário ${created.name} cadastrado com sucesso!`);
  };

  // Filtering users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.unit.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRoleFilter === 'ALL' || user.accessLevel === selectedRoleFilter;
    const matchesUnit = selectedUnitFilter === 'ALL' || user.unit.includes(selectedUnitFilter);

    return matchesSearch && matchesRole && matchesUnit;
  });

  // Calculate Metrics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Ativo').length;
  const blockedUsers = users.filter(u => u.status === 'Bloqueado').length;
  const twoFactorPercentage = Math.round((users.filter(u => u.twoFactorEnabled).length / totalUsers) * 100);

  const isDark = theme === 'dark';

  return (
    <div className={`flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-colors duration-200 ${
      isDark ? 'text-slate-100' : 'text-slate-900'
    }`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="px-4 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center space-x-2 border border-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Banner Navigation & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/30">
              Console Master de Administração
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
              Ambiente Restrito /admin
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans']">
            Controle de Usuários & Níveis de Acesso
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Gestão de credenciais corporativas, matriz RBAC e auditoria de segurança das unidades Jaú, Barra Bonita, Bariri e Matriz.
          </p>
        </div>

        {/* Global Shortcuts */}
        <div className="flex items-center space-x-2.5 shrink-0">
          <button
            onClick={onGoToRh}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all shadow-sm"
            title="Ir para o Portal de Recrutamento e Vagas do RH"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Acessar Portal do RH (/rh)</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-all"
            title="Sair do Console Administrativo"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Total Users */}
        <div className={`p-5 rounded-2xl border ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Total de Usuários</span>
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black">{totalUsers}</div>
          <p className="text-[11px] text-slate-400 mt-1">Contas corporativas ativas no sistema</p>
        </div>

        {/* Status Ativos / Bloqueados */}
        <div className={`p-5 rounded-2xl border ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Status dos Acessos</span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-emerald-400">{activeUsers}</span>
            <span className="text-xs text-slate-400 font-semibold">ativos</span>
            <span className="text-slate-600">/</span>
            <span className="text-sm font-bold text-red-400">{blockedUsers}</span>
            <span className="text-[11px] text-slate-400">bloqueados</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Políticas de inatividade monitoradas</p>
        </div>

        {/* Níveis Configurados */}
        <div className={`p-5 rounded-2xl border ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Níveis RBAC Ativos</span>
            <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-indigo-400">{accessLevels.length} perfis</div>
          <p className="text-[11px] text-slate-400 mt-1">Super Admin até Líder de Turno</p>
        </div>

        {/* 2FA Compliance */}
        <div className={`p-5 rounded-2xl border ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Conformidade 2FA</span>
            <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400">
              <Key className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-cyan-400">{twoFactorPercentage}%</div>
          <p className="text-[11px] text-slate-400 mt-1">Autenticação em 2 fatores via App/OTP</p>
        </div>

      </div>

      {/* Tabs Bar */}
      <div className="flex items-center space-x-2 border-b border-slate-800 mb-6 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'users'
              ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Usuários do Sistema ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'matrix'
              ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Matriz de Permissões (RBAC)</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'audit'
              ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Auditoria & Logs de Segurança ({auditLogs.length})</span>
        </button>
      </div>

      {/* TAB 1: USUÁRIOS DO SISTEMA */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          
          {/* Controls Bar: Search, Filters & Add User */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nome, e-mail, cargo ou unidade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-purple-500 transition-colors ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' 
                    : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
                }`}
              />
            </div>

            {/* Filter by Role */}
            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold border focus:outline-none focus:border-purple-500 ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-slate-300' 
                  : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}
            >
              <option value="ALL">Todos os Níveis de Acesso</option>
              {accessLevels.map(lvl => (
                <option key={lvl.id} value={lvl.id}>{lvl.title}</option>
              ))}
            </select>

            {/* Filter by Unit */}
            <select
              value={selectedUnitFilter}
              onChange={(e) => setSelectedUnitFilter(e.target.value)}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold border focus:outline-none focus:border-purple-500 ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-slate-300' 
                  : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}
            >
              <option value="ALL">Todas as Unidades</option>
              <option value="Jaú">Jaú - SP</option>
              <option value="Barra Bonita">Barra Bonita - SP</option>
              <option value="Bariri">Bariri - SP</option>
              <option value="Matriz">Matriz SP</option>
            </select>

            {/* Add User Button */}
            <button
              onClick={() => setIsAddUserOpen(true)}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/20 transition-all shrink-0"
            >
              <UserPlus className="w-4 h-4" />
              <span>Novo Usuário</span>
            </button>

          </div>

          {/* Users Table */}
          <div className={`rounded-2xl border overflow-hidden ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b font-semibold uppercase tracking-wider text-[10px] ${
                    isDark ? 'bg-slate-950/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    <th className="py-3.5 px-4">Usuário / Cargo</th>
                    <th className="py-3.5 px-4">Nível de Acesso (RBAC)</th>
                    <th className="py-3.5 px-4">Unidade / Polo</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">2FA</th>
                    <th className="py-3.5 px-4">Último Acesso / IP</th>
                    <th className="py-3.5 px-4 text-right">Ações Rápidas</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        Nenhum usuário encontrado com os filtros aplicados.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => {
                      const levelMeta = accessLevels.find(l => l.id === user.accessLevel) || {
                        title: user.accessLevel,
                        badgeColor: "bg-slate-500/15 text-slate-400 border-slate-500/30"
                      };

                      return (
                        <tr 
                          key={user.id} 
                          className={`transition-colors ${
                            isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                          }`}
                        >
                          {/* User Name & Avatar */}
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-9 h-9 rounded-full object-cover border border-purple-500/30"
                              />
                              <div>
                                <div className="font-bold text-sm tracking-tight">{user.name}</div>
                                <div className="text-[11px] text-slate-400">{user.email}</div>
                                <div className="text-[10px] text-purple-400 font-medium">{user.role}</div>
                              </div>
                            </div>
                          </td>

                          {/* Access Level Selector */}
                          <td className="py-4 px-4">
                            <select
                              value={user.accessLevel}
                              onChange={(e) => handleChangeRole(user.id, e.target.value)}
                              className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none transition-colors cursor-pointer ${levelMeta.badgeColor}`}
                            >
                              {accessLevels.map(lvl => (
                                <option key={lvl.id} value={lvl.id} className="bg-slate-900 text-white font-normal">
                                  {lvl.title}
                                </option>
                              ))}
                            </select>
                          </td>

                          {/* Unit */}
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-1.5 text-slate-300">
                              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              <span className="font-medium">{user.unit}</span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-4 px-4">
                            <button
                              onClick={() => handleToggleStatus(user.id)}
                              className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                                user.status === 'Ativo'
                                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25'
                                  : 'bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/25'
                              }`}
                              title="Clique para alternar status do usuário"
                            >
                              {user.status === 'Ativo' ? (
                                <>
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  <span>Ativo</span>
                                </>
                              ) : (
                                <>
                                  <Lock className="w-3 h-3 text-red-400" />
                                  <span>Bloqueado</span>
                                </>
                              )}
                            </button>
                          </td>

                          {/* 2FA */}
                          <td className="py-4 px-4">
                            <button
                              onClick={() => handleToggle2FA(user.id)}
                              className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                                user.twoFactorEnabled
                                  ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
                                  : 'bg-slate-800 text-slate-500 border-slate-700'
                              }`}
                              title="Clique para habilitar/desabilitar 2FA"
                            >
                              <Key className="w-3 h-3" />
                              <span>{user.twoFactorEnabled ? 'Ativo' : 'Inativo'}</span>
                            </button>
                          </td>

                          {/* Last Access */}
                          <td className="py-4 px-4">
                            <div className="text-[11px] font-mono text-slate-300">{user.lastLogin}</div>
                            <div className="text-[10px] font-mono text-slate-500">{user.lastIp}</div>
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleToggleStatus(user.id)}
                                className={`p-1.5 rounded-lg border transition-all ${
                                  user.status === 'Ativo'
                                    ? 'border-slate-700 text-slate-400 hover:text-amber-400 hover:border-amber-500/40'
                                    : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                                }`}
                                title={user.status === 'Ativo' ? 'Bloquear usuário' : 'Desbloquear usuário'}
                              >
                                {user.status === 'Ativo' ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MATRIZ DE PERMISSÕES (RBAC) */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          
          {/* Informative Header */}
          <div className={`p-5 rounded-2xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h3 className="text-base font-bold text-purple-400 font-['Plus_Jakarta_Sans'] mb-1">
              Estrutura de Acessos por Função (Role-Based Access Control)
            </h3>
            <p className="text-xs text-slate-400">
              A matriz abaixo define o escopo de atuação de cada perfil no TalentFlow. Alterações têm efeito imediato nas sessões ativas dos colaboradores.
            </p>
          </div>

          {/* Matrix Table */}
          <div className={`rounded-2xl border overflow-hidden ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b font-semibold uppercase tracking-wider text-[10px] ${
                    isDark ? 'bg-slate-950/80 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    <th className="py-4 px-4 w-1/4">Módulo do Sistema</th>
                    <th className="py-4 px-4 w-1/3">Ação Autorizada</th>
                    <th className="py-4 px-2 text-center text-purple-400">Super Admin</th>
                    <th className="py-4 px-2 text-center text-indigo-400">Gestor RH</th>
                    <th className="py-4 px-2 text-center text-emerald-400">Recrutador</th>
                    <th className="py-4 px-2 text-center text-amber-400">Auditor DPO</th>
                    <th className="py-4 px-2 text-center text-cyan-400">Líder Turno</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
                  {permissionsMatrix.map((item, index) => (
                    <tr 
                      key={index}
                      className={`transition-colors ${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'}`}
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-200">{item.module}</td>
                      <td className="py-3.5 px-4 text-slate-400">{item.action}</td>
                      
                      {/* Super Admin */}
                      <td className="py-3.5 px-2 text-center">
                        {item.roles.SUPER_ADMIN ? (
                          <span className="inline-flex p-1 rounded-md bg-purple-500/20 text-purple-400">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="inline-flex p-1 rounded-md bg-slate-800 text-slate-600">
                            <X className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </td>

                      {/* Gestor RH */}
                      <td className="py-3.5 px-2 text-center">
                        {item.roles.GESTOR_RH ? (
                          <span className="inline-flex p-1 rounded-md bg-indigo-500/20 text-indigo-400">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="inline-flex p-1 rounded-md bg-slate-800 text-slate-600">
                            <X className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </td>

                      {/* Recrutador */}
                      <td className="py-3.5 px-2 text-center">
                        {item.roles.RECRUTADOR ? (
                          <span className="inline-flex p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="inline-flex p-1 rounded-md bg-slate-800 text-slate-600">
                            <X className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </td>

                      {/* Auditor DPO */}
                      <td className="py-3.5 px-2 text-center">
                        {item.roles.AUDITOR_DPO ? (
                          <span className="inline-flex p-1 rounded-md bg-amber-500/20 text-amber-400">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="inline-flex p-1 rounded-md bg-slate-800 text-slate-600">
                            <X className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </td>

                      {/* Líder Turno */}
                      <td className="py-3.5 px-2 text-center">
                        {item.roles.LIDER_OPERACIONAL ? (
                          <span className="inline-flex p-1 rounded-md bg-cyan-500/20 text-cyan-400">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="inline-flex p-1 rounded-md bg-slate-800 text-slate-600">
                            <X className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Roles Description Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accessLevels.map(lvl => (
              <div 
                key={lvl.id}
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${lvl.badgeColor}`}>
                    {lvl.id}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {lvl.userCount} usuários associados
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 mb-1">{lvl.title}</h4>
                <p className="text-xs text-slate-400">{lvl.description}</p>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 3: AUDITORIA & LOGS DE SEGURANÇA */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          
          <div className={`p-5 rounded-2xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-purple-400 font-['Plus_Jakarta_Sans'] mb-1">
                  Trilha de Auditoria e Incidentes de Segurança
                </h3>
                <p className="text-xs text-slate-400">
                  Registro imutável de autenticações, alterações de permissões e operações administrativas com IP e timestamp.
                </p>
              </div>
              <button
                onClick={() => {
                  setAuditLogs(securityAuditLogs);
                  showToast("Logs atualizados com sucesso!");
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition-all shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Atualizar Trilha</span>
              </button>
            </div>
          </div>

          <div className={`rounded-2xl border overflow-hidden ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b font-semibold uppercase tracking-wider text-[10px] ${
                    isDark ? 'bg-slate-950/80 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    <th className="py-3.5 px-4">ID Evento</th>
                    <th className="py-3.5 px-4">Data / Hora</th>
                    <th className="py-3.5 px-4">Operador Responsável</th>
                    <th className="py-3.5 px-4">Ação Realizada</th>
                    <th className="py-3.5 px-4">Alvo / Módulo</th>
                    <th className="py-3.5 px-4">IP Origem</th>
                    <th className="py-3.5 px-4">Severidade</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
                  {auditLogs.map((log) => (
                    <tr 
                      key={log.id}
                      className={`transition-colors ${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'}`}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-purple-400">{log.id}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">{log.timestamp}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-200">{log.user}</td>
                      <td className="py-3.5 px-4 font-semibold text-white">{log.action}</td>
                      <td className="py-3.5 px-4 text-slate-400">{log.target}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">{log.ip}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          log.severity === 'Crítico'
                            ? 'bg-red-500/15 text-red-400 border-red-500/30'
                            : log.severity === 'Aviso'
                            ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                            : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        }`}>
                          {log.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* MODAL: NOVO USUÁRIO */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`w-full max-w-lg p-6 sm:p-7 rounded-3xl border shadow-2xl relative ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => setIsAddUserOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans']">
                  Cadastrar Novo Usuário Corporativo
                </h3>
                <p className="text-xs text-slate-400">
                  Defina o cargo, polo operacional e perfil de acesso RBAC.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Ana Clara Siqueira"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-purple-500 ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  E-mail Corporativo
                </label>
                <input
                  type="email"
                  required
                  placeholder="ana.siqueira@talentflow.com.br"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-purple-500 ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Cargo / Função
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Recrutador Sênior"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-purple-500 ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Polo / Unidade
                  </label>
                  <select
                    value={newUser.unit}
                    onChange={(e) => setNewUser({ ...newUser, unit: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-purple-500 ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <option value="CD Jaú - SP">CD Jaú - SP</option>
                    <option value="Polo Barra Bonita - SP">Polo Barra Bonita - SP</option>
                    <option value="Loja Centro Bariri - SP">Loja Centro Bariri - SP</option>
                    <option value="Matriz Faria Lima - SP">Matriz Faria Lima - SP</option>
                    <option value="Hub Regional Jaú - SP">Hub Regional Jaú - SP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nível de Acesso (Perfil RBAC)
                </label>
                <select
                  value={newUser.accessLevel}
                  onChange={(e) => setNewUser({ ...newUser, accessLevel: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-purple-500 ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  {accessLevels.map(lvl => (
                    <option key={lvl.id} value={lvl.id}>
                      {lvl.title} ({lvl.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="twofa_check"
                  checked={newUser.twoFactorEnabled}
                  onChange={(e) => setNewUser({ ...newUser, twoFactorEnabled: e.target.checked })}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="twofa_check" className="text-xs text-slate-300 cursor-pointer">
                  Exigir autenticação em duas etapas (2FA) no primeiro acesso
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/25 transition-all"
                >
                  Salvar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
