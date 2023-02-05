const express = require('express');
const { saveCompany, getCompaniesBySectorRanked } = require('../controllers/companyController');
const { bodyValidation } = require('../middlewares/bodyValidation');
const { errorHandler } = require('../middlewares/errorHandler');

const router = express.Router();

router.post('/api/save', bodyValidation, saveCompany);
router.get('/api/companies', getCompaniesBySectorRanked);

module.exports = { router };

