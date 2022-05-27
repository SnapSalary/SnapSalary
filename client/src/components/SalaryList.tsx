/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import data from '../mockJobtable.json';
import {getJobs} from '../services/JobService';
// const data = getJobs();

type jobProp = {
  company_name: string,
  job_title: string;
  company_id: string;
  salary: string;
  skill: string;
  job_id: string;
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
    <div className='snap-container m-9 w-22'>
      <table>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Postition
            </th>
            <th scope="col" className="px-6 py-3">Salary
            </th>
            <th scope="col" className="px-6 py-3">Skill
            </th>

          </tr>

        </thead>
        <tbody className=''>
          {jobs.map((jobs: any) => (
            <tr key={jobs.id} className="w-24 bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
              <th className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {jobs.job_title}
              </th>
              <th className="px-6 py-4">{jobs.salary}
              </th>
              <th className="px-6 py-4">{jobs.skill}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


