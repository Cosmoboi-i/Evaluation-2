const express = require('express');
const axios = require('axios');
const { getInputCsv, getCompanyById, getCompanyBySector } = require('../utils/externalAPI');
const { getCompanyData } = require('../utils/dataManipulation');
const companyService = require('../services/companyService');

const urlLink = 'https://store-0001.s3.amazonaws.com/input.csv';

const saveCompany = async (req, res) => {
  try {
    const companies = await companyService.saveCompany(urlLink);
    res.status(201).json(companies);
  }
  catch (error) { console.log(error); }
};

module.exports = { saveCompany };