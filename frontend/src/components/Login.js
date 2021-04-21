import { useForm } from 'react-hook-form';
import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ onLogin }) => {
  const defaultValues = {
    username: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (user) => {
    onLogin(user);
    reset(defaultValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            placeholder='Username'
            {...register('username', {
              required: 'Username is required.',
            })}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            placeholder='Password'
            {...register('password', {
              required: 'Password is required.',
            })}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <input type='submit' value='Login' />
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func,
};

export default Login;
