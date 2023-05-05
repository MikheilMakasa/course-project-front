import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Single from './pages/Single';
import Write from './pages/Write';
import SharedLayout from './pages/SharedLayout';
import './style.scss';

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SharedLayout />}>
              <Route index element={<Home />} />
              <Route path='/write' element={<Write />} />
              <Route path='/post/:id' element={<Single />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
