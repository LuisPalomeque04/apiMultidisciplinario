const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        req.usuarioId = undefined; // Establece req.usuarioId como undefined cuando no hay token
        return next(); // Continuar al siguiente middleware
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Formato de token inválido.' });
    }

    const token = parts[1];

    jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }

        req.usuarioId = decoded.usuarioId;
        next();
    });
};

module.exports = verifyToken;
