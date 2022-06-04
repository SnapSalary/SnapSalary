import {useAuth0} from '@auth0/auth0-react';
import React from 'react';


export const LogoutButton = () => {
  const {logout} = useAuth0();
  return (
    <button onClick={() => logout()} className='m-5 ml-5  text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
            Log In
    </button>
  );
};
