import React from 'react';
import ProductCard from './ProductCard';
import {User} from '../../types';
import {Product} from '../types';
import AddProductCard from './AddProductCard';
import './ProductList.css';

type ProductListProps = {
  products: Product[];
  onAddProduct: (product: Product) => void;
  user: User | null;
};

const ProductList: React.FC<ProductListProps> = ({products, onAddProduct, user}) => {
  return (
    <div className="product-list grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 p-4">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
      {user && <AddProductCard onAddProduct={onAddProduct} />}
    </div>
  );
};

export default ProductList;
