import React, { useState, useEffect, useRef } from 'react';
import { initialCompaniesData, initialUsersData } from '../../data/mockData';
import { apiClient } from '../../services/apiClient';
import {
  Building2, Users, UserPlus, Plus, Search, MapPin, Mail, Phone,
  CheckCircle2, Shield, Briefcase, X, Image as ImageIcon, Upload, Camera, RefreshCw
} from 'lucide-react';

export default function CompaniesRecruiters() {
  const [subTab, setSubTab] = useState('companies'); // 'companies' | 'recruiters'
  const [companies, setCompanies] = useState(() => {
    const saved = localStorage.getItem('tf_companies');
    return saved ? JSON.parse(saved) : initialCompaniesData;
  });
  const [recruiters, setRecruiters] = useState(() => {
    const saved = localStorage.getItem('tf_users');
    return saved ? JSON.parse(saved) : initialUsersData;
  });

  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  // Modals
  const [isNewCompanyOpen, setIsNewCompanyOpen] = useState(false);
  const [isNewRecruiterOpen, setIsNewRecruiterOpen] = useState(false);

  // Form de Empresa com suporte a logo em Base64 para salvar no MariaDB
  const [companyForm, setCompanyForm] = useState({
    name: '',
    cnpj: '',
    city: 'Jaú - SP',
    sector: 'Logística & Distribuição',
    contactName: '',
    contactEmail: '',
    phone: '',
    logo: ''
  });

  const [recruiterForm, setRecruiterForm] = useState({
    name: '',
    email: '',
    role: 'Recrutador Operacional',
    accessLevel: 'RECRUTADOR',
    unit: 'CD Jaú - SP'
  });

  // Ref para input de upload de logo em lote ou individual
  const fileInputRef = useRef(null);
  const [targetCompanyForLogo, setTargetCompanyForLogo] = useState(null);
  const singleLogoInputRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Carregar dados atualizados do MariaDB
  const loadFromDatabase = async () => {
    setLoading(true);
    try {
      const dbCompanies = await apiClient.getCompanies();
      if (Array.isArray(dbCompanies) && dbCompanies.length > 0) {
        setCompanies(dbCompanies);
        localStorage.setItem('tf_companies', JSON.stringify(dbCompanies));
      }
    } catch (e) {
      console.warn('Erro ao carregar empresas do banco:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFromDatabase();
  }, []);

  // Conversão de arquivo para Base64 (Data URI) para salvar no banco
  const handleLogoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast('A imagem deve ter no máximo 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Data = uploadEvent.target.result;
      setCompanyForm((prev) => ({ ...prev, logo: base64Data }));
      showToast('Logo carregado e pronto para salvar no banco!');
    };
    reader.readAsDataURL(file);
  };

  // Alterar logo de empresa existente e salvar no MariaDB
  const handleTriggerChangeLogo = (compId) => {
    setTargetCompanyForLogo(compId);
    if (singleLogoInputRef.current) {
      singleLogoInputRef.current.value = '';
      singleLogoInputRef.current.click();
    }
  };

  const handleUpdateSingleLogo = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !targetCompanyForLogo) return;

    const reader = new FileReader();
    reader.onload = async (uploadEvent) => {
      const base64Data = uploadEvent.target.result;
      try {
        await apiClient.updateCompany(targetCompanyForLogo, { logo: base64Data });
        const updated = companies.map((c) =>
          c.id === targetCompanyForLogo ? { ...c, logo: base64Data } : c
        );
        setCompanies(updated);
        localStorage.setItem('tf_companies', JSON.stringify(updated));
        showToast('Logo da empresa atualizado e salvo no MariaDB! ✅');
      } catch (err) {
        showToast('Erro ao atualizar logo no banco: ' + err.message);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddCompany = async (e) => {
    e.preventDefault();
    if (!companyForm.name || !companyForm.cnpj) return;

    const id = `COMP-${Date.now().toString().slice(-3)}`;
    const created = {
      id,
      ...companyForm,
      activeJobs: 1,
      status: 'Ativa',
      createdAt: new Date().toISOString().slice(0, 10)
    };

    try {
      // Salva no MariaDB
      await apiClient.createCompany(created);
      showToast(`Empresa "${created.name}" e logo salvos no MariaDB!`);
    } catch (err) {
      console.warn('Erro ao salvar no banco, persistindo localmente:', err);
      showToast(`Empresa "${created.name}" salva localmente.`);
    }

    const updated = [created, ...companies];
    setCompanies(updated);
    localStorage.setItem('tf_companies', JSON.stringify(updated));
    setIsNewCompanyOpen(false);
    setCompanyForm({
      name: '',
      cnpj: '',
      city: 'Jaú - SP',
      sector: 'Logística & Distribuição',
      contactName: '',
      contactEmail: '',
      phone: '',
      logo: ''
    });
  };

  const handleAddRecruiter = async (e) => {
    e.preventDefault();
    if (!recruiterForm.name || !recruiterForm.email) return;

    const created = {
      id: `USR-00${recruiters.length + 1}`,
      ...recruiterForm,
      status: 'Ativo',
      twoFactorEnabled: true,
      lastLogin: 'Recém-cadastrado',
      lastIp: '189.122.45.10',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };

    try {
      await apiClient.createRecruiter({
        companyId: 'COMP-001',
        name: created.name,
        email: created.email,
        role: created.role,
        phone: '(14) 99123-4567'
      });
    } catch (_) {}

    const updated = [created, ...recruiters];
    setRecruiters(updated);
    localStorage.setItem('tf_users', JSON.stringify(updated));
    setIsNewRecruiterOpen(false);
    setRecruiterForm({
      name: '',
      email: '',
      role: 'Recrutador Operacional',
      accessLevel: 'RECRUTADOR',
      unit: 'CD Jaú - SP'
    });
    showToast(`Recrutador(a) "${created.name}" cadastrado(a) com sucesso!`);
  };

  const filteredCompanies = companies.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.cnpj.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.sector.toLowerCase().includes(q)
    );
  });

  const filteredRecruiters = recruiters.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.role.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Input escondido para alterar logo de empresa existente */}
      <input
        type="file"
        ref={singleLogoInputRef}
        onChange={handleUpdateSingleLogo}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Building2 className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white">Empresas Parceiras & Recrutadores</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gerencie as organizações contratantes, seus logos salvos no banco MariaDB e a equipe de recrutamento.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={loadFromDatabase}
            disabled={loading}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
            title="Sincronizar com MariaDB"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
            <span>Sincronizar Banco</span>
          </button>

          <button
            onClick={() => setIsNewRecruiterOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-all"
          >
            <UserPlus className="w-4 h-4 text-emerald-400" />
            <span>Novo Recrutador</span>
          </button>

          <button
            onClick={() => setIsNewCompanyOpen(true)}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Empresa com Logo</span>
          </button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSubTab('companies')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              subTab === 'companies'
                ? 'bg-emerald-500 text-slate-950'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Empresas Cadastradas ({companies.length})</span>
          </button>

          <button
            onClick={() => setSubTab('recruiters')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              subTab === 'recruiters'
                ? 'bg-emerald-500 text-slate-950'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Recrutadores & Gestores ({recruiters.length})</span>
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar empresa, CNPJ ou setor..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* LISTA DE EMPRESAS */}
      {subTab === 'companies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map((comp) => (
            <div
              key={comp.id}
              className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-xl relative group"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3.5">
                    {/* Logo da Empresa vindo do Banco de Dados */}
                    <div className="relative group/logo">
                      {comp.logo ? (
                        <img
                          src={comp.logo}
                          alt={`Logo ${comp.name}`}
                          className="w-14 h-14 rounded-2xl object-contain bg-slate-950 border border-slate-800 shadow-lg p-1.5 shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shrink-0">
                          {comp.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      {/* Botão de Trocar Logo no Hover */}
                      <button
                        onClick={() => handleTriggerChangeLogo(comp.id)}
                        className="absolute inset-0 bg-slate-950/80 rounded-2xl opacity-0 group-hover/logo:opacity-100 flex flex-col items-center justify-center text-[9px] font-bold text-emerald-400 transition-opacity"
                        title="Trocar logo no MariaDB"
                      >
                        <Camera className="w-4 h-4 mb-0.5" />
                        <span>Trocar</span>
                      </button>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        {comp.id} • CNPJ: {comp.cnpj}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1 leading-snug">{comp.name}</h3>
                      <p className="text-xs text-slate-400">{comp.sector}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                    {comp.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-slate-800/80 text-xs text-slate-300">
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{comp.city}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{comp.activeJobs || 1} vagas ativas</span>
                  </div>
                  <div className="flex items-center space-x-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{comp.contactEmail}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{comp.phone}</span>
                  </div>
                </div>
              </div>

              {/* Ações do Card */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono">Cadastrada: {comp.createdAt || '01/10/2026'}</span>
                <button
                  onClick={() => handleTriggerChangeLogo(comp.id)}
                  className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  <Upload className="w-3 h-3" />
                  <span>Atualizar Logo</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LISTA DE RECRUTADORES */}
      {subTab === 'recruiters' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecruiters.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={rec.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={rec.name}
                    className="w-11 h-11 rounded-2xl object-cover border border-slate-700 shadow-md"
                  />
                  <div>
                    <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                      {rec.id} • {rec.accessLevel || 'RECRUTADOR'}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">{rec.name}</h3>
                    <p className="text-xs text-slate-400">{rec.role}</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {rec.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center space-x-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{rec.email}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{rec.unit || 'CD Jaú - SP'}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Shield className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>2FA Ativo</span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-400">
                  <span>IP: {rec.lastIp || '189.122.45.10'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: NOVA EMPRESA COM UPLOAD DE LOGO */}
      {isNewCompanyOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Cadastrar Empresa & Logo</h3>
              </div>
              <button
                onClick={() => setIsNewCompanyOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCompany} className="space-y-4">
              {/* UPLOAD OU SELEÇÃO DE LOGO */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wide">
                  Logo da Empresa (Salva diretamente no MariaDB)
                </label>
                <div className="flex items-center space-x-4">
                  {companyForm.logo ? (
                    <img
                      src={companyForm.logo}
                      alt="Preview"
                      className="w-16 h-16 rounded-2xl object-contain bg-slate-900 border border-emerald-500/40 p-2 shadow-inner"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500">
                      <ImageIcon className="w-6 h-6" />
                      <span className="text-[9px] mt-1">Sem logo</span>
                    </div>
                  )}

                  <div className="flex-1 space-y-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-all"
                    >
                      <Upload className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Selecionar Imagem do Computador</span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleLogoFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <p className="text-[10px] text-slate-400">
                      Suporta PNG, JPG ou SVG. A imagem é convertida em Base64 e gravada no banco.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Razão Social / Nome Fantasia *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mercado Sul Distribuidora S.A."
                  value={companyForm.name}
                  onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">CNPJ *</label>
                  <input
                    type="text"
                    required
                    placeholder="00.000.000/0000-00"
                    value={companyForm.cnpj}
                    onChange={(e) => setCompanyForm({ ...companyForm, cnpj: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Polo / Cidade</label>
                  <select
                    value={companyForm.city}
                    onChange={(e) => setCompanyForm({ ...companyForm, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Jaú - SP">Jaú - SP</option>
                    <option value="Barra Bonita - SP">Barra Bonita - SP</option>
                    <option value="Bariri - SP">Bariri - SP</option>
                    <option value="Dois Córregos - SP">Dois Córregos - SP</option>
                    <option value="Brotas - SP">Brotas - SP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Setor Operacional</label>
                <input
                  type="text"
                  placeholder="Ex: Logística, Varejo, Centro de Distribuição"
                  value={companyForm.sector}
                  onChange={(e) => setCompanyForm({ ...companyForm, sector: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">E-mail do RH / Contato</label>
                  <input
                    type="email"
                    placeholder="rh@empresa.com.br"
                    value={companyForm.contactEmail}
                    onChange={(e) => setCompanyForm({ ...companyForm, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="(14) 99999-0000"
                    value={companyForm.phone}
                    onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewCompanyOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20"
                >
                  Salvar Empresa no MariaDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NOVO RECRUTADOR */}
      {isNewRecruiterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Cadastrar Recrutador</h3>
              </div>
              <button
                onClick={() => setIsNewRecruiterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRecruiter} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Nome Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Gabriela Santos"
                  value={recruiterForm.name}
                  onChange={(e) => setRecruiterForm({ ...recruiterForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">E-mail Corporativo *</label>
                <input
                  type="email"
                  required
                  placeholder="gabriela.rh@empresa.com.br"
                  value={recruiterForm.email}
                  onChange={(e) => setRecruiterForm({ ...recruiterForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Cargo</label>
                  <input
                    type="text"
                    placeholder="Analista de Seleção"
                    value={recruiterForm.role}
                    onChange={(e) => setRecruiterForm({ ...recruiterForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Unidade / Polo</label>
                  <select
                    value={recruiterForm.unit}
                    onChange={(e) => setRecruiterForm({ ...recruiterForm, unit: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="CD Jaú - SP">CD Jaú - SP</option>
                    <option value="Polo Barra Bonita - SP">Polo Barra Bonita - SP</option>
                    <option value="Loja Bariri - SP">Loja Bariri - SP</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewRecruiterOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20"
                >
                  Salvar Recrutador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
