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
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Socials from '../components/socials';
import Reviews from '../components/reviews';
 
const Home = () => {
  const { user } = useAuth();

  // State variables
  const token = localStorage.getItem('token');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('')
  const [whatsappNumber, setWhatsappNumber] = useState('')
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
  const [tempWhatsappNumber, setTempWhatsappNumber] = useState('')
  const [tempPhoneNumber, setTempPhoneNumber] = useState('')

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
          setWhatsappNumber(profile.contact.WhatsAppNumber)
          setPhoneNumber(profile.contact.phoneNumber)
          setAvgRating(profile.rating.avgRatings);
          setBio(profile.bio || 'No bio available.')
        } catch (error) {
          console.log(error);
          toast.error('An error occurred while fetching the profile.');
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
        toast.success('Profile picture uploaded successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('An error occurred while uploading the profile picture.');
      } finally {
        setUploading(false);
      }
    } else {
       toast.warn('Please select a file to upload.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempBusinessName(businessName);
    setTempCategory(category);
    setTempAddress(address);
    setWhatsappNumber(whatsappNumber)
    setPhoneNumber(phoneNumber)
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
      setWhatsappNumber(tempWhatsappNumber)
      setPhoneNumber(tempWhatsappNumber)
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating the profile.');
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
      toast.success('Bio updated successfully!');
    } catch (error) {
      console.error('Error saving bio:', error);
      toast.error('Failed to save bio. Please try again.');
    } finally {
      setLoadingBio(false);
    }
  };

  if (!user) {
    return <h2>Please log in to access this page.</h2>;
  }

  return (
    <div className="w-full h-fit pb-4 bg-[#f5f5f5]">
      <AppBar2 />
      <ToastContainer className='mx-0 my-auto' />
      <div className="p-4 lg:w-[80%] w-full my-0 mx-auto h-fit mt-20">
        <div className="shadow rounded p-1">
          <div className="w-full h-full flex flex-col md:flex-row lg:items-center items-start p-4 gap-5">
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
                  <Skeleton width="100%" height={40} />
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
                {isFetching ? <Skeleton width="100%" /> : <><EmailIcon /> {email}</>}
              </p>
              <div className="flex flex-col gap-2">
                {isFetching ? (
                  <Skeleton width="100%" />
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
                  <Skeleton width="100%" />
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
                {isFetching ? <Skeleton width="100%" /> : <Rating value={avgRating} size="large" readOnly />}
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col gap-2 p-4'>
            <p className='font-bold text-gray-600 ml-2 tracking-wide'>Contact</p>
            <div className='flex flex-row lg:gap-5 gap-1 tracking-wide'>
              <CallIcon fontSize='medium' className='text-blue-600' /> 
              {isFetching ? (
                  <Skeleton width="100%" height={40} />
                ) : isEditing ? (
                  <TextField
                    value={tempPhoneNumber}
                    onChange={(e) => setTempPhoneNumber(e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <p className="text-gray-600 lg:text-lg text-sm flex gap-2 tracking-wider">{phoneNumber}</p>
                )}
            </div>
            <div className='flex flex-row gap-5 tracking-wider'>
              <WhatsAppIcon fontSize='medium' className='text-[#24cc63]'/>
              {isFetching ? (
                  <Skeleton width="100%" height={40} />
                ) : isEditing ? (
                  <TextField
                    value={tempWhatsappNumber}
                    onChange={(e) => setTempWhatsappNumber(e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <p className="text-gray-600 lg:text-lg text-sm flex gap-2 tracking-wider">{whatsappNumber}</p>
                )}
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
      <div className='p-6 lg:w-[80%] w-full my-0 mx-auto h-fit shadow rounded mt-8'>
        <p className='font-bold text-gray-600 tracking-wide text-lg'>Socials</p>
        <Socials />
      </div>
      <div className='p-6 lg:w-[80%] w-full my-0 mx-auto h-fit shadow rounded mt-8'>
        <p className='font-bold text-gray-600 tracking-wide text-lg'>Customer Reviews</p>
        <Reviews />
      </div>
    </div>
  );
};

export default Home;
