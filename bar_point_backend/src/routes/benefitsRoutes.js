const express = require('express');
const router = express.Router();
const { all, detail, store, update, destroy } = require('../controllers/benefitsController');

router
    .get('/benefits', all)
    .get('/benefits/:id', detail)
    .post('/benefits', store)
    .put('/benefits/:id', update)
    .delete('/benefits/:id', destroy)


module.exports = router;