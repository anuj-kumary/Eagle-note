import { Sidebar } from '../../components';
import React from 'react';
import { useAuth, useData } from '../../context';
import { deleteNote, postArchiveNote } from '../../services/Services';
import './Label.css';

export const Label = () => {
  const { state, dispatch } = useData();
  const { token } = useAuth();

  const tags = state.noteList.reduce((acc, curr) => {
    return acc.concat(
      curr.tags.filter((element) => {
        return !acc.some((item) => item === element || element === '');
      })
    );
  }, []);

  const deleteHandler = async (note) => {
    const response = await deleteNote(note._id, token);
    if (response.status === 200 || response.status === 201) {
      dispatch({
        type: 'ADD_NOTE',
        payload: { noteList: response.data.notes },
      });
    }
  };

  const archiveHandler = async (note) => {
    const response = await postArchiveNote(note._id, token, note);
    if (response.status === 201) {
      dispatch({
        type: 'ARCHIVE_NOTE',
        payload: {
          archiveList: response.data.archives,
          noteList: response.data.notes,
        },
      });
    }
  };

  return (
    <>
      <div className='note__container'>
        <Sidebar />
        <div className='label__container'>
          {tags.length > 0 &&
            tags.map((element) => {
              const tagNote = state.noteList.filter(
                (item) => item.tags[0] === element
              );
              return element === '' ? null : (
                <div className='label__note'>
                  <h1 className='sidebar__heading'>{element}</h1>
                  <div className='label'>
                    {tagNote.map((note) => (
                      <div
                        style={{ backgroundColor: note.backgroundColor }}
                        key={note._id}
                        className='card card__note'
                      >
                        <header className='card__heading'>{note.title}</header>
                        <p className='card__desc'>{note.content}</p>
                        <p className='card__place'>
                          Created on {note.timeCreated}
                        </p>
                        <footer className='card__icon card__footer'>
                          <span title='Delete' className='footer_icon'>
                            <i
                              onClick={() => deleteHandler(note)}
                              className='icon bi bi-trash'
                            ></i>
                          </span>
                          <span title='Archive' className='footer_icon'>
                            <i
                              onClick={() => archiveHandler(note)}
                              className='icon bi bi-arrow-down-square-fill'
                            ></i>
                          </span>
                        </footer>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
