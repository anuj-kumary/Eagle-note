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
      return {
        ...state,
        date: action.payload,
      };

    case 'PINNED':
      return {
        ...state,
        noteList: state.noteList.map((item) => {
          return action.payload === item._id
            ? { ...item, isPinned: !item.isPinned }
            : item;
        }),
      };

    default:
      return state;
  }
};
