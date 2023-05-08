import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import { api } from '../constants';
import { AuthContext } from '../context/authContext';

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const postId = location.pathname.split('/')[2];
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${api}/posts/${postId}`);

        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${api}/posts/${postId}`, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <div className='single'>
      <div className='content'>
        <img src={post?.img} alt='post' />
        <div className='user'>
          {post?.userImg && <img src={post?.userImg} alt='user' />}
          <div className='info'>
            <span>{post?.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post?.username ? (
            <div className='edit'>
              <Link to={`/write?edit=2`} state={post}>
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
                onClick={handleDelete}
              ></i>
            </div>
          ) : null}
        </div>
        <h1>{post?.title}</h1>
        <p style={{ textAlign: 'justify' }}>{getText(post?.description)}</p>
      </div>
      <Menu cat={post.cat} currentPostId={postId} />
    </div>
  );
};

export default Single;
