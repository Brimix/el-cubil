import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

type Product = {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
};

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
