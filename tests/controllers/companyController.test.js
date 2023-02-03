const { saveCompany } = require('../../src/controllers/companyController');
const companyService = require('../../src/services/companyService');

describe('userControllers', () => {
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
      },
      {
        'companyId': '9999999999-999998-009900-999999999',
        'performanceIndex': [{
          'key': 'cpi',
          'value': 0.2
        }, {
          'key': 'cf',
          'value': 50000
        }, {
          'key': 'mau',
          'value': 0.1
        }, {
          'key': 'roic',
          'value': 20
        }],
      }];
      jest.spyOn(companyService, 'saveCompany').mockResolvedValue(mockResult);

      const req = { body: { urlLink: 'https://store-0001.s3.amazonaws.com/input.csv' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await saveCompany(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });
  });
});