const { getCompanyData } = require('../utils/dataManipulation');
const { getInputCsv } = require('../utils/externalAPI');
const models = require('../../database/models');

const saveCompany = async (urlLink) => {
  let companies = [];

  const companyList = await getInputCsv(urlLink);
  //console.log(companyList);
  for (let company of companyList) {
    const { company_id, company_sector } = company;
    //console.log(company_id, company_sector);
    const companyData = await getCompanyData(company_id, company_sector);
    //console.log('THIS IS IT', companyData);
    await models.Companies.create(companyData);
    companies.push({
      id: company_id,
      name: companyData.name,
      score: companyData.score
    });
  }
  return companies;
};

const getCompaniesBySector = async (sector) => {
  const companies = await models.Companies.findAll({
    where: {
      sector
    }
  });
  return companies;
};

const getCompaniesRanked = async (companies) => {
  companies.sort((a, b) => b.score - a.score);
  companies = companies.map((company, index) => ({ ...company, ranking: index + 1 }));

  const companiesOutput = companies.map((company, index) => ({
    id: company.company_id,
    name: company.name,
    ceo: company.ceo,
    score: company.score,
    ranking: index + 1
  }));

  return companiesOutput;
};

module.exports = { saveCompany, getCompaniesBySector, getCompaniesRanked };

