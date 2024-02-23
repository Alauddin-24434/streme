'use client'
// MainNavbar.js
import React, { useState } from 'react';
import Link from 'next/link';
import useUserInfo from '@/hooks/useUser';
import LogoutButton from '../Logout/LogoutButton';
import { IoMdMenu } from "react-icons/io";
import Sidebar from '@/app/Sidebar/Sidebar';
import { useRouter } from 'next/navigation';

const MainNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for user dropdown
  const userInfo = useUserInfo();
  const router = useRouter();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    // Handle search logic
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      const encodedQuery = encodeURIComponent(e.target.value);
      router.push(`/result?q=${encodedQuery}`);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const handleLogout = () => {
    // Logic to handle user logout
  };

  return (
    <div>
      <div>
        {/* Pass necessary props to Sidebar */}
        <Sidebar isOpen={isSidebarOpen} handleSidebarToggle={handleSidebarToggle} />
      </div>
      <div  className='fixed z-50 w-full transition-all px-8 duration-300'>
        <nav className="bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between py-2 items-center">
              {/* Add onClick handler to toggle sidebar */}
             
              <div className="flex items-center justify-center">
                {/* Your logo link */}
             
                 <button onClick={handleSidebarToggle}><IoMdMenu className='h-6 w-6 text-white'></IoMdMenu></button>
                 <Link href="/home">
                  <img className="w-40" src="https://i.ibb.co/B396qB4/Screenshot-2024-02-07-031511-removebg-preview.png" alt="Your Logo" />
                </Link>
              </div>
              <div className="flex justify-center items-center ">
                {/* Your navigation links */}
                <Link href="/home">
                  <span className="text-white text-xs md:text-base lg:text-lg xl:text-lg 2xl:text-lg mr-4 cursor-pointer">For You</span>
                </Link>
               
                <Link href="/movies">
                  <span className="text-white text-xs md:text-base lg:text-lg xl:text-lg 2xl:text-lg mr-4 cursor-pointer">Movies</span>
                </Link>
               
                <Link href="/drama">
                  <span className="text-white text-xs md:text-base lg:text-lg xl:text-lg 2xl:text-lg mr-4 cursor-pointer">Drama</span>
                </Link>
                <Link href="/Historys">
                  <span className="text-white text-xs md:text-base lg:text-lg xl:text-lg 2xl:text-lg mr-4 cursor-pointer">History</span>
                </Link>
              </div>
              <div className="flex items-center  relative">
                <input
                  type="text"
                  placeholder="Search movies..."
                  className="bg-gray-700 text-white rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4 w-full"
                  onChange={handleSearch}
                  onKeyDown={handleEnterPress}
                />
                {/* User dropdown or login link */}
                {userInfo ? (
                  <div>
                    <button onClick={toggleDropdown} className="flex items-center text-white focus:outline-none">
                      <img src={userInfo?.photoURL} alt="User Avatar" className="w-10 h-10 rounded-full" />
                      <span className="ml-2">{userInfo?.displayName}</span>
                    </button>
                    {/* Dropdown content */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-slate-950 rounded-md shadow-lg">
                        <div className="py-1 px-4">
                          <div className="block  py-2 text-white " >
                            <Link href="/dashboard">
                              <span className="text-white"> Dashboard</span>
                            </Link>
                          </div>
                          <LogoutButton handleLogout={handleLogout} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/login">
                    <span className="text-black">Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MainNavbar;
