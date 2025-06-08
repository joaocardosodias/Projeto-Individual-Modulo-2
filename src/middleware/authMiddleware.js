const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Pega o token do header (formato "Bearer TOKEN")
            token = req.headers.authorization.split(' ')[1];

            // Verifica o token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Anexa o ID do usuário ao objeto req para uso nas rotas protegidas
            req.user = { id: decoded.id };
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(401).json({ message: 'Não autorizado, token inválido.' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Não autorizado, sem token.' });
    }
};

module.exports = { protect };