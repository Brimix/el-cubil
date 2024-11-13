import React, {useState} from 'react';
import {Product} from '../../types';
import AddProductModal from './AddProductModal';
import './AddProductCard.css';

type AddProductCardProps = {
  onAddProduct: (product: Product) => void;
};

const AddProductCard: React.FC<AddProductCardProps> = ({onAddProduct}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="add-product-card cursor-pointer"
      >
        <div className="add-product-content">
          <span className="add-product-icon">+</span>
        </div>
      </div>
      {isModalOpen && (
        <AddProductModal
          onAddProduct={onAddProduct}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default AddProductCard;
