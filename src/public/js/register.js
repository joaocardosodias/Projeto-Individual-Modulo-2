// src/public/js/register.js
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const messageElement = document.getElementById('message');

    messageElement.textContent = '';
    messageElement.className = '';

    if (senha !== confirmarSenha) {
        messageElement.textContent = 'As senhas não coincidem!';
        messageElement.className = 'error';
        return;
    }

    if (senha.length < 6) { // Exemplo de validação simples de senha
        messageElement.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        messageElement.className = 'error';
        return;
    }

    try {
        const response = await fetch('/api/auth/register', { // Endpoint da API para registro
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            messageElement.textContent = data.message + ' Você será redirecionado para o login.';
            messageElement.className = 'success';
            // Redireciona para a página de login após alguns segundos
            setTimeout(() => {
                window.location.href = '/'; // Ou '/login.html' dependendo da sua rota de login
            }, 3000);
        } else {
            messageElement.textContent = data.message || 'Erro ao tentar cadastrar.';
            messageElement.className = 'error';
        }
    } catch (error) {
        console.error('Erro na requisição de cadastro:', error);
        messageElement.textContent = 'Erro de conexão ao tentar cadastrar. Tente novamente.';
        messageElement.className = 'error';
    }
});