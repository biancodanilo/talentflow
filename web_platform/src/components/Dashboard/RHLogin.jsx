import React, { useState } from 'react';
import {
  Lock, Mail, Key, ShieldCheck, ArrowLeft, Sparkles, Eye, EyeOff, Users,
  CheckCircle2, Building2, UserPlus, Phone, MapPin, Briefcase, X, RefreshCw
} from 'lucide-react';
import { initialCompaniesData, initialUsersData } from '../../data/mockData';

export default function RHLogin({ onLogin, onBackToSite, onGoToAdmin, theme }) {
  // 'login' | 'register_recruiter' | 'register_company'
  const [authMode, setAuthMode] = useState('login');

  // Login states
  const [email, setEmail] = useState('recrutamento.jau@talentflow.com.br');
  const [password, setPassword] = useState('••••••••••••');
  const [twoFactorToken, setTwoFactorToken] = useState('849-204');
  const [rememberTerminal, setRememberTerminal] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Cadastro Recrutador states
  const [recruiterForm, setRecruiterForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Analista de Atração & Seleção',
    unit: 'CD Jaú - SP',
    company: 'Mercado Sul Distribuidora S.A.',
    password: ''
  });

  // Cadastro Empresa states
  const [companyForm, setCompanyForm] = useState({
    name: '',
    cnpj: '',
    city: 'Jaú - SP',
    sector: 'Logística & Distribuição',
    contactName: '',
    contactEmail: '',
    phone: '',
    password: ''
  });

  // Modal Esqueceu a Senha
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: solicitar código, 2: validar e redefinir
  const [forgotEmail, setForgotEmail] = useState('recrutamento.jau@talentflow.com.br');
  const [forgotCode, setForgotCode] = useState('739201');
  const [newPass, setNewPass] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    onLogin();
  };

  const handleRegisterRecruiter = (e) => {
    e.preventDefault();
    if (!recruiterForm.name || !recruiterForm.email) return;

    const existingUsers = JSON.parse(
      localStorage.getItem('tf_users') || JSON.stringify(initialUsersData)
    );
    const newUser = {
      id: `USR-00${existingUsers.length + 1}`,
      name: recruiterForm.name,
      email: recruiterForm.email,
      role: recruiterForm.role,
      accessLevel: 'RECRUTADOR',
      unit: `${recruiterForm.company} (${recruiterForm.unit})`,
      status: 'Ativo',
      twoFactorEnabled: true,
      lastLogin: 'Agora mesmo',
      lastIp: '189.122.45.10',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    localStorage.setItem('tf_users', JSON.stringify([newUser, ...existingUsers]));

    setEmail(recruiterForm.email);
    showToast(`Recrutador(a) ${recruiterForm.name} cadastrado(a) com sucesso!`);
    setTimeout(() => onLogin(), 900);
  };

  const handleRegisterCompany = (e) => {
    e.preventDefault();
    if (!companyForm.name || !companyForm.cnpj) return;

    const existingCompanies = JSON.parse(
      localStorage.getItem('tf_companies') || JSON.stringify(initialCompaniesData)
    );
    const newComp = {
      id: `EMP-00${existingCompanies.length + 1}`,
      name: companyForm.name,
      cnpj: companyForm.cnpj,
      city: companyForm.city,
      sector: companyForm.sector,
      contactName: companyForm.contactName || 'Gestor Responsável',
      contactEmail: companyForm.contactEmail,
      phone: companyForm.phone,
      activeJobs: 1,
      status: 'Ativa',
      createdAt: new Date().toISOString().slice(0, 10)
    };
    localStorage.setItem('tf_companies', JSON.stringify([newComp, ...existingCompanies]));

    showToast(`Empresa "${companyForm.name}" cadastrada com sucesso no Polo ${companyForm.city}!`);
    setTimeout(() => onLogin(), 900);
  };

  const handleConfirmPasswordReset = (e) => {
    e.preventDefault();
    setIsForgotOpen(false);
    setForgotStep(1);
    showToast(`Senha corporativa de ${forgotEmail} redefinida com sucesso!`);
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-4 py-10 relative overflow-hidden transition-colors duration-200 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="px-4 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center space-x-2 border border-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toast}</span>
          </div>
        </div>
      )}

      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-indigo-500/5 blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-lg animate-in fade-in duration-300">
        {/* Top Navigation Links */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Site</span>
          </button>

          <button
            onClick={onGoToAdmin}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Lock className="w-3 h-3" />
            <span>Ir para Painel Admin (/admin)</span>
          </button>
        </div>

        {/* Mode Switcher Tabs: Login | Cadastrar Recrutador | Cadastrar Empresa */}
        <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 mb-4 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`py-2.5 px-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              authMode === 'login'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Login RH</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMode('register_recruiter')}
            className={`py-2.5 px-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              authMode === 'register_recruiter'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Novo Recrutador</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMode('register_company')}
            className={`py-2.5 px-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              authMode === 'register_company'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Nova Empresa</span>
          </button>
        </div>

        {/* Card Container */}
        <div
          className={`p-7 sm:p-8 rounded-3xl border shadow-2xl backdrop-blur-xl relative ${
            isDark
              ? 'bg-slate-900/90 border-slate-800 shadow-slate-950/80'
              : 'bg-white border-slate-200 shadow-slate-200/60'
          }`}
        >
          {/* Header Brand */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  {authMode === 'register_company' ? (
                    <Building2 className="w-5 h-5 text-emerald-400" />
                  ) : authMode === 'register_recruiter' ? (
                    <UserPlus className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Users className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xl font-bold tracking-tight font-['Plus_Jakarta_Sans']">
                    Talent<span className="text-emerald-400">Flow</span>
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full">
                    Portal RH
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Recrutamento, GED & Retenção 90 Dias
                </p>
              </div>
            </div>
          </div>

          {/* MODO 1: LOGIN */}
          {authMode === 'login' && (
            <>
              <div className="mb-5">
                <h2 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                  Acesso da Equipe de RH & Empresas
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Polos: Jaú, Barra Bonita, Bariri e Centros de Distribuição
                </p>
              </div>

              <form onSubmit={handleSubmitLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    E-mail Corporativo do Recrutador / Empresa
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="seu.nome@empresa.com.br"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Senha de Acesso
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotEmail(email);
                        setForgotStep(1);
                        setIsForgotOpen(true);
                      }}
                      className="text-[11px] font-bold text-emerald-400 hover:underline"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Key className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Sua senha corporativa"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 focus:border-emerald-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Código 2FA (Autenticador / SMS)
                    </label>
                    <span className="text-[10px] text-emerald-400 font-mono">Obrigatório</span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <input
                      type="text"
                      value={twoFactorToken}
                      onChange={(e) => setTwoFactorToken(e.target.value)}
                      maxLength={7}
                      placeholder="Ex: 849-204"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-mono tracking-widest bg-slate-950/80 border border-slate-700/80 text-white focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center space-x-2 text-[11px] text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberTerminal}
                      onChange={(e) => setRememberTerminal(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-slate-700 text-emerald-500 bg-slate-950"
                    />
                    <span>Lembrar neste terminal</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Entrar no Painel do RH</span>
                </button>

                <button
                  type="button"
                  onClick={onLogin}
                  className="w-full py-2.5 px-3 bg-slate-800/80 hover:bg-slate-800 text-emerald-300 hover:text-white border border-emerald-500/30 rounded-xl text-[11px] font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Acesso Rápido de Demonstração (1-Clique)</span>
                </button>
              </form>
            </>
          )}

          {/* MODO 2: CADASTRO DE RECRUTADOR / GESTOR RH */}
          {authMode === 'register_recruiter' && (
            <>
              <div className="mb-4">
                <h2 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                  Cadastro de Recrutador / Gestor de RH
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Crie sua credencial operacional para triar vagas, validar termos GED e acompanhar os 90 dias.
                </p>
              </div>

              <form onSubmit={handleRegisterRecruiter} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={recruiterForm.name}
                    onChange={(e) => setRecruiterForm({ ...recruiterForm, name: e.target.value })}
                    placeholder="Ex: Camila Rocha Neves"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">E-mail Corporativo *</label>
                    <input
                      type="email"
                      required
                      value={recruiterForm.email}
                      onChange={(e) => setRecruiterForm({ ...recruiterForm, email: e.target.value })}
                      placeholder="camila@empresa.com.br"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">WhatsApp / Ramal *</label>
                    <input
                      type="text"
                      required
                      value={recruiterForm.phone}
                      onChange={(e) => setRecruiterForm({ ...recruiterForm, phone: e.target.value })}
                      placeholder="(14) 99800-1234"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Cargo / Função</label>
                    <select
                      value={recruiterForm.role}
                      onChange={(e) => setRecruiterForm({ ...recruiterForm, role: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                    >
                      <option value="Analista de Atração & Seleção">Analista de Atração & Seleção</option>
                      <option value="Recrutador Operacional">Recrutador Operacional</option>
                      <option value="Gestor de Gente & Gestão">Gestor de Gente & Gestão</option>
                      <option value="Líder de Turno / Encarregado">Líder de Turno / Encarregado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Polo Regional</label>
                    <select
                      value={recruiterForm.unit}
                      onChange={(e) => setRecruiterForm({ ...recruiterForm, unit: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                    >
                      <option value="CD Jaú - SP">CD Jaú - SP</option>
                      <option value="Polo Barra Bonita - SP">Polo Barra Bonita - SP</option>
                      <option value="Loja Centro Bariri - SP">Loja Centro Bariri - SP</option>
                      <option value="Matriz Regional">Matriz Regional</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Empresa Vinculada</label>
                  <input
                    type="text"
                    value={recruiterForm.company}
                    onChange={(e) => setRecruiterForm({ ...recruiterForm, company: e.target.value })}
                    placeholder="Ex: Mercado Sul Distribuidora S.A."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Definir Senha de Acesso *</label>
                  <input
                    type="password"
                    required
                    value={recruiterForm.password}
                    onChange={(e) => setRecruiterForm({ ...recruiterForm, password: e.target.value })}
                    placeholder="Mínimo de 8 caracteres"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Concluir Cadastro de Recrutador e Entrar</span>
                </button>
              </form>
            </>
          )}

          {/* MODO 3: CADASTRO DE EMPRESA PARCEIRA */}
          {authMode === 'register_company' && (
            <>
              <div className="mb-4">
                <h2 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                  Cadastro de Nova Empresa Parceira
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Habilite sua empresa para publicar vagas operacionais, emitir termos GED e reduzir turnover.
                </p>
              </div>

              <form onSubmit={handleRegisterCompany} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Razão Social / Nome da Empresa *</label>
                  <input
                    type="text"
                    required
                    value={companyForm.name}
                    onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                    placeholder="Ex: AgroLog Paulista S.A."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">CNPJ *</label>
                    <input
                      type="text"
                      required
                      value={companyForm.cnpj}
                      onChange={(e) => setCompanyForm({ ...companyForm, cnpj: e.target.value })}
                      placeholder="00.000.000/0001-00"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Cidade / Polo Principal</label>
                    <select
                      value={companyForm.city}
                      onChange={(e) => setCompanyForm({ ...companyForm, city: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                    >
                      <option value="Jaú - SP">Jaú - SP</option>
                      <option value="Barra Bonita - SP">Barra Bonita - SP</option>
                      <option value="Bariri - SP">Bariri - SP</option>
                      <option value="Bauru / Região">Bauru / Região</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Setor Operacional</label>
                    <select
                      value={companyForm.sector}
                      onChange={(e) => setCompanyForm({ ...companyForm, sector: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                    >
                      <option value="Logística & Distribuição">Logística & Distribuição</option>
                      <option value="Indústria & Manufatura">Indústria & Manufatura</option>
                      <option value="Varejo & Supermercados">Varejo & Supermercados</option>
                      <option value="Agronegócio & Usinas">Agronegócio & Usinas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Responsável de RH / DP *</label>
                    <input
                      type="text"
                      required
                      value={companyForm.contactName}
                      onChange={(e) => setCompanyForm({ ...companyForm, contactName: e.target.value })}
                      placeholder="Nome do Gestor"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">E-mail Corporativo *</label>
                    <input
                      type="email"
                      required
                      value={companyForm.contactEmail}
                      onChange={(e) => setCompanyForm({ ...companyForm, contactEmail: e.target.value })}
                      placeholder="rh@suaempresa.com.br"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Telefone / WhatsApp *</label>
                    <input
                      type="text"
                      required
                      value={companyForm.phone}
                      onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                      placeholder="(14) 3622-0000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Senha Master da Empresa *</label>
                  <input
                    type="password"
                    required
                    value={companyForm.password}
                    onChange={(e) => setCompanyForm({ ...companyForm, password: e.target.value })}
                    placeholder="Mínimo de 8 caracteres"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Cadastrar Empresa e Acessar Painel</span>
                </button>
              </form>
            </>
          )}

          {/* Segurança & Conformidade Footer */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Conexão Segura TLS 1.3 • GED Ativo</span>
            </span>
            <span className="font-mono text-slate-500">LGPD Art. 20</span>
          </div>
        </div>
      </div>

      {/* MODAL ESQUECEU A SENHA */}
      {isForgotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl relative">
            <button
              onClick={() => setIsForgotOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-['Plus_Jakarta_Sans']">
                  Recuperação de Senha Corporativa
                </h3>
                <p className="text-[11px] text-slate-400">
                  {forgotStep === 1
                    ? 'Passo 1 de 2 • Verificação de identidade do recrutador/empresa'
                    : 'Passo 2 de 2 • Validação de token e nova senha'}
                </p>
              </div>
            </div>

            {forgotStep === 1 ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    E-mail Corporativo ou CNPJ cadastrado
                  </label>
                  <input
                    type="text"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="seu.nome@empresa.com.br"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Enviaremos um código de segurança de 6 dígitos para o seu E-mail Corporativo e WhatsApp vinculado.
                </p>
                <button
                  type="button"
                  onClick={() => setForgotStep(2)}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                >
                  Enviar Código de Recuperação
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmPasswordReset} className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px]">
                  Código enviado para <strong>{forgotEmail}</strong>! (Pré-preenchido para demonstração)
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Código de Verificação (6 dígitos)
                  </label>
                  <input
                    type="text"
                    required
                    value={forgotCode}
                    onChange={(e) => setForgotCode(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono tracking-widest"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Nova Senha Corporativa *
                  </label>
                  <input
                    type="password"
                    required
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Digite sua nova senha"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                >
                  Confirmar Nova Senha
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
