"use client"
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';

const DashNav = () => {
    const userInfo = useSelector(selectCurrentUser);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const isAdmin = userInfo?.isAdmin;

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isSidebarOpen]);

    return (
        <div className="flex flex-col">
            {/* Top bar */}
            <div className="px-4 py-4 bg-[#09526C] text-white">
                {/* Right side: Route links and user information */}
                <div className="lg:flex lg:flex-row hidden lg:block items-center justify-between">
                    <div className='flex items-center gap-4'>
                        {/* Add your route links here */}
                    </div>
                    <div className='flex items-center gap-4'>
                        <p>{userInfo && userInfo.userName}</p>
                        <img src={userInfo && userInfo.photoURL ? userInfo.photoURL : 'https://i.ibb.co/dgPCtjH/profileavt.jpg'} className="w-8 h-8 rounded-full ml-2" alt="Avatar" />
                    </div>
                </div>
                {/* Mobile menu button */}
                <div className="flex lg:hidden justify-between items-center">
                    <Link href="/home" onClick={closeSidebar}>
                        <p className="route-link text-lg">STREME</p>
                    </Link>
                    <button onClick={toggleSidebar} className="text-white focus:outline-none">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isSidebarOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Sidebar - Hidden on large screens, shown below navbar on small screens */}
            <div className="lg:hidden">
                <div className={`fixed z-20 inset-x-0 top-16  bg-slate-300 text-black ${isSidebarOpen ? '' : 'hidden'}`}>
                    <div className="h-screen flex flex-col p-4">
                        <nav className="flex-1">
                            <ul className="flex flex-col gap-4">
                                {isAdmin && (
                                    <>
                                        <li>
                                            <Link href="/home" onClick={closeSidebar}>
                                                <p className={`route-link ${router.pathname === '/home' ? 'text-blue-500' : ''}`}>Home</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/dashboard/allUsers" onClick={closeSidebar}>
                                                <p className={`route-link ${router.pathname === '/dashboard/allUsers' ? 'text-blue-500' : ''}`}>Users List</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/dashboard/movies" onClick={closeSidebar}>
                                                <p className={`route-link ${router.pathname === '/dashboard/movies' ? 'text-blue-500' : ''}`}>Movies</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/dashboard/shows" onClick={closeSidebar}>
                                                <p className={`route-link ${router.pathname === '/dashboard/shows' ? 'text-blue-500' : ''}`}>Shows</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/dashboard/episode" onClick={closeSidebar}>
                                                <p className={`route-link ${router.pathname === '/dashboard/episode' ? 'text-blue-500' : ''}`}>Episode</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/dashboard/report" onClick={closeSidebar}>
                                                <p className={`route-link ${router.pathname === '/dashboard/report' ? 'text-blue-500' : ''}`}>Report</p>
                                            </Link>
                                        </li>
                                        {/* Add more admin links */}
                                    </>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:ml-64">
                <div className="overflow-y-auto">
                    {/* Add your main content here */}
                </div>
            </div>
        </div>
    );
};

export default DashNav;
