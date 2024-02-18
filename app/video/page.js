import React from 'react';
import dynamic from 'next/dynamic';
import Playlist from './playlist';
import { FaRegStar } from "react-icons/fa6";
import { Avatar } from '@mui/material';


const VideoPlayer = dynamic(() => import('./videoPlayer'), { ssr: false });

const Page = () => {
  const url = '/Facebook_34.mp4'

  return (
    <div>
      <div className="max-w-screen-xl bg-slate-950 mx-auto flex-row lg:flex gap-4">
      <div className="md:col-span-1 lg:col-span-2">
        <VideoPlayer video={url}/>
      </div>
      <div className="md:col-span-1 lg:col-span-1 mt-7 pr-3  h-[580px]">
        <h2 className='text-center py-2 rounded-t-lg bg-slate-900'>Suggested Video</h2>
        <Playlist />
      </div>
    </div>
    <div className=' bg-slate-950 h-[450px] max-w-screen-xl mx-auto'>
    <h1 className='text-3xl ml-4  py-5 font-extrabold'>JavaScript Ep-1 || Programming || Web Development</h1>
    <div className='flex ml-4 items-center gap-2'>
    <FaRegStar className='text-green-600'/>
    <p>9.6 (1.6k ratings). <span className='text-green-600 font-bold'>Rate now</span></p>
    </div>
    <div>
    <div className='flex gap-4 ml-5 mt-3'>
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
    </div>
    <div>
      <h5 className='ml-5 mt-3 text-justify mx-5'>
        <span className='text-gray-600 font-bold '>Description</span> :  Lin Yumeng stands up for her friend who has been deceived by her playboy boyfriend. The confrontation escalates from a war of words to a full-blown physical fight. As a martial arts descendent, Lin Yumeng, in the midst of a quibble, "accidentally" damages a luxury car, leading to an absurd situation where she is unable to compensate the whimsical owner, Ji Lingsu. He insists that she sign a contract to settle the debt! After marriage, Lin Yumeng's life undergoes a drastic transformation. She is subjected to various arrangements and "bullying" by Ji Dashao. As she delves deeper into the understanding of the Ji family, Lin Yumeng starts to sympathize with her contractual husband. She actively disrupts the stepmother's conspiracy and secures her biological mother's shares. In the process, she inadvertently "loses" her own heart. What was initially just a "contract marriage" turns into a genuine connection between the male and female protagonists. Oh well, since it's a beautiful mistake, might as well go all the way with it!
      </h5>
    </div>
    <div className='ml-5 mt-3 flex gap-3'>
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
    </div>
    </div>
    </div>
  );
};

export default Page;
