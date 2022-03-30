import { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupServices } from '../../services/Services';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem('login'));
  const [token, setToken] = useState(localStorageToken?.token);
  const localStorageUser = JSON.parse(localStorage.getItem('login'));
  const [user, setUser] = useState(localStorageUser?.user);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchtoken = JSON.parse(localStorage.getItem('login'));
  //   if (fetchtoken) setToken(fetchtoken);
  // }, []);

  const signupUser = async (email, password, name) => {
    try {
      const response = await signupServices({ email, password, name });
      if (response.status === 201) {
        localStorage.setItem(
          'login',
          JSON.stringify({
            token: response.data.encodedToken,
            user: response.data.createdUser,
          })
        );
        setUser(response.data.createdUser);
        setToken(response.data.encodedToken);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ signupUser, setToken, token, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
