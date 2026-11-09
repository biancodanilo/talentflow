const { pool } = require('../config/db');

async function initDatabase() {
  try {
    console.log('[DB] Verificando schema BIGINT AUTO_INCREMENT no MariaDB...');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS companies (
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

    await pool.query(`
      CREATE TABLE IF NOT EXISTS recruiters (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) UNIQUE,
        company_id BIGINT,
        company_name VARCHAR(255),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(150) NOT NULL,
        role VARCHAR(100) DEFAULT 'Recrutador',
        phone VARCHAR(50),
        status VARCHAR(50) DEFAULT 'Ativo',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS jobs (
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
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS candidates (
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

    await pool.query(`
      CREATE TABLE IF NOT EXISTS applications (
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
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS onboarding_feedbacks (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        candidate_id BIGINT,
        candidate_name VARCHAR(255) NOT NULL,
        day VARCHAR(50) DEFAULT 'Dia 7',
        category VARCHAR(100) DEFAULT 'Integração',
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'Recebido',
        source VARCHAR(50) DEFAULT 'App Mobile',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS ged_documents (
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

    await pool.query(`
      CREATE TABLE IF NOT EXISTS ged_signatures (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        document_id BIGINT,
        document_code VARCHAR(50),
        signer_name VARCHAR(255) NOT NULL,
        signer_role VARCHAR(100) DEFAULT 'Candidato',
        signer_identifier VARCHAR(100),
        status VARCHAR(50) DEFAULT 'Aceito',
        signed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
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

    console.log('[DB] Schema verificado com sucesso.');
  } catch (err) {
    console.error('[DB] Erro no schema:', err);
  }
}

module.exports = { initDatabase };
