"use client"

import Link from 'next/link';

import useUserInfo from '@/hooks/useUser';

const UserProfileDashNav = () => {
    const userInfo = useUserInfo();
  


    return (
        <div className="flex flex-col">
            {/* Top bar */}
            <div className="px-4 py-4 bg-[#09526C] text-white">
                {/* Right side: Route links and user information */}
                <div className="flex flex-row items-center justify-between">
                    <div className='flex items-center gap-4'>
                        <Link href={'/home'}>
                          Home
                        </Link>
                        <Link href={'/userprofile'}>
                            Profile
                        </Link>
                    </div>
                    <div className='flex items-center gap-4'>
                        <p>{userInfo && userInfo.userName}</p>
                        <img src={userInfo && userInfo.photoURL ? userInfo.photoURL : 'https://i.ibb.co/dgPCtjH/profileavt.jpg'} className="w-8 h-8 rounded-full ml-2" alt="Avatar" />
                    </div>
                </div>

            </div>


        </div>
    );
};

export default UserProfileDashNav;
