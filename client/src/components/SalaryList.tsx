/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import data from '../mockJobtable.json';
import {getJobs} from '../services/JobService';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import '../styles/SalariesList.css';

const columns: GridColDef[] = [
  {field: 'id', headerName: 'Job ID', width: 70},
  {field: 'job_title', headerName: 'Job Title', width: 130},
  {field: 'skill', headerName: 'Skill', width: 130},
  {
    field: 'salary',
    headerName: 'Salary',
    type: 'number',
    width: 90,
  },
];


type jobProp = {
  id: number,
  company_name: string,
  job_title: string;
  company_id: string;
  salary: string;
  skill: string;
  job_id: number;
}


export const SalaryList = () => {
  const [jobs, setJobs] = useState(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/jobs');
        const json = await response;
        console.log(json);
        setJobs(json.data);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className='snap-container m-10 '>
      <div className='salary-list'>
        <DataGrid
          sx={{ml: 5}}
          rows={jobs}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection />
      </div>
    </div>
  );
};


