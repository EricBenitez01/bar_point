const express = require('express');
const router = express.Router();
const { list, detail, create, update, destroy } = require('../controllers/businessesController');

router
    .get('/businesses', list)
    .get('/businesses/:id', detail)
    .post('/businesses', create)
    .put('/businesses/:id', update)
    .delete('/businesses/:id', destroy)


module.exports = router;