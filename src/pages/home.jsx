import React from 'react'
import { useAuth } from '../context/AuthContext';
import AppBar2 from '../components/appBar2';
import Avatar from '../assets/imgaes/avater.png'

const Home = () => {
    const { user } = useAuth();

    if (!user) {
      return <h2>Please log in to access this page.</h2>;
    }
  return (
    <div className='w-full h-fit'>
      <AppBar2 />
      <div className='p-4 w-full h-fit'>
        <p className='text-2xl tracking-wider font-bold'>Profile</p>
        <div className='w-full h-full flex items-center p-4 shadow-lg'>
          <div>
            <img
              src={Avatar}
              alt="Profile"
              className="lg:w-56 lg:h-56 w-16 h-16 rounded-full border-4 border-double"
            />
          </div>
          <div className="flex flex-col justify-between h-full ml-5 p-5">
            <p className='text-4xl font-bold'>John Doe</p>
            <p className='text-gray-500 text-lg'>Capenter</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home