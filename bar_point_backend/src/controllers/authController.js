const db = require('../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    userLogin: async (req, res) => {
        const { email, password, businessId } = req.body;
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
            
            //si una relacion entre un negocio no existe, la crea, sino, no hace nada
            let userPointsExist = db.User_points.findAll({
                where: {
                    userfk: user.id,
                    businessfk: businessId
                }
            });            

            if(!userPointsExist) {
                await db.User_points.create({
                    userfk: newUser.id,
                    businessfk: businessId,
                    quantity: 0,
                });
            }
            // Se genera un token para el user
            const token = jwt.sign({ userId: user.id, rol: user.rolfk }, process.env.SECRET_TOKEN);

            return res.status(200).json({
                ok: true,
                msg: 'Successfull login',
                token,
            });

        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: error.message ? error.message : 'Server error',
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
            const token = jwt.sign({ businessId: business.id, rol: business.rolFK }, process.env.SECRET_TOKEN);

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
