/**
 * Cliente de API do TalentFlow Web Platform
 * Comunica-se diretamente com o backend REST conectado ao MariaDB.
 * Se a API estiver offline/iniciando, faz fallback transparente para os mocks locais.
 */

const API_BASE = '/api';

export const apiClient = {
  // Gerenciamento seguro de Token JWT
  getToken() {
    try {
      return localStorage.getItem('tf_jwt_token');
    } catch (_) {
      return null;
    }
  },
  setToken(token) {
    try {
      if (token) localStorage.setItem('tf_jwt_token', token);
      else localStorage.removeItem('tf_jwt_token');
    } catch (_) {}
  },
  getHeaders(extraHeaders = {}) {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...extraHeaders
    };
  },

  // Health
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await res.json();
    } catch (e) {
      return { status: 'offline', error: e.message };
    }
  },

  // Stats
  async getStats() {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (!res.ok) throw new Error('Falha ao obter métricas');
      return await res.json();
    } catch (e) {
      console.warn('[API] Falha em getStats, usando fallback local:', e);
      return null;
    }
  },

  // Vagas
  async getJobs() {
    try {
      const res = await fetch(`${API_BASE}/jobs`);
      if (!res.ok) throw new Error('Falha ao listar vagas');
      return await res.json();
    } catch (e) {
      console.warn('[API] Falha em getJobs, usando fallback local:', e);
      return null;
    }
  },

  async createJob(jobData) {
    const res = await fetch(`${API_BASE}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    });
    return await res.json();
  },

  async updateJob(id, jobData) {
    const res = await fetch(`${API_BASE}/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    });
    return await res.json();
  },

  async deleteJob(id) {
    const res = await fetch(`${API_BASE}/jobs/${id}`, { method: 'DELETE' });
    return await res.json();
  },

  // Candidatos
  async getCandidates() {
    try {
      const res = await fetch(`${API_BASE}/candidates`);
      if (!res.ok) throw new Error('Falha ao listar candidatos');
      return await res.json();
    } catch (e) {
      console.warn('[API] Falha em getCandidates:', e);
      return null;
    }
  },

  async createCandidate(candidateData) {
    const res = await fetch(`${API_BASE}/candidates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(candidateData)
    });
    return await res.json();
  },

  // Candidaturas & Pipeline
  async getApplications() {
    try {
      const res = await fetch(`${API_BASE}/applications`);
      if (!res.ok) throw new Error('Falha ao listar candidaturas');
      return await res.json();
    } catch (e) {
      console.warn('[API] Falha em getApplications:', e);
      return null;
    }
  },

  async updateApplicationStage(id, stage, notes = '') {
    const res = await fetch(`${API_BASE}/applications/${id}/stage`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage, notes })
    });
    return await res.json();
  },

  // Feedbacks de Onboarding (90 dias)
  async getFeedbacks() {
    try {
      const res = await fetch(`${API_BASE}/feedbacks`);
      if (!res.ok) throw new Error('Falha ao listar feedbacks');
      return await res.json();
    } catch (e) {
      console.warn('[API] Falha em getFeedbacks:', e);
      return null;
    }
  },

  // GED & LGPD
  async getGedDocuments() {
    try {
      const res = await fetch(`${API_BASE}/ged-documents`);
      if (!res.ok) throw new Error('Falha ao listar documentos GED');
      return await res.json();
    } catch (e) {
      console.warn('[API] Falha em getGedDocuments:', e);
      return null;
    }
  },

  async createGedDocument(docData) {
    const res = await fetch(`${API_BASE}/ged-documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(docData)
    });
    return await res.json();
  },

  async updateGedDocument(id, docData) {
    const res = await fetch(`${API_BASE}/ged-documents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(docData)
    });
    return await res.json();
  },

  async acceptGedDocument(id, signerInfo) {
    const res = await fetch(`${API_BASE}/ged-documents/${id}/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signerInfo)
    });
    return await res.json();
  },

  // Empresas & Recrutadores
  async getCompanies() {
    try {
      const res = await fetch(`${API_BASE}/companies`);
      if (!res.ok) throw new Error('Falha ao listar empresas');
      return await res.json();
    } catch (e) {
      console.warn('[API] Falha em getCompanies:', e);
      return null;
    }
  },

  async createCompany(companyData) {
    const res = await fetch(`${API_BASE}/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(companyData)
    });
    return await res.json();
  },

  async updateCompany(id, companyData) {
    const res = await fetch(`${API_BASE}/companies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(companyData)
    });
    return await res.json();
  },

  async getRecruiters() {
    try {
      const res = await fetch(`${API_BASE}/recruiters`);
      if (!res.ok) throw new Error('Falha ao listar recrutadores');
      return await res.json();
    } catch (e) {
      console.warn('[API] Falha em getRecruiters:', e);
      return null;
    }
  },

  async createRecruiter(recruiterData) {
    const res = await fetch(`${API_BASE}/recruiters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recruiterData)
    });
    return await res.json();
  },

  // Autenticação
  async login(email, password, role) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });
    const data = await res.json();
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  },

  logout() {
    this.setToken(null);
  },

  async forgotPassword(email) {
    const res = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return await res.json();
  },

  async resetPassword(email, code, newPassword) {
    const res = await fetch(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, newPassword })
    });
    return await res.json();
  },

  // Backup & Restore Seguro (Protegido por JWT)
  async getBackup() {
    const res = await fetch(`${API_BASE}/backup`, {
      headers: this.getHeaders()
    });
    return await res.json();
  },

  async restoreBackup(data) {
    const res = await fetch(`${API_BASE}/restore`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    });
    return await res.json();
  }
};
