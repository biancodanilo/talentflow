import React, { useState, useEffect } from 'react';
import { jobsData as initialJobs } from '../../data/mockData';
import { Briefcase, Plus, MapPin, Clock, Users, DollarSign, Filter, Search, CheckCircle, Sparkles } from 'lucide-react';

export default function JobsManagement({ jobs: propJobs, onOpenNewJob, onSelectJobForMatching }) {
  const [jobs, setJobs] = useState(propJobs || initialJobs);

  useEffect(() => {
    if (propJobs && Array.isArray(propJobs) && propJobs.length > 0) {
      setJobs(propJobs);
    }
  }, [propJobs]);

  const [filterShift, setFilterShift] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterShift === 'all') return matchesSearch;
    if (filterShift === '12x36') return matchesSearch && job.shift.includes('12x36');
    if (filterShift === '6x1') return matchesSearch && job.shift.includes('6x1');
    if (filterShift === '5x2') return matchesSearch && job.shift.includes('5x2');
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-['Plus_Jakarta_Sans'] flex items-center space-x-2">
            <span>Gestão de Vagas & Programas de Talentos</span>
            <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-bold">
              {filteredJobs.length} ativas
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Defina perfis, turnos de trabalho, raio logístico e acione a triagem automática via WhatsApp.
          </p>
        </div>

        <button
          onClick={onOpenNewJob}
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Nova Vaga Operacional</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por função, local ou empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Shift Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 flex items-center space-x-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Escala:</span>
          </span>

          <button
            onClick={() => setFilterShift('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterShift === 'all' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilterShift('12x36')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterShift === '12x36' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            12x36
          </button>
          <button
            onClick={() => setFilterShift('6x1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterShift === '6x1' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            6x1
          </button>
          <button
            onClick={() => setFilterShift('5x2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterShift === '5x2' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            5x2 Segunda a Sexta
          </button>
        </div>

      </div>

      {/* Jobs Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => {
          const progressPercent = Math.round((job.hiredCount / job.openings) * 100);

          return (
            <div
              key={job.id}
              className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/30 transition-all shadow-lg flex flex-col justify-between group"
            >
              <div>
                {/* Header Card */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start space-x-3">
                    {job.companyLogo ? (
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-11 h-11 rounded-xl object-contain bg-slate-950 border border-slate-800 p-1 shrink-0 mt-0.5 shadow-md"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xs shrink-0 mt-0.5 shadow-md">
                        {job.company?.substring(0, 2).toUpperCase() || 'TF'}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {job.id}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          job.priority === 'Urgente' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {job.priority}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-xs text-slate-400">{job.company} • {job.department}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl shrink-0">
                    {job.salary}
                  </span>
                </div>

                {/* Details Badges */}
                <div className="grid grid-cols-2 gap-2 my-4 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-slate-300 truncate">{job.location}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="text-slate-300 truncate">{job.shift}</span>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="mb-4">
                  <p className="text-[11px] text-slate-400 mb-1.5 font-medium">Habilidades & Requisitos de Execução:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.requiredSkills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hiring Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Progresso da Turma:</span>
                    <span className="font-bold text-white">
                      {job.hiredCount} de {job.openings} preenchidas ({progressPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span><strong>{job.candidatesCount}</strong> inscritos</span>
                </span>

                <button
                  onClick={() => onSelectJobForMatching(job)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 hover:text-emerald-300 text-white rounded-xl font-bold transition-all flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ver Matching ({job.shortlistedCount})</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
