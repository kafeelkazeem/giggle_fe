import React from 'react'
import { useAuth } from '../context/AuthContext';
import AppBar2 from '../components/appBar2';

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
        <div>
          
        </div>
      </div>
    </div>
  )
}
export default Home