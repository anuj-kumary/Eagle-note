import React from 'react';
import './Navbar.css';

export const Navbar = () => {
  return (
    <>
      <nav className='navigation'>
        <div className='navigation__logo'>
          <h3 className='navigation__heading'>EagleNote</h3>
        </div>
        <ul className='navbar__social'>
          <li className='navbar__social-link'>
            <i className='fab fa-twitter'></i>
          </li>
          <li className='navbar__social-link'>
            <i className='fab fa-github'></i>
          </li>
        </ul>
      </nav>
    </>
  );
};
