import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../constants';
import { AuthContext } from '../context/authContext';
import Spinner from 'react-bootstrap/esm/Spinner';
import { toast } from 'react-toastify';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { loading, setLoading } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Focusing user on first input
  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  // Regular expressions for validation
  const nameRegex = /^.{5,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{5,}$/;

  // Setting input fields
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(null);
  };

  // Submitting form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = inputs;

    if (!nameRegex.test(username)) {
      setError('Please enter a valid username.');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        'Please enter a valid password. Password must contain at least 8 characters, including a letter and a number.'
      );
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${api}/auth/register`, inputs);
      navigate('/login');
      toast.success('User registered successfully');
    } catch (error) {
      setError(error.response.data.error);
    }
    setInputs({ username: '', email: '', password: '' });
    setLoading(false);
  };

  return (
    <div className='auth'>
      {loading && (
        <div className='spinner'>
          <Spinner animation='border' variant='primary' />
        </div>
      )}
      {!loading && (
        <>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              required
              type='text'
              placeholder='Username'
              onChange={handleChange}
              name='username'
              value={inputs.username}
              ref={nameRef}
            />
            <input
              required
              type='email'
              placeholder='Email'
              onChange={handleChange}
              name='email'
              value={inputs.email}
            />
            <input
              required
              type='password'
              placeholder='Password'
              onChange={handleChange}
              name='password'
              value={inputs.password}
            />
            <button type='submit'>Register</button>
            {error ? <p style={{ maxWidth: '300px' }}>{error}</p> : null}
            <span>
              Already have an account? <Link to='/login'>Login</Link>
            </span>
            <Link className='link' to={'/'}>
              <div
                style={{
                  textAlign: 'center',
                  color: '#ffc961',
                  marginTop: '10px',
                  fontWeight: '500',
                }}
              >
                Back to Home
              </div>
            </Link>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
