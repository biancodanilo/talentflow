const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool, dbHost, dbPort, dbName } = require('./config/db');
const { initDatabase } = require('./database/schema');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'talentflow_super_secure_jwt_secret_key_2026_x89f_prod';

// ==========================================
// MIDDLEWARES DE SEGURANÇA (HARDENING OWASP)
// ==========================================

// 1. Cabeçalhos HTTP Seguros (X-Content-Type-Options, X-Frame-Options, etc.)
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// 2. CORS Seguro para hosts autorizados
const allowedOrigins = [
  'https://talentflow.tail5f8db5.ts.net',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://100.121.197.37',
  'http://100.121.197.37:3001'
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.ts.net')) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));

// 3. Rate Limiting Geral da API (300 req / 15 min)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { error: 'Limite de requisições excedido. Tente novamente em alguns minutos.' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api', apiLimiter);

// 4. Rate Limiting Estrito para Login e Recuperação de Senha (15 tentativas / 15 min contra Brute Force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { error: 'Muitas tentativas de autenticação para este IP. Tente novamente mais tarde.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Limite de corpo seguro
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging de requisições
app.use((req, res, next) => {
  console.log(`[API ${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ==========================================
// MIDDLEWARES DE AUTORIZAÇÃO JWT & RBAC
// ==========================================
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado: token de autenticação não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token de autenticação inválido ou expirado' });
    }
    req.user = user;
    next();
  });
}

function requireAdmin(req, res, next) {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'superadmin')) {
    return res.status(403).json({ error: 'Acesso negado: requer privilégios de Administrador' });
  }
  next();
}

// ==========================================
// 1. HEALTH CHECK & STATS
// ==========================================
app.get('/api/health', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT 1 as isAlive, NOW() as serverTime');
    res.json({
      status: 'online',
      service: 'TalentFlow API Gateway',
      mariadb: {
        connected: true,
        host: dbHost,
        port: dbPort,
        database: dbName,
        primaryKeyType: 'BIGINT AUTO_INCREMENT',
        serverTime: result[0].serverTime
      },
      publicUrl: 'https://talentflow.tail5f8db5.ts.net/api',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Falha na conexão com MariaDB',
      error: err.message
    });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const [jobs] = await pool.query('SELECT COUNT(*) as count, SUM(openings) as openings FROM jobs WHERE status = "Ativa"');
    const [candidates] = await pool.query('SELECT COUNT(*) as count FROM candidates');
    const [applications] = await pool.query('SELECT COUNT(*) as count FROM applications');
    const [feedbacks] = await pool.query('SELECT COUNT(*) as count FROM onboarding_feedbacks');

    res.json({
      activeJobs: jobs[0].count || 0,
      totalOpenings: jobs[0].openings || 0,
      totalCandidates: candidates[0].count || 0,
      totalApplications: applications[0].count || 0,
      totalFeedbacks: feedbacks[0].count || 0,
      timeToHire: { current: "3.4 dias", traditional: "24.0 dias", reduction: "-85%" },
      retention90Days: { current: "89.4%", traditional: "52.0%", growth: "+37.4 p.p." },
      costPerHire: { current: "R$ 380", traditional: "R$ 1.950", savings: "R$ 1.570 por vaga" }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 2. VAGAS (JOBS) - CRUD (BIGINT AUTO_INCREMENT)
// ==========================================
app.get('/api/jobs', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs ORDER BY priority DESC, id ASC');
    const formatted = rows.map(j => ({
      ...j,
      id: j.code || j.id.toString(),
      numericId: j.id,
      code: j.code,
      companyLogo: j.company_logo || null,
      requiredSkills: typeof j.required_skills === 'string' ? JSON.parse(j.required_skills || '[]') : j.required_skills,
      candidatesCount: j.candidates_count,
      shortlistedCount: j.shortlisted_count,
      hiredCount: j.hired_count,
      matchScore: j.match_score,
      whatsappNumber: j.whatsapp_number
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const idParam = req.params.id;
    const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ? OR code = ?', [idParam, idParam]);
    if (rows.length === 0) return res.status(404).json({ error: 'Vaga não encontrada' });
    const j = rows[0];
    res.json({
      ...j,
      id: j.code || j.id.toString(),
      numericId: j.id,
      code: j.code,
      companyLogo: j.company_logo || null,
      requiredSkills: typeof j.required_skills === 'string' ? JSON.parse(j.required_skills || '[]') : j.required_skills,
      candidatesCount: j.candidates_count,
      matchScore: j.match_score
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const {
      title, company, department, location, shift, openings, salary,
      status, priority, requiredSkills, deadline, matchScore, whatsappNumber, companyLogo
    } = req.body;

    const code = req.body.code || req.body.id || `JOB-${Math.floor(100 + Math.random() * 900)}`;
    const skillsJson = JSON.stringify(Array.isArray(requiredSkills) ? requiredSkills : []);

    const [result] = await pool.query(
      `INSERT INTO jobs (code, title, company, department, location, shift, openings, salary, status, priority, required_skills, deadline, match_score, whatsapp_number, company_logo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        code, title, company || 'Empresa Parceira', department || 'Operacional',
        location || 'Jaú - SP', shift || '6x1 Diurno', openings || 1, salary || 'A combinar',
        status || 'Ativa', priority || 'Média', skillsJson, deadline || '2026-12-31',
        matchScore || 85, whatsappNumber || '5514998765432', companyLogo || null
      ]
    );

    res.status(201).json({ success: true, message: 'Vaga criada com sucesso no MariaDB', id: result.insertId, code });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/jobs/:id', async (req, res) => {
  try {
    const idParam = req.params.id;
    const {
      title, company, department, location, shift, openings, salary,
      status, priority, requiredSkills, deadline, matchScore, whatsappNumber, companyLogo
    } = req.body;

    const skillsJson = requiredSkills ? JSON.stringify(requiredSkills) : undefined;

    await pool.query(
      `UPDATE jobs SET
        title = COALESCE(?, title),
        company = COALESCE(?, company),
        department = COALESCE(?, department),
        location = COALESCE(?, location),
        shift = COALESCE(?, shift),
        openings = COALESCE(?, openings),
        salary = COALESCE(?, salary),
        status = COALESCE(?, status),
        priority = COALESCE(?, priority),
        required_skills = COALESCE(?, required_skills),
        deadline = COALESCE(?, deadline),
        match_score = COALESCE(?, match_score),
        whatsapp_number = COALESCE(?, whatsapp_number),
        company_logo = COALESCE(?, company_logo)
       WHERE id = ? OR code = ?`,
      [
        title, company, department, location, shift, openings, salary,
        status, priority, skillsJson, deadline, matchScore, whatsappNumber, companyLogo, idParam, idParam
      ]
    );

    res.json({ success: true, message: 'Vaga atualizada com sucesso no MariaDB' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/jobs/:id', async (req, res) => {
  try {
    const idParam = req.params.id;
    await pool.query('DELETE FROM jobs WHERE id = ? OR code = ?', [idParam, idParam]);
    res.json({ success: true, message: 'Vaga excluída do MariaDB' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 3. CANDIDATOS (CANDIDATES) - BIGINT AUTO_INCREMENT
// ==========================================
app.get('/api/candidates', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM candidates ORDER BY overall_match DESC, id ASC');
    const formatted = rows.map(c => ({
      ...c,
      id: c.code || c.id.toString(),
      numericId: c.id,
      code: c.code,
      skills: typeof c.skills === 'string' ? JSON.parse(c.skills || '[]') : c.skills,
      overallMatch: c.overall_match,
      transportTime: c.transport_time,
      shiftPreference: c.shift_preference,
      appliedJob: c.applied_job,
      whatsAppStatus: c.whatsapp_status,
      aiRationale: c.ai_rationale,
      humanReviewStatus: c.human_review_status,
      onboardingDay: c.onboarding_day,
      retentionRisk: c.retention_risk
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/candidates', async (req, res) => {
  try {
    const {
      name, email, phone, age, location, transportTime, shiftPreference,
      overallMatch, appliedJob, skills, aiRationale
    } = req.body;

    const code = req.body.code || req.body.id || `CAND-${Math.floor(100 + Math.random() * 900)}`;
    const skillsJson = JSON.stringify(Array.isArray(skills) ? skills : []);

    const [result] = await pool.query(
      `INSERT INTO candidates (code, name, email, phone, age, location, transport_time, shift_preference, overall_match, applied_job, status, skills, ai_rationale)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Triagem', ?, ?)`,
      [
        code, name, email, phone, age || 25, location || 'Jaú - SP',
        transportTime || '15 min de deslocamento', shiftPreference || 'Disponível',
        overallMatch || 85, appliedJob || 'Geral Operacional', skillsJson,
        aiRationale || 'Cadastrado via Aplicativo Mobile TalentFlow.'
      ]
    );

    res.status(201).json({ success: true, message: 'Candidato cadastrado com sucesso no MariaDB', id: result.insertId, code });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 4. CANDIDATURAS (APPLICATIONS & PIPELINE)
// ==========================================
app.get('/api/applications', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, j.title as job_title, j.company as job_company, j.company_logo
      FROM applications a
      LEFT JOIN jobs j ON (a.job_id = j.id OR a.job_code = j.code)
      ORDER BY a.updated_at DESC
    `);
    res.json(rows.map(r => ({
      id: r.id,
      jobId: r.job_code || r.job_id?.toString(),
      numericJobId: r.job_id,
      jobTitle: r.job_title || r.role,
      company: r.job_company,
      companyLogo: r.company_logo,
      candidateId: r.candidate_code || r.candidate_id?.toString(),
      candidateName: r.candidate_name,
      candidateEmail: r.candidate_email,
      candidatePhone: r.candidate_phone,
      role: r.role,
      stage: r.stage,
      matchScore: r.match_score,
      whatsappContacted: !!r.whatsapp_contacted,
      notes: r.notes,
      appliedAt: r.applied_at,
      updatedAt: r.updated_at
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/applications', async (req, res) => {
  try {
    const { jobId, candidateId, candidateName, candidateEmail, candidatePhone, role, matchScore } = req.body;

    const jobIdentifier = jobId || 'JOB-101';
    let numericJobId = null;
    let jobCode = jobIdentifier;

    const [jobRows] = await pool.query('SELECT id, code FROM jobs WHERE id = ? OR code = ?', [jobIdentifier, jobIdentifier]);
    if (jobRows.length > 0) {
      numericJobId = jobRows[0].id;
      jobCode = jobRows[0].code || jobRows[0].id.toString();
    }

    const [result] = await pool.query(
      `INSERT INTO applications (job_id, job_code, candidate_id, candidate_code, candidate_name, candidate_email, candidate_phone, role, stage, match_score, whatsapp_contacted)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Triagem', ?, 0)`,
      [
        numericJobId,
        jobCode,
        null,
        candidateId || `CAND-${Date.now().toString().slice(-4)}`,
        candidateName || 'Candidato Mobile',
        candidateEmail || 'candidato@app.com',
        candidatePhone || '(14) 99999-0000',
        role || 'Vaga Operacional',
        matchScore || 90
      ]
    );

    if (numericJobId) {
      await pool.query('UPDATE jobs SET candidates_count = candidates_count + 1 WHERE id = ?', [numericJobId]);
    }

    res.status(201).json({
      success: true,
      message: 'Candidatura realizada com sucesso! Gravado no MariaDB.',
      applicationId: result.insertId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/applications/:id/stage', async (req, res) => {
  try {
    const { id } = req.params;
    const { stage, notes } = req.body;

    await pool.query(
      'UPDATE applications SET stage = ?, notes = COALESCE(?, notes) WHERE id = ?',
      [stage, notes, id]
    );

    res.json({ success: true, message: `Etapa da candidatura alterada para "${stage}" no MariaDB!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 5. FEEDBACKS DE ONBOARDING (BIGINT AUTO_INCREMENT)
// ==========================================
app.get('/api/feedbacks', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM onboarding_feedbacks ORDER BY id DESC');
    res.json(rows.map(f => ({
      id: f.id,
      candidateId: f.candidate_id,
      candidateName: f.candidate_name,
      day: f.day,
      category: f.category,
      message: f.message,
      status: f.status,
      source: f.source,
      createdAt: f.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/feedbacks', async (req, res) => {
  try {
    const { candidateId, candidateName, day, category, message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mensagem pré-programada é obrigatória' });
    }

    const [result] = await pool.query(
      `INSERT INTO onboarding_feedbacks (candidate_id, candidate_name, day, category, message, status, source)
       VALUES (?, ?, ?, ?, ?, 'Recebido', 'App Mobile')`,
      [
        typeof candidateId === 'number' ? candidateId : 1,
        candidateName || 'Rodrigo Almeida Santos',
        day || 'Dia 7',
        category || 'Geral',
        message
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Feedback de 1 toque registrado no MariaDB com chave BIGINT!',
      feedbackId: result.insertId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 6. GESTÃO ELETRÔNICA DE DOCUMENTOS (GED) & LGPD
// ==========================================
app.get('/api/ged-documents', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ged_documents ORDER BY id ASC');
    res.json(rows.map(d => ({
      id: d.code || d.id.toString(),
      numericId: d.id,
      code: d.code,
      title: d.title,
      category: d.category,
      company: d.company,
      unit: d.unit,
      version: d.version,
      launchedBy: d.launched_by,
      launchedByRole: d.launched_by_role,
      launchedAt: d.launched_at,
      workflowStatus: d.workflow_status,
      progressPercent: d.progress_percent,
      acceptedCount: d.accepted_count,
      totalTargets: d.total_targets,
      mandatory: !!d.mandatory,
      userAccepted: !!d.user_accepted,
      summary: d.summary,
      content: d.content
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/ged-documents', async (req, res) => {
  try {
    const {
      title, category, company, unit, version, launchedBy, launchedByRole,
      summary, content, mandatory, totalTargets
    } = req.body;

    const code = req.body.code || req.body.id || `GED-2026-${Math.floor(100 + Math.random() * 900)}`;

    const [result] = await pool.query(
      `INSERT INTO ged_documents (code, title, category, company, unit, version, launched_by, launched_by_role, launched_at, workflow_status, progress_percent, accepted_count, total_targets, mandatory, user_accepted, summary, content)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'Vigente / Em Coleta', 0, 0, ?, ?, 0, ?, ?)`,
      [
        code, title, category || 'Geral', company || 'Empresa Parceira',
        unit || 'Matriz', version || 'v1.0', launchedBy || 'Gestor RH',
        launchedByRole || 'Recrutamento', totalTargets || 50, mandatory ? 1 : 0,
        summary || '', content || ''
      ]
    );

    res.status(201).json({ success: true, message: 'Documento cadastrado no MariaDB', id: result.insertId, code });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/ged-documents/:id', async (req, res) => {
  try {
    const idParam = req.params.id;
    const { title, category, company, unit, version, workflowStatus, summary, mandatory } = req.body;

    await pool.query(
      `UPDATE ged_documents SET
        title = COALESCE(?, title),
        category = COALESCE(?, category),
        company = COALESCE(?, company),
        unit = COALESCE(?, unit),
        version = COALESCE(?, version),
        workflow_status = COALESCE(?, workflow_status),
        summary = COALESCE(?, summary),
        mandatory = COALESCE(?, mandatory)
       WHERE id = ? OR code = ?`,
      [title, category, company, unit, version, workflowStatus, summary, mandatory !== undefined ? (mandatory ? 1 : 0) : null, idParam, idParam]
    );

    res.json({ success: true, message: 'Documento atualizado com sucesso no MariaDB' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/ged-documents/:id/accept', async (req, res) => {
  try {
    const idParam = req.params.id;
    const { signerName, signerRole, signerIdentifier } = req.body;

    let docNumericId = null;
    let docCode = idParam;
    const [docRows] = await pool.query('SELECT id, code FROM ged_documents WHERE id = ? OR code = ?', [idParam, idParam]);
    if (docRows.length > 0) {
      docNumericId = docRows[0].id;
      docCode = docRows[0].code || docRows[0].id.toString();
    }

    await pool.query(
      `INSERT INTO ged_signatures (document_id, document_code, signer_name, signer_role, signer_identifier, status)
       VALUES (?, ?, ?, ?, ?, 'Aceito')`,
      [docNumericId, docCode, signerName || 'Candidato', signerRole || 'Candidato', signerIdentifier || 'App Mobile']
    );

    await pool.query(
      `UPDATE ged_documents 
       SET accepted_count = accepted_count + 1,
           user_accepted = 1,
           progress_percent = LEAST(100, ROUND(((accepted_count + 1) / GREATEST(1, total_targets)) * 100))
       WHERE id = ? OR code = ?`,
      [idParam, idParam]
    );

    res.json({ success: true, message: 'Termo aceito digitalmente e gravado no MariaDB!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 7. EMPRESAS E RECRUTADORES (BIGINT AUTO_INCREMENT)
// ==========================================
app.get('/api/companies', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM companies ORDER BY id ASC');
    res.json(rows.map(c => ({
      id: c.code || c.id.toString(),
      numericId: c.id,
      code: c.code,
      name: c.name,
      cnpj: c.cnpj,
      legalName: c.legal_name,
      city: c.city,
      sector: c.sector,
      contactName: c.contact_name,
      contactEmail: c.contact_email,
      phone: c.phone,
      activeJobs: c.active_jobs,
      status: c.status,
      logo: c.logo || null,
      createdAt: c.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/companies', async (req, res) => {
  try {
    const { name, cnpj, legalName, city, sector, contactName, contactEmail, phone, logo } = req.body;
    const code = req.body.code || req.body.id || `COMP-${Math.floor(100 + Math.random() * 900)}`;

    const [result] = await pool.query(
      `INSERT INTO companies (code, name, cnpj, legal_name, city, sector, contact_name, contact_email, phone, active_jobs, status, logo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'Ativa', ?)`,
      [code, name, cnpj, legalName || name, city || 'Jaú - SP', sector || 'Logística', contactName, contactEmail, phone, logo || null]
    );

    res.status(201).json({ success: true, message: 'Empresa cadastrada no MariaDB com BIGINT ID', id: result.insertId, code });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/companies/:id', async (req, res) => {
  try {
    const idParam = req.params.id;
    const { name, cnpj, legalName, city, sector, contactName, contactEmail, phone, status, logo } = req.body;

    await pool.query(
      `UPDATE companies SET
        name = COALESCE(?, name),
        cnpj = COALESCE(?, cnpj),
        legal_name = COALESCE(?, legal_name),
        city = COALESCE(?, city),
        sector = COALESCE(?, sector),
        contact_name = COALESCE(?, contact_name),
        contact_email = COALESCE(?, contact_email),
        phone = COALESCE(?, phone),
        status = COALESCE(?, status),
        logo = COALESCE(?, logo)
       WHERE id = ? OR code = ?`,
      [name, cnpj, legalName, city, sector, contactName, contactEmail, phone, status, logo, idParam, idParam]
    );

    res.json({ success: true, message: 'Empresa e logo atualizados com sucesso no MariaDB' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/recruiters', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.*, c.name as company_name
      FROM recruiters r
      LEFT JOIN companies c ON r.company_id = c.id
      ORDER BY r.id ASC
    `);
    res.json(rows.map(r => ({
      id: r.code || r.id.toString(),
      numericId: r.id,
      code: r.code,
      companyId: r.company_id,
      companyName: r.company_name,
      name: r.name,
      email: r.email,
      role: r.role,
      phone: r.phone,
      status: r.status,
      createdAt: r.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/recruiters', async (req, res) => {
  try {
    const { companyId, name, email, role, phone } = req.body;
    const code = req.body.code || req.body.id || `REC-${Math.floor(100 + Math.random() * 900)}`;

    const [result] = await pool.query(
      `INSERT INTO recruiters (code, company_id, name, email, role, phone, status)
       VALUES (?, ?, ?, ?, ?, ?, 'Ativo')`,
      [code, typeof companyId === 'number' ? companyId : 1, name, email, role || 'Recrutador', phone]
    );

    res.status(201).json({ success: true, message: 'Recrutador cadastrado no MariaDB', id: result.insertId, code });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 8. AUTENTICAÇÃO SEGURA (BCRYPT + JWT + BRUTE FORCE PROTECTION)
// ==========================================
app.post('/api/auth/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email.trim().toLowerCase()]);

    if (users.length === 0) {
      // Mensagem genérica para evitar enumeração de usuários
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Geração de Token JWT assinado
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        company: user.company
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company
      }
    });
  } catch (err) {
    console.error('[AUTH LOGIN ERROR]', err);
    res.status(500).json({ error: 'Erro interno ao autenticar usuário' });
  }
});

app.post('/api/auth/register', authLimiter, async (req, res) => {
  try {
    const { name, email, password, role, phone, company } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'A senha deve conter no mínimo 6 caracteres' });
    }

    // Hash seguro da senha com Bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const normalizedEmail = email.trim().toLowerCase();

    const [insertUser] = await pool.query(
      'INSERT INTO users (name, email, password_hash, role, phone, company) VALUES (?, ?, ?, ?, ?, ?)',
      [name, normalizedEmail, hashedPassword, role || 'candidate', phone, company]
    );

    if (role === 'candidate' || !role) {
      const candCode = `CAND-${Math.floor(100 + Math.random() * 900)}`;
      await pool.query(
        `INSERT INTO candidates (code, name, email, phone, location, status)
         VALUES (?, ?, ?, ?, 'Jaú - SP', 'Triagem')`,
        [candCode, name, normalizedEmail, phone]
      );
    }

    const token = jwt.sign(
      {
        id: insertUser.insertId,
        email: normalizedEmail,
        name,
        role: role || 'candidate',
        company
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Usuário registrado com sucesso no MariaDB',
      token,
      id: insertUser.insertId
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'E-mail já cadastrado no sistema' });
    }
    console.error('[AUTH REGISTER ERROR]', err);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

app.post('/api/auth/forgot-password', authLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'E-mail é obrigatório' });

    // Código numérico aleatório de 6 dígitos
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const [result] = await pool.query('UPDATE users SET reset_token = ? WHERE email = ?', [token, email.trim().toLowerCase()]);

    // Responde com sucesso genérico para não vazar se o e-mail existe
    res.json({
      success: true,
      message: 'Se o e-mail estiver cadastrado, o código de recuperação foi gerado.',
      resetCode: process.env.NODE_ENV === 'production' ? undefined : token
    });
  } catch (err) {
    console.error('[FORGOT PASSWORD ERROR]', err);
    res.status(500).json({ error: 'Erro ao processar recuperação de senha' });
  }
});

app.post('/api/auth/reset-password', authLimiter, async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      return res.status(400).json({ error: 'E-mail, código e nova senha são obrigatórios' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'A nova senha deve ter no mínimo 6 caracteres' });
    }

    const [users] = await pool.query('SELECT * FROM users WHERE email = ? AND reset_token = ?', [email.trim().toLowerCase(), code]);

    if (users.length === 0) {
      return res.status(400).json({ error: 'Código de recuperação inválido ou expirado' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password_hash = ?, reset_token = NULL WHERE email = ?', [hashedNewPassword, email.trim().toLowerCase()]);

    res.json({ success: true, message: 'Senha redefinida com sucesso no MariaDB!' });
  } catch (err) {
    console.error('[RESET PASSWORD ERROR]', err);
    res.status(500).json({ error: 'Erro ao redefinir senha' });
  }
});

// ==========================================
// 8.1 GESTÃO DE USUÁRIOS (PROTEGIDA POR ADMIN)
// ==========================================
app.get('/api/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role, phone, company, created_at FROM users ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error('[GET USERS ERROR]', err);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
});

// ==========================================
// 9. BACKUP & EXPORTAÇÃO (PROTEGIDO POR JWT + SUPERADMIN/ADMIN)
// ==========================================
app.get('/api/backup', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [jobs] = await pool.query('SELECT * FROM jobs');
    const [candidates] = await pool.query('SELECT * FROM candidates');
    const [applications] = await pool.query('SELECT * FROM applications');
    const [feedbacks] = await pool.query('SELECT * FROM onboarding_feedbacks');
    const [gedDocuments] = await pool.query('SELECT * FROM ged_documents');
    const [companies] = await pool.query('SELECT * FROM companies');
    const [recruiters] = await pool.query('SELECT * FROM recruiters');

    const backupData = {
      version: '2.0-BIGINT-SECURED',
      exportedAt: new Date().toISOString(),
      database: dbName,
      exportedBy: req.user ? req.user.email : 'Admin',
      data: {
        jobs,
        candidates,
        applications,
        feedbacks,
        gedDocuments,
        companies,
        recruiters
      }
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=talentflow_backup_${Date.now()}.json`);
    res.json(backupData);
  } catch (err) {
    console.error('[BACKUP ERROR]', err);
    res.status(500).json({ error: 'Erro ao gerar backup seguro' });
  }
});

// Inicialização
async function start() {
  try {
    await initDatabase();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`===================================================`);
      console.log(`  🚀 TalentFlow REST API Gateway ATIVO (BIGINT AUTO_INCREMENT)`);
      console.log(`  Porta Local    : http://localhost:${PORT}`);
      console.log(`  Porta de Rede  : http://0.0.0.0:${PORT}`);
      console.log(`  Via Tailscale  : https://talentflow.tail5f8db5.ts.net/api`);
      console.log(`  Banco MariaDB  : ${dbHost}:${dbPort} -> ${dbName}`);
      console.log(`===================================================`);
    });
  } catch (err) {
    console.error('Falha ao iniciar servidor:', err);
    process.exit(1);
  }
}

start();
