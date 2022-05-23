import {HttpClient} from './HttpService';

export async function getCompanyProfile() {
  const res = await HttpClient.get('/companies');
  const data = await res.data;
  console.log(data);
  return data;
}
