export const initialState = {
  noteList: [],
  archiveList: [],
  search: '',
  date: '',
};

export const DataReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        noteList: [...action.payload.noteList],
      };

    case 'ARCHIVE_NOTE':
      return {
        ...state,
        archiveList: [...action.payload.archiveList],
        noteList: [...action.payload.noteList],
      };

    case 'DELETE_ARCHIVE':
      return {
        ...state,
        archiveList: [...action.payload.archiveList],
      };

    case 'SEARCH':
      return {
        ...state,
        search: action.payload.toLowerCase(),
      };

    case 'DATEFILTER':
      console.log(action.payload);
      return {
        ...state,
        date: action.payload,
      };

    default:
      return state;
  }
};
