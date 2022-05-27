/* eslint-disable no-unused-vars */
import axios from 'axios';
import {type} from 'os';
import React, {useState} from 'react';


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

type createMessageForm = {
  email: string,
  firstName: string,
  lastName: string,
  message: string,
}


export const ContactForm = () => {
  const [values, setValues] = useState(initialFormState);
  const [submit, setSubmit] = useState(false);

  function submitForm() {
    setSubmit((prevSubmit) => prevSubmit = true);
    if (submit === true) {
      axios.post('') // <createMessageForm>()
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
    }
  }

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
    <div className='flex flex-col justify-center items-center mt-20 mb-20'>
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
          <div className="w-full md:w-1/2 px-3">
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
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password">
              E-mail
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              onChange={handleEmailChange} />
            <p className="text-gray-600 text-xs italic">Some tips - as long as needed</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password">
              Message
            </label>
            <textarea className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
              id="message">
            </textarea>
            <p className="text-gray-600 text-xs italic">Re-size can be disabled by set by resize-none / resize-y / resize-x / resize</p>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
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
