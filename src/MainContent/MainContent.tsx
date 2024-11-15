import React, {useCallback, useEffect, useState} from 'react';
import {useCatalogContext} from '../CatalogContext';
import ProductList from './ProductList';
import ProductMenu from './ProductMenu';
import './MainContent.css';

type MainContentProps = {
  isAdminMode: boolean;
};

const MainContent: React.FC<MainContentProps> = ({isAdminMode}) => {
  const {productMap, updateSection} = useCatalogContext();

  const [selectedSectionName, setSelectedSectionName] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const selectedSectionPrice = selectedSectionName ? productMap[selectedSectionName]?.price : null;

  const handleSectionChange = (sectionName: string | null) => {
    setSelectedSectionName(sectionName);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!selectedSectionName || !productMap[selectedSectionName]) {
      const initialSection = Object.keys(productMap)[0] ?? null;
      setSelectedSectionName(initialSection);
    }
  }, [productMap, selectedSectionName]);

  const handlePriceChange = useCallback((price: string) => {
    if (selectedSectionName) {
      updateSection(selectedSectionName, {price});
    }
  }, [selectedSectionName]);

  return (
    <div className="main-content flex flex-col md:flex-row md:space-x-4 overflow-hidden">
      {/* Accordion Menu for Mobile */}
      <div className="relative md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`w-full py-2 px-4 rounded-lg mb-2 font-semibold transition-colors ${
            isMobileMenuOpen ? 'bg-gray-200 text-gray-700' : 'bg-purple-100 text-purple-700'
          }`}
        >
          {selectedSectionName} ▼
        </button>
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white z-10 shadow-lg rounded-md">
            <ProductMenu
              sections={Object.keys(productMap)}
              selectedSectionName={selectedSectionName}
              onSelectSection={setSelectedSectionName}
              isAdminMode={isAdminMode}
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
          isAdminMode={isAdminMode}
        />
      </div>

      {/* Product List */}
      {selectedSectionName && (
        <div className="flex-grow overflow-y-auto w-full">
          {selectedSectionPrice && (
            <div className={`section-price text-center text-xl font-semibold text-purple-800 my-4 ${
                isAdminMode ? '' : 'bg-purple-50 bg-opacity-90 p-2 rounded-md shadow-md rounded-xl'}`}>
              {isAdminMode ? (
                <input
                  type="text"
                  value={selectedSectionPrice}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="text-center border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
              ) : (
                <div className="mx-4">
                  Precio: {selectedSectionPrice}
                </div>
              )}
            </div>
          )}
          <ProductList
            sectionName={selectedSectionName}
            section={productMap[selectedSectionName]}
            isAdminMode={isAdminMode}
          />
        </div>
      )}
    </div>
  );
};

export default MainContent;
