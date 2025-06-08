// src/models/reservationModel.js
const db = require('../config/db');

const Reservation = {
    findActiveByUser: async (userId) => {
        const queryText = `
            SELECT 
                r.id, r.data_reserva, r.status,
                s.codigo AS sala_codigo,
                b.hora_inicio, b.hora_fim
            FROM reservas r
            JOIN salas s ON r.sala_id = s.id
            JOIN blocos_horario b ON r.bloco_id = b.id
            WHERE r.usuario_id = $1 AND r.data_reserva >= CURRENT_DATE AND r.status = 'ativa'
            ORDER BY r.data_reserva ASC, b.hora_inicio ASC;
        `;
        try {
            const { rows } = await db.query(queryText, [userId]);
            return rows;
        } catch (error) {
            console.error('Erro ao buscar reservas ativas:', error);
            throw error;
        }
    },

    findPastByUser: async (userId) => {
        const queryText = `
            SELECT 
                r.id, r.data_reserva, r.status,
                s.codigo AS sala_codigo,
                b.hora_inicio, b.hora_fim
            FROM reservas r
            JOIN salas s ON r.sala_id = s.id
            JOIN blocos_horario b ON r.bloco_id = b.id
            WHERE r.usuario_id = $1 AND (r.data_reserva < CURRENT_DATE OR r.status != 'ativa')
            ORDER BY r.data_reserva DESC, b.hora_inicio DESC;
        `;
        try {
            const { rows } = await db.query(queryText, [userId]);
            return rows;
        } catch (error) {
            console.error('Erro ao buscar reservas passadas:', error);
            throw error;
        }
    },

    create: async ({ usuario_id, sala_id, data_reserva, bloco_id }) => {
        const queryText = `
            INSERT INTO reservas (usuario_id, sala_id, data_reserva, bloco_id, status)
            VALUES ($1, $2, $3, $4, 'ativa')
            RETURNING *;
        `;
        try {
            const { rows } = await db.query(queryText, [usuario_id, sala_id, data_reserva, bloco_id]);
            return rows[0];
        } catch (error) {
            if (error.code === '23505') {
                const err = new Error('Este horário para esta sala já está reservado.');
                err.statusCode = 409;
                throw err;
            }
            console.error('Erro ao criar reserva:', error);
            throw error;
        }
    },

    cancel: async (reservationId, userId) => {
        const queryText = `
            UPDATE reservas SET status = 'cancelada'
            WHERE id = $1 AND usuario_id = $2 AND status = 'ativa'
            RETURNING *;
        `;
        try {
            const { rows } = await db.query(queryText, [reservationId, userId]);
            return rows[0];
        } catch (error) {
            console.error('Erro ao cancelar reserva:', error);
            throw error;
        }
    },

    // --- NOVA FUNÇÃO ---
    // Busca os dias que estão totalmente reservados para uma sala específica em um dado mês/ano
    getAvailabilityForRoom: async (sala_id, year, month) => {
        const queryText = `
            WITH TotalBlocks AS (
                SELECT count(*) as total FROM blocos_horario
            ),
            BookedCounts AS (
                SELECT 
                    EXTRACT(DAY FROM data_reserva) as dia,
                    count(id) as booked_count
                FROM reservas
                WHERE 
                    sala_id = $1 AND
                    EXTRACT(YEAR FROM data_reserva) = $2 AND
                    EXTRACT(MONTH FROM data_reserva) = $3 AND
                    status = 'ativa'
                GROUP BY data_reserva
            )
            SELECT bc.dia FROM BookedCounts bc, TotalBlocks tb
            WHERE bc.booked_count >= tb.total;
        `;
        try {
            const { rows } = await db.query(queryText, [sala_id, year, month]);
            // Retorna um array com os dias do mês que estão lotados, ex: [15, 22, 28]
            return rows.map(r => r.dia);
        } catch (error) {
            console.error('Erro ao buscar disponibilidade da sala:', error);
            throw error;
        }
    }
};

module.exports = Reservation;