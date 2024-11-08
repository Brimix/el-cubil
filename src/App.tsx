import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default App;
