const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Accedo al token enviado en el header de la solicitud
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ 
            msg: 'Token not found, access denied' 
        });
    };

    try {

        // Se verifica el token y devuelve el objeto correspondiente en data
        const data = jwt.verify(token, process.env.SECRET_TOKEN);
        // Se permite el acceso a la ruta
        next(); 

    } catch (err) {
        res.status(401).json({ msg: 'Invalid token, access denied' });
    };
};

module.exports = verifyToken;