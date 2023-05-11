import { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../constants';
import axios from 'axios';
import moment from 'moment';
import UploadWidget from '../components/UploadWidget';
import { AuthContext } from '../context/authContext';
import Spinner from 'react-bootstrap/esm/Spinner';
import { toast } from 'react-toastify';

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.description || '');
  const [title, setTitle] = useState(state?.title || '');
  const [cat, setCat] = useState(state?.cat || 'art');
  const { loading, setLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  const [imageURL, setImageURL] = useState(state?.img || null);

  const handleImageUpload = (url) => {
    setImageURL(url);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const postData = {
        title,
        description: value,
        cat,
        image: imageURL,
        date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      };

      if (state) {
        await axios.put(`${api}/posts/${state.id}`, postData, config);
      } else {
        await axios.post(`${api}/posts/`, postData, config);
      }

      navigate('/');
      toast.success('Posted successfully');
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }

    setLoading(false);
  };

  return (
    <div className='add'>
      {loading && (
        <div className='spinner'>
          <Spinner animation='border' variant='primary' />
        </div>
      )}
      {!loading && (
        <>
          <div className='content'>
            <input
              type='text'
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <div className='editorContainer'>
              <ReactQuill
                className='editor'
                theme='snow'
                value={value}
                onChange={setValue}
              />
            </div>
          </div>
          <div className='menu'>
            <div className='item'>
              <h1>Publish</h1>
              <span>
                <b>Status:</b> Draft
              </span>
              <span>
                <b>Visibility:</b> Public
              </span>
              <div
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                }}
              >
                <UploadWidget handleImageUpload={handleImageUpload} />
                {/* Render the image preview */}

                {imageURL && (
                  <div>
                    <img
                      style={{
                        height: '30px',
                        borderRadius: '5px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      src={imageURL}
                      alt='Uploaded'
                    />
                  </div>
                )}
              </div>
              <div className='buttons'>
                <button onClick={handleClick}>Publish</button>
              </div>
            </div>
            <div className='item'>
              <h1>Category</h1>
              <div className='cat'>
                <input
                  checked={cat === 'art'}
                  type='radio'
                  name='cat'
                  value='art'
                  id='art'
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor='art'>Art</label>
              </div>
              <div className='cat'>
                <input
                  checked={cat === 'science'}
                  type='radio'
                  name='cat'
                  value='science'
                  id='science'
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor='Science'>Science</label>
              </div>
              <div className='cat'>
                <input
                  checked={cat === 'games'}
                  type='radio'
                  name='cat'
                  value='games'
                  id='games'
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor='games'>Games</label>
              </div>
              <div className='cat'>
                <input
                  checked={cat === 'movies'}
                  type='radio'
                  name='cat'
                  value='movies'
                  id='movies'
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor='movies'>Movies</label>
              </div>
              <div className='cat'>
                <input
                  checked={cat === 'design'}
                  type='radio'
                  name='cat'
                  value='design'
                  id='design'
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor='design'>Design</label>
              </div>
              <div className='cat'>
                <input
                  checked={cat === 'food'}
                  type='radio'
                  name='cat'
                  value='food'
                  id='food'
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor='food'>Food</label>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Write;
