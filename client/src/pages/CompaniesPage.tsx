import React from 'react';
import {SiteFooter} from '../components/footer';
import {CompanyTable} from '../components/CompanyTable';

export const CompaniesPage = () => {
  return (
    <>
      <CompanyTable />
      <footer>
        <SiteFooter />
      </footer>

    </>
  );
};

