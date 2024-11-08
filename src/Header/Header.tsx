import React from 'react';
import {WEB_TITLE} from './constants';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src="/assets/logo.png" alt="Logo" className="logo" />
      <h1 className="title"> {WEB_TITLE} </h1>
    </header>
  );
};

export default Header;
