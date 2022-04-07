import { useEffect } from 'react';
import { useAuth, useData } from '../../context';
import { postArchiveNote, trashNote } from '../../services/Services';
import { searchFilter, sortByDate } from '../../utils/utils';
import './NoteCard.css';

export const NoteCard = ({ setNote }) => {
  const { state, dispatch } = useData();
  const { token } = useAuth();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const editHandler = ({
    _id,
    title,
    content,
    timeCreated,
    backgroundColor,
    tag,
  }) => {
    window.scrollTo({
      top: 0,
    });
    setNote({
      _id,
      title,
      content,
      timeCreated,
      backgroundColor,
      tag,
    });
  };

  const trashHandler = async (note) => {
    const response = await trashNote(note._id, token, note);
    console.log(response);
    if (response.status === 201) {
      dispatch({
        type: 'TRASH_NOTE',
        payload: {
          trashList: response.data.trash,
          noteList: response.data.notes,
        },
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
                        onClick={() => trashHandler(note)}
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
        </div>
      )}

      {unPinnedNotes.length > 0 && (
        <div className='pinnedData'>
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
                        onClick={() => trashHandler(note)}
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
        </div>
      )}
    </div>
  );
};
