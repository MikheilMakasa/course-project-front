import React, { useContext } from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
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
          <Link className='link' to='/?cat=science'>
            <h5>SCIENCE</h5>
          </Link>
          <Link className='link' to='/?cat=technology'>
            <h5>TECHNOLOGY</h5>
          </Link>
          <Link className='link' to='/?cat=cinema'>
            <h5>CINEMA</h5>
          </Link>
          <Link className='link' to='/?cat=design'>
            <h5>DESIGN</h5>
          </Link>
          <Link className='link' to='/?cat=food'>
            <h5>FOOD</h5>
          </Link>
        </div>
        <div className='login'>
          <span className='user'>{currentUser?.username}</span>
          {currentUser ? (
            <span className='link-login' onClick={logout}>
              Logout
            </span>
          ) : (
            <Link className='link-login' to='/login'>
              <p>Login</p>
            </Link>
          )}
          {currentUser?.username && (
            <span className='write'>
              <Link className='link-login' to='/write'>
                Write a review
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
