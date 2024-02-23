"use client";
// drama/[id] page.js 

import EpisodeCard from '@/components/Cards/EpisodeCard/EpisodeCard';
import MainNavbar from '@/components/MainNavbar/MainNavbar';
import ProtectedRoute from '@/utils/ProtectedRoute';
import React, { useState } from 'react';




const VideoDetail = ({ params }) => {
  const { id } = params;

  const [isOpen, setIsOpen] = useState(false);

  const handleSidebarToggle = () => {
      setIsOpen(!isOpen);
  };
  return (
    <ProtectedRoute>
    <div>

        <section className="max-w-7xl mx-auto px-2">

            <div className='flex '>

                <div className="flex flex-col flex-grow">
                    <MainNavbar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />

                    <div >
                    <EpisodeCard id={id} />
                    </div>

                </div>
            </div>
        </section >
    </div >
</ProtectedRoute>
  );
};

export default VideoDetail;
