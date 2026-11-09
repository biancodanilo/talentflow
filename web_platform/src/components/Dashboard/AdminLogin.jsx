import React, { useState } from 'react';
import { Lock, Mail, Key, ShieldCheck, ArrowLeft, Shield, Eye, EyeOff, Building2, CheckCircle2, Users } from 'lucide-react';

export default function AdminLogin({ onLogin, onBackToSite, onGoToRh, theme }) {
  const [email, setEmail] = useState('marcos.silveira@talentflow.com.br');
  const [password, setPassword] = useState('••••••••••••');
  const [twoFactorToken, setTwoFactorToken] = useState('918-340');
  const [rememberTerminal, setRememberTerminal] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState(1);
  const [recoveryCode, setRecoveryCode] = useState('904182');
  const [newMasterPass, setNewMasterPass] = useState('');
  const [toastMsg, setToastMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  const handleConfirmRecovery = (e) => {
    e.preventDefault();
    setIsRecoveryOpen(false);
    setRecoveryStep(1);
    setToastMsg('Chave Master e Token 2FA redefinidos com sucesso junto ao DPO!');
    setTimeout(() => setToastMsg(null), 4000);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden transition-colors duration-200 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-purple-500/10 via-indigo-500/10 to-emerald-500/5 blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-md animate-in fade-in duration-300">
        
        {/* Top Navigation Links */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Site</span>
          </button>

          {onGoToRh && (
            <button
              onClick={onGoToRh}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Users className="w-3 h-3" />
              <span>Ir para Portal do RH (/rh)</span>
            </button>
          )}
        </div>

        {/* Card Container */}
        <div className={`p-8 sm:p-9 rounded-3xl border shadow-2xl backdrop-blur-xl relative ${
          isDark 
            ? 'bg-slate-900/90 border-slate-800 shadow-slate-950/80' 
            : 'bg-white border-slate-200 shadow-slate-200/60'
        }`}>
          
          {/* Header Brand */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-emerald-400 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xl font-bold tracking-tight font-['Plus_Jakarta_Sans']">
                    Talent<span className="text-purple-400">Flow</span>
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/30 rounded-full">
                    Super Admin
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Console Master de Administração</p>
              </div>
            </div>

            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Lock className="w-4 h-4" />
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold font-['Plus_Jakarta_Sans']">
              Gestão de Acessos & Usuários
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Terminal restrito para configuração de permissões RBAC, auditoria de segurança e contas corporativas.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Campo E-mail */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                E-mail do Administrador Master
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="superadmin@talentflow.com.br"
                  className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border focus:outline-none focus:border-purple-500 transition-colors ${
                    isDark 
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Senha Master
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setRecoveryStep(1);
                    setIsRecoveryOpen(true);
                  }}
                  className="text-[10px] font-bold text-purple-400 hover:underline"
                >
                  Esqueceu a senha / Recuperar chave?
                </button>
              </div>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border focus:outline-none focus:border-purple-500 transition-colors ${
                    isDark 
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Campo Token 2FA */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Token Hardware 2FA / YubiKey
                </label>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                  2FA Obrigatório
                </span>
              </div>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={twoFactorToken}
                  onChange={(e) => setTwoFactorToken(e.target.value)}
                  placeholder="000-000"
                  className={`w-full pl-10 pr-4 py-2.5 text-xs font-mono rounded-xl border focus:outline-none focus:border-purple-500 transition-colors ${
                    isDark 
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
            </div>

            {/* Checkbox Lembrar Sessão */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="remember_admin"
                checked={rememberTerminal}
                onChange={(e) => setRememberTerminal(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-700 text-purple-600 focus:ring-0 accent-purple-600"
              />
              <label htmlFor="remember_admin" className="text-xs text-slate-400 cursor-pointer">
                Manter terminal administrativo seguro (Sessão Criptografada)
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center space-x-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Entrar no Console Admin</span>
            </button>

            {/* Fast Demo Access Button */}
            <button
              type="button"
              onClick={onLogin}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all border flex items-center justify-center space-x-2 ${
                isDark 
                  ? 'bg-purple-950/30 hover:bg-purple-900/40 text-purple-300 border-purple-800/60' 
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Acesso Rápido Master (Demo 1-Clique)</span>
            </button>

          </form>

          {/* Security & Compliance Footer */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-[10px] text-slate-500 text-center space-y-1">
            <p className="flex items-center justify-center space-x-1.5">
              <Building2 className="w-3 h-3 text-slate-400" />
              <span>TalentFlow Security Governance • <strong>ISO 27001</strong></span>
            </p>
            <p>Acessos e modificações de privilégios são auditados e gravados com IP e hash imutável.</p>
          </div>

        </div>

      </div>

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-purple-600 text-white font-bold text-xs shadow-2xl flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {isRecoveryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-4 text-xs">
            <h3 className="text-base font-bold text-purple-400">
              Recuperação de Senha Master & Chave 2FA
            </h3>
            {recoveryStep === 1 ? (
              <>
                <p className="text-slate-400">
                  Informe o e-mail do Administrador Master para enviar o protocolo de redefinição ao DPO e dispositivo corporativo:
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsRecoveryOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecoveryStep(2)}
                    className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold"
                  >
                    Enviar Token DPO
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleConfirmRecovery} className="space-y-3">
                <p className="text-purple-300">
                  Token de Segurança enviado para <strong>{email}</strong>:
                </p>
                <input
                  type="text"
                  required
                  value={recoveryCode}
                  onChange={(e) => setRecoveryCode(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
                <input
                  type="password"
                  required
                  value={newMasterPass}
                  onChange={(e) => setNewMasterPass(e.target.value)}
                  placeholder="Nova Senha Master"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsRecoveryOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold"
                  >
                    Confirmar Nova Chave
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
