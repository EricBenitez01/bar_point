const express = require('express');
const router = express.Router();
const { list, detail, create, update, destroy } = require('../controllers/purchaseController.js');

router
    .get('/purchase', list)
    .post('/purchase', create)
    .get('/purchase/:id', detail)
    .put('/purchase/:id', update)
    .delete('/purchase/:id', destroy)


module.exports = router;