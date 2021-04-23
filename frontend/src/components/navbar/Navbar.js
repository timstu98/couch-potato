import React, { useContext } from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import AppContext from '../../context/app-context';
import { LOGOUT_SUCCESS, CLEAR_WORKOUTS } from '../../context/actions/types';

const Navbar = () => {
  const { auth, dispatch } = useContext(AppContext);
  const { isAuthenticated } = auth;

  const logoutUser = () => {
    dispatch({ type: CLEAR_WORKOUTS });
    dispatch({ type: LOGOUT_SUCCESS });
  };

  return (
    <div className='navBar'>
      <header className='innerNav'>
        <ul>
          <li>
            <NavLink to='/'>
              <h1>Just Go With Fit</h1>
            </NavLink>
          </li>
          <li className='logInBtns'>
            <ul role='list'>
              {!!isAuthenticated ? (
                <>
                  <li>
                    <NavLink to='/preferences'>Preferences</NavLink>
                  </li>
                  <li>
                    <button id='logOutBtn' type='button' onClick={() => logoutUser()}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to='/signup'>Sign Up</NavLink>
                  </li>
                  <li className='logIn'>
                    <NavLink to='/login'>Log In</NavLink>
                  </li>
                </>
              )}
            </ul>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Navbar;
