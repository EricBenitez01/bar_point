const db = require('../database/models');

module.exports = {
    create: async (req, res) => {
        try {
            // Obtener datos del frontend
            const { userEmail, businessId, transactionTypeId, transactionValue, benefitId } = req.body;

            // Buscar al usuario por su email
            const user = await db.User.findOne({
                where: { email: userEmail },
                attributes: ['id'],
            });

            if (!user) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Usuario no encontrado',
                });
            }

            // Crear la transacción
            const transaction = await db.Transaction.create({
                userFK: user.id,
                businessfk : businessId,
                transaction_typeFK: transactionTypeId,
            });

            // Actualizar user_points según el tipo de transacción
            if (transactionTypeId === 1) { //cambiar a id para purchase
                // Transacción de compra: Sumar puntos a user_points
                const userPoint = await db.User_points.findOne({
                    where: {
                        userFK: user.id,
                        businessfk : businessId,
                    },
                });

                if (userPoint) {
                    // Si el usuario ya tiene un registro de user_points para este negocio, actualizar el saldo.
                    userPoint.quantity += transactionValue;
                    await userPoint.save();
                } else {
                    // Si no hay un registro previo, crear uno nuevo.
                    await db.User_points.create({
                        userFK: user.id,
                        businessfk : businessId,
                        quantity: transactionValue,
                    });
                }
            } else if (transactionTypeId === 2) {
                // Encuentra todos los beneficios relacionados con el businessId
                const allBenefits = await db.Benefit.findAll({
                    where: {
                        businessfk : businessId, // Filtrar por businessId
                    },
                    attributes: ['id', 'points_req'],
                });

                // Busca el beneficio específico por benefitId
                const benefit = allBenefits.find(benefit => benefit.id === benefitId);

                if (!benefit) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'El beneficio no existe',
                    });
                }

                const userPoint = await db.User_points.findOne({
                    where: {
                        userFK: user.id,
                        businessfk : businessId,
                    },
                });

                if (!userPoint || userPoint.quantity < benefit.points_req) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El usuario no tiene suficientes puntos para esta transacción de beneficio',
                    });
                }

                // Restar los puntos del usuario
                userPoint.quantity -= benefit.points_req;
                await userPoint.save();
            }

            return res.status(201).json({
                ok: true,
                msg: 'Transacción exitosa',
                data: transaction,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                msg: error.message ? error.message : 'Server error',
            });
        }
    },
    list: async (req, res) => {
        try {
            const transactions = await db.Transaction.findAll({
                include: [
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['id', 'username', 'email'],
                    },
                    {
                        model: db.Business,
                        as: 'business',
                        attributes: ['id', 'username', 'email'],
                    },
                    {
                        model: db.Transaction_type,
                        as: 'transaction_type',
                        attributes: ['id'], // Asegúrate de tener el nombre del tipo de transacción en tu modelo
                    },
                ],
                attributes: ['id', 'userFK', 'businessfk ', 'transaction_typeFK'],
            });

            const transactionsWithDetails = transactions.map((transaction) => {
                const transactionData = transaction.toJSON();
                const transactionType = transactionData.transaction_type.id; // Nombre del tipo de transacción

                return {
                    id: transactionData.id,
                    user: transactionData.user,
                    business: transactionData.business,
                    points: transactionType === 1 ? 'Sumar puntos' : 'Restar puntos', // Aquí puedes personalizar el mensaje según el tipo de transacción
                    transactionType: transactionType,
                };
            });

            return res.status(200).json({
                ok: true,
                data: transactionsWithDetails,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error en el servidor',
            });
        }
    },

    detail: async (req, res) => {
        try {
            const transactionId = req.params.id;

            const transaction = await db.Transaction.findByPk(transactionId, {
                include: [
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['id', 'username', 'email'],
                    },
                    {
                        model: db.Business,
                        as: 'business',
                        attributes: ['id', 'username', 'email'],
                    },
                    {
                        model: db.Transaction_type,
                        as: 'transaction_type',
                        attributes: ['id'], // Asegúrate de tener el nombre del tipo de transacción en tu modelo
                    },
                ],
                attributes: ['id', 'userFK', 'businessfk ', 'transaction_typeFK'],
            });

            if (!transaction) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Transacción no encontrada',
                });
            }

            const transactionData = transaction.toJSON();
            const transactionType = transactionData.transaction_type.id; // Nombre del tipo de transacción

            const transactionDetail = {
                id: transactionData.id,
                user: transactionData.user,
                business: transactionData.business, //abajo cambiar condicional por lo que este en el transactiontyp.id
                points: transactionType === 'Purchase' ? 'Sumar puntos' : 'Restar puntos', // Aquí puedes personalizar el mensaje según el tipo de transacción
                transactionType: transactionType,
            };

            return res.status(200).json({
                ok: true,
                data: transactionDetail,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error en el servidor',
            });
        }
    },
};
