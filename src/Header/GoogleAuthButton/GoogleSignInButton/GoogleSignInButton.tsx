import React, {useEffect} from 'react';

type GoogleSignInButtonProps = {
  onSignIn: (credential: string) => void;
};

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({onSignIn}) => {
  useEffect(() => {
    try {
      if (!window.google) throw Error('Google failed to be set as a window param');
      console.debug('Initializing Google Auth...');

      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID ?? '',
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById('googleSignInButton')!,
        {theme: 'outline', size: 'large'}
      );
    } catch (error) {
      console.debug('Google Auth Failed to init', error);
    }
  }, []);

  const handleCredentialResponse = (response: any) => {
    onSignIn(response.credential);
  };

  return <div id="googleSignInButton"></div>;
};

export default GoogleSignInButton;
