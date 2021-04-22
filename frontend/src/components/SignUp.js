import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

const SignUp = () => {
  const [message, setMessage] = useState();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const onSubmit = async (formValues, e) => {
    const newUser = { ...formValues, admin: false };

    setMessage({
      data: 'Sign up is in progress...',
      type: 'alert-warning',
    });

    try {
      const res = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      setMessage({
        data: 'Sign up successfull, redirecting...',
        type: 'alert-success',
      });

      localStorage.setItem('token', data.accessToken);
      //history.push('/workouts')
    } catch (error) {
      setMessage({
        data: error,
        type: 'alert-danger',
      });
    } finally {
      reset();
    }
  };

  return (
    <div>
      <Navbar />
      <fieldset>
        <legend>Sign Up</legend>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              aria-describedby='Enter a username'
              placeholder='Enter a username'
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
            {errors.username && <span style={{ color: 'red' }}>{errors.username.message}</span>}
          </div>

          <div>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              aria-describedby='Enter a password'
              placeholder='Enter a password'
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
            {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              aria-describedby='Enter email address'
              type='text'
              placeholder='Enter email address'
              {...register('email', {
                required: 'Please enter your email address',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email address',
                },
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
            {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
          </div>

          <button type='submit'>Sign Up</button>
          <button>
            <Link to='/login'>Login</Link>
          </button>
        </form>
      </fieldset>
      <Footer />
    </div>
  );
};

export default SignUp;
