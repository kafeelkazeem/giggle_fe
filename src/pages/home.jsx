import React from 'react'
import { useAuth } from '../context/AuthContext';
import AppBar2 from '../components/appBar2';
import Avatar from '../assets/imgaes/avater.png'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HandymanIcon from '@mui/icons-material/Handyman';
import { Rating } from '@mui/material';
import { darkBrown } from '../util/colors';
import EmailIcon from '@mui/icons-material/Email';
import CameraAltIcon from '@mui/icons-material/CameraAlt';


const Home = () => {
    const { user } = useAuth();

    if (!user) {
      return <h2>Please log in to access this page.</h2>;
    }

    const handleProfileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Handle file upload logic here
        console.log('File uploaded:', file);
      }
    };
  return (
    <div className='w-full h-fit'>
      <AppBar2 />
      <div className='p-4 lg:w-[80%] w-full my-0 mx-auto h-fit'>
        {/* <p className='text-2xl tracking-wider font-bold'>Profile</p> */}
        <div className='w-full h-full flex flex-col lg:flex-row lg:items-center items-start p-4 shadow gap-5 rounded'>
          <div className='"w-full flex justify-center items-center md:justify-start'>
            <div>
              <img
                src={Avatar}
                alt="Profile"
                className="lg:w-56 lg:h-56 w-44 h-44 rounded-full border-4 border-double"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between h-full lg:ml-5 lg:p-5 p-2 gap-4">
            <p className='lg:text-4xl text-xl font-bold tracking-wide'>John Doe Furnitures</p>
            <p className='text-gray-600 lg:text-lg text-sm flex gap-2 tracking-wide'><EmailIcon /> johndoefurnitures@gmail.com</p>
            <p className='text-gray-600 lg:text-lg text-sm flex gap-2 tracking-wide'><HandymanIcon color={darkBrown} /> Capenter</p>
            <p className='text-gray-600 lg:text-lg text-sm flex gap-2 tracking-wide'><LocationOnIcon color={darkBrown} /> Gwarzo road, Kano State</p>
            <div className='flex flex-col gap-1 '>
              <p className='font-bold text-gray-600 ml-2 tracking-wide'>Avg Rating</p>
              <Rating value={4} size='large' readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home