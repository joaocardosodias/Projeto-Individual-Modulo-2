const Reservation = require('../models/reservationModel');
const db = require('../config/db'); // Para buscar salas e blocos

// Busca as reservas antigas do usuário logado
const getPastReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findPastByUser(req.user.id);
        res.status(200).json(reservations);
    } catch (error) {
        console.error('Erro ao obter reservas passadas:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

// Cria uma nova reserva
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
        // Se o erro tiver um statusCode (como 409 que definimos no modelo), use-o
        res.status(error.statusCode || 500).json({ message: error.message || 'Erro interno no servidor.' });
    }
};

// Busca todas as salas disponíveis
const getRooms = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM salas ORDER BY codigo');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar salas.' });
    }
};

// Busca todos os blocos de horário
const getTimeBlocks = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM blocos_horario ORDER BY hora_inicio');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar blocos de horário.' });
    }
};

module.exports = {
    getPastReservations,
    createReservation,
    getRooms,
    getTimeBlocks,
};