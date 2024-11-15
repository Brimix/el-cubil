import React, {useRef, useState} from 'react';
import {useUserContext} from '../../../../../UserContext';
import {saveImageToCloud} from '../../../../../api/cloudSave';
import {generateImageName} from './utils';

type ImageContainerProps = {
  images: string[];
  sectionName: string;
  productName: string;
  onUpdateImages: (imgs: string[]) => void;
};

const ImageContainer: React.FC<ImageContainerProps> = ({images, sectionName, productName, onUpdateImages}) => {
  const {isAdmin} = useUserContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    } else {
      alert('Please drop a valid image file.');
    }
  };

  // Handle file selection via click
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    try {
      const imageName = generateImageName(file.name, sectionName, productName, images.length);
      const uploadedImageUrl = await saveImageToCloud(file, imageName);

      const updatedImages = [...images, uploadedImageUrl];
      onUpdateImages(updatedImages);
      setCurrentImageIndex(updatedImages.length - 1);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  return (
    <div
      className={`${dragOver ? 'drag-over' : ''} hidden sm:block w-1/2 p-4 relative`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {images.length > 0 ? (
        <div className="relative">
          <img
            src={images[currentImageIndex]}
            alt={productName}
            className="w-full h-auto rounded-lg cursor-pointer"
            onClick={handleImageClick}
          />
          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-r-md"
              >
                &#8249;
              </button>
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-l-md"
              >
                &#8250;
              </button>
            </>
          )}
        </div>
      ) : (
        <div
          className="flex items-center justify-center w-full h-full border border-dashed border-gray-400 rounded-lg cursor-pointer"
          onClick={handleImageClick}
        >
          <p>Arrastra y suelta una imagen aquí o haz clic para seleccionar</p>
        </div>
      )}
      {isAdmin && (
        <input
          type="file"
          ref={fileInputRef}
          style={{display: 'none'}}
          accept="image/*"
          onChange={handleFileChange}
        />
      )}
    </div>
  );
};

export default ImageContainer;
