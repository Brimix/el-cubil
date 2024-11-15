import React, {useState, useEffect} from 'react';
import {useUserContext} from '../../../../../UserContext';

type ProductDetailsContentProps = {
  imgSrc: string;
  name: string;
  description: string;
  sectionName: string;
  onUpdateName: (newName: string) => void;
  onUpdateDescription: (newDescription: string) => void;
};

const ProductDetailsContent: React.FC<ProductDetailsContentProps> = ({
  imgSrc,
  name,
  description,
  onUpdateName,
  onUpdateDescription,
}) => {
  const {isAdmin} = useUserContext();

  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);

  useEffect(() => {
    setEditedName(name);
    setEditedDescription(description);
  }, [name, description]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setEditedName(newName);
    onUpdateName(newName);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setEditedDescription(newDescription);
    onUpdateDescription(newDescription);
  };

  return (
    <div className="overflow-y-auto flex-grow mb-4">
      {/* Mobile Image Display */}
      <img src={imgSrc} alt={name} className="w-3/4 mx-auto rounded-lg mb-4 sm:hidden" />

      {isAdmin ? (
        <input
          type="text"
          value={editedName}
          onChange={handleNameChange}
          className="text-2xl font-bold mb-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
      ) : (
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
      )}

      {isAdmin ? (
        <textarea
          value={editedDescription}
          onChange={handleDescriptionChange}
          className="text-gray-600 mb-4 w-full h-32 resize-none border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
        />
      ) : (
        <p className="text-gray-600 mb-4">{description}</p>
      )}
    </div>
  );
};

export default ProductDetailsContent;
