import React from 'react';
import { Main, Sidebar } from '../../components';
import '../Note/Note.css';

export const Note = () => {
  return (
    <>
      <div className='note__container'>
        <Sidebar />
        <Main />
      </div>
    </>
  );
};
