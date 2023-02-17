import React from 'react'


import Logo from '../../img/logo.png';
import SearchLogo from '../../img/search.png';
import "./LogoSearch.css"

const LogoSearch = () => {
  return (
    <div className="searchbar">
          <div className="logo">
              <img src={Logo} alt="" />
          </div>
              <div className="search">
                  <input type="text" name="" id="" />
                  <div className="searchlogo">
                      <img src={SearchLogo} alt=""  />
                  </div>
              </div>
      </div>
  )
}

export default LogoSearch;
