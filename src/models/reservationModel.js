const db = require('../config/db');

const Reservation = {
    // Busca reservas passadas de um usuário específico
    findPastByUser: async (userId) => {
        const queryText = `
            SELECT 
                r.id,
                r.data_reserva,
                r.status,
                s.codigo AS sala_codigo,
                b.hora_inicio,
                b.hora_fim
            FROM reservas r
            JOIN salas s ON r.sala_id = s.id
            JOIN blocos_horario b ON r.bloco_id = b.id
            WHERE r.usuario_id = $1 AND r.data_reserva < CURRENT_DATE
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

    // Cria uma nova reserva
    create: async ({ usuario_id, sala_id, data_reserva, bloco_id }) => {
        const queryText = `
            INSERT INTO reservas (usuario_id, sala_id, data_reserva, bloco_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        try {
            const { rows } = await db.query(queryText, [usuario_id, sala_id, data_reserva, bloco_id]);
            return rows[0];
        } catch (error) {
            // Se o erro for de violação de chave única (código 23505), a reserva já existe
            if (error.code === '23505') {
                const err = new Error('Este horário para esta sala já está reservado.');
                err.statusCode = 409; // Conflict
                throw err;
            }
            console.error('Erro ao criar reserva:', error);
            throw error;
        }
    }
};

module.exports = Reservation;