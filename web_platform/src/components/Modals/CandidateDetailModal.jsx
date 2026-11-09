import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, ShieldCheck, MapPin, Clock, Phone, Sparkles, Navigation, UserCheck } from 'lucide-react';

export default function CandidateDetailModal({ candidate, onClose, onHumanReviewApproved }) {
  if (!candidate) return null;

  const [reviewed, setReviewed] = useState(candidate.humanReviewStatus.includes('Validado') || candidate.humanReviewStatus.includes('Aprovado'));
  const [reviewNote, setReviewNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApproveReview = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setReviewed(true);
      setIsSubmitting(false);
      if (onHumanReviewApproved) {
        onHumanReviewApproved(candidate.id, reviewNote || "Validado manualmente por recrutador responsável com base no Art. 20 LGPD.");
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-lg">
              {candidate.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans']">
                  {candidate.name}
                </h3>
                <span className="text-xs text-slate-400">({candidate.age} anos)</span>
              </div>
              <p className="text-xs text-emerald-400 font-semibold">{candidate.appliedJob}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Match Score Banner */}
        <div className="my-6 p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl font-black text-emerald-400 font-['Plus_Jakarta_Sans']">
              {candidate.overallMatch}%
            </div>
            <div>
              <p className="text-xs font-bold text-white">Score de Match Inteligente</p>
              <p className="text-[11px] text-slate-400">Compatibilidade prática & viabilidade logística</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-[10px]">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Logística: {candidate.matchBreakdown.logistics}%
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Turno: {candidate.matchBreakdown.shiftCompatibility}%
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Prática: {candidate.matchBreakdown.practicalSkills}%
            </span>
          </div>
        </div>

        {/* Candidate Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Localização e Deslocamento</span>
            </span>
            <p className="font-bold text-white">{candidate.location}</p>
            <p className="text-[11px] text-emerald-400">{candidate.transportTime}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Turno / Escala Declarada</span>
            </span>
            <p className="font-bold text-white">{candidate.shiftPreference}</p>
            <p className="text-[11px] text-slate-400">Disponibilidade Imediata</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 flex items-center space-x-1">
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>WhatsApp / Triagem</span>
            </span>
            <p className="font-bold text-white">{candidate.phone}</p>
            <p className="text-[11px] text-teal-400">{candidate.whatsAppStatus}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Risco de Turnover Precoce</span>
            </span>
            <p className={`font-bold ${candidate.retentionRisk.includes('ALTO') ? 'text-red-400' : 'text-emerald-400'}`}>
              {candidate.retentionRisk}
            </p>
            <p className="text-[11px] text-slate-400">Previsão algorítmica para 90 dias</p>
          </div>
        </div>

        {/* AI Rationale Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-6 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-200">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Justificativa Transparente da IA (Explicabilidade LGPD)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {candidate.aiRationale}
          </p>
        </div>

        {/* Skills Tags */}
        <div className="mb-6">
          <span className="text-xs text-slate-400 font-semibold block mb-2">Habilidades Práticas Validadas:</span>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs border border-slate-700">
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Human-in-the-Loop LGPD Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-teal-500/40 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-bold text-teal-300">
                Revisão Humana de Decisão (Art. 20 LGPD)
              </span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              reviewed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
            }`}>
              {reviewed ? '✓ Revisado & Conforme' : 'Aguardando Validação'}
            </span>
          </div>

          <p className="text-[11px] text-slate-400">
            Garante que a triagem respeite o direito do candidato à revisão e à não discriminação automatizada.
          </p>

          {!reviewed ? (
            <div className="space-y-2 pt-1">
              <input
                type="text"
                placeholder="Observações do recrutador (opcional)..."
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleApproveReview}
                disabled={isSubmitting}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{isSubmitting ? 'Registrando...' : 'Aprovar / Validar Decisão Manualmente'}</span>
              </button>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Decisão humana registrada e gravada no log de conformidade.</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
