import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {getCompanyProfile} from './services/CompanyProfileService';
// import axios from 'axios';
const axios = require('axios');
// At the same scope with `require`
jest.mock('axios');


const BASE_URL = 'http://localhost:3000/';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


describe('fetchCompanies', () => {
  describe('when API call is successful', () => {
    test('should return users list', async () => {
      // given
      const company = [
        {company_id: 1, company_name: 'Google', state: 'California', country: 'United State Of America', industry: 'Technology'},
        {company_id: 2, company_name: 'Intel', state: 'Oregon', country: 'United State Of America', industry: 'Technology'},
      ];
      axios.get.mockResolvedValueOnce(company);

      // when
      const result = await getCompanyProfile();

      // then
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}companies`);
      expect(result).toEqual(company);
    });
  });

  describe('when API call fails', () => {
    test('should return empty company list', async () => {
      // given
      const message = 'Network Error';
      axios.get.mockRejectedValueOnce(new Error(message));

      // when
      const result = await getCompanyProfile();

      // then
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/companies`);
      expect(result).toEqual([]);
    });
  });
});
