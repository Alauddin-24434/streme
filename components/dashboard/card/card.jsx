import React from 'react';
import { FaDownload, FaUser, FaEye, FaYoutube } from 'react-icons/fa';
import StackBars from '@/components/dashboard/chart/stackChart/stackChart';

import ProfileCard from './profile/profileCard';
import WeekLyLineChart from '../chart/lineChart/lineChart';

const Card = () => {
  const cards = [
    {
      id: 1,
      title: 'All Users',
      number: 10.928,
      change: 12,
      color: '#EF2D56',
      icon: FaUser,
    },
    {
      id: 2,
      title: 'Views',
      number: 8.236,
      change: -2,
      color: '#CE6629',
      icon: FaEye,
    },
    {
      id: 3,
      title: 'Subscription',
      number: 8.236,
      change: -2,
      color: '#6FBD48',
      icon: FaYoutube,
    },
    {
      id: 4,
      title: 'Download',
      number: 6.642,
      change: 18,
      color: '#1CA058',
      icon: FaDownload,
    },
  ];

  return (
    <div className='flex flex-col  '>
      <div className="flex flex-col lg:grid  lg:grid-cols-12 gap-4 ">
        {/* first column */}
        <div className="lg:col-span-9  flex flex-col gap-4 h-96 w-full ">
          {/* card */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            {cards.map((cardItem) => (
              <div
                key={cardItem.id}
                className={`w-full g:w-1/2 p-2 flex flex-col gap-4 rounded-sm bg-slate-900`}
              >
                <div className="flex gap-4 justify-between">
                  <span>{cardItem.title}</span>
                  {cardItem.icon && <span>{<cardItem.icon />}</span>}
                </div>

                <div className="flex gap-4 justify-between">
                  <span>{cardItem.number}</span>
                  <span>{cardItem.change}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* top view */}
          <div className=" " >
            <WeekLyLineChart />
          </div>
        </div>
        {/* second column */}
        <div className="lg:col-span-3 h-96 hidden lg:block bg-slate-900" >
         <ProfileCard/>
        </div>
      </div>
      <StackBars/>
    </div>
  );
};

export default Card;
