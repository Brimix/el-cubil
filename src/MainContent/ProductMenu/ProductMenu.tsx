import React from 'react';
import './ProductMenu.css';

type ProductMenuProps = {
  sections: string[];
  onSelectSection: (section: string) => void;
};

const ProductMenu: React.FC<ProductMenuProps> = ({sections, onSelectSection}) => {
  return (
    <nav className="product-menu">
      <ul>
        {sections.map((section) => (
          <li key={section} onClick={() => onSelectSection(section)}>
            {section}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProductMenu;
