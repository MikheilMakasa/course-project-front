import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../constants';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Focusing user on first input
  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
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
      await axios.post(`${api}/auth/register`, inputs);
      navigate('/login');
    } catch (error) {
      setError(error.response.data.error);
    }
    setInputs({ username: '', email: '', password: '' });
  };

  return (
    <div className='auth'>
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
        {error ? <p>{error}</p> : null}
        <span>
          Already have an account? <Link to='/login'>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
