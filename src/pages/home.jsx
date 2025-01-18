import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AppBar2 from '../components/appBar2';
import Avatar from '../assets/imgaes/avater.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HandymanIcon from '@mui/icons-material/Handyman';
import EditIcon from '@mui/icons-material/Edit';
import { Rating, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { darkBrown } from '../util/colors';
import EmailIcon from '@mui/icons-material/Email';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { professions } from '../util/professions'; 
import axios from 'axios';
import { ApiUrl } from '../util/apiUrl';

const Home = () => {
  const token = localStorage.getItem('token')
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null)
  const [businessName, setBusinessName] = useState('John Doe Furnitures');
  const [category, setCategory] = useState('Carpenter');
  const [address, setAddress] = useState('Gwarzo road, Kano State');
  const [loading, setLoading] = useState(false)

  const [tempBusinessName, setTempBusinessName] = useState(businessName);
  const [tempCategory, setTempCategory] = useState(category);
  const [tempAddress, setTempAddress] = useState(address);

  if (!user) {
    return <h2>Please log in to access this page.</h2>;
  }

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      try {
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('profileImage', file); // Match 'profileImage' to the field expected by the backend
  
        // Make the POST request
        const response = await axios.post(`${ApiUrl}/uploadProfilePicture`, formData, {
          headers: {
            'Authorization': `${token}`, // Add your auth token
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        });
  
        // Update the state with the uploaded image URL
        setProfilePicture(response.data.url); // Assuming the backend sends the uploaded image URL
        alert('Profile picture uploaded successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('An error occurred while uploading the profile picture.');
      }
    } else {
      alert('Please select a file to upload.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempBusinessName(businessName);
    setTempCategory(category);
    setTempAddress(address);
  };

  const handleSave = async () => {
    setLoading(true)
    const formData = { businessName: tempBusinessName, profession: tempCategory, address: tempAddress };
    try {
      const response = await axios.put(`${ApiUrl}/updateTechnicianProfile`, formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      setIsEditing(false);
      setBusinessName(tempBusinessName);
      setCategory(tempCategory);
      setAddress(tempAddress);
    } catch (error) {
      console.log(error)
      alert('An error occured')      
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className='w-full h-fit'>
      <AppBar2 />
      <div className='p-4 lg:w-[80%] w-full my-0 mx-auto h-fit'>
        <div className='shadow rounded p-1'>
          <div className='w-full h-full flex flex-col lg:flex-row lg:items-center items-start p-4 gap-5'>
            <div className='relative flex justify-center items-center md:justify-start'>
              <div className='relative'>
                <img
                  src={profilePicture ? profilePicture : Avatar}
                  alt="Profile"
                  className="lg:w-56 lg:h-56 w-44 h-44 rounded-full border-4 border-double"
                />
                <label htmlFor="profile-upload" className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer">
                  <CameraAltIcon className="text-gray-700" />
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-between h-full lg:ml-5 lg:p-5 p-2 gap-4">
              <div className="flex flex-col gap-2">
                {isEditing ? (
                  <TextField
                    value={tempBusinessName}
                    onChange={(e) => setTempBusinessName(e.target.value)}
                    variant="outlined"
                    size="medium"
                  />
                ) : (
                  <p className='lg:text-4xl text-xl font-bold tracking-wide'>{businessName}</p>
                )}
              </div>
              <p className='text-gray-600 lg:text-lg text-sm flex gap-2 tracking-wide'>
                <EmailIcon /> johndoefurnitures@gmail.com
              </p>
              <div className="flex flex-col gap-2">
                {isEditing ? (
                  <FormControl fullWidth>
                    <InputLabel id="category-label">Profession</InputLabel>
                    <Select
                      labelId="category-label"
                      value={tempCategory}
                      onChange={(e) => setTempCategory(e.target.value)}
                      label="Profession"
                    >
                      {professions.map((profession) => (
                        <MenuItem key={profession} value={profession}>
                          {profession}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <p className='text-gray-600 lg:text-lg text-sm flex gap-2 tracking-wide'>
                    <HandymanIcon color={darkBrown} /> {category}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {isEditing ? (
                  <TextField
                    value={tempAddress}
                    onChange={(e) => setTempAddress(e.target.value)}
                    variant="outlined"
                    size="medium"
                  />
                ) : (
                  <p className='text-gray-600 lg:text-lg text-sm flex gap-2 tracking-wide'>
                    <LocationOnIcon color={darkBrown} /> {address}
                  </p>
                )}
              </div>
              <div className='flex flex-col gap-1'>
                <p className='font-bold text-gray-600 ml-2 tracking-wide'>Avg Rating</p>
                <Rating value={4} size='large' readOnly />
              </div>
            </div>
          </div>
          <div className='w-full flex justify-end p-2 gap-2'>
            {isEditing ? (
              <>
                <Button variant="contained" color='success' onClick={handleSave}>
                  {loading ? 'Saving...' : 'Save'}
                </Button>
                <Button variant="outlined" color="warning" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                sx={{backgroundColor: darkBrown}}
                startIcon={<EditIcon />}
                onClick={handleEdit}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
