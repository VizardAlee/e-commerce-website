// src/components/ProfilePage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You may need to install axios

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profilePicture: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('userInfo');
    if (!token) {
      // Handle the case where the token is not found
      // You might want to redirect to the login page or display an error message
      return;
    }
    
    const userInfo = JSON.parse(token);

    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        // Handle errors, such as token expiration or failed authentication
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <img src={userData.profilePicture} alt="Profile" />
        <h3>Name: {userData.name}</h3>
        <p>Email: {userData.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
