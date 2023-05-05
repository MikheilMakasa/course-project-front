import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const posts = [
    {
      id: 1,
      title: 'Post 1',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere erat a ante venenatis dapibus posuere velit aliquet.',
      img: 'https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHw%3D&w=1000&q=80',
    },
    {
      id: 2,
      title: 'Post 2',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere erat a ante venenatis dapibus posuere velit aliquet.',
      img: 'https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHw%3D&w=1000&q=80',
    },
    {
      id: 3,
      title: 'Post 3',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere erat a ante venenatis dapibus posuere velit aliquet.',
      img: 'https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHw%3D&w=1000&q=80',
    },
    {
      id: 4,
      title: 'Post 4',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere erat a ante venenatis dapibus posuere velit aliquet.',
      img: 'https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHw%3D&w=1000&q=80',
    },
  ];
  return (
    <div className='home'>
      <div className='posts'>
        {posts.map((post) => (
          <div key={post.id} className='post'>
            <div className='img'>
              <img src={post.img} alt={post.title} />
            </div>
            <div className='content'>
              <Link className='link' to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{post.desc}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
