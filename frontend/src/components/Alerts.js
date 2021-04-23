import React, { Fragment, useContext, useEffect } from 'react';
import { useAlert } from 'react-alert';
import AppContext from '../context/app-context';

const Alert = () => {
  const alert = useAlert();

  const { messages, errors } = useContext(AppContext);

  useEffect(() => {
    if (errors.msg) {
      if (errors.status == 500) {
        alert.error('Server Error: Please try again');
      } else {
        alert.error(errors.msg);
      }
    }
  }, [errors]);

  return <Fragment />;
};

export default Alert;
