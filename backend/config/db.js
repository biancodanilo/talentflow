const mysql = require('mysql2/promise');
require('dotenv').config();

// Configurações do MariaDB com base em CONEXAO_MARIADB.txt
// Suporta execução local (localhost / 127.0.0.1) ou via rede Tailscale (100.121.197.37)
const dbHost = process.env.DB_HOST || (process.env.COMPUTERNAME === 'DESKTOP-QLLV01J' || process.env.USERNAME === 'win 10' ? '127.0.0.1' : '100.121.197.37');
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '123456';
const dbPort = parseInt(process.env.DB_PORT || '3306', 10);
const dbName = process.env.DB_NAME || 'banco_de_testes';

console.log(`[DB] Configurando pool MariaDB em ${dbHost}:${dbPort} (banco: ${dbName})`);

const pool = mysql.createPool({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  port: dbPort,
  database: dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

module.exports = { pool, dbHost, dbUser, dbPassword, dbPort, dbName };
