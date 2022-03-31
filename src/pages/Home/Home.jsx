import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  return (
    <>
      <div className='hero__container'>
        <div className='hero__left'>
          <h3 className='hero__tagline'>
            <span className='hero__highlite'>Create.</span> Organize. Share.
            <span className='hero__highlite'>Easy</span>
          </h3>
          <p className='hero__para'>
            Remember everything important. A central place for your notes,
            ideas, lists and reminderers
          </p>
          <Link to='/note' className='btn link'>
            Try Now For Free
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
