const express = require('express');
const router = express.Router();
const { serveImage } = require('../controllers/imagesController');

router
    .get('/images/:image', serveImage)

module.exports = router;