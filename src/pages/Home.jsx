import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../constants';
import 'bootstrap-icons/font/bootstrap-icons.css';
import moment from 'moment';
import 'moment-timezone';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(AuthContext);

  const cat = useLocation().search;
  const timezone = 'Asia/Tbilisi';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${api}/posts${cat}`);
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <div className='home'>
      {loading && (
        <div className='spinner'>
          <Spinner animation='border' variant='primary' />
        </div>
      )}
      {!loading && (
        <div className='posts'>
          <div className='search'>
            <input
              type='text'
              placeholder='Search by title...'
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          {filteredPosts.length === 0 && (
            <div className='no-posts'>
              <h2>No matching posts found...</h2>
            </div>
          )}
          {filteredPosts.map((post) => (
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
                <br />

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
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <p style={{ fontSize: '14px', color: 'gray' }}>
                    Posted:{' '}
                    {moment(post.date).tz(timezone).format('DD MMMM YYYY')}
                  </p>
                  <p style={{ fontSize: '16px', color: 'gray' }}>
                    Tag: {post.cat.toUpperCase()}
                  </p>
                </div>
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
                height: '50vh',
              }}
            >
              <h2>No posts available...</h2>
              <p>Be the first one to write 😄</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
