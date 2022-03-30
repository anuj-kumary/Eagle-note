import { createContext, useContext, useReducer, useEffect } from 'react';
import { DataReducer, initialState } from '../../reducer/DataReducer';
import { useAuth } from '../auth/auth-context';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);
  const { token, user } = useAuth();
  useEffect(() => {
    if (!token) {
      dispatch({
        type: 'ADD_NOTE',
        payload: { noteList: [] },
      });
    }
    if (token) {
      dispatch({
        type: 'ADD_NOTE',
        payload: { noteList: user.notes },
      });
      dispatch({
        type: 'ARCHIVE_NOTE',
        payload: { archiveList: user.archives, noteList: user.notes },
      });
    }
  }, [token]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { useData, DataProvider };
