import React from 'react';
import { NoteCard } from './NoteCard';
import './DisplayNote.css';

export const DisplayNote = () => {
  return (
    <>
      <div className='card__container'>
        <NoteCard />
      </div>
    </>
  );
};
