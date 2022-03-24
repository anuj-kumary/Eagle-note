import React from 'react';
import './NoteCard.css';

export const NoteCard = () => {
  return (
    <>
      <div className='card card__note'>
        <header className='card__heading'>Upcoming Submission</header>
        <p className='card__desc'>
          I have to submit one macro project and one mini project by this 2
          april
        </p>
        <p className='card__place'>Created date</p>
      </div>
      <div className='card card__note'>
        <header className='card__heading'>Upcoming Submission</header>
        <p className='card__desc'>
          I have to submit one macro project and one mini project by this 2
          april
        </p>
        <p className='card__place'>Created date</p>
      </div>
      <div className='card card__note'>
        <header className='card__heading'>Upcoming Submission</header>
        <p className='card__desc'>
          I have to submit one macro project and one mini project by this 2
          april
        </p>
        <p className='card__place'>Created date</p>
      </div>
    </>
  );
};
