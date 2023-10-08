const db = require('../database/models');

module.exports = {
  create: async (req, res) => {
    try {
      // Obtener datos del frontend
      const { userEmail, businessId, transactionTypeId, transactionValue } = req.body;

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
        businessFK: businessId,
        transaction_typeFK: transactionTypeId,
      });

      // Actualizar user_points según el tipo de transacción
      if (transactionTypeId === PURCHASE_TRANSACTION_TYPE_ID) { //cambiar a id para purchase
        // Transacción de compra: Sumar puntos a user_points
        const userPoint = await db.UserPoints.findOne({
          where: {
            userFK: user.id,
            businessFK: businessId,
          },
        });

        if (userPoint) {
          // Si el usuario ya tiene un registro de user_points para este negocio, actualizar el saldo.
          userPoint.quantity += transactionValue;
          await userPoint.save();
        } else {
          // Si no hay un registro previo, crear uno nuevo.
          await db.UserPoints.create({
            userFK: user.id,
            businessFK: businessId,
            quantity: transactionValue,
          });
        }
      } else if (transactionTypeId === BENEFIT_TRANSACTION_TYPE_ID) { //cambiar a id para benefit
        // Transacción de beneficio: Restar puntos de user_points
        const userPoint = await db.UserPoints.findOne({
          where: {
            userFK: user.id,
            businessFK: businessId,
          },
        });

        if (!userPoint || userPoint.quantity < transactionValue) {
          return res.status(400).json({
            ok: false,
            msg: 'El usuario no tiene suficientes puntos para esta transacción de beneficio',
          });
        }

        // Restar los puntos del usuario
        userPoint.quantity -= transactionValue;
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
        msg: 'Error en el servidor',
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
        attributes: ['id', 'userFK', 'businessFK', 'transaction_typeFK'],
      });

      const transactionsWithDetails = transactions.map((transaction) => {
        const transactionData = transaction.toJSON();
        const transactionType = transactionData.transaction_type.id; // Nombre del tipo de transacción

        return {
          id: transactionData.id,
          user: transactionData.user,
          business: transactionData.business,
          points: transactionType === 'Purchase' ? 'Sumar puntos' : 'Restar puntos', // Aquí puedes personalizar el mensaje según el tipo de transacción
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
        attributes: ['id', 'userFK', 'businessFK', 'transaction_typeFK'],
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
