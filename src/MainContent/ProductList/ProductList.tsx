import React, { useCallback } from 'react';
import {useCatalogContext} from '../../CatalogContext';
import {Product, Section} from '../../types';
import AddProductCard from './AddProductCard';
import ProductCard from './ProductCard';
import './ProductList.css';

type ProductListProps = {
  sectionName: string;
  section: Section;
  isAdminMode: boolean;
};

const ProductList: React.FC<ProductListProps> = ({
  section,
  sectionName,
  isAdminMode,
}) => {
  const {addProduct, deleteProduct} = useCatalogContext();
  const {price, products} = section;

  const handleAddProduct = useCallback((newProduct: Product) => {
    addProduct(sectionName, newProduct);
  }, [sectionName]);

  const handleDeleteProduct = useCallback((productName: string) => {
    deleteProduct(sectionName, productName);
  }, [sectionName]);

  return (
    <div className="product-list grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 p-4">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          {...product}
          onDelete={handleDeleteProduct}
          price={price}
          isAdminMode={isAdminMode}
        />
      ))}
      {isAdminMode && <AddProductCard onAddProduct={handleAddProduct} />}
    </div>
  );
};

export default ProductList;
