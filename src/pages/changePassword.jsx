import React from 'react'
import AppBar2 from '../components/appBar2'
import { useAuth } from '../context/AuthContext';

const ChangePassword = () => {
    const { user } = useAuth();

    if (!user) {
      return <h2>Please log in to access this page.</h2>;
    }
  return (
    <div>
        <AppBar2 />
        <div className='p-4'>
            <p className='text-2xl tracking-wider font-bold'>Change Password</p>
        </div>
    </div>
  )
}

export default ChangePassword
