export const initialState = {
  noteList: [],
  archiveList: [],
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

    default:
      return state;
  }
};
