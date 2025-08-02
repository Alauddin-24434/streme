'use client'
import React, { useRef, useState, useEffect } from 'react';
import { IoPlayForwardOutline, IoPlayBackOutline } from "react-icons/io5";
import { CiPlay1 } from "react-icons/ci";
import { IoIosPause } from 'react-icons/io';

import './player.css';

interface VideoPlayerProps {
  video: string | null;
  handleVideoProgress?: (event: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, handleVideoProgress }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (amount: number) => {
    if (!videoRef.current) return;

    let newTime = videoRef.current.currentTime + amount;
    // Clamp newTime between 0 and video duration
    newTime = Math.min(Math.max(newTime, 0), videoRef.current.duration);
    videoRef.current.currentTime = newTime;
  };

  // Pause video if source changes
  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [video]);

  return (
    <div className='video-player-container'>
      <video
        ref={videoRef}
        src={video || undefined}
        controls
        onProgress={handleVideoProgress}
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="custom-controls">
        <button className='rewind-button' onClick={() => handleSeek(-10)} aria-label="Rewind 10 seconds">
          <IoPlayBackOutline size={24} />
        </button>
        <button
          className={`play-button ${isPlaying ? 'Pause' : 'Play'}`}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <IoIosPause size={24} /> : <CiPlay1 size={24} />}
        </button>
        <button className='forward-button' onClick={() => handleSeek(10)} aria-label="Forward 10 seconds">
          <IoPlayForwardOutline size={24} />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
