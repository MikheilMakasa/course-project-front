import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { api } from '../constants';

const Menu = ({ cat, currentPostId }) => {
  const [posts, setPosts] = useState([]);

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
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className='post' key={post.id}>
          <img src={post.img} alt={post.title} />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
