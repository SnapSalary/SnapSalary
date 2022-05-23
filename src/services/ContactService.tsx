import {HttpClient} from './HttpService';

export const ContactForm = {
  async send(firstName: string, lastName: string, email: string, message: string) {
    return HttpClient.post('/contact', {firstName, lastName, email, message});
  },
};
