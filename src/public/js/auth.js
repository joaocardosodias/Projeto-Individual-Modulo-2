document.addEventListener('DOMContentLoaded', () => {
    const loginFormContainer = document.getElementById('login-form-container');
    const registerFormContainer = document.getElementById('register-form-container');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');

    // Alternar para o formulário de cadastro
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormContainer.style.display = 'none';
        registerFormContainer.style.display = 'block';
    });

    // Alternar para o formulário de login
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
    });

    // Submissão do formulário de login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const senha = document.getElementById('loginPassword').value;
        
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            const data = await res.json();
            
            if (!res.ok) {
                loginMessage.textContent = data.message;
                loginMessage.className = 'message error';
            } else {
                loginMessage.textContent = 'Login bem-sucedido! Redirecionando...';
                loginMessage.className = 'message success';
                localStorage.setItem('token', data.token); // Salva o token
                setTimeout(() => window.location.href = '/dashboard', 1500);
            }
        } catch (err) {
            loginMessage.textContent = 'Erro de conexão com o servidor.';
            loginMessage.className = 'message error';
        }
    });

    // Submissão do formulário de cadastro
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('registerNome').value;
        const email = document.getElementById('registerEmail').value;
        const senha = document.getElementById('registerPassword').value;

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha })
            });
            const data = await res.json();

            if (!res.ok) {
                registerMessage.textContent = data.message;
                registerMessage.className = 'message error';
            } else {
                registerMessage.textContent = 'Cadastro realizado com sucesso! Você pode fazer login agora.';
                registerMessage.className = 'message success';
                setTimeout(() => {
                    // Limpa o formulário e volta para a tela de login
                    registerForm.reset();
                    showLoginLink.click();
                    registerMessage.textContent = '';
                }, 2000);
            }
        } catch (err) {
            registerMessage.textContent = 'Erro de conexão com o servidor.';
            registerMessage.className = 'message error';
        }
    });
});