import React, { useState, useEffect } from 'react';
import { X, Plus, Briefcase, MapPin, Clock, DollarSign, Users, CheckCircle2, Building2, Loader2, Search } from 'lucide-react';
import { apiClient } from '../../services/apiClient';

export default function NewJobModal({ isOpen, onClose, onJobCreated }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('Jaú - SP');
  const [shift, setShift] = useState('12x36 Noturno (19h às 07h)');
  const [openings, setOpenings] = useState(10);
  const [salary, setSalary] = useState('R$ 2.200,00 + Benefícios');
  const [maxRadius, setMaxRadius] = useState(25);
  const [skills, setSkills] = useState('Separação, Conhecimento em Coletor, Disponibilidade imediata');
  
  // Integração ViaCEP
  const [cep, setCep] = useState('');
  const [isSearchingCep, setIsSearchingCep] = useState(false);
  const [cepFeedback, setCepFeedback] = useState(null);

  const [companiesList, setCompaniesList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCompanyLogo, setSelectedCompanyLogo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadCompanies() {
      try {
        const comps = await apiClient.getCompanies();
        if (Array.isArray(comps) && comps.length > 0) {
          setCompaniesList(comps);
          setSelectedCompany(comps[0].name);
          setSelectedCompanyLogo(comps[0].logo || '');
        }
      } catch (e) {
        console.warn('Erro ao carregar empresas:', e);
      }
    }
    if (isOpen) {
      loadCompanies();
    }
  }, [isOpen]);

  const fetchCep = async (cepValue) => {
    const clean = (cepValue || '').replace(/\D/g, '');
    if (clean.length !== 8) return;

    setIsSearchingCep(true);
    setCepFeedback(null);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      const data = await res.json();
      if (data.erro) {
        setCepFeedback({ type: 'error', message: 'CEP não encontrado no ViaCEP.' });
      } else {
        const fullLocation = `${data.bairro ? data.bairro + ', ' : ''}${data.localidade} - ${data.uf}`;
        setLocation(fullLocation);
        if (!department || department === 'CD Jaú - Distrito Industrial') {
          setDepartment(`${data.logradouro ? data.logradouro + ' - ' : ''}Unidade ${data.localidade}`);
        }
        setCepFeedback({
          type: 'success',
          message: `${data.localidade} - ${data.uf} (${data.bairro || 'Centro'}) • Preenchido via ViaCEP!`
        });
      }
    } catch (e) {
      setCepFeedback({ type: 'error', message: 'Falha ao conectar com o serviço ViaCEP.' });
    } finally {
      setIsSearchingCep(false);
    }
  };

  const handleCepInput = (val) => {
    const raw = val.replace(/\D/g, '').slice(0, 8);
    const masked = raw.length > 5 ? `${raw.slice(0, 5)}-${raw.slice(5)}` : raw;
    setCep(masked);
    if (raw.length === 8) {
      fetchCep(raw);
    }
  };

  const handleCompanyChange = (companyName) => {
    setSelectedCompany(companyName);
    const found = companiesList.find(c => c.name === companyName);
    if (found && found.logo) {
      setSelectedCompanyLogo(found.logo);
    } else {
      setSelectedCompanyLogo('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !location) return;

    setIsSubmitting(true);
    const newJob = {
      code: `JOB-${Math.floor(100 + Math.random() * 900)}`,
      title,
      company: selectedCompany || "Galpão Logístico Jaú",
      companyLogo: selectedCompanyLogo || null,
      department: department || "Centro de Distribuição / Loja",
      location,
      shift,
      openings: Number(openings),
      candidatesCount: 0,
      shortlistedCount: 0,
      hiredCount: 0,
      salary,
      status: "Ativa",
      priority: "Alta",
      requiredSkills: skills.split(',').map(s => s.trim()).filter(Boolean),
      deadline: "2026-11-30"
    };

    try {
      if (onJobCreated) {
        await onJobCreated(newJob);
      }
      onClose();
    } catch (err) {
      console.error('Erro ao submeter vaga:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans']">
                Criar Nova Vaga Operacional
              </h3>
              <p className="text-xs text-slate-400">Salva no MariaDB e sincroniza em tempo real com App Mobile & Web</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
          {/* Seleção de Empresa / Agência com Logo do MariaDB */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center space-x-1">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Empresa / Agência Contratante *</span>
            </label>
            <div className="flex items-center space-x-3">
              {selectedCompanyLogo ? (
                <img
                  src={selectedCompanyLogo}
                  alt={selectedCompany}
                  className="w-10 h-10 rounded-xl object-contain bg-slate-950 border border-slate-800 p-1 shrink-0 shadow-md"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 font-bold shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
              )}
              <select
                value={selectedCompany}
                onChange={(e) => handleCompanyChange(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              >
                {companiesList.map((comp) => (
                  <option key={comp.id} value={comp.name}>
                    {comp.name} ({comp.segment || 'Operações'})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Título da Função Operacional *</label>
            <input
              type="text"
              required
              placeholder="Ex: Operador de Linha de Produção, Auxiliar de Carga..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Campo CEP da Empresa / Vaga com ViaCEP */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-semibold flex items-center space-x-1.5 text-xs">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>CEP da Empresa / Local da Vaga</span>
              </label>
              <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                ViaCEP Auto-Complete
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Ex: 17200-000 (Jaú) ou 17300-000"
                value={cep}
                onChange={(e) => handleCepInput(e.target.value)}
                maxLength={9}
                className="w-48 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-xs"
              />
              <button
                type="button"
                onClick={() => fetchCep(cep)}
                disabled={isSearchingCep}
                className="px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center space-x-1 transition-all disabled:opacity-50"
              >
                {isSearchingCep ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span>Buscar CEP</span>
              </button>
            </div>

            {cepFeedback && (
              <p className={`text-[11px] font-medium flex items-center space-x-1 ${
                cepFeedback.type === 'success' ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {cepFeedback.type === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                <span>{cepFeedback.message}</span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Unidade / Departamento</label>
              <input
                type="text"
                placeholder="Ex: CD Jaú - Distrito Industrial"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Cidade / Bairro da Vaga *</label>
              <input
                type="text"
                required
                placeholder="Ex: Jaú - SP, Barra Bonita - SP ou Bariri - SP"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Escala / Turno de Trabalho</label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="12x36 Noturno (19h às 07h)">12x36 Noturno (19h às 07h)</option>
                <option value="12x36 Diurno (07h às 19h)">12x36 Diurno (07h às 19h)</option>
                <option value="6x1 Manhã (06h às 14h20)">6x1 Manhã (06h às 14h20)</option>
                <option value="6x1 Tarde (14h às 22h20)">6x1 Tarde (14h às 22h20)</option>
                <option value="5x2 Comercial (08h às 17h48)">5x2 Comercial (08h às 17h48)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Raio Máximo Logístico Aceito</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="5"
                  max="50"
                  value={maxRadius}
                  onChange={(e) => setMaxRadius(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
                <span className="text-slate-400">km</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Número de Vagas Disponíveis</label>
              <input
                type="number"
                min="1"
                value={openings}
                onChange={(e) => setOpenings(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Salário & Benefícios</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Habilidades Práticas (separadas por vírgula)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-[11px] text-emerald-300">
            ⚡ Ao publicar, a vaga será salva no MariaDB (ID BIGINT AUTO_INCREMENT), sincronizada em tempo real com o aplicativo mobile e integrada à triagem inteligente.
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Salvando no MariaDB...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publicar Vaga</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
