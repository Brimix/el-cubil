import React from 'react';
import {PRODUCT_MSG_WRAPPER_LEFT, PRODUCT_MSG_WRAPPER_RIGHT} from '../constants';

type PriceConsultBlockProps = {
  price: string;
  productName: string;
};

const PriceConsultBlock: React.FC<PriceConsultBlockProps> = ({price, productName}) => {
  const whatsappLink = `https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}/?text=${PRODUCT_MSG_WRAPPER_LEFT}${productName}${PRODUCT_MSG_WRAPPER_RIGHT}`;

  return (
    <div className="sm:mt-auto flex items-center justify-between sm:justify-start w-full mt-4">
      <span className="text-xl font-semibold text-gray-800 mr-4">{price}</span>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
      >
        Consultar por WhatsApp
      </a>
    </div>
  );
};

export default PriceConsultBlock;
