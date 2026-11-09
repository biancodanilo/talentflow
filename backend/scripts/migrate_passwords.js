const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');

async function migrate() {
  try {
    const saltRounds = 10;
    const defaultHash = await bcrypt.hash('123456', saltRounds);
    console.log('[MIGRATE] Novo hash bcrypt gerado para senha padrão.');

    const [users] = await pool.query('SELECT id, email, password_hash FROM users');
    let updated = 0;

    for (const u of users) {
      // Se não começa com $2a$, $2b$ ou $2y$, é senha em texto claro!
      if (!u.password_hash.startsWith('$2')) {
        const userHash = await bcrypt.hash(u.password_hash || '123456', saltRounds);
        await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [userHash, u.id]);
        console.log(`[MIGRATE] Usuário ${u.email} (ID: ${u.id}) migrado para bcrypt com sucesso.`);
        updated++;
      } else {
        console.log(`[MIGRATE] Usuário ${u.email} (ID: ${u.id}) já utiliza hash bcrypt.`);
      }
    }

    console.log(`[MIGRATE] Total de usuários atualizados com bcrypt: ${updated}`);
    process.exit(0);
  } catch (err) {
    console.error('[MIGRATE] Erro na migração:', err);
    process.exit(1);
  }
}

migrate();
