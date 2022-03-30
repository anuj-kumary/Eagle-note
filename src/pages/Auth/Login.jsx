import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context';
import { loginServices } from '../../services/Services';
import './Auth.css';

export const Login = () => {
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const loginHandler = async (e, setLoginForm, loginForm) => {
    e.preventDefault();
    try {
      let response;
      if (e.target.innerText === 'Login as Guest') {
        setLoginForm({
          email: 'adarshbalika@gmail.com',
          password: 'adarshBalika123',
        });
        response = await loginServices(
          'adarshbalika@gmail.com',
          'adarshBalika123'
        );
      } else
        response = await loginServices(loginForm.email, loginForm.password);
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem(
          'login',
          JSON.stringify({
            token: response.data.encodedToken,
            user: response.data.foundUser,
          })
        );
        setUser(response.data.foundUser);
        setToken(response.data.encodedToken);
        navigate('/note');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='container'>
        <div className='auth__form'>
          <div className='auth__title'>
            <h2 className='heading text__center'>Login</h2>
          </div>
          <div className='input'>
            <label className='label__text'>Email</label>
            <input
              className='input-txt'
              type='email'
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({
                  ...loginForm,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className='input'>
            <label className='label__text'>Password</label>
            <input
              className='input-txt'
              type='password'
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({
                  ...loginForm,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className='input'>
            <label className='label__text input__checkbox'></label>
            <input type='checkbox' />
            <span className='text'>Remember Me</span>
            <Link to='/login' className='auth__forget'>
              Forget your Password?
            </Link>
          </div>

          <div className='btn__signup text__center'>
            <button
              onClick={(e) => loginHandler(e, setLoginForm, loginForm)}
              className='btn '
            >
              Login
            </button>
            <button
              onClick={(e) => loginHandler(e, setLoginForm, loginForm)}
              className='btn'
            >
              Login as Guest
            </button>
          </div>
          <div className='text__center'>
            <Link to='/signup' className='login__link fw__400'>
              Create new account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
