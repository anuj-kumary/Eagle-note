import React from 'react';
import { DisplayNote } from '../DisplayNote/DisplayNote';
import './Main.css';

export const Main = () => {
  return (
    <>
      <main className='main__container'>
        <div className='note'>
          <div className='note__heading'>
            <textarea placeholder='Title' className='heading__input'></textarea>
            <textarea
              placeholder='Take a note...'
              className='note__body'
            ></textarea>
          </div>
        </div>
        <DisplayNote />
      </main>
    </>
  );
};
