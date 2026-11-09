const { pool } = require('./config/db');

async function seedUsers() {
  try {
    console.log('[MariaDB] Cadastrando os 3 perfis de usuários no banco...');
    
    // Limpar anteriores para evitar duplicidade
    await pool.query("DELETE FROM users WHERE email IN ('superadmin@talentflow.com', 'admin@talentflow.com', 'usuario@talentflow.com')");

    // Inserir os 3 níveis solicitados
    await pool.query(`
      INSERT INTO users (name, email, password_hash, role, phone, company)
      VALUES 
        ('Diretor Master / Nível Máximo', 'superadmin@talentflow.com', '123456', 'superadmin', '(14) 99999-0001', 'TalentFlow Matriz'),
        ('Gestor Administrador de RH', 'admin@talentflow.com', '123456', 'admin', '(14) 99999-0002', 'Mercado Sul Distribuidora'),
        ('Rodrigo Almeida (Usuário Comum)', 'usuario@talentflow.com', '123456', 'user', '(14) 98741-2234', 'Candidato / Operacional')
    `);

    const [rows] = await pool.query('SELECT id, name, email, password_hash as senha, role as nivel, company FROM users');
    console.log('✅ Usuários no banco MariaDB com sucesso:');
    console.table(rows);

    await pool.end();
  } catch (err) {
    console.error('Erro ao inserir usuários:', err);
    process.exit(1);
  }
}

seedUsers();
