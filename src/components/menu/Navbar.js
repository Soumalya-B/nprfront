import React, { useState, useEffect } from 'react';
import MenuItems from './MenuItems';
import ENDPOINT from '../../constants/api-endpoints';
const Navbar = () => {
  const [menuData, setMenus] = useState([]);
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  useEffect(() => {
      fetch(ENDPOINT.NAV_MENU)
          .then((response) => response.json())
          .then((responseData) => {
              setMenus(responseData);
          })
          .catch((err) => {
              console.log(err.message);
          });
  }, []);
  let listItems = [];
  if (menuData.length !== 0) {
      const hNav = menuData.Header;
      listItems = hNav;
  }
  return (
    <nav className="nav-bg" style={{ left: '-100%'}} >
      <i className="fa fa-times" id="cross" style={{ display: 'none'}}></i>
      <div className="container mainbody-bg menu-border-top">    
        <div id="cssmenu">
            <div id="menu-button" className={isNavExpanded ? 'menu-opened' : ''} onClick={() => { setIsNavExpanded(!isNavExpanded); }}>Menu</div>
            <ul  id="top" className= {isNavExpanded ? 'menu open' : 'menu'} style={{display: isNavExpanded ? 'block' : '' }}>
              {listItems.map((menu, index) => {
                const depthLevel = 0;
                return (
                  <MenuItems
                    items={menu}
                    key={index}
                    depthLevel={depthLevel}
                  />
                );
              })}
            </ul>
          </div>
        </div>
    </nav>
  );
};
export default Navbar;
