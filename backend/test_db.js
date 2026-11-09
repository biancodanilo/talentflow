const mysql = require('mysql2/promise');

async function test() {
  const hosts = ['100.121.197.37', 'localhost', '127.0.0.1'];
  for (const host of hosts) {
    try {
      console.log(`Testando conexao no host: ${host}...`);
      const conn = await mysql.createConnection({
        host,
        port: 3306,
        user: 'root',
        password: '123456',
        connectTimeout: 5000
      });
      console.log(`Conectado com sucesso em ${host}!`);
      const [dbs] = await conn.query('SHOW DATABASES;');
      console.log('Databases encontradas:', dbs.map(d => Object.values(d)[0]));
      
      // Checar se banco_de_testes ou similar existe
      const dbNames = dbs.map(d => Object.values(d)[0]);
      let targetDb = dbNames.find(n => n.includes('banco') || n.includes('teste') || n.includes('talent'));
      if (!targetDb) {
        targetDb = 'talentflow_db';
        await conn.query(`CREATE DATABASE IF NOT EXISTS \`${targetDb}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
        console.log(`Banco ${targetDb} criado!`);
      }
      console.log(`Usando banco: ${targetDb}`);
      await conn.changeUser({ database: targetDb });
      const [tables] = await conn.query('SHOW TABLES;');
      console.log('Tabelas encontradas:', tables.map(t => Object.values(t)[0]));
      
      await conn.end();
      return;
    } catch (err) {
      console.log(`Falha em ${host}:`, err.message);
    }
  }
}

test();
