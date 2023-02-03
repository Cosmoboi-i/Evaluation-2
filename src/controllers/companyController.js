const express = require('express');
const axios = require('axios');
const { getInputCsv, getCompanyById, getCompanyBySector } = require('../utils/csvReader');

const urlLink = 'https://store-0001.s3.amazonaws.com/input.csv';

const saveCompany = async (req, res, next) => {
  try {
    const companyList = await csvReader(urlLink);





  }
  catch (error) { console.log(error); }
};

console.log('saveCompany', saveCompany(1, 1));