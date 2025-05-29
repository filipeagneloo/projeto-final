document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form-contato');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const nome_completo = document.getElementById('nome_completo').value;
      const email = document.getElementById('email').value;
      const celular = document.getElementById('celular').value;
      const opcao_escolhida = document.querySelector('input[name="opcao_escolhida"]:checked')?.value || '';

      const dados = { nome_completo, email, celular, opcao_escolhida };

      const resposta = await fetch('https://projeto-final-khaki-five.vercel.app/api/form', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(dados)
      });

      const resultado = await resposta.json();
      if (resultado.success) {
        alert('Cadastro realizado com sucesso!');
        form.reset();
      } else {
        alert('Erro ao cadastrar: ' + (resultado.error || 'Tente novamente.'));
      }
    });
  }
});