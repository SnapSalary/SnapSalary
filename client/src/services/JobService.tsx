import {HttpClient} from './HttpService';

export async function getJobs() {
  const response = await HttpClient.get('/jobs');
  const data = await response.data;
  console.log(data);
  return data;
}
