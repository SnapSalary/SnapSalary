import {HttpClient} from './HttpService';

export async function getJobs() {
  const response = await HttpClient.get('/job');
  const data = await response.data;
  console.log(data);
  return data;
}
