const db = require('../db/db');

// Busca usuário por e-mail
async function getUserByEmail(email) {
  const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  return result.rows[0];
}

// Cria novo usuário
async function createUser(nome, email, senha) {
  const result = await db.query(
    'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
    [nome, email, senha]
  );
  return result.rows[0];
}

module.exports = { getUserByEmail, createUser };
