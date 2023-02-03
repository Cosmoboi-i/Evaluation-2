const axios = require('axios');
const csv = require('csvtojson');

const companyByIdUrl = 'http://54.167.46.10/company/';
const companyBySectorUrl = 'http://54.167.46.10/sector?name=';

const getInputCsv = async (url) => {
  try {
    const response = await axios.get(url, { responseType: 'blob' });
    const fileString = response.data;
    const companyList = await csv().fromString(fileString);
    return companyList;
  }
  catch (error) { console.log(error); }
};

const getCompanyById = async (id) => {
  try {
    console.log(`${companyByIdUrl}${id}`);
    const response = await axios.get(`${companyByIdUrl}${id}`, { responseType: 'blob' });
    const fileString = response.data;
    return JSON.parse(fileString);
  }
  catch (error) { console.log(error); }
};

const getCompanyBySector = async (sector) => {
  try {
    console.log(`${companyBySectorUrl}${sector}`);
    const response = await axios.get(`${companyBySectorUrl}${sector}`, { responseType: 'blob' });
    const fileString = response.data;
    return JSON.parse(fileString);
  }
  catch (error) { console.log(error); }
};

module.exports = { getInputCsv, getCompanyById, getCompanyBySector };