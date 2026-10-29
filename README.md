# Plataforma de doações

Protótipo de estudo para praticar rotas HTTP, persistência em SQLite e a modelagem de doadores, instituições, doações e alimentos.

O repositório contém uma **API com Node.js e Express** e uma interface em HTML, CSS e JavaScript. A integração dos formulários com a API ainda está pendente.

[Visualizar a interface publicada](https://site-doacao.vercel.app/)

## Tecnologias

- Node.js e Express 5.
- SQLite com o pacote `sqlite3`.
- `cors` para configuração de acesso entre origens.
- HTML, CSS e JavaScript no navegador.

## Executar a API localmente

Com Node.js e npm instalados, execute a partir da raiz:

```bash
git clone https://github.com/JoaoAlencar00/site_doacao.git
cd site_doacao
npm ci
node index.js
```

A API escuta em `http://localhost:3000`. Na inicialização, lê `schema.sql` e cria as tabelas ausentes em `database.db`.

O servidor não publica os arquivos HTML. Para consultar a interface, abra `index.html` separadamente no navegador.

## Rotas implementadas

| Método | Rota | Finalidade |
| --- | --- | --- |
| POST | `/contato` | Registrar mensagem/doação e localizar ou criar o doador por e-mail |
| GET | `/doacoes` | Listar doações |
| POST | `/cadastro` | Cadastrar doador |
| POST | `/login` | Consultar credenciais de doador |
| POST | `/instituicao/cadastro` | Cadastrar instituição |
| POST | `/instituicao/login` | Consultar credenciais de instituição |
| POST | `/doacao/alimento` | Cadastrar alimento e vinculá-lo a uma doação |
| GET | `/doacao/:id/alimentos` | Listar alimentos e quantidades de uma doação |

As rotas POST recebem JSON. Exemplo para `POST /contato`:

```json
{
  "nome": "Doador de exemplo",
  "email": "exemplo@example.com",
  "mensagem": "Doação de alimentos"
}
```

## Organização

- `index.js`: servidor, rotas e consultas ao banco.
- `schema.sql`: definição das tabelas.
- `index.html`, `style.css` e `javinha.js`: interface e eventos dos formulários.
- `database.db`: arquivo SQLite versionado no projeto.

## Estado atual e próximos passos

O projeto é um protótipo educacional. Os formulários exibem mensagens simuladas e ainda não chamam a API. O login apenas consulta credenciais, sem sessão ou token; as senhas são armazenadas em texto puro.

Antes de utilizar dados reais, é necessário aplicar hash de senhas, autenticação e autorização, validação de entrada e tratamento consistente de erros. Também faltam testes automatizados: o comando `npm test` ainda é o padrão gerado pelo npm.

O `package.json` declara a licença ISC.
