import {useState, useEffect, useCallback} from 'react';
import {Product, ProductMap, Section, User} from './types';
import {getProducts} from './utils';
import {saveToCloud} from './api/cloudSave';

type UseCatalogReturnType = {
  productMap: ProductMap;
  addProduct: (sectionName: string, newProduct: Product) => void;
  deleteProduct: (sectionName: string, productName: string) => void;
  updateProduct: (sectionName: string, productName: string, newProduct: Partial<Product>) => void;
  addSection: (sectionName: string, price: string) => void;
  deleteSection: (sectionName: string) => void;
  updateSection: (sectionName: string, newSection: Partial<Section>) => void;
  saveCatalog: (user: User | null) => Promise<void>;
};

const useCatalog = (): UseCatalogReturnType => {
  const [productMap, setProductMap] = useState<ProductMap>({});

  useEffect(function initializeProducts() {
    getProducts().then((fetchedMap) => {
      setProductMap(fetchedMap);
    });
  }, []);

  const addProduct = (sectionName: string, newProduct: Product) => {
    setProductMap((prevProductMap) => {
      const updatedProducts = [...prevProductMap[sectionName].products, newProduct];
      const updatedSection = {
        ...prevProductMap[sectionName],
        products: updatedProducts,
      };
      return {
        ...prevProductMap,
        [sectionName]: updatedSection,
      };
    });
  };

  const deleteProduct = (sectionName: string, productName: string) => {
    setProductMap((prevProductMap) => {
      const updatedProducts = prevProductMap[sectionName].products.filter(
        (product) => product.name !== productName
      );
      const updatedSection = {
        ...prevProductMap[sectionName],
        products: updatedProducts,
      };
      return {
        ...prevProductMap,
        [sectionName]: updatedSection,
      };
    });
  };

  const updateProduct = (sectionName: string, productName: string, newProperties: Partial<Product>) => {
    setProductMap((prevProductMap) => {
      const targetProductId = prevProductMap[sectionName].products.findIndex(p => p.name === productName);
      if (targetProductId === -1) {
        console.error('Product not found');
        alert('Failed to update since product is not found');
        return prevProductMap;
      }
      
      const updatedProducts = [...prevProductMap[sectionName].products];
      updatedProducts[targetProductId] = {... updatedProducts[targetProductId], ...newProperties};

      const updatedSection = {
        ...prevProductMap[sectionName],
        products: updatedProducts,
      };
      return {
        ...prevProductMap,
        [sectionName]: updatedSection,
      };
    });
  };

  const addSection = (sectionName: string, price: string) => {
    setProductMap((prevProductMap) => {
      if (prevProductMap[sectionName]) {
        alert('A section with this name already exists.');
        return prevProductMap;
      }
      return {
        ...prevProductMap,
        [sectionName]: {
          price,
          products: [],
        },
      };
    });
  };

  const deleteSection = (sectionName: string) => {
    setProductMap((prevProductMap) => {
      const updatedProductMap = { ...prevProductMap };
      delete updatedProductMap[sectionName];
      return updatedProductMap;
    });
  };

  const updateSection = (sectionName: string, newProperties: Partial<Section>) => {
    setProductMap((prevProductMap) => {
      if (!prevProductMap[sectionName]) {
        console.error('Section not found');
        alert('Failed to update since section is not found');
        return prevProductMap;
      }

      const updatedSection = {
        ...prevProductMap[sectionName],
        ...newProperties,
      };

      return {
        ...prevProductMap,
        [sectionName]: updatedSection,
      };
    });
  };

  const saveCatalog = useCallback(
    async (user: User | null) => {
      if (!user) {
        alert('You must be signed in to save the catalog.');
        return;
      }

      try {
        saveToCloud(productMap, 'catalog.json');
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while saving the catalog.');
      }
    },
    [productMap]
  );

  return {
    productMap,
    addProduct,
    deleteProduct,
    updateProduct,
    addSection,
    deleteSection,
    updateSection,
    saveCatalog,
  };
};

export default useCatalog;
