/* eslint-disable no-unused-vars */
import {useAuth0} from '@auth0/auth0-react';
import React, {useEffect} from 'react';

export const Profile = () => {
  const {isAuthenticated, isLoading} = useAuth0();
  const user = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // return (
  //   isAuthenticated && (
  //     <div>
  //       <img src={user.picture} alt={user.name} />
  //       <h2>{user.name}</h2>
  //       <p>{user.email}</p>
  //     </div>
  //   )
  // );
};
