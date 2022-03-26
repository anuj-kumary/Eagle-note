import React from 'react';
import { useAuth, useData } from '../../context';
import { deleteNote } from '../../services/Services';
import './NoteCard.css';

export const NoteCard = ({ setNote }) => {
  const { state, dispatch } = useData();
  const { token } = useAuth();

  const editHandler = ({
    _id,
    title,
    content,
    timeCreated,
    backgroundColor,
  }) => {
    setNote({
      _id,
      title,
      content,
      timeCreated,
      backgroundColor,
    });
  };

  const deleteHandler = async (note) => {
    const response = await deleteNote(note._id, token);
    console.log(response);
    if (response.status === 200 || response.status === 201) {
      dispatch({
        type: 'ADD_NOTE',
        payload: { noteList: response.data.notes },
      });
    }
  };

  return (
    <>
      {state.noteList.map((note) => {
        const { _id, title, content, timeCreated, backgroundColor } = note;
        return (
          <div
            style={{ backgroundColor: backgroundColor }}
            key={_id}
            className='card card__note'
          >
            <header className='card__heading'>{title}</header>
            <p className='card__desc'>{content}</p>
            <p className='card__place'>Created on {timeCreated}</p>
            <footer className='card__footer'>
              <button onClick={() => deleteHandler(note)} className='btn'>
                Delete
              </button>
              <button onClick={() => editHandler(note)} className='btn'>
                Edit
              </button>
            </footer>
          </div>
        );
      })}
    </>
  );
};
