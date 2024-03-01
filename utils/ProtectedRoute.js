"use client";
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUserInfo from '@/hooks/useUser';
import { AuthContext } from '@/Provider/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { currentUser, getCurrentUser } = useContext(AuthContext);
  const userInfo = useUserInfo();
  const router = useRouter();

  useEffect(() => {
    // Check if currentUser exists in context or in local storage
    if (!currentUser && !getCurrentUser()) {
      router.push('/'); // Redirect to the login page
    }

    // Check if user is not a payment user and redirect if needed
    if (userInfo && !userInfo.isPayment) {
      router.push('/subscribe'); // Redirect to the subscribe page
    }
  }, [currentUser, getCurrentUser, userInfo, router]);

  // Render children only if currentUser exists and user is a payment user
  return currentUser && userInfo?.isPayment ? <>{children}</> : null;
};

export default ProtectedRoute;
