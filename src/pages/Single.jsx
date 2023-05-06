import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useLocation } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import { api } from '../constants';
import { AuthContext } from '../context/authContext';

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const postId = location.pathname.split('/')[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${api}/posts/${postId}`);
        console.log(res.data);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [postId]);
  return (
    <div className='single'>
      <div className='content'>
        <img src={post?.img} alt='post' />
        <div className='user'>
          <img
            src='https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHw%3D&w=1000&q=80'
            alt='user'
          />
          <div className='info'>
            <span>{post?.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post?.username ? (
            <div className='edit'>
              <Link to={`/write?edit=2`}>
                <i
                  className='bi bi-pencil-fill'
                  style={{
                    color: 'black',
                    fontSize: '20px',
                    cursor: 'pointer',
                  }}
                ></i>
              </Link>

              <i
                className='bi bi-trash-fill'
                style={{ color: 'black', fontSize: '20px', cursor: 'pointer' }}
              ></i>
            </div>
          ) : null}
        </div>
        <h1>{post?.title}</h1>
        {post?.description}
      </div>
      <Menu />
    </div>
  );
};

export default Single;
