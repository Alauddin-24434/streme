"use client"
import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdPayments } from "react-icons/md";
import { RiMovieFill } from "react-icons/ri";
import { MdLocalMovies } from "react-icons/md";
import StackBars from '@/components/dashboard/chart/stackChart/stackChart';
import ProfileCard from './profile/profileCard';
import WeekLyLineChart from '../chart/lineChart/lineChart';
import axios from 'axios';

const Card = () => {
  const [usersData, setUsersData] = useState(0);
  const [usersPaymentData, setUsersPaymentData] = useState(0);
  const [moviesAllData, setMoviesData] = useState(0);
  const [showsAllData, setAllShowsData] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://endgame-team-server.vercel.app/users');
        setUsersData(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);
  useEffect(() => {
    const fetchPaymentUsers = async () => {
      try {
        const response = await axios.get('https://endgame-team-server.vercel.app/payments');
        setUsersPaymentData(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchPaymentUsers();
  }, []);
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await axios.get('https://endgame-team-server.vercel.app/latestMovies');
        setMoviesData(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchAllMovies();
  }, []);
  useEffect(() => {
    const fetchAllShows = async () => {
      try {
        const response = await axios.get('https://endgame-team-server.vercel.app/latestShows');
        setAllShowsData(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchAllShows();
  }, []);

  const cards = [
    {
      id: 1,
      title: 'All Users',
      number: usersData?.length,
      color: '#09526C',
      icon: FaUser,
    },

    {
      id: 2,
      title: 'Subscription',
      number: usersPaymentData?.length,
      change: -2,
      color: '#09526C',

      icon: MdPayments,
    },
    {
      id: 3,
      title: 'Movies',
      number: moviesAllData?.length,
      change: -2,
      color: '#09526C',
      icon: MdLocalMovies,
    },
    {
      id: 4,
      title: 'Shows',
      number: showsAllData?.length,
      change: -2,
      color: ' #09526C',
      icon:RiMovieFill ,
    },


  ];

  return (
    <div className='flex flex-col'>
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-2">
        {/* first column */}
        <div className="lg:col-span-9 flex flex-col gap-2 h-96 w-full">
          {/* card */}
          <div className="flex flex-col lg:flex-row gap-2 justify-between">
            {cards.map((cardItem) => (
              <div
                key={cardItem.id}
                className={`w-full g:w-1/2 p-2 flex flex-col gap-2 rounded-sm`}
                style={{
                  background: `${cardItem.color}`,
                }}
              >
                <div className="flex gap-2 justify-between">
                  <span>{cardItem.title}</span>
                  {cardItem.icon && <span>{<cardItem.icon />}</span>}
                </div>

                <div className="flex gap-2 justify-between">
                  <span>{cardItem.number}</span>
                </div>
              </div>
            ))}
          </div>

          {/* top view */}
          <div className="hidden rounded-md lg:block ">
            <WeekLyLineChart />
          </div>
        </div>
        {/* second column */}
        <div className="lg:col-span-3 h-96 hidden rounded-md lg:block ">
          <ProfileCard />
        </div>
      </div>
      <div className='hidden rounded-md lg:block '>
        <StackBars />
      </div>
    </div>
  );
};

export default Card;
