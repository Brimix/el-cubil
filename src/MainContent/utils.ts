import {fetchProducts} from '../api/api';
import {ProductMap} from '../types';

const CLOUD_IMG_PREFIX = 'https://storage.cloud.google.com/elcubil-cloud/product-img/';

export const getProducts = async (): Promise<ProductMap> => {
  const apiProducts = await fetchProducts();

  // Create a map to group products by category
  const productMap: ProductMap = {};
  apiProducts.forEach((product) => {
    const {categoria, nombre, descripcion, precio, url_imagen} = product;

    
    if (!productMap[categoria]) {
      productMap[categoria] = {
        price: precio,
        products: [],
      };
    }

    productMap[categoria].products.push({
      name: nombre,
      description: descripcion,
      imageUrl: `${CLOUD_IMG_PREFIX}${url_imagen}`,
    });
  });
  return productMap;
};
