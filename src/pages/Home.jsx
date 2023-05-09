import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../constants';
import 'bootstrap-icons/font/bootstrap-icons.css';
import moment from 'moment';
import Spinner from 'react-bootstrap/esm/Spinner';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${api}/posts${cat}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };
  return (
    <div className='home'>
      <Spinner animation='border' variant='primary' />
      <div className='posts'>
        {posts?.map((post) => (
          <div key={post.id} className='post'>
            <div
              className='img'
              onClick={() => navigate(`/post/${post.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img src={post.img} alt={post.title} />
            </div>
            <div className='content'>
              <Link className='link' to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>

              <p>{getText(post.description).slice(0, 150)}...</p>

              {post.likes_count ? (
                <span className='like'>
                  {post.likes_count} <i className='bi bi-star-fill'></i>
                </span>
              ) : (
                <span className='like'>
                  0 <i className='bi bi-star-fill'></i>
                </span>
              )}
              <br />

              <button onClick={() => navigate(`/post/${post.id}`)}>
                Read More
              </button>
              <br />
              <p style={{ fontSize: '14px', color: 'gray' }}>
                Posted {moment(post.date).fromNow()}
              </p>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <h2>No posts available...</h2>
            <p>Be the first one to write 😄</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
