import React, {useState} from 'react';
import {Product} from '../../types';
import ProductModal from './ProductModal';
import './ProductCard.css';

const ProductCard: React.FC<Product> = ({name, description, price, imageUrl}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={handleCardClick} className="product-card bg-white shadow-md rounded-lg p-4 md:p-2 max-w-xs md:max-w-[150px] md:max-w-[200px] text-center cursor-pointer">
        <img src={imageUrl} alt={name} className="w-full h-auto rounded-lg" />
        <h3 className="text-lg md:text-base font-semibold mt-2">{name}</h3>
        <p className="text-sm text-gray-600 mt-1 hidden md:block">{description}</p>
        <span className="font-bold text-gray-700">{price}</span>
      </div>
      
      {isModalOpen && (
        <ProductModal product={{name, description, price, imageUrl}} onClose={closeModal} />
      )}
    </>
  );
};

export default ProductCard;
