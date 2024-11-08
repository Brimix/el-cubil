import React from 'react';
import './ProductCard.css';

type Product = {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
};

const ProductCard: React.FC<Product> = ({ name, description, price, imageUrl }) => {
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
