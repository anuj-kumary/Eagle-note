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
  filterData = sortByDate(filterData, state.date);

  const pinnedData = filterData.filter((item) => item.isPinned);
  const unPinnedNotes = filterData.filter((item) => !item.isPinned);

  return (
    <div className='notes'>
      {pinnedData.length > 0 && (
        <div className='pinnedData'>
          <h4 className='sidebar__heading'>Pinned Notes</h4>
          <div className='pinned__note'>
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
                    <span
                      onClick={() => archiveHandler(note)}
                      title='Archive'
                      className='footer_icon'
                    >
                      <svg
                        className='icon'
                        width='1.7em'
                        height='1.7em'
                        viewBox='0 0 256 256'
                      >
                        <path
                          fill='currentColor'
                          d='m221.4 69.3l-16-32A6 6 0 0 0 200 34H56a6 6 0 0 0-5.4 3.3l-16 32A6.3 6.3 0 0 0 34 72v136a14 14 0 0 0 14 14h160a14 14 0 0 0 14-14V72a6.3 6.3 0 0 0-.6-2.7ZM59.7 46h136.6l10 20H49.7ZM208 210H48a2 2 0 0 1-2-2V78h164v130a2 2 0 0 1-2 2Zm-41.8-64.2a6.1 6.1 0 0 1 0 8.5l-34 33.9a5.8 5.8 0 0 1-8.4 0l-34-33.9a6 6 0 0 1 8.5-8.5l23.7 23.7V104a6 6 0 0 1 12 0v65.5l23.7-23.7a6.1 6.1 0 0 1 8.5 0Z'
                        ></path>
                      </svg>
                    </span>
                  </footer>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* <div className='notes'> */}
      {unPinnedNotes.length > 0 && (
        <div className='unpinnedData'>
          <h4 className='sidebar__heading'>Others</h4>
          <div className='pinned__note'>
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
                    <span
                      onClick={() => archiveHandler(note)}
                      title='Archive'
                      className='footer_icon'
                    >
                      <svg
                        className='icon'
                        width='1.7em'
                        height='1.7em'
                        viewBox='0 0 256 256'
                      >
                        <path
                          fill='currentColor'
                          d='m221.4 69.3l-16-32A6 6 0 0 0 200 34H56a6 6 0 0 0-5.4 3.3l-16 32A6.3 6.3 0 0 0 34 72v136a14 14 0 0 0 14 14h160a14 14 0 0 0 14-14V72a6.3 6.3 0 0 0-.6-2.7ZM59.7 46h136.6l10 20H49.7ZM208 210H48a2 2 0 0 1-2-2V78h164v130a2 2 0 0 1-2 2Zm-41.8-64.2a6.1 6.1 0 0 1 0 8.5l-34 33.9a5.8 5.8 0 0 1-8.4 0l-34-33.9a6 6 0 0 1 8.5-8.5l23.7 23.7V104a6 6 0 0 1 12 0v65.5l23.7-23.7a6.1 6.1 0 0 1 8.5 0Z'
                        ></path>
                      </svg>
                    </span>
                  </footer>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
