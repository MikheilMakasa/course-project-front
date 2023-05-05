import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';

const Single = () => {
  return (
    <div className='single'>
      <div className='content'>
        <img
          src='https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHw%3D&w=1000&q=80'
          alt='post'
        />
        <div className='user'>
          <img
            src='https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHw%3D&w=1000&q=80'
            alt='user'
          />
          <div className='info'>
            <span>userName</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className='edit'>
            <Link to={`/write?edit=2`}>
              <i
                className='bi bi-pencil-fill'
                style={{ color: 'black', fontSize: '20px', cursor: 'pointer' }}
              ></i>
            </Link>

            <i
              className='bi bi-trash-fill'
              style={{ color: 'black', fontSize: '20px', cursor: 'pointer' }}
            ></i>
          </div>
        </div>
        <h1>Lorem ipsum dolor sit amet consectetur</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt tempora
          ad architecto quidem totam. Nobis omnis nemo sunt aperiam, modi
          voluptatibus nesciunt reprehenderit cumque ab. Id aliquam, dolores
          vero sequi beatae deleniti, ab voluptate deserunt dolorum velit quae
          sit? Perferendis obcaecati error modi sequi unde, eaque ratione in
          itaque laudantium aliquam autem minima esse. Totam, sunt blanditiis,
          consequuntur molestiae culpa eaque asperiores aspernatur nisi facere,
          odit ipsam accusantium enim porro magnam quidem modi magni? Voluptates
          dicta et corporis consectetur itaque mollitia similique ex, quisquam
          debitis facilis numquam ipsam cupiditate modi, culpa temporibus facere
          at iusto fuga enim neque aut vel.
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, velit
          vero. Error nihil inventore iusto reprehenderit eos adipisci
          aspernatur commodi? Dolore quos autem obcaecati possimus omnis eos
          mollitia, nemo dolorum molestiae natus maxime alias quod tenetur
          excepturi amet rerum quaerat aperiam doloremque voluptas harum? Ab
          voluptatem est ex, et, accusamus nesciunt, quidem nobis repellendus
          minus consequuntur nisi asperiores atque ipsum voluptatibus
          reprehenderit recusandae nulla necessitatibus voluptate odit ea veniam
          consequatur. Eius saepe corrupti praesentium dolore nesciunt expedita,
          quas maxime officiis cum ratione deleniti. Asperiores perspiciatis cum
          saepe modi commodi autem qui ipsam fugiat eveniet consequuntur, alias
          aut quam, cumque ipsum!
        </p>
      </div>
      <Menu />
    </div>
  );
};

export default Single;
