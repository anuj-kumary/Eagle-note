import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context';
import './Sidebar.css';

export const Sidebar = () => {
  const { showSidebar, setShowSidebar } = useData();

  return (
    <>
      <aside className={showSidebar ? 'showSide' : 'sidebar'}>
        <ul>
          <li className='sidebar__link'>
            <Link
              onClick={() => setShowSidebar(false)}
              to='/note'
              className='menu__link'
            >
              Note
            </Link>
          </li>
          <li className='sidebar__link'>
            <Link
              onClick={() => setShowSidebar(false)}
              to='/label'
              className='menu__link'
            >
              Label
            </Link>
          </li>
          <li onClick={() => setShowSidebar(false)} className='sidebar__link'>
            <Link to='/archive' className='menu__link'>
              Archive
            </Link>
          </li>
          <li onClick={() => setShowSidebar(false)} className='sidebar__link'>
            <Link to='/trash' className='menu__link'>
              Trash
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};
