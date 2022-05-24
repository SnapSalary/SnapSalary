/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import data from '../mock-data.json'; // Testing reading in data from json file
import '../styles/table.css';

// import {nanoid} from 'nanoid';

type companyProp = {
    id: number,
    companyName: string,
    category: string,
    position: string,
    location: string,
    salary: string,
}

export function CompanyTable() {
  const [post, setPost] = useState([]);
  const [companies, setCompanies] = useState(data);
  const [addFormData, setAddFormData] = useState({
    companyName: '',
    category: '',
    position: '',
    location: '',
    salary: '',
  });


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => {
          console.log(res);
          setPost(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  /*  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const fetchPost = async () => {
      try {
        const response = await axios.get('/post');
        if (response && response.data) {
          setPost(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
  }, []); */

  // Store form value in state
  const handleFormChange = (event:any) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData: any = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();

    const newCompanyEntry:companyProp = {
      // id: nanoid(),
      companyName: addFormData.companyName,
      category: addFormData.category,
      position: addFormData.position,
      location: addFormData.location,
      salary: addFormData.salary,
      id: 0,
    };

    const newCompany = [...companies, newCompanyEntry];
    setCompanies(newCompany);
  };

  return <><div className='table-container'>
    <table className='relative'>
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Category</th>
          <th>Position</th>
          <th>Location</th>
          <th>Salary</th>
        </tr>
        <tbody>
          {companies.map((company: any) => (
            <tr key={company}>
              <td>{company.companyName}</td>
              <td>{company.category}</td>
              <td>{company.position}</td>
              <td>{company.location}</td>
              <td>${company.salary}</td>
            </tr>
          ))}
        </tbody>

      </thead>
    </table>
  </div>
  <br/>
  <form onSubmit={handleFormSubmit}>
    <input
      type="text"
      name="companyName"
      placeholder="Enter a company Name..."
      onChange={handleFormChange}
    />
    <input
      type="text"
      name="category"
      placeholder="Enter a category"
      onChange={handleFormChange}
    />
    <input
      type="text"
      name="position"
      placeholder="Enter a position..."
      onChange={handleFormChange}
    />
    <input
      type="text"
      name="location"
      placeholder="Enter an loacation..."
      onChange={handleFormChange}
    />
    <input
      type="text"
      name="salary"
      placeholder="Enter an salary..."
      onChange={handleFormChange}
    />
    <button type="submit" >Add</button>
  </form>
  </>;
}

