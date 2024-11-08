import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src="/assets/logo.png" alt="Logo" className="logo" />
      <h1 className="title">El Cubil Felino</h1>
    </header>
  );
};

export default Header;
