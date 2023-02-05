const express = require('express');
const axios = require('axios');
const { getInputCsv, getCompanyById, getCompanyBySector } = require('../utils/externalAPI');
const { getCompanyData } = require('../utils/dataManipulation');
const companyService = require('../services/companyService');

const urlLink = 'https://store-0001.s3.amazonaws.com/input.csv';

const saveCompany = async (req, res, next) => {
  try {
    const companies = await companyService.saveCompany(urlLink);
    res.status(201).json(companies);
  }
  catch (error) { next(error); }
};

const getCompaniesBySectorRanked = async (req, res, next) => {
  try {
    const { sector } = req.query;
    const companies = await companyService.getCompaniesBySector(sector);
    const companiesRanked = await companyService.getCompaniesRanked(companies);


    res.status(200).json(companiesRanked);
  }
  catch (error) { next(error); }
};

module.exports = { saveCompany, getCompaniesBySectorRanked };