const { getCompanyData } = require('../utils/dataManipulation');
const { getInputCsv } = require('../utils/externalAPI');
const models = require('../../database/models');

const saveCompany = async (urlLink) => {
  let companies = [];

  const companyList = await getInputCsv(urlLink);
  //console.log(companyList);
  companyList.forEach(async (company) => {
    const { company_id, company_sector } = company;
    //console.log(company_id, company_sector);
    const companyData = await getCompanyData(company_id, company_sector);
    //console.log('THIS IS IT', companyData);
    const newRow = await models.Companies.create(companyData);
    companies.push({
      id: company_id,
      name: companyData.name,
      score: companyData.score
    });
  });
  return companies;
};

module.exports = { saveCompany };