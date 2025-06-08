const express = require('express');
const router = express.Router();
const { getPastReservations, createReservation, getRooms, getTimeBlocks } = require('../controllers/reservationController');
const { protect } = require('../middleware/authMiddleware');

// Rotas protegidas que precisam de autenticação
router.get('/past', protect, getPastReservations);
router.post('/', protect, createReservation);

// Rotas que podem ser públicas ou protegidas, dependendo da sua regra de negócio
// Aqui, vamos protegê-las também para garantir que só usuários logados vejam as opções
router.get('/rooms', protect, getRooms);
router.get('/time-blocks', protect, getTimeBlocks);

module.exports = router;