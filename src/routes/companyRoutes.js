const express = require('express');
const { saveCompany } = require('../controllers/companyController');
const { errorHandler } = require('../middlewares/errorHandler');

const router = express.Router();

router.post('/api/save', saveCompany, errorHandler);

module.exports = router;