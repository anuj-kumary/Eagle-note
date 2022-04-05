export const initialState = {
  noteList: [],
  archiveList: [],
  trashList: [],
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

    case 'TRASH_NOTE':
      return {
        ...state,
        trashList: [...action.payload.trashList],
        noteList: [...action.payload.noteList],
      };

    case 'DELETE_TRASH':
      return {
        ...state,
        trashList: [...action.payload.trashList],
      };

    case 'SEARCH':
      return {
        ...state,
        search: action.payload.toLowerCase(),
      };

    case 'TIMEFILTER':
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
