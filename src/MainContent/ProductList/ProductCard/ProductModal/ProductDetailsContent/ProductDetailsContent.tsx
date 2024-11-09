import React from 'react';

type ProductDetailsContentProps = {
  imgSrc: string;
  name: string;
  description: string;
};

const ProductDetailsContent: React.FC<ProductDetailsContentProps> = ({ imgSrc, name, description }) => {
  return (
    <div className="overflow-y-auto flex-grow mb-4">
      <img src={imgSrc} alt={name} className="w-3/4 mx-auto rounded-lg mb-4 sm:hidden" />
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
  );
};

export default ProductDetailsContent;
