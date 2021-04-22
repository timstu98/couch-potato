import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../context/actions/auth';
import AppContext from '../context/app-context';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const Login = () => {
  const { dispatch, auth } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const onSubmit = (user) => {
    dispatch(login(user));
    reset();
  };

  return auth.isAuthenticated ? (
    <Redirect to='/' />
  ) : (
    <div>
      <fieldset>
        <legend>Login</legend>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='formInput'>
            <div className='formWrapper'>
              <label htmlFor='username'>Username</label>
              <input
                id='username'
                aria-describedby='Enter username'
                placeholder='Enter username'
                {...register('username', {
                  required: 'Please enter a username',
                  minLength: {
                    value: 6,
                    message: 'Minimum 6 characters are allowed',
                  },
                  maxLength: {
                    value: 255,
                    message: 'Maximum 255 characters are allowed',
                  },
                })}
              />
            </div>
            {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
          </div>

          <div className='formInput'>
            <div className='formWrapper'>
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                type='password'
                aria-describedby='Enter password'
                placeholder='Enter password'
                {...register('password', {
                  required: 'Please enter a password',
                  minLength: {
                    value: 6,
                    message: 'Minimum 6 characters are allowed',
                  },
                  maxLength: {
                    value: 255,
                    message: 'Maximum 255 characters are allowed',
                  },
                })}
              />
            </div>
            {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
          </div>

          <button type='submit'>Login</button>
          <button>
            <Link to='/signup'>Sign Up</Link>
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default Login;
