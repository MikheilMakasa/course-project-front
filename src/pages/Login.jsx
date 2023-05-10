import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/authContext';
import Spinner from 'react-bootstrap/esm/Spinner';
import { toast } from 'react-toastify';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const { loading, setLoading } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Focusing user on first input
  const nameRef = useRef();
  useEffect(() => {
    nameRef?.current.focus();
  }, []);

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

    try {
      setLoading(true);
      await login(inputs);
      navigate('/');
      toast.success('Logged in successfully');
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
    setInputs({ username: '', password: '' });
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
          <h1>Login</h1>
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
              type='password'
              placeholder='Password'
              onChange={handleChange}
              name='password'
              value={inputs.password}
            />
            <button type='submit'>Login</button>
            {error ? <p>{error}</p> : null}
            <span>
              Don't have an account? <Link to='/register'>Register</Link>
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

export default Login;
