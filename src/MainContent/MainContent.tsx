import React, { useState } from 'react';
import ProductList from './ProductList';
import ProductMenu from './ProductMenu';
import productsData from '../__mock__/products.json';
import './MainContent.css';

const MainContent: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState("Cuadernos");

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };

  const products = productsData[selectedSection as keyof typeof productsData] || [];

  return (
    <div className="main-content">
      <div className="content-container">
        <ProductMenu sections={Object.keys(productsData)} onSelectSection={handleSectionChange} />
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default MainContent;
