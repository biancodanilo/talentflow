const { pool, dbName } = require('./config/db');

function createSvgDataUri(svgContent) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;
}

const logos = {
  mercadoSul: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#047857"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="#064e3b"/>
      <rect x="8" y="8" width="104" height="104" rx="22" fill="#0f172a" stroke="#10b981" stroke-width="2" stroke-opacity="0.4"/>
      <path d="M60 28 L92 44 L60 60 L28 44 Z" fill="url(#g1)"/>
      <path d="M28 48 L60 64 L60 92 L28 76 Z" fill="#059669"/>
      <path d="M60 64 L92 48 L92 76 L60 92 Z" fill="#34d399"/>
      <circle cx="60" cy="44" r="5" fill="#ecfdf5"/>
    </svg>
  `),
  translog: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
      <defs>
        <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4"/>
          <stop offset="100%" stop-color="#2563eb"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="#1e3a8a"/>
      <rect x="8" y="8" width="104" height="104" rx="22" fill="#0f172a" stroke="#3b82f6" stroke-width="2" stroke-opacity="0.4"/>
      <path d="M30 46 H68 V76 H30 Z" fill="url(#g2)"/>
      <path d="M68 54 H82 L90 64 V76 H68 Z" fill="#38bdf8"/>
      <circle cx="44" cy="78" r="8" fill="#0f172a" stroke="#60a5fa" stroke-width="4"/>
      <circle cx="78" cy="78" r="8" fill="#0f172a" stroke="#60a5fa" stroke-width="4"/>
      <path d="M36 56 H54" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `),
  redeCentral: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
      <defs>
        <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#ea580c"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="#7c2d12"/>
      <rect x="8" y="8" width="104" height="104" rx="22" fill="#0f172a" stroke="#f97316" stroke-width="2" stroke-opacity="0.4"/>
      <path d="M32 38 H42 L52 70 H78 L86 46 H46" fill="none" stroke="url(#g3)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="54" cy="82" r="6" fill="#fb923c"/>
      <circle cx="76" cy="82" r="6" fill="#fb923c"/>
      <path d="M58 52 H74" stroke="#fef08a" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `),
  calcadosJau: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
      <defs>
        <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ec4899"/>
          <stop offset="100%" stop-color="#8b5cf6"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="#581c87"/>
      <rect x="8" y="8" width="104" height="104" rx="22" fill="#0f172a" stroke="#a855f7" stroke-width="2" stroke-opacity="0.4"/>
      <polygon points="60,26 88,60 60,94 32,60" fill="url(#g4)"/>
      <polygon points="60,38 78,60 60,82 42,60" fill="#0f172a"/>
      <circle cx="60" cy="60" r="7" fill="#f472b6"/>
    </svg>
  `),
  expressoRegional: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
      <defs>
        <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1"/>
          <stop offset="100%" stop-color="#4338ca"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="#312e81"/>
      <rect x="8" y="8" width="104" height="104" rx="22" fill="#0f172a" stroke="#818cf8" stroke-width="2" stroke-opacity="0.4"/>
      <path d="M34 40 L64 60 L34 80 Z" fill="url(#g5)"/>
      <path d="M56 40 L86 60 L56 80 Z" fill="#818cf8"/>
    </svg>
  `),
  cdCentral: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
      <defs>
        <linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0ea5e9"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="#0c4a6e"/>
      <rect x="8" y="8" width="104" height="104" rx="22" fill="#0f172a" stroke="#38bdf8" stroke-width="2" stroke-opacity="0.4"/>
      <rect x="34" y="34" width="22" height="22" rx="4" fill="url(#g6)"/>
      <rect x="64" y="34" width="22" height="22" rx="4" fill="url(#g6)"/>
      <rect x="34" y="64" width="22" height="22" rx="4" fill="url(#g6)"/>
      <rect x="64" y="64" width="22" height="22" rx="4" fill="#7dd3fc"/>
    </svg>
  `)
};

