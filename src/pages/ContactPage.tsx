import React from 'react';
import {ContactForm} from '../components/ContactForm';
import {SiteFooter} from '../components/footer';


export function ContactPage() {
  return (
    <>
      <body>
        <ContactForm />
      </body>
      <footer>
        <SiteFooter />
      </footer></>
  );
}

