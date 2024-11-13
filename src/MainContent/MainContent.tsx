import React, {useEffect, useState} from 'react';
import ProductList from './ProductList';
import ProductMenu from './ProductMenu';
import {User} from '../types';
import {ProductMap, Product} from './types';
import {getProducts} from './utils';
import './MainContent.css';

type MainContentProps = {
  user: User | null;
};
const MainContent: React.FC<MainContentProps> = ({user}) => {
  const [productMap, setProductMap] = useState<ProductMap>({});
  const [selectedSection, setSelectedSection] = useState("Cuadernos");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    getProducts().then((fetchedMap) => {
      setProductMap(fetchedMap);
    });
  }, []);

  const products = productMap[selectedSection as keyof typeof productMap] || [];

  const handleAddProduct = (newProduct: Product) => {
    const updatedProducts = [...products, newProduct];
    setProductMap({
      ...productMap,
      [selectedSection]: updatedProducts,
    });
  };

  const handleDeleteProduct = (productName: string) => {
    const updatedProducts = products.filter(
      (product) => product.name !== productName
    );
    setProductMap({
      ...productMap,
      [selectedSection]: updatedProducts,
    });
  };

  return (
    <div className="main-content flex flex-col md:flex-row md:space-x-4 overflow-hidden">
      {/* Accordion Menu for Mobile */}
      <div className="relative md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-full py-2 px-4 rounded-lg mb-2 font-semibold transition-colors ${
            isMenuOpen ? 'bg-gray-200 text-gray-700' : 'bg-purple-100 text-purple-700'
          }`}
        >
          {selectedSection} ▼
        </button>
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white z-10 shadow-lg rounded-md">
            <ProductMenu
              sections={Object.keys(productMap)}
              selectedSection={selectedSection}
              onSelectSection={handleSectionChange}
            />
          </div>
        )}
      </div>

      {/* Sidebar Menu for Desktop */}
      <div className="hidden md:flex">
        <ProductMenu
          sections={Object.keys(productMap)}
          selectedSection={selectedSection}
          onSelectSection={handleSectionChange}
        />
      </div>

      {/* Product List */}
      <div className="flex-grow overflow-y-auto w-full">
        <ProductList
          products={products}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          user={user}
        />
      </div>
    </div>
  );
};

export default MainContent;
