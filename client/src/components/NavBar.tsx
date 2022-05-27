/* eslint-disable no-unused-vars */
import {type} from '@testing-library/user-event/dist/type';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {Login} from './LoginForm';
import {useAuth0} from '@auth0/auth0-react';
import {LoginButton} from './LoginButton';

type ButtonProps = {
  handleClick: () => void;
}


export function NavBar() {
  const handleLogIn = (event: React.MouseEvent<HTMLButtonElement>):void => {
    console.log('Log in Clicked!!!!');
    const [logIn, setLogIn] = useState();
  };

  const handleSignUp = (event: React.MouseEvent<HTMLButtonElement>): void => {
    console.log('Sign up clicked!!!');
  };

  const {isAuthenticated} = useAuth0();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>

              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>

              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img className="block lg:hidden h-8 w-auto" src="" alt=""></img>
              <h3 className="text-slate-300 font-bold">Snap Salary</h3>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <NavLink className="text-gray-300 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page" to={'/'}>Home</NavLink>

                <NavLink className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to={'/Companies'}>Companies</NavLink>

                <NavLink className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to={'/About'}>About</NavLink>

                <NavLink className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to={'/Contact'}>Contact</NavLink>
              </div>
            </div>
          </div>


          <LoginButton></LoginButton>
          <button onClick={handleSignUp} className='m-5  text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
              Sign Up
          </button>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button type="button" className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

  );
}
function useState(): [any, any] {
  throw new Error('Function not implemented.');
}

