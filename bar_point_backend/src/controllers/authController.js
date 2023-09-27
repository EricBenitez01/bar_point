const db = require('../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    userLogin: async (req, res) => {
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
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ 
                    ok: false, 
                    msg: 'Invalid credentials, wrong password' 
                });
            }

            // Se genera un token para el user
            const token = jwt.sign({ userId: user.id, rol: user.rolFK }, process.env.SECRET_TOKEN);

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
    businessLogin: async (req, res) => {
        const { email, password } = req.body;

        try {

            // Se verifica si el business existe en la bd
            const business = await db.Business.findOne({ where: { email: email } });

            if (!business) {
                return res.status(401).json({ 
                    ok: false, 
                    msg: 'Invalid credentials' 
                });
            }

            // Se compara la contraseña ingresada con la contraseña persistida 
            const passwordMatch = await bcrypt.compare(password, business.password);

            if (!passwordMatch) {
                return res.status(401).json({ 
                    ok: false, 
                    msg: 'Invalid credentials, wrong password' 
                });
            }

            // Se genera un token para el business
            const token = jwt.sign({ businessId: business.id }, process.env.SECRET_TOKEN);

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
