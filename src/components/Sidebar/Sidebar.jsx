import { Link, NavLink } from 'react-router-dom';
import { useData } from '../../context';
import './Sidebar.css';

export const Sidebar = () => {
  const { showSidebar, setShowSidebar } = useData();

  return (
    <>
      <aside className={showSidebar ? 'showSide' : 'sidebar'}>
        <ul>
          <li className='sidebar__link'>
            <NavLink
              onClick={() => setShowSidebar(false)}
              to='/note'
              activeClassName='active'
              className='menu__link'
            >
              Note
            </NavLink>
          </li>
          <li className='sidebar__link'>
            <NavLink
              activeClassName='active'
              onClick={() => setShowSidebar(false)}
              to='/label'
              className='menu__link'
            >
              Label
            </NavLink>
          </li>
          <li className='sidebar__link'>
            <NavLink
              activeClassName='active'
              onClick={() => setShowSidebar(false)}
              to='/archive'
              className='menu__link'
            >
              Archive
            </NavLink>
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
