/* eslint-disable no-unused-vars */
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useEffect, useState} from 'react';
import {HttpClient} from '../services/HttpService';

export const Dropdown = ()=> {
  const [industry, setIndustry] = useState('');
  const [submitIndustry, setSubmitIdustry] = useState();

  const handleChange = (event: SelectChangeEvent) => {
    setIndustry(event.target.value);
  };

  const handleChoice = (industry: any) => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await HttpClient.get('/industry' + industry);
          setSubmitIdustry(response.data.data);
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
          <MenuItem value={1}>Technology</MenuItem>
          <MenuItem value={2}>Business</MenuItem>
          <MenuItem value={3}>Engineering</MenuItem>
          <MenuItem value={4}>Operations</MenuItem>
          <MenuItem value={5}>Other</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
