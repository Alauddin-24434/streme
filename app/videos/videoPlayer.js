
'use client'
import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';


const DynamicReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const VideoPlayer = ({ video }) => {

  
 
  return (
    <div className='border  rounded-lg bg-gradient-to-r from-blue-500 to-purple-500  p-5 sm:mx-4 aspect-w-16 aspect-h-9'>
    
      <DynamicReactPlayer
      
        className="rounded-lg overflow-hidden"
        width="100%"
        height="100%"
        url={video} 
        controls={true}
        light={false}
        pip={true}
        playbackRate='1'
        playIcon
        
      />
      
    </div>
  );
};

export default VideoPlayer;
