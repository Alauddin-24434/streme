"use client"
import React from 'react';
import { MdReport } from "react-icons/md";
import styles from "./sidebar.module.css"
import {
    MdDashboard,
    MdWork,
    MdAnalytics,
} from "react-icons/md";
import MenuLinks from './menuLinks';
import Link from 'next/link';
import useUserInfo from '@/hooks/useUser';

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
            icon: <MdDashboard />
        },
    ]

    const adminItems = [
        {
            title: "Dashboard",
            path: '/dashboard',
            icon: <MdDashboard />
        },
        {
            title: "Movie List",
            path: "/dashboard/movies",
            icon: <MdWork />,
        },
       
        {
            title: "Show List",
            path: "/dashboard/shows",
            icon: <MdAnalytics />,
        },
        {
            title: "Episode",
            path: "/dashboard/episode",
            icon: <MdAnalytics />,
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
            {/* added report link */}
            <Link href="/dashboard/report">
                <div className='flex items-center gap-2'>
                <MdReport className='text-xl ml-3' />
                    <h2 className=' '>Report</h2>

                </div>
            </Link>
        </section>
    );
};

export default Sidebar;
