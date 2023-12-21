const express = require('express');
const router = express.Router();
const { status } = require('../controllers/dashboardController');


router.get('/dashboard/:id', status);

module.exports = router;