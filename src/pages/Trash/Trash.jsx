import React from 'react';
import { useAuth, useData } from '../../context';
import { Sidebar } from '../../components';
import { deleteTrashNote, restoreTrashNote } from '../../services/Services';

export const Trash = () => {
  const { token } = useAuth();
  const { state, dispatch } = useData();

  const deleteHandler = async (note) => {
    const response = await deleteTrashNote(note._id, token);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: 'DELETE_TRASH',
        payload: { trashList: response.data.trash },
      });
    }
  };

  const restoreHandler = async (note) => {
    const response = await restoreTrashNote(note._id, token, note);
    if (response.status === 200) {
      dispatch({
        type: 'TRASH_NOTE',
        payload: {
          trashList: response.data.trash,
          noteList: response.data.notes,
        },
      });
    }
  };

  return (
    <>
      <div className='note__container'>
        <Sidebar />
        <div className='archive__container'>
          {state.trashList.length < 1 && (
            <h4 className='notify__msg'>No notes in Trash</h4>
          )}
          {state.trashList.map((note) => {
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
                  <span
                    title='Restore'
                    className='footer_icon'
                    onClick={() => restoreHandler(note)}
                  >
                    <i class='bi bi-arrow-clockwise'></i>
                  </span>
                  <span
                    onClick={() => deleteHandler(note)}
                    title='Delete'
                    className='footer_icon'
                  >
                    <i className='icon bi bi-trash'></i>
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
