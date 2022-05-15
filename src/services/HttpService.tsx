import axios from 'axios';
// const axios = require('axios').default;

const baseURL1 = 'https://snapsalary.com/';


export default axios.create({
  baseURL: 'http://localhost:3000/', // Need to change to real URL, this is for testing
  headers: {

  },
});

export async function getCompany() {
  const response = await axios.get( baseURL1 );
  console.log(response.data);
}

