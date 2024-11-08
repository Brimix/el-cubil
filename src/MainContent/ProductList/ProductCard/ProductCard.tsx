import React from 'react';
import {Product} from '../../types';
import './ProductCard.css';

const ProductCard: React.FC<Product> = ({name, description, price, imageUrl}) => {
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-description">{description}</p>
      <span className="product-price">{price}</span>
    </div>
  );
};

export default ProductCard;
