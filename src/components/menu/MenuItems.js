import { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown.js';
import ENDPOINT from '../../constants/api-endpoints';

import { Link } from 'react-router-dom';

const MenuItems = ({ items, depthLevel }) => {
  const goNav = (goto) => {
      window.location.href = ENDPOINT.APP_BASE_PATH + goto;
  };
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();
  useEffect(() => {
    const handler = (event) => {
      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
    <li
      className={`${(items.subMenu !== null) ? 'has-sub' : ''}`}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.url && items.subMenu ? (
        <>
          {items.subMenu !== null && <span className={`submenu-button ${dropdown ? 'submenu-opened' : ''}`} onClick={() => setDropdown((prev) => !prev)}></span>}
          <Link to={items.url}
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {window.innerWidth < 960 && depthLevel === 0 ? (
              items.title
            ) : (
              items.title
            )}

            {depthLevel > 0 &&
            window.innerWidth < 960 ? null : depthLevel > 0 &&
              window.innerWidth > 960 ? (
              <span>&raquo;</span>
            ) : (
              <span className="arrow" />
            )}
          </Link>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.subMenu}
            dropdown={dropdown}
          />
        </>
      ) : !items.url && items.subMenu ? (
        <>
          <a
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{' '}
            {depthLevel > 0 ? (
              <span>&raquo;</span>
            ) : (
              <span className="arrow" />
            )}
          </a>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.subMenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        (items.isNewTab === 0) ? 
          // (<a onClick={() => goNav(items.url) }>{items.title}</a>)
          //(<a href={items.url}>{items.title}</a>)
          (<Link to={items.url}>{items.title}</Link>)
        :
          // (<a href={items.url} target='_blank'>{items.title}</a>)
          (<Link to={items.url} target='_blank'>{items.title}</Link>)
      )}
    </li>
  );
};

export default MenuItems;