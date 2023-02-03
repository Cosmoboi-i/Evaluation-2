const express = require('express');
const axios = require('axios');
const csv = require('csvtojson');

const saveCompany = async (req, res, next) => {
  try {
    const response = await axios.get('https://store-0001.s3.amazonaws.com/input.csv', { responseType: 'blob' });
    const fileString = response.data;

    const companyList = await csv().fromString(fileString);
    console.log(companyList);
  }
  catch (error) { console.log(error); }
};

console.log('saveCompany', saveCompany(1, 1));