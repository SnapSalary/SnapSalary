/* eslint-disable no-unused-vars */
import axios from 'axios';
import {type} from 'os';
import React, {useState} from 'react';
import {HttpClient} from '../services/HttpService';


enum SubmissionStatus {
    NotSubmitted,
    SubmitFailed,
    SubmitSucceeded,
}

const initialFormState = {
  email: '',
  firstName: '',
  lastName: '',
  message: '',

};

type contactFormProp = {
  email: string,
  firstName: string,
  lastName: string,
  message: string,
}


export const ContactForm = () => {
  const [form, setForm] = useState<(contactFormProp)[]>([]);
  const [values, setValues] = useState(initialFormState);
  const [submit, setSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);
  const [addFormData, setAddFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    message: '',
  });

  const submitForm = (event: any) => {
    event?.preventDefault();

    const newFormEntry: contactFormProp = {
      email: addFormData.email,
      firstName: addFormData.first_name,
      lastName: addFormData.last_name,
      message: addFormData.message,
    };

    const newForm = [...form, newFormEntry];


    const postForm = async () => {
      setSubmit((prevSubmit) => prevSubmit = true);
      if (submit === true) {
        HttpClient.post('/contact'
            , {email: newFormEntry.email, firstName: newFormEntry.firstName, lastName: newFormEntry.lastName, message: newFormEntry.message},
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
    };

    postForm();
    setForm(newForm);
  };


  const handleEmailChange = () => (event: { target: { value: any; }; }) => {
    setValues({...values, email: event.target.value});
  };

  const handleFirstNameChange = () => (event: { target: { value: any; }; }) => {
    setValues({...values, firstName: event.target.value});
  };

  const handleLastNameChange = () => (event: { target: { value: any; }; }) => {
    setValues({...values, lastName: event.target.value});
  };

  return (
    <div className='flex flex-wrap items-center content-center justify-center'>
      <form className="">
        <div className="bg-white justify-self-auto shadow-md rounded px-8 pt-6 mb-4">
          <div className="mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name">
              First Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              onChange={handleFirstNameChange}
              placeholder="First name" />
          </div>
          <div className="mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name">
              Last Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              onChange={handleLastNameChange}
              placeholder="Last name" />
          </div>
          <div className="mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password">
              E-mail
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              onChange={handleEmailChange} />
          </div>
          <div className="mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password">
              Message
            </label>
            <textarea className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
              id="message">
            </textarea>
          </div>
          <div className="mb-4">
            <button onClick={submitForm} className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button">
              Send
            </button>
          </div>
          <div className="md:w-2/3"></div>
        </div>
      </form>
    </div>
  );
};
