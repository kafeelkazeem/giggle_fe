import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { ImageList, ImageListItem } from '@mui/material';
import axios from 'axios';
import { ApiUrl } from '../util/apiUrl'; // Replace with your actual API URL

const Image = ({ images: initialImages }) => {
  const token = localStorage.getItem('token')
  const [images, setImages] = useState(initialImages || []);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      alert('No files selected.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append('images', file)); // Backend should handle multiple files

    try {
      const response = await axios.post(`${ApiUrl}/uploadPastJobsPictures`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
           Authorization: `${token}`
        },
      });

      // Assuming the server responds with an array of uploaded image URLs
      const uploadedImages = response.data.images;
      console.log(uploadedImages)
      setImages(uploadedImages);
      alert('Images uploaded successfully!');
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('An error occurred while uploading images.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {images.length > 0 ? (
        <>
          <ImageList cols={3} gap={8}>
            {images.map((image, index) => (
              <ImageListItem key={index}>
                <img
                  src={image} // Ensure the server sends image URLs
                  alt={image.name || `Image ${index + 1}`}
                  loading="lazy"
                  style={{ objectFit: 'cover', borderRadius: 8 }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </>
      ) : (
        <div className="w-full flex justify-center items-center">
          <p>No images available</p>
        </div>
      )}
      <div className="w-full flex justify-end mt-4">
        <Button
          variant="contained"
          component="label"
          disabled={uploading}
          startIcon={uploading ? <CircularProgress size={20} /> : null}
        >
          {uploading ? 'Uploading...' : 'Upload Image +'}
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleImageUpload}
          />
        </Button>
      </div>
    </div>
  );
};

export default Image;
