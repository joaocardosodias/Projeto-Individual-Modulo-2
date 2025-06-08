// src/routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const { getActiveReservations, getPastReservations, createReservation, cancelReservation, getRooms, getTimeBlocks, getRoomAvailability } = require('../controllers/reservationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/availability', protect, getRoomAvailability); // --- NOVA ROTA ---
router.get('/active', protect, getActiveReservations);
router.get('/past', protect, getPastReservations);
router.post('/', protect, createReservation);
router.patch('/:id/cancel', protect, cancelReservation);
router.get('/rooms', protect, getRooms);
router.get('/time-blocks', protect, getTimeBlocks);

module.exports = router;