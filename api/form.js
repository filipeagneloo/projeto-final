const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    // Para Vercel, o body pode vir como string
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const { nome_completo, email, celular, opcao_escolhida } = body;

    if (!nome_completo || !email || !celular || !opcao_escolhida) {
      return res.status(400).json({ success: false, error: 'Todos os campos são obrigatórios' });
    }

    try {
      const result = await pool.query(
        `INSERT INTO formulario 
         (nome_completo, email, celular, opcao_escolhida) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id`,
        [nome_completo, email, celular, opcao_escolhida]
      );
      res.status(200).json({ success: true, id: result.rows[0].id });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Erro ao salvar no banco de dados' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
};