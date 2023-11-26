const express = require('express');
const router = express.Router();
const { list, detail, create, update, destroy } = require('../controllers/businessesController');

const { uploadPdfBusiness } = require('../middlewares/uploadPdfs');

router
    .get('/businesses', list)
    .get('/businesses/:id', detail)
    .post('/businesses/create', uploadPdfBusiness.single('menu'), create)
    .put('/businesses/:id', uploadPdfBusiness.single('menu'), update)
    .delete('/businesses/:id', destroy)

module.exports = router;