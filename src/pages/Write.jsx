import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../constants';
import axios from 'axios';
import moment from 'moment';

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || '');
  const [title, setTitle] = useState(state?.description || '');
  const [cat, setCat] = useState(state?.cat || '');
  const [image, setImage] = useState(state?.image || null);

  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      state
        ? await axios.put(
            `${api}/posts/${state.id}`,
            {
              title,
              description: value,
              cat,
              image: image ? image : '',
            },
            { withCredentials: true }
          )
        : await axios.post(
            `${api}/posts/`,
            {
              title,
              description: value,
              cat,
              image: image ? image : '',
              date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            },
            { withCredentials: true }
          );
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  // const upload = async () => {

  //   try {
  //     const formData = new FormData();
  //     formData.append('image', image);
  //     const res = await upload.upload

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    <div className='add'>
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
          <div style={{ marginTop: '10px' }}>
            <input
              style={{ display: 'none' }}
              type='file'
              id='file'
              onChange={handleImage}
            />
            <label className='file' htmlFor='file'>
              Upload Image
            </label>
          </div>
          <div className='buttons'>
            <button>Save as a draft</button>
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
              checked={cat === 'technology'}
              type='radio'
              name='cat'
              value='technology'
              id='technology'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor='technology'>Technology</label>
          </div>
          <div className='cat'>
            <input
              checked={cat === 'cinema'}
              type='radio'
              name='cat'
              value='cinema'
              id='cinema'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor='cinema'>Cinema</label>
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
    </div>
  );
};

export default Write;
