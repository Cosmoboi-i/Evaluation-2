const express = require('express');
const { saveCompany, getCompaniesBySectorRanked, updateCeo } = require('../controllers/companyController');
const { bodyValidation } = require('../middlewares/bodyValidation');
const { errorHandler } = require('../middlewares/errorHandler');

const router = express.Router();

router.post('/api/save', bodyValidation, saveCompany);
router.get('/api/companies', getCompaniesBySectorRanked);
router.patch('/api/companies/:id/ceo', bodyValidation, updateCeo);

module.exports = { router };

