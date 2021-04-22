import React, { useContext } from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { logout } from '../../context/app-actions';
import AppContext from '../../context/app-context';
import { LOGOUT_SUCCESS } from '../../context/app-types';

const Navbar = () => {
  const { dispatch, isAuthenticated } = useContext(AppContext);

  return (
    <div className='navBar'>
      <header className='innerNav'>
        <ul>
          <li>
            <h1>Just Go With Fit</h1>
          </li>
          <li className='logInBtns'>
            <ul role='list'>
              {!!isAuthenticated ? (
                <>
                  <li>
                    <button type='button' onClick={() => dispatch({ type: LOGOUT_SUCCESS })}>
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
