import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth/auth-context';
import './Home.css';

export const Home = () => {
  const { token } = useAuth();

  return (
    <>
      <div className='hero__container'>
        <div className='hero__left'>
          <h3 className='hero__tagline'>
            <span className='hero__highlite'>Create.</span> Organize. Share.
            <span className='hero__highlite'> Easy</span>
          </h3>
          <p className='hero__para'>
            Remember everything important. A central place for your notes,
            ideas, lists and reminders.
          </p>
          <Link to={token ? '/note' : '/login'} className='btn link'>
            Try Now
          </Link>
        </div>
        <div className='hero__right'>
          <img
            className='img-res'
            src='images/background.png'
            alt='background'
          />
        </div>
      </div>
    </>
  );
};
