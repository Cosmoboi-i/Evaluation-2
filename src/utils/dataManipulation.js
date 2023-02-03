const { getCompanyById, getCompanyBySector } = require('../utils/externalAPI');

const getCompanyData = async (id, sector) => {
  const company = await getCompanyById(id);
  const companyBySector = await getCompanyBySector(sector);
  const score = getScore(companyBySector, id);
  const companyData = { ...company, score, sector };
  companyData['company_id'] = companyData['id'];
  delete companyData['id'];
  return companyData;
};

const getScore = (companyBySector, id) => {
  //console.log(companyBySector);
  const company = companyBySector.find((index) => index['companyId'] === id);
  //console.log(company);
  let cpi = company.performanceIndex.find((index) => index.key === 'cpi').value;
  let cf = company.performanceIndex.find((index) => index.key === 'cf').value;
  let mau = company.performanceIndex.find((index) => index.key === 'mau').value;
  let roic = company.performanceIndex.find((index) => index.key === 'roic').value;
  const score = ((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4;

  return score;
};

module.exports = { getCompanyData };