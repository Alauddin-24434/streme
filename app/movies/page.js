"use client";
import ProtectedRoute from "@/utils/ProtectedRoute";
import Sidebar from "../Sidebar/Sidebar";
import MainNavbar from "@/components/MainNavbar/MainNavbar";

import { useState } from "react";
import VideoCard from "@/components/Cards/VideoCard/VideoCard";

const Videos = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSidebarToggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <ProtectedRoute>
            <div>
            <MainNavbar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />
            <Sidebar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />
                <section className="max-w-7xl mx-auto h-screen">

                    <div className='flex bg-slate-950'>
                       
                        <div className="flex flex-col flex-grow">
                          
                            <div className='px-10 py-16'>
                                <VideoCard />
                               
                            </div>
                        </div>
                    </div>



                </section >
            </div >
        </ProtectedRoute>
    );
};

export default Videos;
