require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com o Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Rota para inserir dados
app.post('/inserir', async (req, res) => {
  console.log('Dados recebidos:', req.body); // Para debug
  
  try {
    const { nome_completo, email, celular, opcao_escolhida } = req.body;

    // Validação básica
    if (!nome_completo || !email || !celular || !opcao_escolhida) {
      return res.status(400).json({ success: false, error: 'Todos os campos são obrigatórios' });
    }

    // Inserção no banco
    const result = await pool.query(
      `INSERT INTO formulario 
       (nome_completo, email, celular, opcao_escolhida) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id`,
      [nome_completo, email, celular, opcao_escolhida]
    );

    console.log('Dados inseridos com sucesso:', result.rows[0]); // Para debug
    res.json({ 
      success: true,
      id: result.rows[0].id
    });

  } catch (err) {
    console.error('Erro no servidor:', err);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao salvar no banco de dados'
    });
  }
});

// Rota para obter dados (opcional)
app.get('/dados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM formulario');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

// Servir arquivos estáticos
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});