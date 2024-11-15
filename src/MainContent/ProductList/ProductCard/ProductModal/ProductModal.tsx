import React, {useEffect, useRef, useCallback} from 'react';
import {Product} from '../../../../types';
import {useCatalogContext} from '../../../../CatalogContext';
import PriceConsultBlock from './PriceConsultBlock';
import ProductDetailsContent from './ProductDetailsContent';
import ImageContainer from './ImageContainer';

type ProductModalProps = {
  sectionName: string;
  price: string;
  product: Product;
  onClose: () => void;
};

const ProductModal: React.FC<ProductModalProps> = ({sectionName, price, product, onClose}) => {
  const {name, description, images} = product;
  const {updateProduct} = useCatalogContext();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const onUpdateImages = useCallback((newImages: string[]) => {
    const newProduct: Product = {...product, images: newImages};
    updateProduct(sectionName, product.name, newProduct);
  }, [product]);

  const onUpdateName = (newName: string) => {
    const updatedProduct = {...product, name: newName};
    updateProduct(sectionName, product.name, updatedProduct);
  };

  const onUpdateDescription = (newDescription: string) => {
    const updatedProduct = { ...product, description: newDescription };
    updateProduct(sectionName, product.name, updatedProduct);
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg max-h-[90vh] p-4 max-w-sm sm:max-w-2xl w-full text-center sm:text-left relative flex flex-col sm:flex-row overflow-y-auto">

        <button onClick={onClose} className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 hover:text-gray-900 font-bold text-xl">
          &times;
        </button>
        <ImageContainer images={images} sectionName={sectionName} productName={name} onUpdateImages={onUpdateImages}/>

        <div className="flex flex-col p-4 sm:w-1/2 h-full overflow-hidden">
          <ProductDetailsContent
            imgSrc={images[0] ?? ''}
            name={name}
            description={description ?? ''}
            sectionName={sectionName}
            onUpdateName={onUpdateName}
            onUpdateDescription={onUpdateDescription} />
          <PriceConsultBlock price={price} productName={name} sectionName={sectionName}/>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
