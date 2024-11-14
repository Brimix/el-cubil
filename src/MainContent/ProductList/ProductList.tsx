import React from 'react';
import ProductCard from './ProductCard';
import {User, Product} from '../../types';
import AddProductCard from './AddProductCard';
import './ProductList.css';

type ProductListProps = {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productName: string) => void;
  price: string;
  isAdminMode: boolean;
};

const ProductList: React.FC<ProductListProps> = ({
  price,
  products,
  onAddProduct,
  onDeleteProduct,
  isAdminMode,
}) => {
  return (
    <div className="product-list grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 p-4">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          {...product}
          onDelete={onDeleteProduct}
          price={price}
          isAdminMode={isAdminMode}
        />
      ))}
      {isAdminMode && <AddProductCard onAddProduct={onAddProduct} />}
    </div>
  );
};

export default ProductList;
