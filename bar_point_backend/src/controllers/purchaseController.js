const db = require('../database/models');

module.exports = {
  list: async (req, res) => {
    try {
      const purchases = await db.Purchase.findAll();
      res.status(200).json({
        ok: true,
        meta: {
          total: purchases.length
        },
        data: purchases
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: error.message ? error.message : "Contact the site administrator"
      });
    }
  },

  create: async (req, res) => {
    const { businessfk, purchase_value, points, ticket_number } = req.body;

    try {
      const newPurchase = await db.Purchase.create({
        businessfk,
        purchase_value,
        points,
        ticket_number
      });

      res.status(201).json({
        ok: true,
        meta: {
          total: 1,
          url: `${req.protocol}://${req.get('host')}/purchases/${newPurchase.id}`
        },
        data: newPurchase
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: error.message ? error.message : "Contact the site administrator"
      });
    }
  },
  
  detail: async (req, res) => {
    const purchaseId = req.params.id;

    try {
      const purchase = await db.Purchase.findByPk(purchaseId);

      if (!purchase) {
        return res.status(404).json({ ok: false, msg: 'Purchase not found' });
      }

      res.status(200).json({
        ok: true,
        meta: {
          status: 200
        },
        data: purchase
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: error.message ? error.message : "Contact the site administrator"
      });
    }
  },

  update: async (req, res) => {
    const { businessfk, purchase_value, points, ticket_number } = req.body;
    const purchaseId = req.params.id;

    try {
      const purchase = await db.Purchase.findByPk(purchaseId);

      if (!purchase) {
        return res.status(404).json({ ok: false, msg: 'Purchase not found' });
      }

      purchase.businessfk = businessfk;
      purchase.purchase_value = purchase_value;
      purchase.points = points;
      purchase.ticket_number = ticket_number;

      await purchase.save();

      res.status(200).json({
        ok: true,
        meta: {
          total: 1,
          url: `${req.protocol}://${req.get('host')}/purchases/${purchase.id}`
        },
        data: purchase
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: error.message ? error.message : "Contact the site administrator"
      });
    }
  },

  destroy: async (req, res) => {
    const purchaseId = req.params.id;

    try {
      const purchase = await db.Purchase.findByPk(purchaseId);

      if (!purchase) {
        return res.status(404).json({ ok: false, msg: 'Purchase not found' });
      }

      await db.Purchase.destroy({
        where: { id: purchaseId },
        force: true
      });

      res.status(200).json({
        ok: true,
        meta: {
          status: 200,
          total: 1,
          url: `${req.protocol}://${req.get('host')}/purchases`
        },
        data: purchase
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: error.message ? error.message : "Contact the site administrator"
      });
    }
  }
};