import React from 'react';
import { useData } from '../../context/Data/data-context';
import './NoteCard.css';

export const NoteCard = () => {
  const { state } = useData();
  return (
    <>
      {state.noteList.map((note) => {
        const { _id, title, content, timeCreated } = note;
        return (
          <div key={_id} className='card card__note'>
            <header className='card__heading'>{title}</header>
            <p className='card__desc'>{content}</p>
            <p className='card__place'>Created on {timeCreated}</p>
          </div>
        );
      })}
    </>
  );
};
