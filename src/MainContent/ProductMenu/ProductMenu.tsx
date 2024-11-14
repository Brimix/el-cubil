import React from 'react';
import './ProductMenu.css';

type ProductMenuProps = {
  sections: string[];
  selectedSectionName: string | null;
  onSelectSection: (section: string) => void;
  onAddSection: () => void;
  onDeleteSection: (section: string) => void;
  isAdminMode: boolean;
};

const ProductMenu: React.FC<ProductMenuProps> = ({
  sections,
  selectedSectionName,
  onSelectSection,
  onAddSection,
  isAdminMode,
}) => {
  return (
    <nav className="product-menu bg-purple-50 rounded-lg shadow-md w-56 p-4 space-y-1">
      <ul className="space-y-1">
        {sections.map((sectionName, index) => (
          <li
            key={sectionName}
            onClick={() => onSelectSection(sectionName)}
            className={`cursor-pointer px-4 py-2 rounded-md font-semibold text-gray-700
              ${selectedSectionName === sectionName ? 
                'bg-purple-100 text-purple-700' :
                'hover:bg-purple-100 hover:text-gray-900'} 
              ${selectedSectionName === sectionName && 'font-bold'}
              ${index < sections.length - 1 ? 'border-b border-gray-200' : ''}
            `}
          >
            {sectionName}
          </li>
        ))}
        {isAdminMode && (
          <li className="menu-item add-section" onClick={onAddSection}>
            + Agregar
          </li>
        )}
      </ul>
    </nav>
  );
};

export default ProductMenu;
