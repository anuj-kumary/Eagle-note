import React from 'react';
import { Sidebar } from '../../components';
import { useAuth, useData } from '../../context';
import { deleteArchiveNote, restoreArchiveNote } from '../../services/Services';
import './Archive.css';

export const Archive = () => {
  const { state, dispatch } = useData();
  const { token } = useAuth();

  const restoreArchiveHandler = async (note) => {
    const response = await restoreArchiveNote(note._id, token, note);
    if (response.status === 200) {
      dispatch({
        type: 'ARCHIVE_NOTE',
        payload: {
          archiveList: response.data.archives,
          noteList: response.data.notes,
        },
      });
    }
  };

  const deleteArchiveHandler = async (note) => {
    const response = await deleteArchiveNote(note._id, token);
    if (response.status) {
      dispatch({
        type: 'DELETE_ARCHIVE',
        payload: {
          archiveList: response.data.archives,
        },
      });
    }
  };

  return (
    <>
      <div className='note__container'>
        <Sidebar />
        <div className='archive__container'>
          {state.archiveList.map((note) => {
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
                <footer className='card__icon card__footer'>
                  <span title='Delete' className='footer_icon'>
                    <i
                      onClick={() => deleteArchiveHandler(note)}
                      className='icon bi bi-trash'
                    ></i>
                  </span>
                  <span title='Edit' className='footer_icon'>
                    <i className='icon bi bi-pencil-square'></i>
                  </span>
                  <span title='Archive' className='footer_icon'>
                    <i
                      onClick={() => restoreArchiveHandler(note)}
                      className='bi bi-arrow-up-square-fill'
                    ></i>
                  </span>
                </footer>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
