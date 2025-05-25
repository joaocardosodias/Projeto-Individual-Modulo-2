// src/app.js
const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON e dados de formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta 'public' (para CSS, JS, imagens, etc.)
// Isso garante que css/style.css e js/login.js sejam encontrados
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/api/auth', authRoutes);

// Rota principal para servir a página de login da pasta 'views'
// Quando alguém acessar a raiz do seu site (ex: http://localhost:3000/),
// o arquivo login.html da pasta views será enviado.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html')); // Caminho atualizado para 'views/login.html'
});

/*
// Opcional: Se você preferir que a URL seja /login em vez de /
// comente a rota app.get('/') acima e descomente esta:
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
*/

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    // Ajuste a URL de acordo com a rota que você escolheu para servir login.html
    console.log(`Acesse a tela de login em http://localhost:${PORT}/`); // Se estiver usando app.get('/')
    // console.log(`Acesse a tela de login em http://localhost:${PORT}/login`); // Se estiver usando app.get('/login')
});
// src/app.js
// ... (outras importações e configurações) ...

// Rota principal para servir a página de login da pasta 'views'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Adicione esta rota para servir a página de cadastro
app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// ... (rotas da API e app.listen) ...