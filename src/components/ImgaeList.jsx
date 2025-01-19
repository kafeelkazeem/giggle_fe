import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, IconButton } from '@mui/material';
import { ImageList, ImageListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { ApiUrl } from '../util/apiUrl';

const Image = () => {
  const token = localStorage.getItem('token');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for fetching images
  const [uploading, setUploading] = useState(false); // Loading state for image upload
  const [deletingImage, setDeletingImage] = useState(null); // Track the image being deleted

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get(`${ApiUrl}/getImages`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setImages(response.data.images.pastJobsPicture);
      } catch (error) {
        alert('An error occurred while fetching images.');
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    fetchImages();
  }, []);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      alert('No files selected.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));

    try {
      const response = await axios.post(`${ApiUrl}/uploadPastJobsPictures`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
      });

      const uploadedImages = response.data.images;
      setImages(uploadedImages);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('An error occurred while uploading images.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageUrl) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    setDeletingImage(imageUrl); // Set the image being deleted
    try {
      const response = await axios.delete(`${ApiUrl}/deleteImage`, {
        headers: {
          Authorization: `${token}`,
        },
        data: { imageUrl }, // Pass the image URL in the request body
      });

      if (response.data.success) {
        setImages((prevImages) => prevImages.filter((image) => image !== imageUrl));
      } else {
        alert('Failed to delete image.');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('An error occurred while deleting the image.');
    } finally {
      setDeletingImage(null); // Reset the deleting state
    }
  };

  return (
    <div>
      {loading ? ( // Display loader while fetching images
        <div className="w-full flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : images.length > 0 ? (
        <ImageList cols={3} gap={8}>
          {images.map((image, index) => (
            <ImageListItem key={index}>
              <img
                className="h-20 w-20"
                src={image} // Ensure the server sends image URLs
                alt={`Image ${index + 1}`}
                loading="lazy"
                style={{ objectFit: 'cover', borderRadius: 8 }}
              />
              <div style={{ position: 'relative', textAlign: 'right', marginTop: 8 }}>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => handleDeleteImage(image)}
                  disabled={deletingImage === image} // Disable button if this image is being deleted
                >
                  {deletingImage === image ? (
                    <CircularProgress size={20} color="error" />
                  ) : (
                    <>
                      Delete
                      <DeleteIcon />
                    </>
                  )}
                </IconButton>
              </div>
            </ImageListItem>
          ))}
        </ImageList>
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
