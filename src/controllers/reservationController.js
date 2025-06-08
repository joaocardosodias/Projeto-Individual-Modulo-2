// src/controllers/reservationController.js
const Reservation = require('../models/reservationModel');
const db = require('../config/db');

const getActiveReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findActiveByUser(req.user.id);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter reservas ativas.' });
    }
};

const getPastReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findPastByUser(req.user.id);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

const createReservation = async (req, res) => {
    const { sala_id, data_reserva, bloco_id } = req.body;
    const usuario_id = req.user.id;
    if (!sala_id || !data_reserva || !bloco_id) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {
        const newReservation = await Reservation.create({ usuario_id, sala_id, data_reserva, bloco_id });
        res.status(201).json({ message: 'Reserva criada com sucesso!', reservation: newReservation });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Erro interno no servidor.' });
    }
};

const cancelReservation = async (req, res) => {
    const reservationId = req.params.id;
    const userId = req.user.id;
    try {
        const canceledReservation = await Reservation.cancel(reservationId, userId);
        if (!canceledReservation) {
            return res.status(404).json({ message: 'Reserva não encontrada, não está ativa ou não pertence a você.' });
        }
        res.status(200).json({ message: 'Reserva cancelada com sucesso!', reservation: canceledReservation });
    } catch (error) {
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

const getRooms = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM salas ORDER BY codigo');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar salas.' });
    }
};

const getTimeBlocks = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM blocos_horario ORDER BY hora_inicio');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar blocos de horário.' });
    }
};

// --- NOVA FUNÇÃO ---
const getRoomAvailability = async (req, res) => {
    const { sala_id, year, month } = req.query;
    if (!sala_id || !year || !month) {
        return res.status(400).json({ message: 'ID da sala, ano e mês são obrigatórios.' });
    }
    try {
        const unavailableDays = await Reservation.getAvailabilityForRoom(sala_id, year, month);
        res.status(200).json(unavailableDays);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar disponibilidade.' });
    }
};

module.exports = {
    getActiveReservations,
    getPastReservations,
    createReservation,
    cancelReservation,
    getRooms,
    getTimeBlocks,
    getRoomAvailability
};