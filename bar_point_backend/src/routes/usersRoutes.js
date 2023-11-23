const express = require('express');
const router = express.Router();
const {list, detail, create, update, destroy, searchUser} = require('../controllers/usersController');
const verifyToken = require('../controllers/tokenVerification');

router
    .get('/users/:id',  list)
    .get('/users/searchUser/:data', searchUser)
    .get('/users/detail/:id', detail)
    .post('/users', create)
    .put('/users/:id', update)
    .delete('/users/:id', destroy)

module.exports = router;