import React, { useContext } from 'react';

import { AuthContext } from '@/Provider/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';



const LogoutButton = () => {
  
const { logout } = useContext(AuthContext); 
  const handleLogout = async () => {
    try {
      await logout();
      console.log('User logged out successfully');
      toast.success("Logout successfully")
      
      // Optionally, you can redirect the user to another page after logout
      // Example: window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
   <div className='text-white'>
     <button onClick={handleLogout}>Logout</button>
     <Toaster
        position="top-center"
      
      />
   </div>
  );
};

export default LogoutButton;
