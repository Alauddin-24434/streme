"use client"
import React from 'react';

import styles from "./Profilesidebar.module.css"
import {
    MdDashboard,
    
    
} from "react-icons/md";


import MenuLinks from './UserMenuLinks';
import Link from 'next/link';

const ProfileSidebar = () => {

    const userItems = [
       
        {
            title: "Profile",
            path: '/userprofile',
            icon: <MdDashboard />
        },
       
        // {
        //     title: "Payment Status",
        //     path: '/userprofile/payment',
        //     icon: <MdDashboard />
        // },
      
    ]

   
  
    return (
        <section className='hidden  h-screen px-6 lg:block bg-[#09526C]  ' >
            <Link href="/home">
                <img className="w-36" src="https://i.ibb.co/B396qB4/Screenshot-2024-02-07-031511-removebg-preview.png" alt="Your Logo" />
            </Link>
            <hr />
            <div className="static">
                <ul className={styles.list}>
                    {userItems.map((item) => (
                        <MenuLinks key={item.title} item={item} />
                    ))}
                </ul>
            </div>
          
           
        </section>
    );
};

export default ProfileSidebar;