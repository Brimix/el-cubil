import React from 'react';
import {WHATSAPP_MSG} from '../constants';
import './Footer.css';

const whatsappLink = `https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}/?text=${WHATSAPP_MSG}`;
const instagramLink = `https://instagram.com/${process.env.REACT_APP_INSTAGRAM_USERNAME}`;

const Footer: React.FC = () => {
  return (
    <div className="address-bar-offset">
      <footer className="footer flex justify-around items-center bg-gray-800 text-white py-4">
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="footer-block flex items-center">
          <img src={`${process.env.PUBLIC_URL}/assets/whatsapp.svg`} alt="WhatsApp" className="w-6 h-6 mr-2" />
          <div className="text-container relative overflow-hidden">
            <span className="text-scroll font-medium">{process.env.REACT_APP_WHATSAPP_NUMBER_FORMATTED}</span>
          </div>
        </a>
        <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="footer-block flex items-center">
          <img src={`${process.env.PUBLIC_URL}/assets/instagram.svg`} alt="Instagram" className="w-6 h-6 mr-2" />
          <div className="text-container relative overflow-hidden">
            <span className="text-scroll font-medium">{process.env.REACT_APP_INSTAGRAM_NAME}</span>
          </div>
        </a>
      </footer>
    </div>
  );
};

export default Footer;
