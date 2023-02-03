const companyService = require('../../src/services/companyService');
const externalAPI = require('../../src/utils/externalAPI');
const dataManipulation = require('../../src/utils/dataManipulation');
const models = require('../../database/models');

describe('companyService', () => {
  describe('saveCompany', () => {
    it('should return a list of companies', async () => {
      const mockResult = [{
        'companyId': '8888888888-888888-009900-999999999',
        'performanceIndex': [{
          'key': 'cpi',
          'value': 0.2
        }, {
          'key': 'cf',
          'value': 30000
        }, {
          'key': 'mau',
          'value': 0.1
        }, {
          'key': 'roic',
          'value': 20
        }],
      }];
      const mockCompanyData = {
        'companyId': '8888888888-888888-009900-999999999',
        'performanceIndex': [{
          'key': 'cpi',
          'value': 0.2
        }, {
          'key': 'cf',
          'value': 30000
        }, {
          'key': 'mau',
          'value': 0.1
        }, {
          'key': 'roic',
          'value': 20
        }],
      };
      const mockCompanyList = [{
        'companyId': '8888888888-888888-009900-999999999',
        'sector': 'Automobile'
      }];
      jest.spyOn(externalAPI, 'getInputCsv').mockResolvedValue(mockCompanyList);
      jest.spyOn(dataManipulation, 'getCompanyData').mockResolvedValue(mockCompanyData);
      jest.spyOn(models.Companies, 'create').mockResolvedValue(mockCompanyData);

      const urlLink = 'https://store-0001.s3.amazonaws.com/input.csv';

      const result = await companyService.saveCompany(urlLink);
      expect(externalAPI.getInputCsv).toHaveBeenCalledWith(urlLink);
      expect(dataManipulation.getCompanyData).toHaveBeenCalledWith(mockCompanyList);
      expect(models.Company.create).toHaveBeenCalledWith(mockCompanyData);
      expect(result).toEqual(mockResult);
    });

  });
});