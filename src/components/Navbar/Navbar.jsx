import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Filter } from '../../pages/Filter/Filter';
import './Navbar.css';
import { useData } from '../../context';

export const Navbar = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState('');
  const { dispatch, sidebarClickHandler } = useData();

  const filterHandler = () => {
    setShowFilter(true);
  };

  return (
    <>
      <nav className='navigation'>
        <div className='navigation__logo'>
          <h3 className='navigation__heading'>EagleNote</h3>
        </div>
        <ul className='navbar__search'>
          <input
            className='search__box'
            type='text'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                dispatch({
                  type: 'SEARCH',
                  payload: search,
                });
              }
            }}
            placeholder='Filter with labels'
          />
          <span onClick={filterHandler}>
            <i class='filter__icon bi bi-funnel-fill'></i>
          </span>
        </ul>
        <ul className='navbar__social'>
          <Link to='/login' className='navbar__social-link'>
            <i className='fas fa-user'></i>
          </Link>
          <li className='navbar__social-link'>
            <i className='fab fa-twitter'></i>
          </li>
          <li className='navbar__social-link'>
            <i className='fab fa-github'></i>
          </li>
          <li
            onClick={sidebarClickHandler}
            className='navbar__social-link hamburger'
          >
            <i class='bi bi-list'></i>
          </li>
        </ul>
      </nav>
      <div className='mobile__search--container'>
        <ul className='mobile__navbar--search'>
          <input
            className='search__box'
            type='text'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                dispatch({
                  type: 'SEARCH',
                  payload: search,
                });
              }
            }}
            placeholder='Filter with labels'
          />
          <span onClick={filterHandler}>
            <i class='filter__icon bi bi-funnel-fill'></i>
          </span>
        </ul>
      </div>

      {showFilter ? <Filter setShowFilter={setShowFilter} /> : null}
    </>
  );
};
