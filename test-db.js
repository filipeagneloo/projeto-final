const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Conexão OK! Hora do banco:', res.rows[0].now);
  } catch (err) {
    console.error('❌ Erro na conexão:', err);
  } finally {
    await pool.end();
  }
}

testConnection();