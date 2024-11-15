import React, {useCallback} from 'react';
import {useCatalogContext} from '../../CatalogContext';
import {Product, Section} from '../../types';
import AddProductCard from './AddProductCard';
import ProductCard from './ProductCard';
import {getCustomProduct} from './utils';
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
  }, [addProduct, sectionName]);

  const handleDeleteProduct = useCallback((productName: string) => {
    deleteProduct(sectionName, productName);
  }, [deleteProduct, sectionName]);

  const allProducts = isAdminMode
    ? products
    : [...products, getCustomProduct(sectionName)];

  return (
    <div className="product-list grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 p-4">
      {allProducts.map((product, index) => (
        <ProductCard
          key={index}
          {...product}
          onDelete={handleDeleteProduct}
          price={price}
          isAdminMode={isAdminMode}
          sectionName={sectionName}
        />
      ))}
      {isAdminMode && <AddProductCard onAddProduct={handleAddProduct} />}
    </div>
  );
};

export default ProductList;
