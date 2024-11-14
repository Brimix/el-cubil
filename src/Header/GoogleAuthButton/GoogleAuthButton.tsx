import React, {useState} from 'react';
import {User} from '../../types';
import {adminWhitelist} from './constants';
import {parseJwt} from './utils';
import GoogleSignInButton from './GoogleSignInButton';

type GoogleAuthButtonProps = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({setUser}) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);


  const handleSignIn = (credential: string) => {
    const user = parseJwt(credential);

    if (adminWhitelist.includes(user.email)) {
      setUser(user);
      setIsSignedIn(true);
    } else {
      alert('You are not authorized to access admin features.');
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setIsSignedIn(false);
    google.accounts.id.disableAutoSelect();
  };

  return isSignedIn  ? (
    <button
      onClick={handleSignOut}
      className="bg-red-500 text-white font-bold py-2 px-4 rounded"
    >
      Sign Out
    </button>
  ) : (
    <GoogleSignInButton onSignIn={handleSignIn} />
  );
};

export default GoogleAuthButton;
