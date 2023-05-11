import React, { useContext } from 'react';
import logo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Button from 'react-bootstrap/Button';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to='/'>
            <img src={logo} alt='ureview' />
          </Link>
        </div>
        <div className='links'>
          <Link className='link' to='/?cat=art'>
            <h5>ART</h5>
          </Link>
          <Link className='link' to='/?cat=tech'>
            <h5>TECH</h5>
          </Link>
          <Link className='link' to='/?cat=games'>
            <h5>GAMES</h5>
          </Link>
          <Link className='link' to='/?cat=movies'>
            <h5>MOVIES</h5>
          </Link>
          <Link className='link' to='/?cat=design'>
            <h5>DESIGN</h5>
          </Link>
          <Link className='link' to='/?cat=food'>
            <h5>FOOD</h5>
          </Link>
        </div>
        <div className='login'>
          {currentUser?.username && (
            <span className='user'>{currentUser?.username}</span>
          )}
          {currentUser ? (
            <Button variant='warning' className='write' onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button
              variant='warning'
              className='write'
              style={{ width: '90%' }}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}
          {currentUser?.username && (
            <Button
              variant='warning'
              className='write'
              onClick={() => navigate('/write')}
            >
              Write a review
            </Button>
          )}
          {currentUser?.isAdmin === 'true' && (
            <Button
              variant='warning'
              className='write'
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
