import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/auth-context';
import { useData } from '../../context/Data/data-context';
import { postNotes } from '../../services/Services';
import { DisplayNote } from '../DisplayNote/DisplayNote';
import './Main.css';

export const Main = () => {
  const [expand, setExpand] = useState(false);
  const { token } = useAuth();
  const { dispatch } = useData();
  const date = new Date();
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: '',
    content: '',
    backgroundColor: '',
    timeCreated: `${date.getDate()} - 
      ${date.getMonth() + 1} -
      ${date.getFullYear()}`,
  });

  const showNote = () => {
    setExpand(true);
  };

  const hideNote = () => {
    setExpand(false);
  };

  const clickHandler = async () => {
    if (!token) {
      navigate('/login');
    }
    const response = await postNotes({
      note: note,
      encodedToken: token,
    });
    console.log(response);
    if (response.status === 201) {
      dispatch({
        type: 'ADD_NOTE',
        payload: { noteList: response.data.notes },
      });
    }
  };

  return (
    <>
      <main className='main__container'>
        <div className='note'>
          {expand ? (
            <div className='notes'>
              <input
                className='note__heading'
                type='text'
                placeholder='Enter a Title'
                name='title'
                value={note.title}
                onChange={(e) =>
                  setNote({
                    ...note,
                    title: e.target.value,
                  })
                }
              ></input>
              <span className='note__pinned'>
                <i className='fas fa-thumbtack'></i>
              </span>
            </div>
          ) : null}

          <textarea
            className='note__content'
            name='content'
            placeholder='Enter a Notes'
            autoComplete='off'
            value={note.content}
            onChange={(e) =>
              setNote({
                ...note,
                content: e.target.value,
              })
            }
            onClick={showNote}
            onDoubleClick={hideNote}
          ></textarea>
          {expand ? (
            <footer className='footer'>
              <span className='note__button'>
                <i className='note__delete fas fa-trash'></i>
                <input
                  value={note.backgroundColor}
                  className='note__color'
                  type='color'
                  onChange={(e) =>
                    setNote({
                      ...note,
                      backgroundColor: e.target.value,
                    })
                  }
                />
              </span>
              <span onClick={clickHandler} className='note__add'>
                Add
              </span>
            </footer>
          ) : null}
        </div>
        <DisplayNote />
      </main>
    </>
  );
};
