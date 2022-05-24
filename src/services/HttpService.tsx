import axios from 'axios';
// const axios = require('axios').default;

const baseURL1 = 'https://snapsalary.com/';


export const HttpClient = axios.create({
  baseURL: baseURL1, // Need to change to real URL, this is for testing
  headers: {
    'Content-type': 'application/json',
  },
});


