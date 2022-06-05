import axios from 'axios';
const baseURL = 'http://localhost:3001/'; // 'https://snapsalary.com/';

export const HttpClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});


