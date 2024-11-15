import React, {useCallback} from 'react';
import {useCatalogContext} from '../../CatalogContext';
import {useUserContext} from '../../UserContext';

type SectionPriceProps = {
  sectionName: string;
  price: string;
};

const SectionPrice: React.FC<SectionPriceProps> = ({sectionName, price}) => {
  const {isAdmin} = useUserContext();
  const {updateSection} = useCatalogContext();

  const onPriceChange = useCallback((price: string) => {
    updateSection(sectionName, {price});
  }, [sectionName, updateSection]);

  return (
    <div
      className={`section-price text-center text-xl font-semibold text-purple-800 my-4 ${
        isAdmin ? '' : 'bg-purple-50 bg-opacity-90 p-2 rounded-md shadow-md rounded-xl'
      }`}
    >
      {isAdmin ? (
        <input
          type="text"
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
          className="text-center border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
      ) : (
        <div className="mx-4">Precio: {price}</div>
      )}
    </div>
  );
};

export default SectionPrice;
