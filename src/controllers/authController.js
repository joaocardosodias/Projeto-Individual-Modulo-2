const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Função para gerar o token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d', // Token expira em 1 dia
    });
};

// Cadastro de usuário
const register = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
        }

        const salt = await bcrypt.genSalt(10);
        const senha_hash = await bcrypt.hash(senha, salt);

        const newUser = await User.create({ nome, email, senha_hash });

        res.status(201).json({
            message: 'Usuário cadastrado com sucesso!',
            userId: newUser.id
        });
    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

// Login de usuário
const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }

    try {
        const user = await User.findByEmail(email);
        if (user && (await bcrypt.compare(senha, user.senha_hash))) {
            res.status(200).json({
                message: 'Login bem-sucedido!',
                token: generateToken(user.id) // Envia o token para o cliente
            });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas.' });
        }
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

module.exports = {
    register,
    login,
};