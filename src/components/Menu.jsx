import React from 'react';

const Menu = () => {
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
