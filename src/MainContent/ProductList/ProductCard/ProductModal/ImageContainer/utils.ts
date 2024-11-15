const IMG_FOLDER_PATH = 'product-img/';

export const generateImageName = (originalFileName: string, sectionName: string, name: string, index: number) => {
  const extension = originalFileName.split('.').pop();
  const sanitizedSectionName = sectionName.replace(/\s+/g, '-').toLowerCase();
  const sanitizedProductName = name.replace(/\s+/g, '-').toLowerCase();
  return `${IMG_FOLDER_PATH}${sanitizedSectionName}_${sanitizedProductName}_${index}.${extension}`;
};
