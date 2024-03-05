"use client"
import React from 'react';
import { MdReport } from "react-icons/md";
import styles from "./sidebar.module.css"
import {
    MdDashboard,
    
    
} from "react-icons/md";
import { RiMovieFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import MenuLinks from './menuLinks';
import Link from 'next/link';
import useUserInfo from '@/hooks/useUser';
import { BiSolidSlideshow } from "react-icons/bi";
import { MdLocalMovies } from "react-icons/md";
const Sidebar = () => {
    const userInfo = useUserInfo();
    const userItems = [
       
        {
            title: "Profile",
            path: '/dashboard',
            icon: <MdDashboard />
        },
        {
            title: "Upload",
            path: '/dashboard/upload',
            icon: <RiMovieFill/>
        },
    ]

    const adminItems = [
        {
            title: "Dashboard",
            path: '/dashboard',
            icon: <MdDashboard  />
        },
        {
            title: "All Users",
            path: '/dashboard/allUsers',
            icon: <FaUser />
        },
        {
            title: "Movie List",
            path: "/dashboard/movies",
            icon: < RiMovieFill  />,
        },
       
        {
            title: "Show List",
            path: "/dashboard/shows",
            icon: <BiSolidSlideshow  />,
        },
        {
            title: "Episode",
            path: "/dashboard/episode",
            icon: <MdLocalMovies  />,
        },
        {
            title: "Report",
            path: "/dashboard/report",
            icon: <MdReport  />,
        },
       
       
    ]
    const menuItems = userInfo?.isAdmin ? adminItems : userItems;
    return (
        <section className='hidden  h-screen px-6 lg:block bg-slate-900  mt-3 rounded-lg' >
            <Link href="/home">
                <img className="w-36" src="https://i.ibb.co/B396qB4/Screenshot-2024-02-07-031511-removebg-preview.png" alt="Your Logo" />
            </Link>
            <hr />
            <div className="static">
                <ul className={styles.list}>
                    {menuItems.map((item) => (
                        <MenuLinks key={item.title} item={item} />
                    ))}
                </ul>
            </div>
          
           
        </section>
    );
};

export default Sidebar;