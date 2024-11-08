import React from 'react';
import {FaWhatsapp, FaInstagram} from 'react-icons/fa';
import {WHATSAPP_MSG} from './constants';
import './Footer.css';

const whatsappLink = `https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}/?text=${WHATSAPP_MSG}`;
const instagramLink = `https://instagram.com/${process.env.REACT_APP_INSTAGRAM_USERNAME}`;

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="footer-block">
        <FaWhatsapp size={24} className="icon" />
        <span className="text">{process.env.REACT_APP_WHATSAPP_NUMBER}</span>
      </a>
      <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="footer-block">
        <FaInstagram size={24} className="icon" />
        <span className="text">{process.env.REACT_APP_INSTAGRAM_USERNAME}</span>
      </a>
    </footer>
  );
};

export default Footer;
