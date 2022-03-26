import { Route, Routes } from 'react-router-dom';
import Mockman from 'mockman-js';
import { Navbar } from './components';
import { Login, Signup } from './pages/Auth';
import { Home } from './pages/Home/Home';

function App() {
  return (
    <>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/mockman' element={<Mockman />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
