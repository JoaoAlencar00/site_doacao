CREATE TABLE IF NOT EXISTS doadores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  email TEXT,
  senha TEXT,
  cpf TEXT,
  crg TEXT
);

CREATE TABLE IF NOT EXISTS instituicoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  email TEXT,
  senha TEXT
);

CREATE TABLE IF NOT EXISTS doacao (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  doador_id INTEGER,
  instituicao_id INTEGER,
  mensagem TEXT,
  data TEXT,
  valor_total REAL
);

CREATE TABLE IF NOT EXISTS alimentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo TEXT,
  validade TEXT,
  fabricacao TEXT,
  disponivel BOOLEAN
);

CREATE TABLE IF NOT EXISTS listaAlimentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  doacao_id INTEGER,
  alimento_id INTEGER,
  quantidade INTEGER
);