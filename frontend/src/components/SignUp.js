import { useForm } from 'react-hook-form';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import AppState from '../context/AppState';
import AppContext from '../context/app-context';
import { login, signUp } from '../context/app-actions';

const SignUp = ({ onSignUp }) => {
  const defaultValues = {
    username: '',
    password: '',
    // confirmPassword: '',
    email: '',
  };
  const { dispatch, isAuthenticated } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (newUser) => {
    const admin = false;
    const user = { ...newUser, admin };
    console.log(user);
    // onSignUp(user);
    dispatch(signUp(user));
    reset(defaultValues);
  };

  return isAuthenticated ? (
    <Redirect to='/' />
  ) : (
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

        {/* <div>
          <label htmlFor='confirmpassword'>Confirm Password</label>
          <input
            id='confirmpassword'
            placeholder='Confirm Password'
            {...register('confirmpassword', {
              required: 'Confirm Password is required.',
            })}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div> */}

        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            placeholder='Email'
            {...register('email', {
              required: 'Email is required.',
            })}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <input type='submit' value='Login' />
      </form>
    </div>
  );
};

SignUp.propTypes = {
  onSignUp: PropTypes.func,
};

export default SignUp;
