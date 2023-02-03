const express = require('express');
const axios = require('axios');
const { getInputCsv, getCompanyById, getCompanyBySector } = require('../utils/csvReader');

const urlLink = 'https://store-0001.s3.amazonaws.com/input.csv';

const saveCompany = async (req, res, next) => {
  try {
    const companyList = await getInputCsv(urlLink);
    const company = await getCompanyById('c1634e16-17c8-42f6-8513-b8c50a4f230c');

    const companyBySector = await getCompanyBySector('Automobile');

    getScore(companyBySector);


  }
  catch (error) { console.log(error); }
};

const getScore = (companyBySector) => {
  companyBySector.map((company, sector) => {
    let cpi = company.performanceIndex.find((index) => index.key === 'cpi').value;
    let cf = company.performanceIndex.find((index) => index.key === 'cf').value;
    let mau = company.performanceIndex.find((index) => index.key === 'mau').value;
    let roic = company.performanceIndex.find((index) => index.key === 'roic').value;
    const score = ((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4;
    company.score = score;
    company.sector = sector;
  });
  return companyBySector;
};

console.log('saveCompany', saveCompany(1, 1));