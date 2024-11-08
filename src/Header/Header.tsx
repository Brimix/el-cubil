import React from 'react';
import {WHATSAPP_MSG} from '../constants';
import {CONSULT_MSG, WEB_TITLE} from './constants';
import {FaWhatsapp} from 'react-icons/fa';
import './Header.css';

const whatsappLink = `https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}/?text=${WHATSAPP_MSG}`;

const Header: React.FC = () => {
  return (
    <header className="header flex justify-center md:justify-between items-center p-4 bg-gray-800 text-white">
      <img 
        src={`${process.env.PUBLIC_URL}/assets/logo.png`} 
        alt="Logo" 
        className="w-12 h-12 mx-auto md:w-16 md:h-16 md:ml-0 md:mr-4" 
      />
      <h1 className="title text-3xl font-semibold text-center text-white hidden md:flex">
        {WEB_TITLE}
      </h1>
      <a 
        href={whatsappLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="consult-button bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded hidden md:flex"
      >
        <FaWhatsapp size={24} className="mr-2" />
        {CONSULT_MSG}
      </a>
    </header>
  );
};

export default Header;
