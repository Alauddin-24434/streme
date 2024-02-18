/* eslint-disable @next/next/no-img-element */
import React from 'react';

const ProfileCard = () => {
    const fakeProfile = {
        imageUrl: 'https://placekitten.com/200/200', // Replace with your actual image URL
        name: 'Md Alauddin',
        role: 'Admin',
        status: 'Active',
      };
    
  return (
    <div className="h-full p-4 relative  rounded-lg shadow-md">
      <div className="flex  justify-center">
        <img
          src={fakeProfile.imageUrl}
          alt="Profile"
          className="rounded-full w-36 h-36 object-cover border-4 border-blue-500"
        />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold">{fakeProfile.name}</h2>
        <p className="text-gray-500">{fakeProfile.role}</p>
        <p className={`mt-2 text-sm ${fakeProfile.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
          {fakeProfile.status}
        </p>
      </div>
      <div className="mt-4 flex absolute -bottom-1 p-2 right-0 justify-center">
        <button
         
          className="bg-slate-950 text-sm text-white px-4  rounded-sm  focus:outline-none"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
