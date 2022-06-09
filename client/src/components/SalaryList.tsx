/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {HttpClient} from '../services/HttpService';
import {getJobs} from '../services/JobService';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import '../styles/SalaryList.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export enum SubmissionStatus {
  NotSubmitted,
  SubmitFailed,
  SubmitSucceeded
}

export const Dropdown = ()=> {
  const [industry, setIndustry] = useState('');
  const [submitIndustry, setSubmitIndustry] = useState();

  type industryProp = {
    industry: string,
  }

  const handleChange = (event: SelectChangeEvent) => {
    console.log('Users industry choice: ', event.target.value);
    setIndustry(event.target.value);
    console.log('Users industry choice: ', industry);
    const fetchData = async () => {
      try {
        const response = await HttpClient.get('/industries');
        setSubmitIndustry(response.data.data);
        console.log(response);
      } catch (error) {
        console.log('Error', error);
      }
    };

    fetchData();
    // handleChoice(event.target.value);
  };

  const handleChoice = (industry: string) => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await HttpClient.get('/industry' + industry);
          setSubmitIndustry(response.data.data);
          console.log(response);
        } catch (error) {
          console.log('Error', error);
        }
      };

      fetchData();
    }, []);
  };


  return (
    <div className='flex flex-wrap items-center content-center justify-center ml-20'>
      <FormControl sx={{m: 1, minWidth: 150}}>
        <InputLabel id="demo-simple-select-autowidth-label">Industry</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={industry}
          onChange={handleChange}
          autoWidth
          label="Industry"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'technology'}>Technology</MenuItem>
          <MenuItem value={'business'}>Business</MenuItem>
          <MenuItem value={'engineering'}>Engineering</MenuItem>
          <MenuItem value={'operations'}>Operations</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};


const columns: GridColDef[] = [
  {field: 'id', headerName: 'Job ID', width: 70, editable: true},
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
  // const [jobs, setJobs] = useState(data);
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJobs] = useState<(jobProp)[]>([]);
  const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);

  const [addFormData, setAddFormData] = useState({
    id: 0,
    company_name: '',
    job_title: '',
    company_id: '',
    salary: '',
    skill: '',
    job_id: 0,
  });

  const handleFormChange = (event: any) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData: any = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();

    const newJobEntry: jobProp = {
      id: addFormData.id,
      company_name: addFormData.company_id,
      job_title: addFormData.job_title,
      company_id: addFormData.company_id,
      skill: addFormData.skill,
      job_id: addFormData.job_id,
      salary: addFormData.salary,
    };

    const newJobToAdd = [...newJob, newJobEntry];

    const postJob = async () => {
      console.log('About to client post to create new company info', newJobEntry);
      HttpClient.post('/job'
          , {},
      ).then((response) => {
        console.log('Got response from upload file:', response.status);
        if (response.status === 200) {
          setSubmitted(SubmissionStatus.SubmitSucceeded);
        } else {
          setSubmitted(SubmissionStatus.SubmitFailed);
        }
      }).catch((error) => {
        console.log(error.response.data);
      });
    };

    postJob();
    setNewJobs(newJobToAdd);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await HttpClient.get('/job');
        const json = response;
        console.log(json.data);
        setJobs(json.data.data);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <div className='mt-20'>
        <Dropdown />
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
      </div>
      <div>
        <Box className='flex flex-wrap items-center content-center justify-center '
          component="form"
          sx={{
            '& > :not(style)': {m: 1, width: '20ch'},
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          <h2 className='bold'>Add new job listing</h2>
          <TextField id="outlined-basic" label="Job ID" variant="outlined" onChange={handleFormChange} />
          <TextField id="outlined-basic" label="Job Title" variant="outlined" onChange={handleFormChange} />
          <TextField id="outlined-basic" label="Skill" variant="outlined" onChange={handleFormChange} />
          <TextField id="outlined-basic" label="Salary" variant="outlined" onChange={handleFormChange} />
          <button type="submit">Add</button>
        </Box>
      </div>
    </>
  );
};


