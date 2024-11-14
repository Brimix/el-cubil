import React, {useCallback, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';
import {saveToCloud} from './api/cloudSave';
import {User, ProductMap} from './types';
import './App.css';

const App: React.FC = () => {
  const location = useLocation();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [productMap, setProductMap] = useState<ProductMap>({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsAdminMode(params.get('admin') === 'true');
  }, [location.search]);

  const handleSave = useCallback(async () => {
    if (!user) {
      alert('You must be signed in and have admin permissions to save changes.');
      return;
    }
  
    try {
      saveToCloud(productMap, 'catalog.json');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the catalog.');
    }
  }, [user, productMap]);

  return (
    <div className="App">
      <Header onSave={handleSave} isAdminMode={isAdminMode} user={user} setUser={setUser} />
      <MainContent 
        productMap={productMap}
        setProductMap={setProductMap}
        user={user}/>
      <Footer />
    </div>
  );
};

export default App;
