import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { api } from '../constants';
import { useNavigate } from 'react-router-dom';

const Menu = ({ cat, currentPostId }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${api}/posts/?cat=${cat}`);
        const filteredData = res.data.filter(
          (post) => post.id !== Number(currentPostId)
        );

        setPosts(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [cat, currentPostId]);

  return (
    <div className='menu'>
      <h1>Other posts you may like:</h1>
      {posts.map((post) => (
        <div className='post' key={post.id}>
          <img src={post.img} alt={post.title} />
          <h2>{post.title}</h2>
          <button onClick={() => navigate(`/post/${post.id}`)}>
            Read More
          </button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
