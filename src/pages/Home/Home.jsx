import React from 'react';
import { Main, Sidebar } from '../../components';
import './Home.css';

export const Home = () => {
  return (
    <>
      <div className='note__container'>
        <Sidebar />
        <Main />
      </div>
    </>
  );
};
