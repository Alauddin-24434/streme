/* eslint-disable @next/next/no-async-client-component */
// pages/video/[id].js
"use client"
// pages/video/[id].js
import { useEffect, useState } from 'react';
import React from 'react';

import { FaRegStar } from "react-icons/fa6";
import { Avatar } from '@mui/material';

import VideoPlayer from '@/app/videos/videoPlayer';

import Comments from "@/components/Comment/Comments"
import Like from '../Like';

import Share from '../Share';
import PlaylistButton from '../PlaylistButton';
import Suggest from '../Suggest';
import axios from 'axios';
import MainNavbar from '@/components/MainNavbar/MainNavbar';

const VideoDetail = ({ params }) => {
  const { id } = params;
  const [videoData, setVideoData] = useState(null);
  const [likeData, setLikeData] = useState(null);
  console.log(likeData);
  console.log("chek", videoData)

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`https://endgame-team-server.vercel.app/movies/${id}`);
        if (!response.ok) {
          console.error(`Failed to fetch video details. Status: ${response.status}`);
          return;
        }
        const data = await response.json();
        setVideoData(data);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [id]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://endgame-team-server.vercel.app/like/${id}`);
        const data = response.data;
        setLikeData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [id]);
  


  if (!videoData) {
    // Render loading state or handle loading scenario
    return <p>Loading...</p>;
  }

  return (
    <div className='w-full h-screen '>
      <MainNavbar/>
      <div className="max-w-screen-xl place-items-center mt-6 px-12 bg-slate-950  mx-auto flex-row lg:flex gap-4">
        <div className="md:col-span-1 lg:col-span-2">
          <VideoPlayer video={videoData.video.link} />
        </div>
        {/* <div className="md:col-span-1 lg:col-span-1 mt-7 pr-3  h-[580px]"> */}
          {/* <h2 className='text-center py-2 rounded-t-lg text-white bg-slate-900'>Suggested Video</h2> */}

        {/* </div> */}
      </div>
      <div className=' bg-slate-950 h-[450px] max-w-screen-xl mx-auto pl-16'>
        <h1 className='tex-sm lg:text-3xl ml-4 text-white py-5 font-extrabold'>{videoData?.title}</h1>
        <div className='flex ml-5 mb-2 flex-row gap-4 items-center md:flex-row lg:flex-row xl:flex-row 2xl:flex lg:items-center xl:items-center 2xl:items-center'>
        <Like likeData={likeData} data={videoData}></Like>
  <PlaylistButton data={videoData}></PlaylistButton>
  <Share video={videoData.video.link} />
</div>
        <div className='flex ml-4 items-center gap-2'>
          <FaRegStar className='text-green-600' />
          <p><span className='text-white'>9.6 (1.6k ratings).</span> <span className='text-green-600 font-bold'>Rate now</span></p>
        </div>
        <div>
          {/* <div className='flex flex-col w-full lg:flex-row gap-4 ml-5 mt-3'>
            <div className="inline-block px-2 py-1 text-sm font-semibold rounded-sm bg-gray-500 text-white">
              Chinese Mainland
            </div>
            <div className="inline-block px-2 py-1 text-sm font-semibold rounded-sm bg-gray-500 text-white">
              Drama
            </div>
            <div className="inline-block px-2 py-1 text-sm font-semibold rounded-sm bg-gray-500 text-white">
              Marriage
            </div>
            <div className="inline-block px-2 py-1 text-sm font-semibold rounded-sm bg-gray-500 text-white">
              Mandarin
            </div>
          </div> */}
          <div>
            <h5 className='ml-5 mt-3 text-justify mx-5'>
              <span className='text-gray-600 font-bold '>Description: </span>
              <p className='text-white'>  Lin Yumeng stands up for her friend who has been deceived by her playboy boyfriend. The confrontation escalates from a war of words to a full-blown physical fight. As a martial arts descendent, Lin Yumeng, in the midst of a quibble, accidentally damages a luxury car, leading to an absurd situation where she is unable to compensate the whimsical owner, Ji Lingsu. He insists that she sign a contract to settle the debt! After marriage, Lin Yumengs life undergoes a drastic transformation. She is subjected to various arrangements and bullying by Ji Dashao. As she delves deeper into the understanding of the Ji family, Lin Yumeng starts to sympathize with her contractual husband. She actively disrupts the stepmothers conspiracy and secures her biological mothers shares. In the process, she inadvertently loses her own heart. What was initially just a contract marriage turns into a genuine connection between the male and female protagonists. Oh well, since its a beautiful mistake, might as well go all the way with it!
              </p>
            </h5>
          </div>
          <div className='ml-5 mt-3 flex flex-col md:flex-col lg:flex-col xl:flex-row 2xl:flex-row gap-3'>
            <div>
              <Avatar
                alt="Remy Sharp"
                src='https://i.ibb.co/J7g0G1C/young-woman-doctor-white-coat-with-phonendoscope-looking-confident-standing-with-crossed-arms-blue-i.jpg'
                sx={{ width: 100, height: 100 }}
              />
              <h4 className='ml-8'>Cast</h4>
            </div>
            <div>

              <Avatar
                alt="Remy Sharp"
                src='https://i.ibb.co/HFNv80d/portrait-young-handsome-sportsman-holds-hand-chin-dark-background.jpg'
                sx={{ width: 100, height: 100 }}
              />
              <h4 className='ml-8'>Cast</h4>
            </div>
            <div>

              <Avatar
                alt="Remy Sharp"
                src='https://i.ibb.co/mGfHLjC/i-Stock-1258586742.jpg'
                sx={{ width: 100, height: 100 }}
              />
              <h4 className='ml-8'>Cast</h4>
            </div>
          </div>

          {/* comment section */}
          <div className='w-full bg-slate-950 h-screen'>
            <Suggest></Suggest>
            <Comments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;