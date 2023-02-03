const axios = require('axios');
const csv = require('csvtojson');

const companyByIdUrl = 'http://54.167.46.10/company/';
const companyBySectorUrl = 'http://54.167.46.10/sector?name=';

const getInputCsv = async (url) => {

  const response = await axios.get(url, { responseType: 'blob' });
  const fileString = response.data;
  const companyList = await csv().fromString(fileString);
  return companyList;

};

const getCompanyById = async (id) => {

  const response = await axios.get(`${companyByIdUrl}${id}`, { responseType: 'blob' });
  const fileString = response.data;
  return JSON.parse(fileString);

};

const getCompanyBySector = async (sector) => {

  //console.log(`${companyBySectorUrl}${sector}`);
  const response = await axios.get(`${companyBySectorUrl}${sector}`, { responseType: 'blob' });
  const fileString = response.data;
  return JSON.parse(fileString);

};

module.exports = { getInputCsv, getCompanyById, getCompanyBySector };