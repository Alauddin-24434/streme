'use client'
import React, { useRef, useState } from 'react';
import { IoPlayForwardOutline } from "react-icons/io5";
import { IoPlayBackOutline } from "react-icons/io5";
import { CiPlay1 } from "react-icons/ci";

import './player.css';
import { IoIosPause } from 'react-icons/io';
const VideoPlayer = ({ video ,handleVideoProgress}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (amount) => {
    const newTime = videoRef.current.currentTime + amount;
    videoRef.current.currentTime = newTime;
  };

  return (
    <div className='video-player-container'>
      <video
        ref={videoRef}
        src={video}
        controls
        onProgress={handleVideoProgress}
      />
      <div className="custom-controls">
        <button className='rewind-button' onClick={() => handleSeek(-10)}>
          <IoPlayBackOutline />
        </button>
        <button className={`play-button ${isPlaying ? 'Pause' : 'Play'}`} onClick={togglePlay}>
          {isPlaying ? <IoIosPause /> : <CiPlay1 />
}
        </button>
        <button className='forward-button' onClick={() => handleSeek(10)}>
          <IoPlayForwardOutline />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
