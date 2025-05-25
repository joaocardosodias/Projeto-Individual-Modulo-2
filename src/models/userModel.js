// src/models/userModel.js
const db = require('../config/db');

const User = {
    findByEmail: async (email) => {
        const queryText = 'SELECT * FROM usuarios WHERE email = $1';
        try {
            const { rows } = await db.query(queryText, [email]);
            return rows[0];
        } catch (error) {
            console.error('Erro ao buscar usuário por e-mail:', error);
            throw error;
        }
    },

    create: async ({ nome, email, senha_hash }) => {
        const queryText = 'INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING id, nome, email';
        const values = [nome, email, senha_hash];
        try {
            const { rows } = await db.query(queryText, values);
            return rows[0]; // Retorna o usuário criado (sem a senha_hash)
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    }
};

module.exports = User;