
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import useUserInfo from '@/hooks/useUser';
import LogoutButton from '../Logout/LogoutButton';


const MainNavbar = () => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userInfo = useUserInfo();

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <div>
      <nav className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between py-2 items-center">
            <div className="flex items-center justify-center">
              <Link href="/home">
                <img className="w-40" src="https://i.ibb.co/B396qB4/Screenshot-2024-02-07-031511-removebg-preview.png" alt="Your Logo" />
              </Link>
            </div>
            <div className="flex justify-center items-center">
              <Link href="/movies">
                <span className="text-white mr-4 cursor-pointer">Movies</span>
              </Link>
              <Link href="/animation">
                <span className="text-white mr-4 cursor-pointer">Animation</span>
              </Link>
              <Link href="/tv-shows">
                <span className="text-white mr-4 cursor-pointer">TV Shows</span>
              </Link>
            </div>
            <div className="flex items-center gap-4 relative">
              <select
                value={selectedGenre}
                onChange={handleGenreChange}
                className="bg-gray-700 text-white rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
              >
                <option value="">All Genres</option>
                <option value="animation">Animation</option>
                <option value="horror">Horror</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="action">Action</option>
              </select>
              <input
                type="text"
                placeholder="Search movies..."
                className="bg-gray-700 text-white rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSearch}
              />
              {userInfo ? (
                <div>
                  <button onClick={toggleDropdown} className="flex items-center text-white focus:outline-none">
                    <img src={userInfo?.photoURL} alt="User Avatar" className="w-8 h-8 rounded-full" />
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



                        <LogoutButton />

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
  );
};

export default MainNavbar;
