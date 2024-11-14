import React, { useState, useRef, useEffect } from 'react';

type AddSectionModalProps = {
  onAddSection: (sectionName: string, price: string) => void;
  onClose: () => void;
};

const AddSectionModal: React.FC<AddSectionModalProps> = ({ onAddSection, onClose }) => {
  const [sectionName, setSectionName] = useState('');
  const [price, setPrice] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (sectionName.trim() === '' || price.trim() === '') {
      alert('Por favor ingrese un nombre de sección y precio.');
      return;
    }
    onAddSection(sectionName.trim(), price.trim());
    onClose();
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-80">
        <h2 className="text-xl font-bold mb-4">Nueva Sección</h2>
        <input
          type="text"
          ref={inputRef}
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder="Nombre de la sección"
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder="Precio"
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSectionModal;
