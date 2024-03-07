
import './globals.css'

import ProfileSidebar from "@/components/Userprofile/Sidebar/ProdileSidebar";
import UserProfileDashNav from '@/components/Userprofile/userProfileNav/UserProfileNav';

export default function userprofile({ children }) {

    return (
        <html lang="en">
            <body>
                <div  className='bg-slate-300'>
                    <div className="lg:flex ">
                        <div   className="sticky lg:fixed ml-1"  >
                           <ProfileSidebar/>
                        </div>
                        <div className="w-full  lg:ml-48 ">
                          
                          <span className="">
                            <UserProfileDashNav/>
                          </span>
                          <div className=" h-screen  p-3 px-4 bg-slate-300">

                              {children}
                          </div>

                      </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
