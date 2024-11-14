import React, {useRef, useState} from 'react';
import {saveImageToCloud} from '../../../../../api/cloudSave';
import {generateImageName} from './utils';

type ImageContainerProps = {
  imageUrl: string | null;
  sectionName: string;
  productName: string;
  onUpdateImage: (img: string) => void;
};

const ImageContainer: React.FC<ImageContainerProps> = ({imageUrl, sectionName, productName, onUpdateImage}) => {
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
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
      const imageName = generateImageName(file.name, sectionName, productName);
      const uploadedImageUrl = await saveImageToCloud(file, imageName);
      setCurrentImageUrl(uploadedImageUrl);
      onUpdateImage(uploadedImageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  return (
    <div
      className={`${dragOver ? 'drag-over' : ''} hidden sm:block w-1/2 p-4`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleImageClick}
    >
      {currentImageUrl ? (
        <img src={currentImageUrl} alt={productName} className="w-full h-auto rounded-lg" />
      ) : (
        <p>Drag & Drop an image here or click to select</p>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{display: 'none'}}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  )
};

export default ImageContainer;
