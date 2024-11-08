import React from 'react';
import {WHATSAPP_MSG} from '../constants';
import {CONSULT_MSG, WEB_TITLE} from './constants';
import './Header.css';

const whatsappLink = `https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}/?text=${WHATSAPP_MSG}`;

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src="/assets/logo.png" alt="Logo" className="logo" />
      <h1 className="title"> {WEB_TITLE} </h1>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="consult-button">
        {CONSULT_MSG}
      </a>
    </header>
  );
};

export default Header;
