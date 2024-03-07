"use client"
import React from 'react';
import useUserInfo from '@/hooks/useUser';

const UserProfile = () => {
    const userInfo = useUserInfo();

    return (
        <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-md bg-white">
            <div className="px-6 py-8">
                <div className="text-center mb-4">
                    {userInfo && userInfo.photoURL ? (
                        <img src={userInfo.photoURL} className="w-16 h-16 rounded-full mx-auto mb-4" alt="Profile" />
                    ) : (
                        <img src="https://i.ibb.co/dgPCtjH/profileavt.jpg" className="w-24 h-24 rounded-full mx-auto mb-4" alt="Default Profile" />
                    )}
                    <h2 className="text-xl font-semibold text-gray-600">{userInfo && userInfo?.userName}</h2>
                    <p className="text-gray-600">{userInfo && userInfo?.email}</p>
                </div>
              
            </div>
        </div>
    );
};

export default UserProfile;
