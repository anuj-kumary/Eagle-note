import React from 'react';
import './Sidebar.css';

export const Sidebar = () => {
  return (
    <>
      <aside className='sidebar'>
        <header className='sidebar__heading'>Get Started</header>
        <hr />
        <ul>
          <li className='sidebar__link'>
            <p>Note</p>
          </li>
          <li className='sidebar__link'>
            <p>Archive</p>
          </li>
          <li className='sidebar__link'>
            <p>Trash</p>
          </li>
        </ul>
      </aside>
    </>
  );
};
