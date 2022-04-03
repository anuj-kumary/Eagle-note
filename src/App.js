import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components';
import { Login, Signup } from './pages/Auth';
import { Label } from './pages/Label/Label';
import { Archive } from './pages/Archive/Archive';
import { useAuth, useTheme } from './context';
import { Note } from './pages/Note/Note';
import { Home } from './pages/Home/Home';
import { Trash } from './pages/Trash/Trash';
import './index.css';
import { Pagenotfound } from './pages/PageNotFound/PageNotFound';

function App() {
  const { token } = useAuth();
  const { theme } = useTheme();

  return (
    <>
      <div className='app' data-theme={theme}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/note' element={<Note />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/archive' element={token ? <Archive /> : <Login />} />
          <Route path='/label' element={token ? <Label /> : <Login />} />
          <Route path='/trash' element={token ? <Trash /> : <Login />} />
          <Route path='*' element={<Pagenotfound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
