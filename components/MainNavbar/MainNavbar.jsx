'use client'
import React, { useContext, useState } from 'react';
import Link from 'next/link';


import { IoMdMenu } from "react-icons/io";
import Sidebar from '@/app/Sidebar/Sidebar';

import { useRouter } from 'next/navigation';
import NotificationMenu from '../Notification/Notification';
import { AuthContext } from '@/Provider/AuthProvider';

import useUserInfo from '@/hooks/useUser';



// Assuming the Sidebar component exists

const MainNavbar = ({ isOpen, handleSidebarToggle,epis }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const userInfo = useUserInfo();
  const router = useRouter()
  // console.log(userInfo)
  const { logout } = useContext(AuthContext)
  const handleLogOut = () => {
    logout()
  
    console.log(userInfo)

  }

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    // Handle filtering based on genre
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Handle filtering based on search query
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      const encodedQuery = encodeURIComponent(searchQuery);
      router.push(`/result?q=${encodedQuery}`);
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };



  return (
    <div className='w-full fixed z-20'>
      <div>
        {isSidebarOpen && <Sidebar />}
      </div>
      <div>
        <nav className="bg-slate-900 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between py-2 items-center">
              <button onClick={handleSidebarToggle} ><IoMdMenu className='h-6 w-6 text-white'></IoMdMenu></button>
              <div className="flex items-center justify-center">
                <Link href="/home">
                  <img className="w-40" src="https://i.ibb.co/B396qB4/Screenshot-2024-02-07-031511-removebg-preview.png" alt="Your Logo" />
                </Link>
              </div>
              <div className="flex justify-center items-center ">
                <Link href="/movies">
                  <span className="text-white text-xs md:text-base lg:text-lg xl:text-lg 2xl:text-lg mr-3 cursor-pointer">Movies</span>
                </Link>

                <Link href="/drama">
                  <span className="text-white text-xs md:text-base lg:text-lg xl:text-lg 2xl:text-lg mr-3 cursor-pointer">Drama</span>
                </Link>
                <Link href="/Historys">
                  <span className="text-white text-xs md:text-base lg:text-lg xl:text-lg 2xl:text-lg mr-3 cursor-pointer">History</span>
                </Link>
              </div>
              <div className="flex items-center  relative">

                <input
                  type="text"
                  placeholder="Search movies..."
                  className="bg-gray-700 text-white rounded-md py-1 px-3 focus:outline-none focus:ring-2 mr-2
             w-full"
                  onChange={handleSearch}
                  onKeyDown={handleEnterPress}
                />


                <NotificationMenu />

                <div>
                  <button onClick={toggleDropdown} className="flex items-center text-white focus:outline-none">
                    <img src={userInfo?.photoURL} alt="User Avatar" className="w-6 h-6 rounded-full" />
                    <span className="ml-2">{userInfo?.displayName}</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-950 rounded-md shadow-lg">
                      <div className="py-1 px-4">
                        <div className="block  py-2 text-white " >
                          <Link href="/dashboard">
                            <span className="text-white"> Dashboard</span>
                          </Link>
                        </div>
                      <div className='text-white'>
                      <button onClick={handleLogOut}>Logout</button>
                      </div>
                      </div>
                    </div>
                  )}
                </div>


              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MainNavbar;
