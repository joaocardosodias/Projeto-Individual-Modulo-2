// src/controllers/authController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    // ... (código da função login existente) ...
};

const register = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios (nome, e-mail, senha).' });
    }

    // Validações adicionais (ex: formato do email, força da senha) podem ser adicionadas aqui

    try {
        // 1. Verificar se o usuário já existe
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Este e-mail já está cadastrado.' }); // 409 Conflict
        }

        // 2. Hashear a senha
        const salt = await bcrypt.genSalt(10);
        const senha_hash = await bcrypt.hash(senha, salt);

        // 3. Criar o novo usuário no banco
        const newUser = await User.create({ nome, email, senha_hash });

        // Não envie a senha_hash de volta na resposta por segurança, apenas o necessário
        res.status(201).json({ // 201 Created
            message: 'Usuário cadastrado com sucesso!',
            userId: newUser.id, // Supondo que o método create retorna o usuário com ID
            nome: newUser.nome,
            email: newUser.email
        });

    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao tentar cadastrar usuário.' });
    }
};

module.exports = {
    login,
    register, // Exporte a nova função
};