import React from 'react';
import { useAuth, useData } from '../../context';
import { deleteNote, postArchiveNote } from '../../services/Services';
import { searchFilter, sortByDate } from '../../utils/utils';
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
    tag,
  }) => {
    setNote({
      _id,
      title,
      content,
      timeCreated,
      backgroundColor,
      tag,
    });
  };

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

  let filterData = searchFilter(state.noteList, state.search);
  filterData = sortByDate(state.noteList, state.date);

  const pinnedData = filterData.filter((item) => item.isPinned);
  const unPinnedNotes = filterData.filter((item) => !item.isPinned);
  console.log(pinnedData);

  return (
    <>
      {pinnedData.length > 0 && (
        <div>
          <h4>Pinned Notes</h4>
          {pinnedData.map((note) => {
            const {
              _id,
              title,
              content,
              timeCreated,
              backgroundColor,
              tag,
              isPinned,
            } = note;
            return (
              <div
                style={{ backgroundColor: backgroundColor }}
                key={_id}
                className='card card__note'
              >
                <header className='card__heading'>
                  {title}
                  <span
                    onClick={() =>
                      dispatch({
                        type: 'PINNED',
                        payload: _id,
                      })
                    }
                    className='note__pin'
                  >
                    <i
                      className={isPinned ? 'bi bi-pin-fill' : 'bi bi-pin'}
                    ></i>
                  </span>
                </header>
                <p className='card__desc'>{content}</p>
                <p className='card__place'>Created At {timeCreated}</p>
                {tag === '' ? null : <p className='card__label'> {tag}</p>}
                <footer className='card__icon card__footer'>
                  <span title='Delete' className='footer_icon'>
                    <i
                      onClick={() => deleteHandler(note)}
                      className='icon bi bi-trash'
                    ></i>
                  </span>
                  <span title='Edit' className='footer_icon'>
                    <i
                      onClick={() => editHandler(note)}
                      className='icon bi bi-pencil-square'
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
            );
          })}
        </div>
      )}

      {unPinnedNotes.length > 0 && (
        <div>
          <h4>Others</h4>
          {unPinnedNotes.map((note) => {
            const {
              _id,
              title,
              content,
              timeCreated,
              backgroundColor,
              tag,
              isPinned,
            } = note;
            return (
              <div
                style={{ backgroundColor: backgroundColor }}
                key={_id}
                className='card card__note'
              >
                <header className='card__heading'>
                  {title}
                  <span
                    onClick={() =>
                      dispatch({
                        type: 'PINNED',
                        payload: _id,
                      })
                    }
                    className='note__pin'
                  >
                    <i
                      className={isPinned ? 'bi bi-pin-fill' : 'bi bi-pin'}
                    ></i>
                  </span>
                </header>
                <p className='card__desc'>{content}</p>
                <p className='card__place'>Created At {timeCreated}</p>
                {tag === '' ? null : <p className='card__label'> {tag}</p>}
                <footer className='card__icon card__footer'>
                  <span title='Delete' className='footer_icon'>
                    <i
                      onClick={() => deleteHandler(note)}
                      className='icon bi bi-trash'
                    ></i>
                  </span>
                  <span title='Edit' className='footer_icon'>
                    <i
                      onClick={() => editHandler(note)}
                      className='icon bi bi-pencil-square'
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
            );
          })}
        </div>
      )}
    </>
  );
};
