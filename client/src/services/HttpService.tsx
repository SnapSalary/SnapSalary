import axios from 'axios';
const backendDB = process.env.REACT_APP_BASE_URL;

export const HttpClient = axios.create({
  baseURL: backendDB,
  headers: {
    'Content-type': 'application/json',
  },
});