async function rebuildDatabase() {
  try {
    console.log(`[MariaDB] Recriando todo o banco ${dbName} com ID BIGINT AUTO_INCREMENT...`);

    // 1. Desabilitar checagem de FK temporariamente para recriação limpa
    await pool.query('SET FOREIGN_KEY_CHECKS = 0;');

    // Drop tables
    const tables = [
      'ged_signatures', 'onboarding_feedbacks', 'applications',
      'candidates', 'jobs', 'recruiters', 'companies', 'ged_documents', 'users'
    ];
    for (const t of tables) {
      await pool.query(`DROP TABLE IF EXISTS \`${t}\`;`);
    }

    console.log('[MariaDB] Tabelas antigas removidas. Criando novas tabelas com BIGINT AUTO_INCREMENT...');

    // 1. Tabela COMPANIES
    await pool.query(`
      CREATE TABLE companies (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) UNIQUE,
        name VARCHAR(255) NOT NULL,
        cnpj VARCHAR(50) NOT NULL,
        legal_name VARCHAR(255),
        city VARCHAR(100),
        sector VARCHAR(100),
        contact_name VARCHAR(150),
        contact_email VARCHAR(150),
        phone VARCHAR(50),
        active_jobs INT DEFAULT 0,
        status VARCHAR(50) DEFAULT 'Ativa',
        logo LONGTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Tabela RECRUITERS
    await pool.query(`
      CREATE TABLE recruiters (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) UNIQUE,
        company_id BIGINT,
        company_name VARCHAR(255),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(150) NOT NULL,
        role VARCHAR(100) DEFAULT 'Recrutador',
        phone VARCHAR(50),
        status VARCHAR(50) DEFAULT 'Ativo',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_rec_company (company_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Tabela JOBS
    await pool.query(`
      CREATE TABLE jobs (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) UNIQUE,
        company_id BIGINT,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        department VARCHAR(255),
        location VARCHAR(255) NOT NULL,
        shift VARCHAR(100),
        openings INT DEFAULT 1,
        candidates_count INT DEFAULT 0,
        shortlisted_count INT DEFAULT 0,
        hired_count INT DEFAULT 0,
        salary VARCHAR(100),
        status VARCHAR(50) DEFAULT 'Ativa',
        priority VARCHAR(50) DEFAULT 'Média',
        required_skills TEXT,
        deadline VARCHAR(50),
        match_score INT DEFAULT 85,
        whatsapp_number VARCHAR(50) DEFAULT '5514998765432',
        company_logo LONGTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_job_company (company_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Tabela CANDIDATES
    await pool.query(`
      CREATE TABLE candidates (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) UNIQUE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        age INT,
        location VARCHAR(255),
        transport_time VARCHAR(100),
        shift_preference VARCHAR(100),
        overall_match INT DEFAULT 85,
        applied_job VARCHAR(255),
        status VARCHAR(100) DEFAULT 'Triagem',
        whatsapp_status VARCHAR(255),
        skills TEXT,
        ai_rationale TEXT,
        human_review_status VARCHAR(255) DEFAULT 'Validado por Recrutador (LGPD Art. 20)',
        onboarding_day VARCHAR(50) DEFAULT 'Pré-Admissão',
        retention_risk VARCHAR(100) DEFAULT 'Baixo Risco',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Tabela APPLICATIONS
    await pool.query(`
      CREATE TABLE applications (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        job_id BIGINT,
        job_code VARCHAR(50),
        candidate_id BIGINT,
        candidate_code VARCHAR(50),
        candidate_name VARCHAR(255) NOT NULL,
        candidate_email VARCHAR(255),
        candidate_phone VARCHAR(50),
        role VARCHAR(255) NOT NULL,
        stage VARCHAR(100) DEFAULT 'Triagem',
        match_score INT DEFAULT 85,
        whatsapp_contacted TINYINT(1) DEFAULT 0,
        notes TEXT,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_app_job (job_id),
        INDEX idx_app_candidate (candidate_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 6. Tabela ONBOARDING_FEEDBACKS
    await pool.query(`
      CREATE TABLE onboarding_feedbacks (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        candidate_id BIGINT,
        candidate_name VARCHAR(255) NOT NULL,
        day VARCHAR(50) DEFAULT 'Dia 7',
        category VARCHAR(100) DEFAULT 'Integração',
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'Recebido',
        source VARCHAR(50) DEFAULT 'App Mobile',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_feed_candidate (candidate_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 7. Tabela GED_DOCUMENTS
    await pool.query(`
      CREATE TABLE ged_documents (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) UNIQUE,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(150) NOT NULL,
        company VARCHAR(255) NOT NULL,
        unit VARCHAR(255),
        version VARCHAR(50) DEFAULT 'v1.0',
        launched_by VARCHAR(255),
        launched_by_role VARCHAR(150),
        launched_at VARCHAR(100),
        workflow_status VARCHAR(100) DEFAULT 'Vigente / Em Coleta',
        progress_percent INT DEFAULT 100,
        accepted_count INT DEFAULT 0,
        total_targets INT DEFAULT 0,
        mandatory TINYINT(1) DEFAULT 1,
        user_accepted TINYINT(1) DEFAULT 0,
        summary TEXT,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 8. Tabela GED_SIGNATURES
    await pool.query(`
      CREATE TABLE ged_signatures (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        document_id BIGINT,
        document_code VARCHAR(50),
        signer_name VARCHAR(255) NOT NULL,
        signer_role VARCHAR(100) DEFAULT 'Candidato',
        signer_identifier VARCHAR(100),
        status VARCHAR(50) DEFAULT 'Aceito',
        signed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_sig_doc (document_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 9. Tabela USERS
    await pool.query(`
      CREATE TABLE users (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'candidate',
        phone VARCHAR(50),
        company VARCHAR(255),
        reset_token VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await pool.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log('[MariaDB] Todas as 9 tabelas criadas com BIGINT AUTO_INCREMENT!');

    // ==========================================
    // POPULAR DADOS INICIAIS
    // ==========================================
    console.log('[MariaDB] Populando dados iniciais relacionais...');

    // 1. Empresas com logos
    const companyRows = [
      ['COMP-001', 'Mercado Sul Distribuidora', '12.345.678/0001-90', 'Mercado Sul Distribuidora S.A.', 'Jaú - SP', 'Logística & Distribuição', 'Mariana Albuquerque', 'rh@mercadosul.com.br', '(14) 3622-4500', 4, 'Ativa', logos.mercadoSul],
      ['COMP-002', 'TransLog Paulista', '98.765.432/0001-11', 'TransLog Paulista Logística Integrada Ltda', 'Barra Bonita - SP', 'Transporte & Cargas Pesadas', 'Rafael Mendes', 'contato@translog.com.br', '(14) 3641-8900', 2, 'Ativa', logos.translog],
      ['COMP-003', 'Rede Central Varejo', '45.123.890/0002-44', 'Rede Central de Supermercados Jaú Ltda', 'Bariri - SP', 'Supermercados & Varejo Alimentício', 'Camila Rocha', 'selecao@redecentral.com.br', '(14) 3662-1200', 3, 'Ativa', logos.redeCentral],
      ['COMP-004', 'Calçados & Couros Jaú S.A.', '33.444.555/0001-22', 'Calçados & Couros Jaú Industrial S.A.', 'Jaú - SP', 'Indústria & Calçados', 'Henrique Bastos', 'dp@calcadosjau.com.br', '(14) 3624-7100', 1, 'Ativa', logos.calcadosJau],
      ['COMP-005', 'Expresso Regional Jaú', '55.666.777/0001-88', 'Expresso Regional Jaú Transportes Ltda', 'Jaú - SP', 'Transporte de Cargas & Fretamento', 'Carlos Eduardo', 'operacao@expressoregional.com.br', '(14) 3626-9000', 1, 'Ativa', logos.expressoRegional],
      ['COMP-006', 'CD Central Paulista', '77.888.999/0001-33', 'Centro de Distribuição Central Paulista S.A.', 'Jaú - SP', 'Logística & Armazenamento', 'Vanessa Lima', 'rh@cdcentral.com.br', '(14) 3622-1144', 1, 'Ativa', logos.cdCentral]
    ];

    for (const c of companyRows) {
      await pool.query(
        `INSERT INTO companies (code, name, cnpj, legal_name, city, sector, contact_name, contact_email, phone, active_jobs, status, logo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        c
      );
    }

    // 2. Recrutadores
    await pool.query(`
      INSERT INTO recruiters (code, company_id, company_name, name, email, role, phone, status)
      VALUES 
        ('REC-001', 1, 'Mercado Sul Distribuidora', 'Camila Rocha Neves', 'camila.rh@talentflow.com', 'Analista de Atração e Seleção Sênior', '(14) 99123-4567', 'Ativo'),
        ('REC-002', 2, 'TransLog Paulista', 'Rafael Mendes', 'rafael.mendes@talentflow.com', 'Business Partner Logística Regional', '(14) 99234-5678', 'Ativo');
    `);

    // 3. Vagas com logos
    const jobRows = [
      ['JOB-101', 1, 'Operador de Logística & Separação', 'Mercado Sul Distribuidora', 'Centro de Distribuição Jaú', 'Jaú - SP', '12x36 Noturno (19h às 07h)', 25, 142, 38, 18, 'R$ 2.150,00 + Adic. Noturno', 'Ativa', 'Alta', JSON.stringify(["Separação por WMS", "Disponibilidade 12x36", "Residir em Jaú ou região"]), '2026-10-25', 96, '5514987412234', logos.mercadoSul],
      ['JOB-102', 2, 'Operador de Empilhadeira Retrátil', 'TransLog Paulista', 'Polo Logístico Barra Bonita', 'Barra Bonita - SP', '6x1 Tarde (14h às 22h20)', 8, 54, 16, 6, 'R$ 3.100,00 + Benefícios', 'Ativa', 'Urgente', JSON.stringify(["CNH B válida", "Curso NR-11 atualizado", "Experiência prática"]), '2026-10-18', 92, '5514974125589', logos.translog],
      ['JOB-103', 3, 'Auxiliar de Operações & Caixa', 'Rede Central Varejo', 'Loja 14 - Bariri Centro', 'Bariri - SP', '6x1 Escala Revezamento', 15, 98, 32, 12, 'R$ 1.840,00 + Quebra de Caixa', 'Ativa', 'Média', JSON.stringify(["Atendimento cordial", "Fechamento de caixa", "Fácil acesso Bariri Centro"]), '2026-11-05', 85, '5514981112233', logos.redeCentral],
      ['JOB-104', 4, 'Auxiliar de Produção Industrial', 'Calçados & Couros Jaú S.A.', 'Polo Calçadista Jaú', 'Jaú - SP', '5x2 Segunda a Sexta (07h às 16h48)', 12, 86, 22, 10, 'R$ 2.050,00 + Fretado', 'Ativa', 'Baixa', JSON.stringify(["Atenção normas segurança", "Montagem manual", "Pontualidade"]), '2026-10-12', 78, '5514992223344', logos.calcadosJau],
      ['JOB-105', 5, 'Conferente de Carga e Descarga', 'Expresso Regional Jaú', 'Terminal Rodoviário Jaú', 'Jaú - SP', 'Escala 6x1 Diurno', 5, 34, 12, 4, 'R$ 2.400,00 + Vale Alimentação', 'Ativa', 'Média', JSON.stringify(["Conferência de notas", "Leitor de código de barras", "Organização de paletes"]), '2026-11-15', 68, '5514995556677', logos.expressoRegional],
      ['JOB-106', 6, 'Ajudante Geral Noturno', 'CD Central Paulista', 'Distrito Industrial Jaú', 'Jaú - SP', '12x36 Noturno', 10, 42, 8, 2, 'R$ 1.980,00 + Adic. Noturno', 'Ativa', 'Alta', JSON.stringify(["Disposição física", "Disponibilidade noturna", "Trabalho em equipe"]), '2026-11-20', 45, '5514998889900', logos.cdCentral]
    ];

    for (const j of jobRows) {
      await pool.query(
        `INSERT INTO jobs (code, company_id, title, company, department, location, shift, openings, candidates_count, shortlisted_count, hired_count, salary, status, priority, required_skills, deadline, match_score, whatsapp_number, company_logo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        j
      );
    }

    // 4. Candidatos
    const candRows = [
      ['CAND-001', 'Rodrigo Almeida Santos', 'rodrigo.santos@email.com', '(14) 98741-2234', 26, 'Jaú - Vila Maria (4.5 km)', '18 min de circular', '12x36 Noturno', 96, 'Operador de Logística & Separação', 'Aprovado p/ Onboarding', 'Triagem Concluída em 3min', JSON.stringify(["Coletor WMS", "Agilidade", "Residência próxima"]), 'Candidato reside a 4.5 km, rota circular direta.', 'Validado por Recrutador (LGPD Art. 20)', 'Dia 8', 'Baixo Risco (98% seguro)'],
      ['CAND-002', 'Juliana Ferreira Lima', 'juliana.lima@email.com', '(14) 97412-5589', 31, 'Barra Bonita - Habitação (3.2 km)', '15 min de bicicleta', '6x1 Tarde', 94, 'Operador de Empilhadeira Retrátil', 'Entrevista Agendada', 'Documento NR-11 Validado', JSON.stringify(["NR-11 Vigente", "CNH B", "Experiência 3 anos"]), 'Mora a 3.2 km do entreposto. Certificado NR-11 validado.', 'Pendente Revisão Humana', 'Pré-Admissão', 'Baixo Risco (95% seguro)'],
      ['CAND-003', 'Cleiton Barbosa da Silva', 'cleiton.silva@email.com', '(14) 99654-1122', 22, 'Bariri - Jardim Esperança (2.8 km)', '12 min a pé', '6x1 Escala Revezamento', 91, 'Auxiliar de Operações & Caixa', 'Em Triagem WhatsApp', 'Conversa em andamento', JSON.stringify(["Atendimento cordial", "Fechamento de caixa", "Pontualidade"]), 'Residência a 2.8 km, facilidade de deslocamento.', 'Validado por Recrutador', 'Pré-Admissão', 'Baixo Risco (92% seguro)'],
      ['CAND-004', 'Marcos Vinicius Tavares', 'marcos.tavares@email.com', '(14) 98112-7744', 28, 'Dois Córregos (18 km de Jaú)', '55 min com 1 baldeação', '12x36 Noturno', 72, 'Operador de Logística & Separação', 'Alerta de Retenção', 'Deslocamento crítico', JSON.stringify(["Operador de Carga", "Experiência em CD"]), 'Distância elevada de Dois Córregos. Risco de turnover superior a 35%.', 'Revisão Recomendada', 'Pré-Admissão', 'Alto Risco (38% turnover)']
    ];

    for (const c of candRows) {
      await pool.query(
        `INSERT INTO candidates (code, name, email, phone, age, location, transport_time, shift_preference, overall_match, applied_job, status, whatsapp_status, skills, ai_rationale, human_review_status, onboarding_day, retention_risk)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        c
      );
    }

    // 5. Candidaturas (Applications)
    await pool.query(`
      INSERT INTO applications (job_id, job_code, candidate_id, candidate_code, candidate_name, candidate_email, candidate_phone, role, stage, match_score, whatsapp_contacted)
      VALUES 
        (1, 'JOB-101', 1, 'CAND-001', 'Rodrigo Almeida Santos', 'rodrigo.santos@email.com', '(14) 98741-2234', 'Operador de Logística & Separação', 'Aprovado', 96, 1),
        (2, 'JOB-102', 2, 'CAND-002', 'Juliana Ferreira Lima', 'juliana.lima@email.com', '(14) 97412-5589', 'Operador de Empilhadeira Retrátil', 'Entrevista Técnica', 94, 1),
        (3, 'JOB-103', 3, 'CAND-003', 'Cleiton Barbosa da Silva', 'cleiton.silva@email.com', '(14) 99654-1122', 'Auxiliar de Operações & Caixa', 'Triagem', 91, 1),
        (1, 'JOB-101', 4, 'CAND-004', 'Marcos Vinicius Tavares', 'marcos.tavares@email.com', '(14) 98112-7744', 'Operador de Logística & Separação', 'Triagem', 72, 0);
    `);

    // 6. Feedbacks de Onboarding (1-toque do App)
    await pool.query(`
      INSERT INTO onboarding_feedbacks (candidate_id, candidate_name, day, category, message, status, source)
      VALUES 
        (1, 'Rodrigo Almeida Santos', 'Dia 1', 'Equipamentos', 'Todos os EPIs recebidos e armário liberado.', 'Tratado', 'App Mobile'),
        (1, 'Rodrigo Almeida Santos', 'Dia 7', 'Integração', 'Primeira semana concluída com sucesso! Equipe muito acolhedora.', 'Lido', 'App Mobile'),
        (2, 'Juliana Ferreira Lima', 'Dia 1', 'Treinamento', 'Integração da empilhadeira e rota do armazém concluída.', 'Tratado', 'App Mobile');
    `);

    // 7. Documentos GED & Termos LGPD
    const gedRows = [
      ['GED-2026-001', 'Termo de Consentimento LGPD & Tratamento Logístico', 'Privacidade & LGPD (Art. 7º e 20)', 'Mercado Sul Distribuidora S.A.', 'CD Jaú - SP', 'v2.4', 'Mariana Albuquerque', 'DPO & Head Jurídico', '2026-10-01 09:00', 'Vigente / Em Coleta', 97, 138, 142, 1, 1, 'Autoriza o cálculo de compatibilidade geográfica entre o bairro/linha de ônibus do candidato e o polo operacional, garantindo direito à revisão humana.'],
      ['GED-2026-002', 'Termo de Responsabilidade, Entrega e Uso de EPIs', 'Segurança do Trabalho (NR-06)', 'TransLog Paulista Logística Integrada', 'Polo Barra Bonita - SP', 'v1.8', 'Rafael Mendes', 'Diretor de Gente & Gestão', '2026-10-03 11:30', 'Vigente / Em Coleta', 100, 54, 54, 1, 1, 'Comprova o recebimento e treinamento de uso de calçado de segurança, colete refletivo, protetor auricular e luvas no Dia 1 do Onboarding.'],
      ['GED-2026-003', 'Termo de Adesão à Escala 12x36 & Política de Uso de Celular no Turno', 'Contrato Operacional & Conduta', 'Mercado Sul Distribuidora S.A.', 'CD Jaú - SP', 'v3.0', 'Camila Rocha Neves', 'Analista de Atração e Seleção (RH)', '2026-10-10 08:15', 'Em Assinatura Digital', 83, 20, 24, 1, 0, 'Estabelece diretrizes da escala 12x36 noturna e o uso de feedbacks pré-programados de 1 toque no App TalentFlow para evitar distração no turno.'],
      ['GED-2026-004', 'Aditivo de Fretado & Auxílio Deslocamento Regional', 'Benefícios & Mobilidade', 'Calçados & Couros Jaú S.A.', 'Polo Calçadista Jaú / Bariri', 'v1.2', 'Henrique Bastos', 'Gestor de DP', '2026-10-15 14:00', 'Em Revisão Jurídica', 45, 9, 20, 0, 0, 'Regulamenta os pontos de embarque e horários das linhas fretadas gratuitas entre Jaú, Barra Bonita e Bariri.']
    ];

    for (const g of gedRows) {
      await pool.query(
        `INSERT INTO ged_documents (code, title, category, company, unit, version, launched_by, launched_by_role, launched_at, workflow_status, progress_percent, accepted_count, total_targets, mandatory, user_accepted, summary)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        g
      );
    }

    // 8. Assinaturas
    await pool.query(`
      INSERT INTO ged_signatures (document_id, document_code, signer_name, signer_role, signer_identifier, status)
      VALUES 
        (1, 'GED-2026-001', 'Rodrigo Almeida Santos', 'Candidato', 'App Mobile v1.0', 'Aceito'),
        (2, 'GED-2026-002', 'Juliana Ferreira Lima', 'Candidata', 'App Mobile v1.0', 'Aceito');
    `);

    // 9. Os 3 Usuários do Sistema (Nível Máximo, Administrador, Usuário)
    await pool.query(`
      INSERT INTO users (name, email, password_hash, role, phone, company)
      VALUES 
        ('Diretor Master / Nível Máximo', 'superadmin@talentflow.com', '123456', 'superadmin', '(14) 99999-0001', 'TalentFlow Matriz Global'),
        ('Gestor Administrador de RH', 'admin@talentflow.com', '123456', 'admin', '(14) 99999-0002', 'Mercado Sul Distribuidora'),
        ('Rodrigo Almeida (Usuário Comum)', 'usuario@talentflow.com', '123456', 'user', '(14) 98741-2234', 'Operações e Logística');
    `);

    console.log('===================================================');
    console.log('✅ BANCO MARIADB RECRIADO COM SUCESSO!');
    console.log('   Chaves primárias: BIGINT AUTO_INCREMENT');
    console.log('   Todas as 9 tabelas estruturadas e populadas.');
    console.log('===================================================');

    // Validação
    for (const t of tables) {
      const [col] = await pool.query(`SHOW COLUMNS FROM \`${t}\` WHERE Field = 'id';`);
      const [cnt] = await pool.query(`SELECT COUNT(*) as count FROM \`${t}\`;`);
      console.log(`Tabela: ${t.padEnd(22)} | ID: ${col[0].Type.padEnd(20)} | Extra: ${col[0].Extra.padEnd(16)} | Linhas: ${cnt[0].count}`);
    }

    await pool.end();
  } catch (err) {
    console.error('Erro na recriação do banco:', err);
    process.exit(1);
  }
}

rebuildDatabase();
