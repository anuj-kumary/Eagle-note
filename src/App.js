import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components';
import { Login, Signup } from './pages/Auth';
import { Label } from './pages/Label/Label';
import { Home } from './pages/Home/Home';
import { Archive } from './pages/Archive/Archive';
import { useAuth } from './context';

function App() {
  const { token } = useAuth();
  return (
    <>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/archive' element={token ? <Archive /> : <Login />} />
          <Route path='/label' element={token ? <Label /> : <Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
