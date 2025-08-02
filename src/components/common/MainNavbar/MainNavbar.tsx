'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/src/redux/features/auth/authSlice';


const MainNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector(selectCurrentUser)
  const router = useRouter();

  // Replace this with your actual auth logic


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery) {
      const encodedQuery = encodeURIComponent(searchQuery);
      router.push(`/result?q=${encodedQuery}`);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };


  return (
    <>

      {/* Navbar */}
      <div className="w-full fixed z-30 ">
        <nav className="bg-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between py-2 items-center">


              {/* Logo */}
              <Link href="/home">
                <img
                  className="w-40"
                  src="https://i.ibb.co/B396qB4/Screenshot-2024-02-07-031511-removebg-preview.png"
                  alt="Your Logo"
                />
              </Link>

              {/* Navigation Links */}
              <div className="flex justify-center items-center">
                {['movies', 'drama', 'historys'].map((item) => (
                  <Link key={item} href={`/${item}`}>
                    <span className="text-white text-sm md:text-base lg:text-lg mr-3 cursor-pointer capitalize">
                      {item}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Search + Notifications + Profile */}
              <div className="flex items-center relative">
                <input
                  type="text"
                  placeholder="Search movies..."
                  className="bg-gray-700 text-white rounded-md py-1 px-3 focus:outline-none focus:ring-2 mr-2 w-full"
                  onChange={handleSearch}
                  onKeyDown={handleEnterPress}
                />


                {/* Dropdown */}
                <div className="relative ml-2">
                  <button onClick={toggleDropdown} className="flex items-center text-white focus:outline-none">

                    <span className="ml-2 hidden md:block">{user?.name}</span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-950 rounded-md shadow-lg z-50">
                      <div className="py-2 px-4">
                        {user?.isAdmin ? (
                          <Link href="/dashboard" className="block py-2 text-white hover:underline">
                            Dashboard
                          </Link>
                        ) : (
                          <Link href="/userprofile" className="block py-2 text-white hover:underline">
                            Profile
                          </Link>
                        )}
                        <button className="block text-left w-full py-2 text-white hover:text-red-400">
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MainNavbar;
