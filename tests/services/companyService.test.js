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

  describe('getCompaniesBySector', () => {
    it('should return a list of companies filtered by sector', async () => {
      const mockCompaniesBySector = [
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
      const mockSector = 'Software';
      jest.spyOn(models.Companies, 'findAll').mockResolvedValue(mockCompaniesBySector);

      const result = await companyService.getCompaniesBySector(mockSector);
      expect(models.Companies.findAll).toHaveBeenCalledWith({
        where: {
          sector: mockSector
        }
      });
      expect(result).toEqual(mockCompaniesBySector);
    });
  });

  describe('getCompaniesRanked', () => {
    it('should return a list of companies ranked by score', async () => {

      const mockResult = [
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

      const mockCompaniesRanked = [
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
          'updatedAt': '2023-02-03T10:25:49.887Z',
          'ranking': 5
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
          'updatedAt': '2023-02-03T10:25:50.317Z',
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

      await companyService.getCompaniesRanked(mockCompanies);
      expect(mockCompanies.map).toHaveBeenCalledWith();
      expect(mockCompaniesRanked.map).toHaveBeenCalled(mockCompaniesRanked[0], mockResult[0], 0, mockResult);
    });
  });

  describe('updateCeo', () => {
    it('should update the ceo of a company', async () => {
      const mockCompany = {
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
      };
      const mockNewCeo = 'Peter Wilkinson';
      const mockUpdatedCompany = {
        'id': 19,
        'company_id': 'b6472c52-732a-4fd2-a463-ae604c0a2c79',
        'name': 'Microsoft',
        'ceo': 'Peter Wilkinson',
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
      };
      jest.spyOn(models.Companies, 'update').mockResolvedValue(mockUpdatedCompany);

      const result = await companyService.updateCeo(mockCompany, mockNewCeo);
      expect(models.Companies.update).toHaveBeenCalledWith({
        ceo: mockNewCeo
      }, {
        where: {
          id: mockCompany.id
        }
      });
      expect(result).toEqual(mockUpdatedCompany);
    });
  });
});