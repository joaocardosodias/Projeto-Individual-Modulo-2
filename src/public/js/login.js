// src/public/js/login.js
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const messageElement = document.getElementById('message');

    messageElement.textContent = ''; // Limpa mensagens anteriores
    messageElement.className = '';   // Limpa classes de estilo

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            messageElement.textContent = `${data.message} Bem-vindo, ${data.nome}!`;
            messageElement.className = 'success';
            // Aqui você pode redirecionar o usuário ou atualizar a interface
            // Ex: window.location.href = '/dashboard';
            console.log('Login bem-sucedido:', data);
        } else {
            messageElement.textContent = data.message || 'Erro ao tentar fazer login.';
            messageElement.className = 'error';
            console.error('Falha no login:', data);
        }
    } catch (error) {
        console.error('Erro na requisição de login:', error);
        messageElement.textContent = 'Erro de conexão. Tente novamente.';
        messageElement.className = 'error';
    }
});