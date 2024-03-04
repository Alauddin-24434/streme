"use client"
import React, { useState, useEffect } from 'react';

const Playlist = ({ handlePlayVideo, videoData }) => {
  const [playlistData, setPlaylistData] = useState([]);

  useEffect(() => {
    // Fetch data from the server endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('https://endgame-team-server.vercel.app/movies');
        const data = await response.json();
        console.log(data);
        // Filter the data here
        const filteredData = data.filter(item => item.genres === videoData.genres);

        // Set the filtered data in the state
        setPlaylistData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetch function
    fetchData();
  }, [videoData]);
  
  console.log(playlistData);
  
  return (
    <div className="w-80 mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 px-3 py-2 gap-4 overflow-y-auto max-h-[57vh]">
      {playlistData.map((genre) => (
        <button onClick={() => handlePlayVideo(genre.video.link)} key={genre._id} className="hover:bg-gray-300">
          <div className="px-2 py-3 border rounded-lg shadow-md">
            <div className="flex items-center">
              <img src={genre.thumbnail.link} alt={genre.title} className="h-14 w-auto mr-2" />
              <p className="text-base text-white font-semibold">{genre.title.length > 20 ? `${genre.title.slice(0, 20)}...` : genre.title}</p>

            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default Playlist;
