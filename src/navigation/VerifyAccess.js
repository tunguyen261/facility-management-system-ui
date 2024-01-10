import React from 'react';
import useVerifyAccess from 'hooks/useVerifyAccess';
import { Redirect, useLocation } from 'react-router-dom';
import { useAuth } from 'context/AuthProvider';
// import CALoader from 'components/shared/CALoader';
import loading from 'assets/ca_image/loading.gif';
import styled from 'styled-components';

const DefaultLayout = React.lazy(() => import('../layouts/DefaultLayout'));

const LoadingImage = styled.img`
  display: block;
  width: 10%;
  height: 10%;
  margin: 0 auto;
  background-color: transparent;
`;

const BackgroundLoading = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, rgba(221,128,53,1) 0%, rgba(221,128,53,1) 34%, rgba(94,55,23,1) 96%);
`;

function VerifyAccess(props) {
  const location = useLocation();
  const { initializing } = useAuth();
  const { verify } = useVerifyAccess(props);

  const _render = () => {
    let _verify = verify(null, location);
    // _verify = true ; // bùa
    return _verify === true ? (
      <DefaultLayout {...props} />
    ) : false === _verify ? (
      <Redirect to='/login' />
    ) : (
      <Redirect to={`/500/${_verify}`} />
    );
  };

  if (initializing) {
    return (
      <BackgroundLoading>
        <LoadingImage src={loading} />
      </BackgroundLoading>
    );
  } else {
    return <React.Fragment>{_render()}</React.Fragment>;
  }
}

export default VerifyAccess;
