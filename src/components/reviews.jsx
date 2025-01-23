import { Avatar, Rating, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getInitials } from '../util/helpers';
import { deepOrange } from '@mui/material/colors';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ApiUrl } from '../util/apiUrl';
import { useAuth } from '../context/AuthContext';
import moment from 'moment';

const Reviews = () => {
  const token = localStorage.getItem('token');
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      try {
        const technicianId = user._id;
        const response = await axios.get(`${ApiUrl}/getReview?technicianId=${technicianId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setReviews(response.data.reviews);
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching reviews');
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, [user, token]);

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex justify-center items-center my-4">
          <CircularProgress />
        </div>
      ) : reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="w-full flex flex-row items-start gap-3 mb-4 p-3 border-b">
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              {getInitials(review.customer.fullName)}
            </Avatar>
            <div>
              <div className="flex flex-row w-full justify-between items-center">
                <p className="text-base md:text-xl font-semibold text-gray-800">
                  {review.customer.fullName}
                </p>
              </div>
              <p className="text-sm md:text-lg text-gray-700 my-1">{review.review}</p>
              <div className="flex flex-row w-full justify-between items-center">
                <Rating value={review.rating} readOnly />
                <p className="text-sm lg:text-base text-[#8a817c]">
                  {moment(review.createdAt).format('DD/MM/YY')}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center my-4">
          <p className="text-gray-600 text-lg">No reviews yet.</p>
        </div>
      )}
    </div>
  );
};

export default Reviews;
