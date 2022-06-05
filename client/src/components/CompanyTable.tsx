/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../styles/table.css';
import {HttpClient} from '../services/HttpService';

import {nanoid} from 'nanoid';
import {create} from 'domain';

type companyProp = {
  id: number,
  company_id: string;
  company_name: string;
  state: string;
  country: string;
  industry_id: string;
}


export enum SubmissionStatus {
  NotSubmitted,
  SubmitFailed,
  SubmitSucceeded
}

export const CompanyTable = () => {
  const [companies, setCompanies] = useState<(companyProp)[]>([]);
  const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);
  const [addFormData, setAddFormData] = useState({
    id: 0,
    company_id: '',
    company_name: '',
    state: '',
    country: '',
    industry_id: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await HttpClient.get('/companies');
        setCompanies(response.data.data);
        console.log(response);
      } catch (error) {
        console.log('Error', error);
      }
    };

    fetchData();
  }, []);

  // Store form value in state
  const handleFormChange = (event:any) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData: any = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();

    const newCompanyEntry:companyProp = {
      id: addFormData.id,
      company_id: addFormData.company_id,
      company_name: addFormData.company_name,
      state: addFormData.state,
      country: addFormData.country,
      industry_id: addFormData.industry_id,

    };

    const newCompany = [...companies, newCompanyEntry];


    const postCompany = async () => {
      console.log('About to client post to create new company info', newCompanyEntry);
      HttpClient.post('/company'
          , {company_name: newCompanyEntry.company_name, state: newCompanyEntry.state, country: newCompanyEntry.country, industry_id: newCompanyEntry.industry_id},
      ).then((response) => {
        console.log('Got response from upload file:', response.status);
        if (response.status === 200) {
          setSubmitted(SubmissionStatus.SubmitSucceeded);
        } else {
          setSubmitted(SubmissionStatus.SubmitFailed);
        }
      }).catch((error) => {
        console.log(error.response.data);
      });
    };

    postCompany();
    setCompanies(newCompany);
  };

  return (
    <><div className='table-container'>
      <table className="companyTable w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Company Name
            </th>
            <th scope="col" className="px-6 py-3">Company ID
            </th>
            <th scope="col" className="px-6 py-3">State
            </th>
            <th scope="col" className="px-6 py-3">Country
            </th>
            <th scope="col" className="px-6 py-3">Industry ID
            </th>
          </tr>

        </thead>
        <tbody>
          {companies.map((company: any) => (
            <tr key={company.data} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{company.company_name}
              </th>
              <td className="px-6 py-4">{company.company_id}</td>
              <td className="px-6 py-4">{company.state}</td>
              <td className="px-6 py-4">{company.country}
              </td>
              <td className="px-6 py-4">{company.industry_id}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="company_name"
          placeholder="Enter a company Name..."
          onChange={handleFormChange} />
        <input
          type="text"
          name="company_id"
          placeholder="Enter the company id"
          onChange={handleFormChange} />
        <input
          type="text"
          name="state"
          placeholder="Enter the state location"
          onChange={handleFormChange} />
        <input
          type="text"
          name="country"
          placeholder="Enter the country"
          onChange={handleFormChange} />
        <input
          type="text"
          name="industry_id"
          placeholder="Enter a industry id"
          onChange={handleFormChange} />
        <button type="submit">Add</button>
      </form>;
    </div><br /></>
  );
};

