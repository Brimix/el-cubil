import React from 'react';
import {WHATSAPP_MSG} from '../constants';
import {CONSULT_MSG, WEB_TITLE} from './constants';
import {FaWhatsapp} from 'react-icons/fa';
import './Header.css';

const whatsappLink = `https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}/?text=${WHATSAPP_MSG}`;

const Header: React.FC = () => {
  return (
    <header className="header flex justify-between items-center p-4 bg-gray-800 text-white">
      <img src="/assets/logo.png" alt="Logo" className="w-16 h-16 mr-4" />
      <h1 className="title text-3xl font-semibold text-center text-white">
        {WEB_TITLE}
      </h1>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="consult-button bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
        <FaWhatsapp size={24} className="mr-2" />
        {CONSULT_MSG}
      </a>
    </header>
  );
};

export default Header;
