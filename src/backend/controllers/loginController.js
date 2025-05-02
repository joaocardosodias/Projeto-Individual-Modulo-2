const bcrypt = require('bcrypt');
const { getUserByEmail, createUser } = require('../models/loginModel');

async function login(req, res) {
  const { email, senha } = req.body;
  const user = await getUserByEmail(email);
  if (!user) return res.status(401).json({ message: 'Email ou senha incorretos' });

  const match = await bcrypt.compare(senha, user.senha);
  if (!match) return res.status(401).json({ message: 'Email ou senha incorretos' });

  res.status(200).json({ message: 'Login bem-sucedido' });
}

async function register(req, res) {
  const { nome, email, senha } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);
  try {
    const user = await createUser(nome, email, hashedPassword);
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(400).json({ message: 'Erro ao registrar usuário', error: err.message });
  }
}

module.exports = { login, register };
