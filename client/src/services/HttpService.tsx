import axios from 'axios';
const backendDB = 'https://snapsalary.com/'; // process.env.REACT_APP_BASE_URL;

export const HttpClient = axios.create({
  baseURL: backendDB,
  headers: {
    'Content-type': 'application/json',
  },
});


