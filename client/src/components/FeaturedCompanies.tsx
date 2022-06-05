/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import intelLogo from '../img/intel/intel.png';
import googleLogo from '../img/google/google.png';
import amazonLogo from '../img/amazon/amazon.png';
import netflixLogo from '../img/netflix/netflix.png';
import {Salaries} from '../pages/SalariesPage';
import {CompanyProps} from '../types/StateTypes';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import '../styles/SalaryList.css';
import axios from 'axios';


const companyModal = (data: CompanyProps) => {
  const [company, setCompany] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/jobs');
        const json = await response;
        console.log(json);
        setCompany(json.data);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);
};


const Company = (props: CompanyProps, data: any) => {
  const {
    imgUri1,
    imgAlt1,
    imgUri2,
    imgAlt2,
    name,
    salary,
  } = props;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    console.log('Company rendered');
  });

  return (
    <div>
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img className="object-cover object-top w-full" src={imgUri1} alt={imgAlt1} />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img className="object-contain h-15 w-15 object-center h-32" src={imgUri2} alt={imgAlt2} />
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">{name}</h2>
          <p className="text-gray-500">Technology Company</p>
        </div>
        <div className='text-gray-500 mx-10 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>${salary}

        </div>
        <div className="p-3 border-t mx-8 mt-2">
          <div>
            <Button onClick={handleOpen}>See Company</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className='modal-box'>
                <div>
                </div>
              </Box>
            </Modal>
          </div>

        </div>
      </div>
    </div>
  );
};


export const CompanyList = () => {
  return (
    <>
      <div className='container w-full px-15 mt-10 m-auto'>
        <div className='flex flex-wrap items-center content-center justify-center m-0'>
          <div className='company1 m-4 '>
            <Company id={0} name={'Intel'} salary={0} state={''} country={''} industry_id={''} imgUri1={''} imgAlt1={''} imgUri2={intelLogo} imgAlt2={''} exploreButtionClick={function(): void {
              throw new Error('Function not implemented.');
            }}></Company>
          </div>
          <div className='company2 m-4'>
            <Company id={1} name={'Google'} imgUri1={''} imgAlt1={''} imgUri2={googleLogo} imgAlt2={''} exploreButtionClick={function(): void {
              throw new Error('Function not implemented.');
            }} salary={0} state={''} country={''} industry_id={''}></Company>
          </div>
          <div className='company3 m-4'>
            <Company id={0} name={'Amazon'} imgUri1={''} imgAlt1={''} imgUri2={amazonLogo} imgAlt2={''} exploreButtionClick={function(): void {
              throw new Error('Function not implemented.');
            }} salary={0} state={''} country={''} industry_id={''}></Company>
          </div>
          <div className='company4 m-4'>
            <Company id={0} name={'NetFlix'} imgUri1={''} imgAlt1={''} imgUri2={netflixLogo} imgAlt2={''} exploreButtionClick={function(): void {
              throw new Error('Function not implemented.');
            }} salary={0} state={''} country={''} industry_id={''}></Company>
          </div>
        </div>
      </div>

    </>

  );
};
