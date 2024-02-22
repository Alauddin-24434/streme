import Sidebar from "@/components/dashboard/sidebar/sidebar";


import styles from "./dashboard.module.css"
import './globals.css'
import DashboardNavbar from "@/components/dashboard/navbar/navbar";
import DashNav from "@/components/dashboard/navbar/dashboardTopNavbar/dashNav";
export default function DashboardLayout({ children }) {
    return (
        <html lang="en">
            <body>

                <div className={styles.body}>




                    <div className="lg:flex ">
                        <div   className="sticky lg:fixed"  >
                            <Sidebar />
                        </div>

                        <div className="w-full  lg:ml-40">
                            <DashboardNavbar />
                            <DashNav/>
                            <div className="w-full h-screen p-3 px-5 bg-slate-950">
                                {children}
                            </div>

                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}