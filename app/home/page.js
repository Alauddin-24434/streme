import React from 'react';
import Video from '../videos/page';


import ProtectedRoute from '@/utils/ProtectedRoute';
import MainNavbar from '@/components/MainNavbar/MainNavbar';


export default function  HomePage(){
    return (
        <ProtectedRoute>
            <div className=' bg-slate-950'>

             <MainNavbar/>
                <div className="">

                    <Video />
               
                 

                </div>
            </div>
        </ProtectedRoute>
    );
};

