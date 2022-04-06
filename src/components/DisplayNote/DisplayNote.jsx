import React from 'react';
import { NoteCard } from './NoteCard';
import './DisplayNote.css';

export const DisplayNote = ({ setNote }) => {
  return (
    <>
      <div className='note__container'>
        <NoteCard setNote={setNote} />
      </div>
    </>
  );
};
