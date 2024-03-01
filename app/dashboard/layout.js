"use client";
import { useEffect, useState } from 'react';
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import styles from "./dashboard.module.css"
import './globals.css'
import DashboardNavbar from "@/components/dashboard/navbar/navbar";

export default function DashboardLayout({ children }) {

    return (
        <html lang="en">
            <body>
                <div className={styles.body}>
                    <div className="lg:flex ">
                        <div   className="sticky lg:fixed ml-1"  >
                            <Sidebar />
                        </div>
                        <div className="w-full  lg:ml-48 p-3">
                            <DashboardNavbar />
                          
                                <div className="w-full min-h-screen rounded-lg p-2 ">
                                    {children}
                                </div>
                           
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
