import React from 'react';
import ProductCard from './ProductCard';
import {Product} from '../types';
import './ProductList.css';

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({products}) => {
  return (
    <div className="product-list">
      {products.map((product, index) => <ProductCard key={index} {...product} />)}
    </div>
  );
};

export default ProductList;
