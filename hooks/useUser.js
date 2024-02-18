// useUserInfo.js
"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';


const useUserInfo = () => {
    const userDataString = localStorage.getItem('currentUser');

    // Parse user data into a JavaScript object
    const currentUser = userDataString ? JSON.parse(userDataString) : null;
    
  
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('https://endgame-team-server.vercel.app/users');
                // Filter the response based on the current user's email
                const currentUserInfo = response.data.find(user => user.email === currentUser.email);
                setUserInfo(currentUserInfo);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        if (currentUser) {
            fetchUserInfo();
        }
    }, [currentUser]);

    return userInfo;
};

export default useUserInfo;
