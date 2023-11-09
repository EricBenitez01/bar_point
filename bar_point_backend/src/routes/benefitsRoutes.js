const express = require('express');
const router = express.Router();
const { list, detail, create, update, destroy } = require('../controllers/benefitsController');

const { uploadImageBenefit } = require('../middlewares/uploadFiles');

router
    .get('/benefits', list)
    .get('/benefits/:id', detail)
    .post('/benefits', uploadImageBenefit.single('img'), create)
    .put('/benefits/:id', uploadImageBenefit.single('img'), update)
    .delete('/benefits/:id', destroy)


module.exports = router;