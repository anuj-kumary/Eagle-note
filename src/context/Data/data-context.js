import { createContext, useContext, useReducer, useEffect } from 'react';
import { DataReducer, initialState } from '../../reducer/DataReducer';
import { useAuth } from '../auth/auth-context';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);

  const [showSidebar, setShowSidebar] = useState(false);
  const { token } = useAuth();

  const sidebarClickHandler = () => {
    setShowSidebar((sidebar) => !sidebar);
  };

  const noteResp = getNotes({ encodedToken: token });
  if (noteResp.status === 200 || noteResp.status === 201) {
    dispatch({
      type: 'ADD_NOTE',
      payload: { noteList: noteResp.data.notes },
    });
  }

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
    <DataContext.Provider
      value={{
        state,
        dispatch,
        showSidebar,
        setShowSidebar,
        sidebarClickHandler,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { useData, DataProvider };
