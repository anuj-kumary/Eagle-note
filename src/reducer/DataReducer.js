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

    case 'ARCHIEVE_NOTE':
      return {
        ...state,
        archiveList: [...action.payload.archiveList],
        noteList: [...action.payload.noteList],
      };

    case 'DELETE_ARCHIEVE':
      return {
        ...state,
        archiveList: [...action.payload.archiveList],
      };

    default:
      return state;
  }
};
