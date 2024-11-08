import React from 'react';
import './ProductMenu.css';

type ProductMenuProps = {
  sections: string[];
  selectedSection: string;
  onSelectSection: (section: string) => void;
};

const ProductMenu: React.FC<ProductMenuProps> = ({ sections, selectedSection, onSelectSection }) => {
  return (
    <nav className="product-menu bg-purple-50 rounded-lg shadow-md w-56 p-4 space-y-1">
      <ul className="space-y-1">
        {sections.map((section, index) => (
          <li
            key={section}
            onClick={() => onSelectSection(section)}
            className={`cursor-pointer px-4 py-2 rounded-md font-semibold text-gray-700
              ${selectedSection === section ? 
                'bg-purple-100 text-purple-700' :
                'hover:bg-purple-100 hover:text-gray-900'} 
              ${selectedSection === section && 'font-bold'}
              ${index < sections.length - 1 ? 'border-b border-gray-200' : ''}
            `}
          >
            {section}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProductMenu;
