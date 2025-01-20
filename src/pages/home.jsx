import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AppBar2 from '../components/appBar/appBar2';
import Avatar from '../assets/imgaes/avater.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HandymanIcon from '@mui/icons-material/Handyman';
import EditIcon from '@mui/icons-material/Edit';
import { Rating, TextField, Button, MenuItem, Select, InputLabel, FormControl, CircularProgress, Skeleton } from '@mui/material';
import { darkBrown } from '../util/colors';
import EmailIcon from '@mui/icons-material/Email';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { professions } from '../util/professions';
import axios from 'axios';
import { ApiUrl } from '../util/apiUrl';
import Image from '../components/ImgaeList';
 
const Home = () => {
  const { user } = useAuth();

  // State variables
  const token = localStorage.getItem('token');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [avgRating, setAvgRating] = useState(null);
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [loadingBio, setLoadingBio] = useState(false);

  // Temporary states for editing
  const [tempBusinessName, setTempBusinessName] = useState('');
  const [tempCategory, setTempCategory] = useState('');
  const [tempAddress, setTempAddress] = useState('');
  const [tempBio, setTempBio] = useState('');

  useEffect(() => {
    if (user) {
      const getTechnicianProfile = async () => {
        try {
          const response = await axios.get(`${ApiUrl}/getMyProfile`, {
            headers: {
              Authorization: `${token}`,
            },
          });
          const profile = response.data.myProfile
          setProfilePicture(profile.profilePicture);
          setBusinessName(profile.businessName);
          setCategory(profile.profession);
          setAddress(profile.location.address);
          setEmail(profile.email);
          setAvgRating(profile.rating.avgRatings);
          setBio(profile.bio || 'No bio available.')
        } catch (error) {
          console.log(error);
          alert('An error occurred');
        } finally {
          setIsFetching(false);
        }
      };
      getTechnicianProfile();
    }
  }, [user, token]);

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('profileImage', file);

        const response = await axios.post(`${ApiUrl}/uploadProfilePicture`, formData, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        setProfilePicture(response.data.url);
        alert('Profile picture uploaded successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('An error occurred while uploading the profile picture.');
      } finally {
        setUploading(false);
      }
    } else {
      alert('Please select a file to upload.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempBusinessName(businessName);
    setTempCategory(category);
    setTempAddress(address);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    setLoading(true);
    const formData = { businessName: tempBusinessName, profession: tempCategory, address: tempAddress };
    try {
      await axios.put(`${ApiUrl}/updateTechnicianProfile`, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setIsEditing(false);
      setBusinessName(tempBusinessName);
      setCategory(tempCategory);
      setAddress(tempAddress);
    } catch (error) {
      console.log(error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleBioEdit = () => {
    setIsEditingBio(true);
    setTempBio(bio);
  };

  const handleBioCancel = () => {
    setIsEditingBio(false);
  };

  const handleBioSave = async () => {
    setLoadingBio(true);
    try {
      await axios.put(
        `${ApiUrl}/updateBio`,
        { bio: tempBio },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setBio(tempBio);
      setIsEditingBio(false);
    } catch (error) {
      console.error('Error saving bio:', error);
      alert('Failed to save bio. Please try again.');
    } finally {
      setLoadingBio(false);
    }
  };

  if (!user) {
    return <h2>Please log in to access this page.</h2>;
  }

  return (
    <div className="w-full h-fit pb-4">
      <AppBar2 />
      <div className="p-4 lg:w-[80%] w-full my-0 mx-auto h-fit mt-20">
        <div className="shadow rounded p-1">
          <div className="w-full h-full flex flex-col lg:flex-row lg:items-center items-start p-4 gap-5">
            <div className="relative flex justify-center items-center md:justify-start">
              <div className="relative">
                {isFetching ? (
                  <Skeleton variant="circular" width={180} height={180} />
                ) : (
                  <img
                    src={profilePicture ? profilePicture : Avatar}
                    alt="Profile"
                    className="lg:w-56 lg:h-56 w-44 h-44 rounded-full border-4 border-double"
                  />
                )}
                <label htmlFor="profile-upload" className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer">
                  {uploading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <CameraAltIcon className="text-gray-700" />
                  )}
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-between h-full lg:ml-5 lg:p-5 p-2 gap-4">
              <div className="flex flex-col gap-2">
                {isFetching ? (
                  <Skeleton width="60%" height={40} />
                ) : isEditing ? (
                  <TextField
                    value={tempBusinessName}
                    onChange={(e) => setTempBusinessName(e.target.value)}
                    variant="outlined"
                    size="medium"
                  />
                ) : (
                  <p className="lg:text-4xl text-xl font-bold tracking-wide">{businessName}</p>
                )}
              </div>
              <p className="text-gray-600 lg:text-lg text-sm flex gap-2 tracking-wide">
                {isFetching ? <Skeleton width="40%" /> : <><EmailIcon /> {email}</>}
              </p>
              <div className="flex flex-col gap-2">
                {isFetching ? (
                  <Skeleton width="40%" />
                ) : isEditing ? (
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
                  <p className="text-gray-600 lg:text-lg text-sm flex gap-2 tracking-wide">
                    <HandymanIcon color={darkBrown} /> {category}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {isFetching ? (
                  <Skeleton width="40%" />
                ) : isEditing ? (
                  <TextField
                    value={tempAddress}
                    onChange={(e) => setTempAddress(e.target.value)}
                    variant="outlined"
                    size="medium"
                  />
                ) : (
                  <p className="text-gray-600 lg:text-lg text-sm flex gap-2 tracking-wide">
                    <LocationOnIcon color={darkBrown} /> {address}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold text-gray-600 ml-2 tracking-wide">Avg Rating</p>
                {isFetching ? <Skeleton width="20%" /> : <Rating value={avgRating} size="large" readOnly />}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end p-2 gap-2">
            {isEditing ? (
              <>
                <Button variant="contained" color="success" onClick={handleSave} disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
                </Button>
                <Button variant="outlined" color="warning" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                sx={{ backgroundColor: darkBrown }}
                startIcon={<EditIcon />}
                onClick={handleEdit}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className='p-6 lg:w-[80%] w-full my-0 mx-auto h-fit'>
        <div className="flex flex-col">
            <p className="font-bold text-gray-600 tracking-wide text-lg">Bio</p>
        </div> 
        {isEditingBio ? (
          <div className="mt-2">
            <TextField
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={4}
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button
                variant="contained"
                color="success"
                onClick={handleBioSave}
                disabled={loadingBio}
              >
                {loadingBio ? 'Saving...' : 'Save'}
              </Button>
              <Button
                variant="outlined"
                color="warning"
                onClick={handleBioCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
          ) : (
            <div className='flex flex-col'>
              <div className='border w-full h-32 p-2'>
                <p className="text-gray-600 mt-2">{bio}</p>
              </div>
                <div className='flex w-full justify-end p-2'>
                  {!isEditingBio && (
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={handleBioEdit}
                      size="small"
                    >
                      Edit
                    </Button>
                  )}
                </div>
            </div>
          )}
      </div>
      <div className='p-6 lg:w-[80%] w-full my-0 mx-auto h-fit shadow rounded'>
        <p className='font-bold text-gray-600 tracking-wide text-lg'>Images</p>
        <Image />
      </div>
      <div className='p-6 lg:w-[80%] w-full my-0 mx-auto h-fit mt-3'>
        <p className='font-bold text-gray-600 tracking-wide text-lg'>Contact</p>
  
      </div>
    </div>
  );
};

export default Home;
