import React from 'react';
import {CompanyList} from '../components/FeaturedCompanies';
import {SalaryList} from '../components/SalaryList';
// import {CompanyTable} from '../components/CompanyTable';
// import {SiteFooter} from '../components/footer';


export const HomePage = () => {
  return (
    <><CompanyList />
      <SalaryList />
    </>
  );
};
