const express = require('express');
const router = express.Router();
const { userLogin, businessLogin } = require('../controllers/authController');

router
    .post('/authUser', userLogin)
    .post('/authBusiness', businessLogin);

module.exports = router;