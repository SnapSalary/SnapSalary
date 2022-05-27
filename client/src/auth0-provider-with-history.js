import React from 'react';
import {useHistory} from 'react-router-dom';
import {Auth0Provider} from '@auth0/auth0-react';

// eslint-disable-next-line react/prop-types
const AuthOProviderWithHistory = ({children}) => {
  const history = useHistory();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clienID = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const onRedirectCallBack = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clienID={clienID}
      redirecturi={window.location.origin}
      onRedirectCallBack={onRedirectCallBack}
    >
      {children}
    </Auth0Provider>
  );
};
export default AuthOProviderWithHistory;


