import React, {useEffect, useMemo, useRef} from 'react';
import {Product} from '../../../types';
import PriceConsultBlock from './PriceConsultBlock';

type ProductModalProps = {
  product: Product;
  onClose: () => void;
};

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
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

  const imgSrc = useMemo(() => `${process.env.PUBLIC_URL}/assets/${product.imageUrl}`, [product]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg p-4 max-w-sm sm:max-w-2xl w-full text-center sm:text-left relative flex flex-col sm:flex-row overflow-hidden">
        <button onClick={onClose} className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 hover:text-gray-900 font-bold text-xl">
          &times;
        </button>

        <div className="hidden sm:block w-1/2 p-4">
          <img src={imgSrc} alt={product.name} className="w-full h-auto rounded-lg" />
        </div>

        <div className="flex flex-col p-4 sm:w-1/2 h-full overflow-hidden">
          <img src={imgSrc} alt={product.name} className="w-3/4 mx-auto rounded-lg mb-4 sm:hidden" />
          <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4 overflow-y-auto sm:overflow-hidden">{product.description}</p>

          <PriceConsultBlock price={product.price} productName={product.name} />
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
