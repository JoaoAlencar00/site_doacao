const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Banco de dados
const db = new sqlite3.Database('database.db');

// Criar tabelas
const schema = fs.readFileSync('./schema.sql', 'utf-8');
db.exec(schema);

// Rota para receber doações
app.post('/contato', (req, res) => {
  const { nome, email, mensagem } = req.body;

  // 1. Verifica se doador já existe
  db.get('SELECT id FROM doadores WHERE email = ?', [email], (err, row) => {
    if (err) return res.status(500).send("Erro no banco de dados.");

    if (row) {
      // Já existe, usa o ID
      inserirDoacao(row.id);
    } else {
      // Cria novo doador
      db.run('INSERT INTO doadores (nome, email) VALUES (?, ?)', [nome, email], function(err) {
        if (err) return res.status(500).send("Erro ao criar doador.");
        inserirDoacao(this.lastID);
      });
    }
  });

  function inserirDoacao(doadorId) {
    const agora = new Date().toISOString();
    db.run(
      'INSERT INTO doacao (doador_id, mensagem, data) VALUES (?, ?, ?)',
      [doadorId, mensagem, agora],
      (err) => {
        if (err) return res.status(500).send("Erro ao registrar doação.");
        res.status(200).send("Doação registrada com sucesso!");
      }
    );
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/doacoes', (req, res) => {
  db.all('SELECT * FROM Doacao', [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao buscar doações");
    } else {
      res.json(rows);
    }
  });
});

// Cadastrar doador
app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  db.get('SELECT * FROM doadores WHERE email = ?', [email], (err, row) => {
    if (row) {
      return res.status(400).send('Email já cadastrado');
    }

    db.run('INSERT INTO doadores (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (err) => {
      if (err) return res.status(500).send('Erro ao cadastrar');
      res.status(200).send('Cadastro realizado com sucesso!');
    });
  });
});

// Login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.get('SELECT * FROM doadores WHERE email = ? AND senha = ?', [email, senha], (err, row) => {
    if (err) return res.status(500).send('Erro no login');
    if (!row) return res.status(401).send('Credenciais inválidas');

    res.status(200).json({ mensagem: 'Login bem-sucedido', nome: row.nome });
  });
});

// Cadastro de instituição
app.post('/instituicao/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  db.get('SELECT * FROM instituicoes WHERE email = ?', [email], (err, row) => {
    if (row) {
      return res.status(400).send('Email já cadastrado');
    }

    db.run('INSERT INTO instituicoes (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (err) => {
      if (err) return res.status(500).send('Erro ao cadastrar');
      res.status(200).send('Instituição cadastrada com sucesso!');
    });
  });
});

// Login de instituição
app.post('/instituicao/login', (req, res) => {
  const { email, senha } = req.body;

  db.get('SELECT * FROM instituicoes WHERE email = ? AND senha = ?', [email, senha], (err, row) => {
    if (err) return res.status(500).send('Erro no login');
    if (!row) return res.status(401).send('Credenciais inválidas');

    res.status(200).json({ mensagem: 'Login bem-sucedido', nome: row.nome });
  });
});

app.post('/doacao/alimento', (req, res) => {
  const { doacao_id, tipo, validade, fabricacao, quantidade } = req.body;

  // 1. Cria alimento
  db.run(
    'INSERT INTO alimentos (tipo, validade, fabricacao, disponivel) VALUES (?, ?, ?, ?)',
    [tipo, validade, fabricacao, true],
    function(err) {
      if (err) return res.status(500).send("Erro ao inserir alimento");

      const alimento_id = this.lastID;

      // 2. Liga com a doação
      db.run(
        'INSERT INTO listaAlimentos (doacao_id, alimento_id, quantidade) VALUES (?, ?, ?)',
        [doacao_id, alimento_id, quantidade],
        (err) => {
          if (err) return res.status(500).send("Erro ao vincular alimento");
          res.status(200).send("Alimento adicionado à doação!");
        }
      );
    }
  );
});
app.get('/doacao/:id/alimentos', (req, res) => {
  const doacaoId = req.params.id;

  const query = `
    SELECT a.tipo, a.validade, a.fabricacao, la.quantidade
    FROM alimentos a
    INNER JOIN listaAlimentos la ON a.id = la.alimento_id
    WHERE la.doacao_id = ?
  `;

  db.all(query, [doacaoId], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao buscar alimentos");
    }
    res.json(rows);
  });
});