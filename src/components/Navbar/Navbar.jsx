import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Filter } from '../../pages/Filter/Filter';
import './Navbar.css';
import { useAuth, useData } from '../../context';

export const Navbar = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState('');
  const { dispatch, sidebarClickHandler } = useData();
  const { setToken, setUser, token } = useAuth();

  const filterHandler = () => {
    setShowFilter(true);
  };

  const logOutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem('login');
    setToken(null);
    setUser(null);
  };

  return (
    <>
      <nav className='navigation'>
        <div className='navigation__logo'>
          <Link to='/' className='navigation__heading'>
            EagleNote
          </Link>
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
            <i className='filter__icon bi bi-funnel-fill'></i>
          </span>
        </ul>
        <ul className='navbar__social'>
          {token ? (
            <Link
              to='/login'
              className='navbar__social-link'
              onClick={(e) => logOutHandler(e)}
            >
              <i class='bi bi-box-arrow-in-right'></i>
            </Link>
          ) : (
            <Link to='/login' className='navbar__social-link'>
              <i className='fas fa-user'></i>
            </Link>
          )}

          <a
            href='https://twitter.com/TheRealAnujK'
            className='navbar__social-link'
          >
            <i className='fab fa-twitter'></i>
          </a>
          <a
            href='https://github.com/anuj-kumary/eagle-note'
            className='navbar__social-link'
          >
            <i className='fab fa-github'></i>

          </li>
          <li
            onClick={sidebarClickHandler}
            className='navbar__social-link hamburger'
          >
            <i class='bi bi-list'></i>
          </li>

          </a>

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
