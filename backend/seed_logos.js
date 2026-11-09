const { pool } = require('./config/db');

// Logos em formato SVG vetorizado com gradientes modernos, convertidos em Base64 Data URI
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
      <!-- Logistics Box Icon -->
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
      <!-- Fleet Truck Icon -->
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
      <!-- Shopping Cart / Retail Icon -->
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
      <!-- Industrial Footwear / Craft Diamond -->
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
      <!-- Fast Forward Arrow / Bus -->
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
      <!-- Grid Warehouse -->
      <rect x="34" y="34" width="22" height="22" rx="4" fill="url(#g6)"/>
      <rect x="64" y="34" width="22" height="22" rx="4" fill="url(#g6)"/>
      <rect x="34" y="64" width="22" height="22" rx="4" fill="url(#g6)"/>
      <rect x="64" y="64" width="22" height="22" rx="4" fill="#7dd3fc"/>
    </svg>
  `)
};

async function updateLogos() {
  try {
    console.log('[MariaDB] Atualizando logos individuais das empresas no banco de dados...');

    // 1. Atualizar Mercado Sul
    await pool.query('UPDATE companies SET logo = ? WHERE name LIKE ? OR id = ?', [
      logos.mercadoSul, '%Mercado Sul%', 'COMP-001'
    ]);
    await pool.query('UPDATE jobs SET company_logo = ? WHERE company LIKE ?', [
      logos.mercadoSul, '%Mercado Sul%'
    ]);

    // 2. Atualizar TransLog Paulista
    await pool.query('UPDATE companies SET logo = ? WHERE name LIKE ? OR id = ?', [
      logos.translog, '%TransLog%', 'COMP-002'
    ]);
    await pool.query('UPDATE jobs SET company_logo = ? WHERE company LIKE ?', [
      logos.translog, '%TransLog%'
    ]);

    // 3. Atualizar Rede Central Varejo
    await pool.query('UPDATE companies SET logo = ? WHERE name LIKE ? OR id = ?', [
      logos.redeCentral, '%Rede Central%', 'COMP-003'
    ]);
    await pool.query('UPDATE jobs SET company_logo = ? WHERE company LIKE ?', [
      logos.redeCentral, '%Rede Central%'
    ]);

    // 4. Inserir ou atualizar Calçados & Couros Jaú
    await pool.query(`
      INSERT INTO companies (id, name, cnpj, legal_name, city, sector, contact_name, contact_email, phone, active_jobs, status, logo)
      VALUES ('COMP-004', 'Calçados & Couros Jaú S.A.', '33.444.555/0001-22', 'Calçados & Couros Jaú Industrial S.A.', 'Jaú - SP', 'Indústria & Calçados', 'Henrique Bastos', 'dp@calcadosjau.com.br', '(14) 3624-7100', 1, 'Ativa', ?)
      ON DUPLICATE KEY UPDATE logo = VALUES(logo), active_jobs = VALUES(active_jobs);
    `, [logos.calcadosJau]);
    await pool.query('UPDATE jobs SET company_logo = ? WHERE company LIKE ?', [
      logos.calcadosJau, '%Calçados%'
    ]);

    // 5. Inserir ou atualizar Expresso Regional Jaú
    await pool.query(`
      INSERT INTO companies (id, name, cnpj, legal_name, city, sector, contact_name, contact_email, phone, active_jobs, status, logo)
      VALUES ('COMP-005', 'Expresso Regional Jaú', '55.666.777/0001-88', 'Expresso Regional Jaú Transportes Ltda', 'Jaú - SP', 'Transporte de Cargas & Fretamento', 'Carlos Eduardo', 'operacao@expressoregional.com.br', '(14) 3626-9000', 1, 'Ativa', ?)
      ON DUPLICATE KEY UPDATE logo = VALUES(logo), active_jobs = VALUES(active_jobs);
    `, [logos.expressoRegional]);
    await pool.query('UPDATE jobs SET company_logo = ? WHERE company LIKE ?', [
      logos.expressoRegional, '%Expresso Regional%'
    ]);

    // 6. Inserir ou atualizar CD Central Paulista
    await pool.query(`
      INSERT INTO companies (id, name, cnpj, legal_name, city, sector, contact_name, contact_email, phone, active_jobs, status, logo)
      VALUES ('COMP-006', 'CD Central Paulista', '77.888.999/0001-33', 'Centro de Distribuição Central Paulista S.A.', 'Jaú - SP', 'Logística & Armazenamento', 'Vanessa Lima', 'rh@cdcentral.com.br', '(14) 3622-1144', 1, 'Ativa', ?)
      ON DUPLICATE KEY UPDATE logo = VALUES(logo), active_jobs = VALUES(active_jobs);
    `, [logos.cdCentral]);
    await pool.query('UPDATE jobs SET company_logo = ? WHERE company LIKE ?', [
      logos.cdCentral, '%CD Central%'
    ]);

    // Verificar dados salvos no banco
    const [companies] = await pool.query('SELECT id, name, city, sector, LENGTH(logo) as logo_bytes FROM companies');
    console.log('✅ Empresas atualizadas com imagens salvas no MariaDB:');
    console.table(companies);

    const [jobs] = await pool.query('SELECT id, title, company, LENGTH(company_logo) as logo_bytes FROM jobs');
    console.log('✅ Vagas atualizadas com imagens salvas no MariaDB:');
    console.table(jobs);

    await pool.end();
  } catch (err) {
    console.error('Erro ao atualizar logos:', err);
    process.exit(1);
  }
}

updateLogos();
