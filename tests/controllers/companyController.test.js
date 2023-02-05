const { saveCompany, getCompaniesBySectorRanked } = require('../../src/controllers/companyController');
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

  describe('getCompaniesBySectorRanked', () => {
    it('should return a list of companies filtered by sector and ranked by score', async () => {
      const mockCompaniesRanked = [
        {
          'id': 'b6472c52-732a-4fd2-a463-ae604c0a2c79',
          'name': 'Microsoft',
          'ceo': 'Pedro Wilkinson',
          'ranking': 5
        },
        {
          'id': 'e90a7bc7-47fa-49af-bfa1-391fe7768b56',
          'name': 'Meta',
          'ceo': 'Danielle Berge',
          'ranking': 6
        }
      ];
      const mockCompanies = [
        {
          'id': 19,
          'company_id': 'b6472c52-732a-4fd2-a463-ae604c0a2c79',
          'name': 'Microsoft',
          'ceo': 'Pedro Wilkinson',
          'tags': [
            'intuitive',
            'virtual',
            'killer',
            'intuitive',
            'viral',
            'killer',
            'cross-media'
          ],
          'sector': 'Software',
          'createdAt': '2023-02-03T10:25:49.887Z',
          'updatedAt': '2023-02-03T10:25:49.887Z'
        },
        {
          'id': 22,
          'company_id': 'e90a7bc7-47fa-49af-bfa1-391fe7768b56',
          'name': 'Meta',
          'ceo': 'Danielle Berge',
          'tags': [
            'turn-key',
            'visionary',
            'granular',
            'one-to-one',
            'turn-key',
            'frictionless',
            'synergistic',
            'frictionless',
            'one-to-one',
            'value-added'
          ],
          'sector': 'Software',
          'createdAt': '2023-02-03T10:25:50.317Z',
          'updatedAt': '2023-02-03T10:25:50.317Z'
        }
      ];
      jest.spyOn(companyService, 'getCompaniesBySector').mockResolvedValue(mockCompanies);
      jest.spyOn(companyService, 'getCompaniesRanked').mockResolvedValue(mockCompaniesRanked);

      const req = { query: { sector: 'Software' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getCompaniesBySectorRanked(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCompaniesRanked);


    });
  });
});

