import React from 'react'
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuth();

    if (!user) {
      return <h2>Please log in to access this page.</h2>;
    }
  return (
    <h1>
      I am home
    </h1>
  )
}
export default Home