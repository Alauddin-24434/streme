import React from 'react';
import styles from "./sidebar.module.css"
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdOutlineSettings,
    MdHelpCenter,
    // MdLogout,
} from "react-icons/md";
import MenuLinks from './menuLinks';
import Link from 'next/link';
const Sidebar = () => {
    const menuItems = [
        {
           
                    title: "Dashboard",
                    path: '/dashboard',
                    icon: <MdDashboard />
           
        },
        // {
          
        //             title: "Rating",
        //             path: 'dashboard/rating',
        //             icon: <MdSupervisedUserCircle />,
        //         },
        //         {
        //             title: "Comments",
        //             path: 'dashboard/comments',
        //             icon: <MdShoppingBag />,
        //         },
        //         {
        //             title:"Users",
        //             path:'dashboard/users',
        //             icon: <MdSupervisedUserCircle />,
        //         }
           
       
        // ,
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
                    title: "Season",
                    path: "/dashboard/season",
                    icon: <MdAnalytics />,
                },
                {
                    title: "Episode",
                    path: "/dashboard/episode",
                    icon: <MdAnalytics />,
                },
                

        
    ]
    return (
        <section className='hidden   lg:block bg-slate-900' >
          <Link href="/home">
                <img className="w-36" src="https://i.ibb.co/B396qB4/Screenshot-2024-02-07-031511-removebg-preview.png" alt="Your Logo" />
              </Link>

        <div className="static p-4  h-screen"  >

            <ul className={styles.list}>
                {
                    menuItems?.map((item) => (
                  
                          <MenuLinks key={item.title} item={item} />
                         
                       
                    ))
                }
            </ul>
        </div>
                    
        </section>
    );
};

export default Sidebar;