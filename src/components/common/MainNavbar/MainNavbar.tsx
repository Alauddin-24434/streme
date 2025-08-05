'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';

const MainNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const user = useSelector(selectCurrentUser);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="w-full">
      <nav className="bg-[#1D1D1D]">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between py-2 items-center">
            {/* Logo */}
            <Link href="/">
              <img
                className="w-40"
                src="https://i.ibb.co/B396qB4/Screenshot-2024-02-07-031511-removebg-preview.png"
                alt="Your Logo"
              />
            </Link>

            {/* Navigation Links */}
            <div className="flex justify-center items-center">
              {[ 'home','movies', 'drama', 'historys'].map((item) => {
                const isActive = pathname === `/${item}`;
                return (
                  <Link key={item} href={`/${item}`} className="mr-2">
                    <button
                      className={`text-white text-sm md:text-base lg:text-lg px-4 py-1 rounded transition ${
                        isActive ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-green-600'
                      }`}
                    >
                     <span className='uppercase cursor-pointer'> {item}</span>
                    </button>
                  </Link>
                );
              })}
            </div>

            {/* Profile Dropdown */}
            <div className="flex items-center relative">
              <div className="relative ml-2">
                {/* Toggle button (you can add a user icon here) */}
                <button
                  onClick={toggleDropdown}
                  className="text-white hover:text-green-400"
                >
                  ☰
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 z-50">
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
  );
};

export default MainNavbar;
