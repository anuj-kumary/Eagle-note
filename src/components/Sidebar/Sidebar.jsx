import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context';
import './Sidebar.css';

export const Sidebar = () => {
  const { showSidebar } = useData();
  console.log(showSidebar);

  return (
    <>
      <aside className={showSidebar ? 'showSide' : 'sidebar'}>
        <ul>
          <li className='sidebar__link'>
            <Link to='/' className='menu__link'>
              Note
            </Link>
          </li>
          <li className='sidebar__link'>
            <Link to='/label' className='menu__link'>
              Label
            </Link>
          </li>
          <li className='sidebar__link'>
            <Link to='/archive' className='menu__link'>
              Archive
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};
