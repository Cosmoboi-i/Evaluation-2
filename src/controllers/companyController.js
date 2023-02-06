const express = require('express');
const axios = require('axios');
const { getInputCsv, getCompanyById, getCompanyBySector } = require('../utils/externalAPI');
const { getCompanyData } = require('../utils/dataManipulation');
const companyService = require('../services/companyService');
const { NotFoundError } = require('../utils/errors');

const saveCompany = async (req, res, next) => {
  try {
    const urlLink = req.body.urlLink;
    const companies = await companyService.saveCompany(urlLink);
    res.status(201).json(companies);
  }
  catch (error) { next(error); }
};

const getCompaniesBySectorRanked = async (req, res, next) => {
  try {
    const { sector } = req.query;
    const companies = await companyService.getCompaniesBySector(sector);
    if (!companies) throw new NotFoundError(`No companies found in ${sector} sector.`);
    const companiesRanked = await companyService.getCompaniesRanked(companies);
    res.status(200).json(companiesRanked);
  }
  catch (error) { next(error); }
};

const updateCeo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ceo } = req.body;
    const company = await companyService.updateCeo(id, ceo);
    if (!company) throw new NotFoundError(`No company found with id: ${id}`);
    res.status(200).json({ message: 'CEO updated successfully' });
  }
  catch (error) { next(error); }
};

module.exports = { saveCompany, getCompaniesBySectorRanked, updateCeo };