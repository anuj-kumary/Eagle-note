import React from 'react';
import { NoteCard } from './NoteCard';
import './DisplayNote.css';

export const DisplayNote = ({ setNote }) => {
  return (
    <>
      <div className='card__container'>
        <NoteCard setNote={setNote} />
      </div>
    </>
  );
};
