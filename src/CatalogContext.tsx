import {createContext, useContext} from 'react';
import {ProductMap, Product, User, Section} from './types';

type CatalogContextType = {
  productMap: ProductMap;
  addProduct: (sectionName: string, newProduct: Product) => void;
  deleteProduct: (sectionName: string, productName: string) => void;
  updateProduct: (sectionName: string, productName: string, newProduct: Partial<Product>) => void;
  addSection: (sectionName: string, price: string) => void;
  deleteSection: (sectionName: string) => void;
  updateSection: (sectionName: string, newSection: Partial<Section>) => void;
  saveCatalog: (user: User | null) => Promise<void>;
};

export const CatalogContext = createContext<CatalogContextType | undefined> (undefined);

export const useCatalogContext = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalogContext must be used within a CatalogProvider');
  }
  return context;
};
