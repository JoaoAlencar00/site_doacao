document.addEventListener("DOMContentLoaded", function () {
  // Formulário de Doação
  document.getElementById("form-doacao").addEventListener("submit", async function (e) {
      e.preventDefault();
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const mensagem = document.getElementById("mensagem").value;

      // Aqui você pode adicionar a lógica para enviar os dados via fetch ou outra abordagem
      console.log("Doação:", nome, email, mensagem);

      // Exemplo de resposta após enviar o formulário
      alert("Obrigado pela sua doação, " + nome + "!");
  });

  // Formulário de Cadastro
  document.getElementById("form-cadastro").addEventListener("submit", async function (e) {
      e.preventDefault();
      const nome = document.getElementById("cad-nome").value;
      const email = document.getElementById("cad-email").value;
      const senha = document.getElementById("cad-senha").value;

      // Lógica de cadastro (pode incluir validações adicionais)
      console.log("Cadastro:", nome, email, senha);

      // Exemplo de resposta após cadastro
      alert("Cadastro realizado com sucesso, " + nome + "!");
  });

  // Formulário de Login
  document.getElementById("form-login").addEventListener("submit", async function (e) {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const senha = document.getElementById("login-senha").value;

      // Lógica de login (validação do usuário)
      console.log("Login:", email, senha);

      // Exemplo de resposta após login
      alert("Bem-vindo de volta, " + email + "!");
  });

  // Formulário de Cadastro de Instituição
  document.getElementById("form-cadastro-instituicao").addEventListener("submit", async function (e) {
      e.preventDefault();
      const nomeInst = document.getElementById("inst-nome").value;
      const emailInst = document.getElementById("inst-email").value;
      const senhaInst = document.getElementById("inst-senha").value;

      // Lógica de cadastro de instituição
      console.log("Cadastro Instituição:", nomeInst, emailInst, senhaInst);

      // Exemplo de resposta após cadastro
      alert("Cadastro de instituição realizado com sucesso!");
  });

  // Formulário de Login de Instituição
  document.getElementById("form-login-instituicao").addEventListener("submit", async function (e) {
      e.preventDefault();
      const emailInst = document.getElementById("login-inst-email").value;
      const senhaInst = document.getElementById("login-inst-senha").value;

      // Lógica de login de instituição
      console.log("Login Instituição:", emailInst, senhaInst);

      // Exemplo de resposta após login de instituição
      alert("Login de instituição realizado com sucesso!");
  });

  // Formulário de Adicionar Alimento
  document.getElementById("form-alimento").addEventListener("submit", async function (e) {
      e.preventDefault();
      const doacaoId = document.getElementById("doacao-id").value;
      const tipoAlimento = document.getElementById("tipo-alimento").value;
      const validadeAlimento = document.getElementById("validade-alimento").value;
      const fabricacaoAlimento = document.getElementById("fabricacao-alimento").value;
      const quantidadeAlimento = document.getElementById("quantidade-alimento").value;

      // Lógica de adicionar alimento
      console.log("Adicionar Alimento:", doacaoId, tipoAlimento, validadeAlimento, fabricacaoAlimento, quantidadeAlimento);

      // Exemplo de resposta após adicionar alimento
      alert("Alimento adicionado à doação com sucesso!");
  });

  // Formulário de Ver Alimentos
  document.getElementById("form-ver-alimentos").addEventListener("submit", async function (e) {
      e.preventDefault();
      const doacaoId = document.getElementById("ver-doacao-id").value;

      // Lógica para mostrar os alimentos da doação
      console.log("Ver Alimentos na Doação ID:", doacaoId);

      // Exemplo de resposta (você pode dinamicamente preencher a lista de alimentos aqui)
      alert("Exibindo alimentos da doação ID: " + doacaoId);
  });
});
