"use client"
import React, { useState, useEffect } from 'react';
import Card from '@/components/dashboard/card/card';
import UserProfile from '@/components/dashboard/table/modal/UserRelated/userProfile/UserProfile';
import useUserInfo from '@/hooks/useUser';

const Dashboard = () => {
    const userInfo = useUserInfo();
    const isAdmin = userInfo?.isAdmin;
    const [loading, setLoading] = useState(true); // Initialize loading state as true

    // Simulate loading delay, replace this with your actual loading logic
    useEffect(() => {
        // Only set loading state to false after the admin status is checked
        if (userInfo) {
            setLoading(false);
        }
    }, [userInfo]);

    // If loading, display loading indicator
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    // Once loading is done, render either Card or UserProfile based on admin status
    return (
        <div className="h-screen">
            <div>
                {isAdmin ? <Card /> : <UserProfile />}
            </div>
        </div>
    );
};

export default Dashboard;
