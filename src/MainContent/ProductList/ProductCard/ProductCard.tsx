import React, {useState} from 'react';
import {Product} from '../../types';
import ProductModal from './ProductModal';
import './ProductCard.css';

const ProductCard: React.FC<Product> = ({
  name,
  description = '',
  price,
  imageUrl = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={handleCardClick} className="product-card cursor-pointer" >
        {imageUrl ? (
          <div className="image-container">
            <img src={imageUrl} alt={name} className="product-image" />
          </div>
        ) : (
          <div className="image-container bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <span className="product-price">{price}</span>
      </div>

      {isModalOpen && (
        <ProductModal
          product={{ name, description, price, imageUrl }}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default ProductCard;
