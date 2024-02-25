
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import MainNavbar from '@/components/MainNavbar/MainNavbar';
import { FaComment, FaClock, FaShare } from 'react-icons/fa'; // Import icons from react-icons library
import { ImSpinner2 } from 'react-icons/im'; // Import spinner icon

const EpisodeDetail = ({ params }) => {
  const { id } = params;

  const [loading, setLoading] = useState(true); // Loading state
  const [videoData, setVideoData] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [videoLink, setVideoLink] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null); // State to store the index of the active playlist item
  const [comment, setComment] = useState(''); // State to store the user's comment
  const [episodeNumber, setEpisodeNumber] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`https://endgame-team-server.vercel.app/ep/${id}`);
        if (!response.ok) {
          console.error(`Failed to fetch video details. Status: ${response.status}`);
          return;
        }
        const data = await response.json();
        setVideoData(data);
        setEpisodeNumber(data?.episodes);
        setVideoLink(data?.video?.link);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching video details:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchVideoDetails();
  }, [id]);

  const handleEpisodeClick = async (episodeVideoLink, ep, index) => {
    setLoading(true); // Set loading to true when episode is clicked
    setActiveIndex(index);
    setVideoLink(episodeVideoLink);
    setEpisodeNumber(ep);

    try {
      const response = await axios.get(`https://endgame-team-server.vercel.app/episodes/${videoData?.title}`);
      setPlaylist(response.data.episodes);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching episode titles:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    const fetchEpisodeTitles = async () => {
      try {
        const response = await axios.get(`https://endgame-team-server.vercel.app/episodes/${videoData?.title}`);
        setPlaylist(response.data.episodes);
      } catch (error) {
        console.error('Error fetching episode titles:', error);
      }
    };

    if (videoData?.title) {
      fetchEpisodeTitles();
    }
  }, [videoData?.title]);

  // Function to handle submitting a comment
  const handleSubmitComment = () => {
    // Here you can send the comment to the server or perform any other action
    console.log('Comment submitted:', comment);
    // Reset the comment field after submission
    setComment('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ImSpinner2 className="text-4xl text-green-500 animate-spin" />
      </div>
    );
  }

  return (
    <section>
      <MainNavbar />
      <div className='w-full py-16 h-screen'>
        <div className="max-w-screen-xl mt-6  px-1 mx-auto flex flex-col lg:flex-row gap-4 lg:justify-between ">
          <div className="md:col-span-1 lg:col-span-2 w-full bg-red-700">
            <div className="player-container bg-slate-700 pb-0 lg:pb-9 relative">
              {videoLink && (
                <ReactPlayer
                  url={videoLink}
                  controls={['play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'fullscreen']}
                  width='100%'
                  height='100%'
                />
              )}

              {/* cooment , watch later, share */}
              <div className='hidden md:block lg:block'>
              <div className="absolute bottom-2 left-0 ml-4 flex items-center space-x-4 text-white">
                <div className="flex items-center space-x-2 hover:text-green-500 ">
                  <FaComment />
                  <span>Comments</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-green-500">
                  <FaClock />
                  <span>Watch Later</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-green-500">
                  <FaShare />
                  <span>Share</span>
                </div>
              </div>
              </div>
            </div>
            <div className='bg-slate-950 px-1 h-[450px] max-w-screen-xl mx-auto'>
          <h1 className='tex-sm lg:text-3xl text-white py-5 font-bold'>{videoData?.title} {episodeNumber} </h1>
        </div>

          </div>


          <div className="md:col-span-1 lg:col-span-1 bg-slate-900 px-2 text-white"> {/* Add text-white class to the parent container */}
            <h2 className='text-center py-2 rounded-t-lg text-white bg-slate-700'>Playlist Video</h2>
            <div className='grid grid-cols-5 gap-4 my-4'>
              {playlist.map((episode, index) => (
                <div
                  key={episode._id}
                  className={`playlist-item bg-slate-700 rounded-md flex flex-col justify-center items-center ${episode?.episodes === episodeNumber ? 'text-green-500' : ''}`}
                  onClick={() => handleEpisodeClick(episode.video.link, episode.episodes, index)}
                >
                  <p className="py-2 px-4">{episode.episodes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
       
      
      </div>
    </section>
  );
};

export default EpisodeDetail;
