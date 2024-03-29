import {useAuth0} from '@auth0/auth0-react';
import React from 'react';


export const LoginButton = () => {
  const {loginWithRedirect} = useAuth0();
  return (
    <button onClick={() => loginWithRedirect()} className='m-5 ml-5  text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
            Log In
    </button>
  );
};
