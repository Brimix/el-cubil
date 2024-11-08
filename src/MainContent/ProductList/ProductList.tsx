import React from 'react';
import ProductCard from './ProductCard';
import {Product} from '../types';
import './ProductList.css';

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({products}) => {
  return (
    <div className="product-list grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 p-4">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
