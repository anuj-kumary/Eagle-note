export const initialState = {
  noteList: [],
};

export const DataReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        noteList: [...action.payload.noteList],
      };

    default:
      return state;
  }
};
