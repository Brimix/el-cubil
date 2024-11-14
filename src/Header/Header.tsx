import React from 'react';
import {WHATSAPP_MSG} from '../constants';
import {CONSULT_MSG, WEB_TITLE} from './constants';
import {FaWhatsapp} from 'react-icons/fa';
import {User} from '../types';
import GoogleAuthButton from './GoogleAuthButton';
import './Header.css';

const whatsappLink = `https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}/?text=${WHATSAPP_MSG}`;

type HeaderProps = {
  isAdminMode: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  onSave: () => void;
};

const Header: React.FC<HeaderProps> = ({isAdminMode, user, setUser, onSave}) => {
  return (
    <header className="header flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <img
          src={`${process.env.PUBLIC_URL}/assets/logo.png`}
          alt="Logo"
          className="w-12 h-12 mr-4"
        />
        <h1 className="text-3xl font-semibold">{WEB_TITLE}</h1>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center">
        {isAdminMode ? (
          <>
            {user && (
              <button
                onClick={onSave}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Guardar
              </button>
            )}
            <GoogleAuthButton setUser={setUser} />
          </>
        ) : (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FaWhatsapp size={24} className="mr-2" />
            {CONSULT_MSG}
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
