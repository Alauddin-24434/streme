'use client'
import Link from 'next/link';
import React from 'react';


export default function Sidebar({ isOpen, handleSidebarToggle }) {
  return (
    <div
      className={`bg-gray-800 text-white overflow-hidden fixed w-full lg:w-64  h-screen overflow-y-auto transition-transform transform ${
        isOpen ? '' : '-translate-x-full'
      } ease-in-out duration-300 z-50`}
      id="sidebar">
      <div className="p-6 overflow-hidden">
        <div className='flex justify-between items-center mt-2'>
        
         
        </div>
        <ul className="mt-16 leading-8">
          <li className="mb-2">
            <Link href={'/home'} className="block hover:text-indigo-400">
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link href={'Sidebar/playlist'} className="block hover:text-indigo-400">
              Playlist Video
            </Link>
          </li>
          <li className="mb-2">
            <Link href={'Sidebar/liked'} className="block hover:text-indigo-400">
              Liked Video
            </Link>
          </li>
          <li className="mb-2">
            <Link href={'Sidebar/contact'} className="block hover:text-indigo-400">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
