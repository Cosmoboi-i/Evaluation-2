const express = require('express');
const { saveCompany } = require('../controllers/companyController');
const { bodyValidation } = require('../middlewares/bodyValidation');
const { errorHandler } = require('../middlewares/errorHandler');

const router = express.Router();

router.post('/api/save', bodyValidation, saveCompany);

module.exports = { router };