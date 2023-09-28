const express = require('express');
const router = express.Router();
const { list, detail, create, update, destroy } = require('../controllers/benefitsController');

router
    .get('/benefits', list)
    .get('/benefits/:id', detail)
    .post('/benefits', create)
    .put('/benefits/:id', update)
    .delete('/benefits/:id', destroy)


module.exports = router;