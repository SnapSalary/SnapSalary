/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {SubmissionStatus} from '../components/CompanyTable';
import {HttpClient} from './HttpService';

type IndustryProp = {
    industry: string,
}
const InitData = async () => {
  const [industry, setIndustry] = useState<(IndustryProp)[]>([]);
  const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);


  const seedData = async () => {
    HttpClient.post('/industry', {industry: 'HR'})
        .then((response) => {
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
  seedData();
};
