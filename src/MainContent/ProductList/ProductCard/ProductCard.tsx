import React, {useState} from 'react';
import {FaTrash} from 'react-icons/fa';
import {Product} from '../../../types';
import {useUserContext} from '../../../UserContext';
import ProductModal from './ProductModal';
import './ProductCard.css';

type ProductCardProps = Product & {
  onDelete: (productName: string) => void;
  price: string;
  sectionName: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description = '',
  price,
  images,
  onDelete,
  sectionName,
}) => {
  const {isAdmin} = useUserContext();
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
        {isAdmin && (
          <button
            onClick={handleDeleteClick}
            className="delete-button absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        )}
        

        {images.length > 0 ? (
          <div className="image-container">
            <img src={images[0]} alt={name} className="product-image" />
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
          product={{name, description, images}}
          onClose={closeModal}
          sectionName={sectionName}
        />
      )}
    </>
  );
};

export default ProductCard;
