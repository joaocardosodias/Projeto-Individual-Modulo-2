// src/app.js
const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes'); // Suas rotas de API

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON e dados de formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta 'public' (para CSS, JS, imagens, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API de autenticação
app.use('/api/auth', authRoutes);

// ROTA PRINCIPAL: Servir a nova página de boas-vindas/index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rota para servir a página de login
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Rota para servir a página de cadastro
app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse a aplicação em http://localhost:${PORT}/`);
});
// src/app.js
// ... (outras importações e configurações)

// Rota para o dashboard de reservas
app.get('/dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// Rota para a página de nova reserva
app.get('/new_reservation.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new_reservation.html'));
});

// ... (app.listen e outras rotas)