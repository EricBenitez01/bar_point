const express = require('express');
const router = express.Router();
const {list, detail, create, update, destroy} = require('../controllers/usersController');
const verifyToken = require('../controllers/tokenVerification');

router
    .get('/users',  list)//verifyToken,
    .get('/users/:id', detail)
    .post('/users', create)
    .put('/users/:id', update)
    .delete('/users/:id', destroy)

module.exports = router;