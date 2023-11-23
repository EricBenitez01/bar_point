const db = require('../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

module.exports = {
    list: async (req, res) => {
        try {

            let businessId = req.params.id;
            let order = "id"
            let orders = ["id", "name", "surname"];

            if (!orders.includes(order)) {
                throw new Error(`El campo ${order} no existe. Campos permitidos: [name, surname]`);
            }
            
            const businessUsers = await db.User_points.findAll({
                where: {
                    businessFK: businessId,
                },
                order: [order],
                attributes: {
                    exclude: ['password']
                }
            });

            const userIds = businessUsers.map(user => user.userFK);
            
            const users = await db.User.findAll({
                where: {
                    id: userIds
                },
                include: [{
                    model: db.User_points,
                    as: 'user_points', // Alias de la asociación
                    attributes: ['quantity']
                }],
                order: [order],
                attributes: {
                    exclude: ['password']
                }
            });
            console.log(users);
            if (users.length > 0) {
                return res.status(200).json({
                    ok: true,
                    meta: {
                        total: users.length
                    },
                    data: users
                });
            }
            throw new Error("No hay usuarios");

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: error.message ? error.message : "Contacte al administrador del sitio"
            });
        }
    },
    detail: async (req, res) => {
        try {

            let id = req.params.id;

            if (isNaN(id)) {
                throw new Error('the ID must be a number')
            }

            let user = await db.User.findByPk(id, {
                attributes: {
                    exclude: ['password'],
                }
            });

            if (user) {
                return res.status(200).json({
                    ok: true,
                    meta: {
                        status: 200
                    },
                    data: user,
                });
            }
            throw new Error('There is no user')

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: error.message ? error.message : "Contact the site administrator",
            });
        }
    },
    create: async (req, res) => {

        const { username, email, address, gender, birthday, password, rolFK } = req.body;

        try {

            // Se verifica si el user ya existe en la bd
            const existingUser = await db.User.findOne({ where: { email: email } });

            if (existingUser) {
                return res.status(400).json({
                    ok: false,
                    msg: 'The entered user already exists in the database'
                });
            }

            // Se genera el hash para el password
            const hashedPassword = await bcrypt.hash(password, 10);

            let newUser = await db.User.create(
                {
                    username: username && username.trim(),
                    email: email,
                    address: address,
                    gender: gender,
                    birthday: birthday,
                    password: hashedPassword,
                    rolFK: rolFK,
                }
            )

            if (newUser) {

                return res.status(200).json({
                    ok: true,
                    meta: {
                        total: 1,
                        url: `${req.protocol}://${req.get('host')}/users/${newUser.id}`
                    },
                    data: newUser,
                })
            };

        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message ? error.message : "Contact the site administrator",
            });
        }
    },
    update: async function (req, res) {

        const { name, surname, email, password } = req.body;

        try {
            let updateUser = await db.User.findByPk(req.params.id);

            updateUser.name = name;
            updateUser.surname = surname;
            updateUser.email = email;
            updateUser.password = password;

            await updateUser.save();

            if (updateUser) {
                return res.status(200).json({
                    ok: true,
                    meta: {
                        total: 1,
                        url: `${req.protocol}://${req.get('host')}/users/${updateUser.id}`
                    },
                    data: updateUser
                })
            };

        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message ? error.message : "Contact the site administrator",
            });
        }
    },
    destroy: async function (req, res) {

        try {
            let userId = req.params.id;
            const user = await db.User.findByPk(userId);

            await db.User.destroy({
                where: { id: userId },
                force: true
            });

            if (user) {
                return res.status(200).json({
                    ok: true,
                    meta: {
                        status: 200,
                        total: 1,
                        url: `${req.protocol}://${req.get('host')}/users`
                    },
                    data: user
                })
            };

        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message ? error.message : "Contact the site administrator",
            });
        }
    },
    searchUser: async (req, res) => {
        try {
            let username = req.params.data;
            if (!username) {
                throw new Error('The username parameter is missing.');
            }

            const user = await db.User.findAll({
                where: {
                    username: {
                        [Op.like]: `%${username}%`
                    }
                },
                attributes: {
                    exclude: ['password']
                }
            });

            if (user) {
                return res.status(200).json({
                    ok: true,
                    meta: {
                        status: 200
                    },
                    data: user
                });
            }
            throw new Error('User not found');

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                msg: error.message ? error.message : 'Contact the site administrator'
            });
        }
    },
};