document.getElementById('adocaoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;
  
    const response = await fetch('/inserir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Nome: nome, Email: email, Telefone: telefone, Mensagem: mensagem })
    });
  
    if (response.ok) {
      alert('Dados inseridos com sucesso!');
      fetchData();
    } else {
      alert('Erro ao inserir dados.');
    }
  });
  
  async function fetchData() {
    const response = await fetch('/dados');
    const data = await response.json();
  
    const dadosDiv = document.getElementById('dados');
    dadosDiv.innerHTML = '';
    data.forEach(row => {
      const div = document.createElement('div');
      div.textContent = Nome: ${row.Nome}, Email: ${row.Email}, Telefone: ${row.Telefone}, Mensagem: ${row.Mensagem};
      dadosDiv.appendChild(div);
    });
  }
  
  fetchData();
  