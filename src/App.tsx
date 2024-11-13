import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';
import {User} from './types';
import './App.css';

const App: React.FC = () => {
  const location = useLocation();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsAdminMode(params.get('admin') === 'true');
  }, [location.search]);

  return (
    <div className="App">
      <Header isAdminMode={isAdminMode} setUser={setUser} />
      <MainContent />
      <Footer />
    </div>
  );
};

export default App;
