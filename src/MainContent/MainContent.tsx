import React, {useEffect, useState} from 'react';
import ProductList from './ProductList';
import ProductMenu from './ProductMenu';
import {getProducts} from './utils';
import './MainContent.css';

import {ProductMap} from './types';

const MainContent: React.FC = () => {
  const [productMap, setProductMap] = useState<ProductMap>({});
  const [selectedSection, setSelectedSection] = useState("Cuadernos");

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };

  useEffect(() => {
    getProducts().then(fetchedMap => {
      setProductMap(fetchedMap);
    });
  }, []);

  const products = productMap[selectedSection as keyof typeof productMap] || [];

  return (
    <div className="main-content">
      <div className="content-container">
        <ProductMenu
          sections={Object.keys(productMap)}
          selectedSection={selectedSection}
          onSelectSection={handleSectionChange}/>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default MainContent;
