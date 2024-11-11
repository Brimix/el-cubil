import {fetchProducts} from '../api/api';
import {Product, ProductMap} from './types';

const CLOUD_IMG_PREFIX = 'https://storage.cloud.google.com/elcubil-cloud/product-img/';

export const getProducts = async (): Promise<ProductMap> => {
  const apiProducts = await fetchProducts();

  // Create a map to group products by category
  const categoryMap: {[key: string]: Product[]} = {};
  apiProducts.forEach((product) => {
    const {categoria, nombre, descripcion, precio, url_imagen} = product;

    if (!categoryMap[categoria]) {
      categoryMap[categoria] = [];
    }

    categoryMap[categoria].push({
      name: nombre,
      description: descripcion,
      price: precio,
      imageUrl: `${CLOUD_IMG_PREFIX}${url_imagen}`,
    });
  });
  return categoryMap;
};
