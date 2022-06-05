import axios from 'axios';

const baseURL1 = 'https://snapsalary.com/';

export const HttpClient = axios.create({
  baseURL: baseURL1,
  headers: {
    'Content-type': 'application/json',
  },
});


