
'use client'
import { FaSpinner } from 'react-icons/fa';
import { useState } from 'react';
import ProtectedRoute from '@/utils/ProtectedRoute';
import Sidebar from '../Sidebar/Sidebar';
import MainNavbar from '@/components/MainNavbar/MainNavbar';
import VideoCard from '@/components/Cards/VideoCard/VideoCard';
import CelibratyCard from '@/components/Cards/CelibratyCard/CelibratyCard';
import ShowCard from '@/components/Cards/ShowCard/ShowCard';
import ChatModal from '@/components/chat/chatModal';

const spinnerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Adjust height as needed
};

export default function HomePage() {
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const handleSidebarToggle = () => {
        setIsOpen(!isOpen);
    };
    // Simulating loading for 3 seconds
    setTimeout(() => {
        setLoading(false);
    }, 3000);

    return (
        <ProtectedRoute>
            <div className='flex bg-slate-950'>
                <Sidebar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />
                <div className="flex flex-col flex-grow">
                    <MainNavbar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />
                    {loading ? (
                        <div style={spinnerStyles}>
                            <FaSpinner className="spin" size={50} />
                        </div>
                    ) : (
                        <div className='max-w-7xl  my-20 mx-auto'>
                            <VideoCard />
                            <CelibratyCard />
                            <ShowCard />
                            <ChatModal />
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
};
