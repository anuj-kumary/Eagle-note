import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export const Sidebar = () => {
  return (
    <>
      <aside className='sidebar'>
        <ul>
          <li className='sidebar__link'>
            <Link to='/' className='menu__link'>
              Note
            </Link>
          </li>
          <li className='sidebar__link'>
            <Link to='/archive' className='menu__link'>
              Archive
            </Link>
          </li>
          <li className='sidebar__link'>
            <Link to='/' className='menu__link'>
              Trash
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};
