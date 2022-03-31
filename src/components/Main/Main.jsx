import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { useData } from '../../context';
import { postNotes, editNote } from '../../services/Services';
import { DisplayNote } from '../../components';
import './Main.css';

export const Main = () => {
  const [expand, setExpand] = useState(false);
  const { token } = useAuth();
  const { dispatch } = useData();
  const date = new Date();
  const navigate = useNavigate();

  const [note, setNote] = useState({
    _id: '',
    title: '',
    content: '',
    backgroundColor: '#111111',
    timeCreated: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    compareTime: date.getTime(),
    tag: '',
    isPinned: false,
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
    if (!note._id) {
      let newNote = { ...note, tags: [note.tag] };

      const response = await postNotes({
        note: newNote,
        encodedToken: token,
      });

      if (response.status === 201) {
        dispatch({
          type: 'ADD_NOTE',
          payload: {
            noteList: response.data.notes,
          },
        });
      }
    } else {
      let newNote = { ...note, tags: [note.tag] };
      const editResponse = await editNote(note._id, token, newNote);
      if (editResponse.status === 201) {
        dispatch({
          type: 'ADD_NOTE',
          payload: { noteList: editResponse.data.notes },
        });
      }
    }

    setNote({
      _id: '',
      title: '',
      content: '',
      timeCreated: `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`,
      compareTime: date.getTime(),
      backgroundColor: '#111111',
      tag: '',
    });
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
                <span>
                  <input
                    type='text'
                    className='note__label'
                    placeholder='Label'
                    value={note.tag}
                    onChange={(e) =>
                      setNote({
                        ...note,
                        tag: e.target.value,
                      })
                    }
                  />
                </span>
              </span>
              <span onClick={clickHandler} className='note__add'>
                Add
              </span>
            </footer>
          ) : null}
        </div>

        <DisplayNote setNote={setNote} />
      </main>
    </>
  );
};
