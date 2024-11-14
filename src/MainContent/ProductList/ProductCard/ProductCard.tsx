import React, {useState} from 'react';
import {FaTrash} from 'react-icons/fa';
import {User, Product} from '../../../types';
import ProductModal from './ProductModal';
import './ProductCard.css';

type ProductCardProps = Product & {
  onDelete: (productName: string) => void;
  price: string;
  isAdminMode: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description = '',
  price,
  imageUrl = '',
  onDelete,
  isAdminMode,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(name);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="product-card cursor-pointer relative"
      >
        {isAdminMode && (
          <button
            onClick={handleDeleteClick}
            className="delete-button absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        )}
        

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
      </div>

      {isModalOpen && (
        <ProductModal
          price={price}
          product={{name, description, imageUrl}}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default ProductCard;
