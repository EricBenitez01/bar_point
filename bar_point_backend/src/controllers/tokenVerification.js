const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Accedo al token enviado en el header de la solicitud
    const headerToken = req.headers['authorization'];

    if ( headerToken != undefined && headerToken.startsWith('Bearer ') ) {
        // headerToken tiene el siguiente formato: 'Bearer token'
        // Se obtiene el token
        const bearerToken = headerToken.split(' ');

        try {

            // Se verifica el token
            jwt.verify(bearerToken[1], process.env.SECRET_TOKEN);

            // Se permite el acceso a la ruta
            next(); 
        }   
        catch (err) {
            res.status(401).json({ 
                msg: 'Invalid token, access denied' 
            });
        }

        
    } else {
        res.status(401).json({ 
            msg: 'Access denied' 
        });
    };
};

module.exports = verifyToken;