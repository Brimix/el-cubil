import {ProductMap} from '../types';
import {BUCKET_PATH, DOWNLINK_URL} from './constants';

const fetchFromCloud = async (name: string) => {
  const downloadUrl = `${DOWNLINK_URL}${BUCKET_PATH}o/${encodeURIComponent(name)}?alt=media`;

  try {
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch resource ${name}: ${response.statusText}`);
    }

    const data = await response.json();
    return data as ProductMap;
  } catch (error) {
    console.error('Error fetching from GCS:', error);
    throw error;
  }
};

export const fetchProducts = async (): Promise<ProductMap> => {
  return fetchFromCloud('catalog.json');
};
