'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Done } from '@mui/icons-material';

const PlaylistButton = ({ data }) => {
  const [addedToPlaylist, setAddedToPlaylist] = useState(false);

  const togglePlaylist = async () => {
    try {
      // Perform POST request to the specified endpoint
      const res = await axios.post("https://endgame-team-server.vercel.app/playlist", data);
      console.log("Response:", res.data);
      setAddedToPlaylist((prevAdded) => !prevAdded);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button onClick={togglePlaylist} style={{ color: addedToPlaylist ? 'green' : 'black' }}>
      {addedToPlaylist ? <Done /> : '➕'}
    </button>
  );
};

export default PlaylistButton;
