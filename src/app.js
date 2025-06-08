const express = require('express');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Servir as páginas HTML
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'auth.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dashboard.html')));
app.get('/new-reservation', (req, res) => res.sendFile(path.join(__dirname, 'views', 'new-reservation.html')));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));