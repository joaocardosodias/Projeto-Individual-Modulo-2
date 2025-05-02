const API_URL = 'http://localhost:3000/api';

async function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  const data = await res.json();
  const msg = document.getElementById('mensagem');
  msg.textContent = data.message;

  if (res.ok) {
    window.location.href = 'reservas.html'; // ou próxima página
  }
}

async function register() {
  const nome = prompt('Digite seu nome:');
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha }),
  });

  const data = await res.json();
  document.getElementById('mensagem').textContent = data.message;
}
