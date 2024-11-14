import React, {useEffect, useState} from 'react';
import ProductList from './ProductList';
import ProductMenu from './ProductMenu';
import AddSectionModal from './ProductMenu/AddSectionModal';
import {Product, ProductMap} from '../types';
import {getProducts } from './utils';
import './MainContent.css';

type MainContentProps = {
  isAdminMode: boolean;
  productMap: ProductMap;
  setProductMap: React.Dispatch<React.SetStateAction<ProductMap>>;
};

const MainContent: React.FC<MainContentProps> = ({isAdminMode, productMap, setProductMap}) => {
  const [selectedSectionName, setSelectedSectionName] = useState<string | null> (null);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSectionChange = (sectionName: string) => {
    setSelectedSectionName(sectionName);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    getProducts().then((fetchedMap) => {
      setProductMap(fetchedMap);
      const initialSection = Object.keys(fetchedMap)[0] || '';
      setSelectedSectionName(initialSection);
    });
  }, []);

  const products = productMap[selectedSectionName as keyof typeof productMap]?.products || [];
  const price = productMap[selectedSectionName as keyof typeof productMap]?.price || '';

  const handleAddSection = (sectionName: string, price: string) => {
    if (productMap[sectionName]) {
      alert('Section already exists.');
      return;
    }

    setProductMap({
      ...productMap,
      [sectionName]: {
        price,
        products: [],
      },
    });
    setSelectedSectionName(sectionName);
  };

  const handleDeleteSection = (sectionName: string) => {
    const newProductMap = {...productMap};
    delete newProductMap[sectionName];

    setProductMap(newProductMap);
    const remainingSections = Object.keys(newProductMap);
    setSelectedSectionName(remainingSections[0] || '');
  };

  const handleAddProduct = (newProduct: Product) => {
    const updatedProducts = [...products, newProduct];
    if (selectedSectionName) {
      setProductMap((oldProductMap) => {
        const productMap = {...oldProductMap};
        productMap[selectedSectionName].products = updatedProducts;
        return productMap;
      });
    }
  };

  const handleDeleteProduct = (productName: string) => {
    const updatedProducts = products.filter(
      (product) => product.name !== productName
    );
    if (selectedSectionName) {
      setProductMap((oldProductMap) => {
        const productMap = {...oldProductMap};
        productMap[selectedSectionName].products = updatedProducts;
        return productMap;
      });
    }
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
          {selectedSectionName} ▼
        </button>
        {isMenuOpen && selectedSectionName && (
          <div className="absolute top-full left-0 w-full bg-white z-10 shadow-lg rounded-md">
            <ProductMenu
              sections={Object.keys(productMap)}
              selectedSectionName={selectedSectionName}
              onSelectSection={setSelectedSectionName}
              onAddSection={() => setIsAddSectionModalOpen(true)}
              isAdminMode={isAdminMode}
              onDeleteSection={handleDeleteSection} // We'll add this functionality in Step 5
            />
          </div>
        )}
      </div>

      {/* Sidebar Menu for Desktop */}
      <div className="hidden md:flex">
        <ProductMenu
          sections={Object.keys(productMap)}
          selectedSectionName={selectedSectionName}
          onSelectSection={handleSectionChange}
          onAddSection={() => setIsAddSectionModalOpen(true)}
          onDeleteSection={handleDeleteSection}
          isAdminMode={isAdminMode}
          />
      </div>

      {/* Product List */}
      <div className="flex-grow overflow-y-auto w-full">
        <ProductList
          price={price}
          products={selectedSectionName && productMap[selectedSectionName]?.products || []}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          isAdminMode={isAdminMode}
        />
      </div>

      {/* Add Section Modal */}
      {isAddSectionModalOpen && (
        <AddSectionModal
          onAddSection={handleAddSection}
          onClose={() => setIsAddSectionModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MainContent;
