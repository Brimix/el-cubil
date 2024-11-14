import {fetchProducts} from './api/cloudFetch';
import {ProductMap} from './types';

export const getProducts = async (): Promise<ProductMap> => {
  try {
    const productMap = await fetchProducts();
    return productMap;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};
