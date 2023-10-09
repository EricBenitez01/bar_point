const express = require('express');
const router = express.Router();
const { create, detail, list } = require('../controllers/transactionController.js');

router
    .get('/transaction', list)
    .post('/transaction', create)
    .get('/transaction/:id', detail)
    /* .put('/transaction/:id', update)
    .delete('/transaction/:id', destroy) */


module.exports = router;