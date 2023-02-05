import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import {useAuth} from "../contexts/AuthContext";

export const AccountActivationPage: React.FC = () => {
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const { activate } = useAuth();
  const { activationToken } = useParams();

  useEffect(() => {
    activate(activationToken)
      .catch(error => {
        console.log(error);
        setError(error.response?.data?.message || `Wrong activation link`);
      })
      .finally(() => {
        setDone(true);
      });
  }, [activate, activationToken]);

  if (!done) {
    return <Loader />
  }

  return (
    <>
      <h1 className="title">Account activation</h1>

      {error ? (
        <p className="notification is-danger is-light">
          {error}
        </p>
      ) : (
        <p className="notification is-success is-light">
          Your account is now active
        </p>
      )}
    </>
  );
};