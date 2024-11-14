import React, {useCallback, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';
import {User} from './types';
import {CatalogContext} from './CatalogContext';
import useCatalog from './useCatalog';
import './App.css';

const App: React.FC = () => {
  const location = useLocation();
  const catalog = useCatalog();

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsAdminMode(params.get('admin') === 'true');
  }, [location.search]);

  const handleSave = () => catalog.saveCatalog(user);

  return (
    <CatalogContext.Provider value={catalog}>
      <div className="App">
        <Header onSave={handleSave} isAdminMode={isAdminMode} user={user} setUser={setUser} />
        <MainContent isAdminMode={user !== null}/> 
        <Footer />
      </div>
    </CatalogContext.Provider>
  );
};

export default App;
