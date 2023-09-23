const db = require('../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {

            // Se verifica si el user existe en la bd
            const user = await db.User.findOne({ where: { email: email } });

            if (!user) {
                return res.status(401).json({ 
                    ok: false, 
                    msg: 'Invalid credentials' 
                });
            }

            // Se compara la contraseña ingresada con la contraseña persistida 
            const passwordMatch = await bcrypt.compare(password, user.dataValues.password);

            if (!passwordMatch) {
                return res.status(401).json({ 
                    ok: false, 
                    msg: 'Invalid credentials, wrong password' 
                });
            }

            // Se genera un token para el user
            const token = jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN);

            return res.status(200).json({
                ok: true,
                msg: 'Successfull login',
                token,
            });

        } catch (error) {

            return res.status(500).json({
                ok: false,
                msg: 'Server error',
            });

        }
    },
};
