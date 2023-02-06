const express = require('express');
const { saveCompany, getCompaniesBySectorRanked, updateCeo } = require('../controllers/companyController');
const { urlValidation, ceoValidation } = require('../middlewares/bodyValidation');
const { errorHandler } = require('../middlewares/errorHandler');

const router = express.Router();

router.post('/api/save', urlValidation, saveCompany);
router.get('/api/companies', getCompaniesBySectorRanked);
router.patch('/api/companies/:id/ceo', ceoValidation, updateCeo);

module.exports = { router };

