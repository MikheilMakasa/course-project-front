import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import { api } from '../constants';
import { AuthContext } from '../context/authContext';
import Spinner from 'react-bootstrap/esm/Spinner';

const Single = () => {
  const [post, setPost] = useState({});
  const [liked, setLiked] = useState(false);
  const { loading, setLoading } = useContext(AuthContext);

  const location = useLocation();
  const postId = location.pathname.split('/')[2];
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/posts/${postId}`);

        setPost(res.data);
        const isPostLiked = Boolean(
          res.data.likes.find((data) => data.likeUserId === currentUser.id)
        );

        setLiked(isPostLiked);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${api}/posts/${postId}`, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      await axios.post(
        `${api}/posts/${postId}/like`,
        {},
        { withCredentials: true }
      );

      setLiked(!liked);

      if (liked) {
        setPost({ ...post, likes_count: post.likes_count - 1 });
      } else {
        setPost({ ...post, likes_count: post.likes_count + 1 });
      }
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
      {loading && (
        <div className='spinner'>
          <Spinner animation='border' variant='primary' />
        </div>
      )}
      {!loading && (
        <>
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
                    style={{
                      color: 'black',
                      fontSize: '20px',
                      cursor: 'pointer',
                    }}
                    onClick={handleDelete}
                  ></i>
                </div>
              ) : null}
              {currentUser?.username ? (
                <div className='like'>
                  <span>
                    {post.likes_count}{' '}
                    <i
                      className={liked ? '"bi bi-star-fill' : '"bi bi-star'}
                      onClick={handleLike}
                    ></i>{' '}
                  </span>
                </div>
              ) : (
                <div className='like'>
                  <span>
                    {post.likes_count} <i className='bi bi-star-fill'></i>
                  </span>
                </div>
              )}
            </div>
            <h1>{post?.title}</h1>
            <p style={{ textAlign: 'justify' }}>{getText(post?.description)}</p>
          </div>
          <Menu cat={post.cat} currentPostId={postId} />
        </>
      )}
    </div>
  );
};

export default Single;
