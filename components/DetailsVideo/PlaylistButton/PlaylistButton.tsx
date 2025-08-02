'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Done } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
interface PlaylistButtonProps {
  data: {
    _id: string;
    // অন্যান্য প্রপার্টি দরকার হলে এখানে যোগ করো
  };
  playList: {
    data?: {
      _id: string;
    };
    // অন্য কোনো প্রপার্টি থাকলে এখানে যোগ করো
  } | null;
  setStatePlaylike: React.Dispatch<React.SetStateAction<any>>;
  Playlist: any; // তোমার কাস্টম টাইপ এখানে দিতে পারো
}

const PlaylistButton: React.FC<PlaylistButtonProps> = ({ data, playList, setStatePlaylike, Playlist }) => {
  const [addedToPlaylist, setAddedToPlaylist] = useState(false);
  const user=useSelector(selectCurrentUser);
  const email = user?.email;

  const togglePlaylist = async () => {
    if (!email) {
      console.error("User email not found");
      return;
    }
    try {
      const res = await axios.post("https://endgame-team-server.vercel.app/playlist", { data, email });
      console.log("Response:", res.data);
      setAddedToPlaylist(true);
      setStatePlaylike(Playlist);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button
      onClick={togglePlaylist}
      style={{ color: addedToPlaylist ? 'green' : 'black' }}
      aria-label={addedToPlaylist ? "Added to Playlist" : "Add to Playlist"}
    >
      {data?._id === playList?.data?._id ? <Done className='text-white' /> : '➕'}
    </button>
  );
};

export default PlaylistButton;
