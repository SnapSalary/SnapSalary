import {HttpClient} from './HttpService';

export const getCompanyProfile = async () => {
  try {
    const response = await HttpClient.get('/companies');
    console.log(response);
  } catch (error) {
    console.log('error', error);
  }
};
