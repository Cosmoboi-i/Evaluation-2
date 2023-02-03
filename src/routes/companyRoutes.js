const express = require('express');
const { saveCompany } = require('../controllers/companyController');

const router = express.Router();

router.post('/api/save', saveCompany);

module.exports = router;