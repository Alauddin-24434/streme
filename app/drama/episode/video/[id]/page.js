"use client"
  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import ReactPlayer from 'react-player';
  import MainNavbar from '@/components/MainNavbar/MainNavbar';
  import { FaComment, FaClock } from 'react-icons/fa';
  import { FaEye } from 'react-icons/fa';
  import toast, { Toaster } from 'react-hot-toast';
  import useUserInfo from '@/hooks/useUser';
  import Share from '@/components/DetailsVideo/share/Share';
  import EpisodePlayList from '../../../../../components/DetailsVideo/EpisodePlayList/EpisodePlayList';
  import EpisodeWatchLaterButton from '@/components/DetailsVideo/EpisodeWacthLaterButton/EpisodeWatchLaterButton';
  import Sidebar from '@/app/Sidebar/Sidebar';
  import Comments from '@/components/Comment/Comments';
  
  const EpisodeDetail = ({ params }) => {
    const { id } = params;
  
    const [loading, setLoading] = useState(true);
    const [videoData, setVideoData] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [videoLink, setVideoLink] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
  
    const [episodeNumber, setEpisodeNumber] = useState(null);
    const [episodeWathLaterData, setEpisodeWathLaterData] = useState('');
    const [episodeId, setEpisodeId] = useState('');
    const [episodeViews, setEpisodeViews] = useState(0);
    const [watchedFor10Seconds, setWatchedFor10Seconds] = useState(false);
  
    const userInfo = useUserInfo();
    const email = userInfo?.email;
  
    const [isOpen, setIsOpen] = useState(false);
  
    const handleSidebarToggle = () => {
      setIsOpen(!isOpen);
    };
  
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
          setEpisodeId(data?._id);
          setEpisodeViews(data?.views);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching video details:', error);
          setLoading(false);
        }
      };
  
      fetchVideoDetails();
    }, [id]);
  
    const fetchEpisodeWathLater = async () => {
      try {
        const response = await axios.get(`https://endgame-team-server.vercel.app/episodesWatchLater?episodeId=${episodeId}&email=${email}`)
        setEpisodeWathLaterData(response.data.episodeId)
      } catch (error) {
        // console.error('Error fetching episode titles:', error);
      }
    };
  
    useEffect(() => {
      fetchEpisodeWathLater();
    }, [email,episodeId]);
  
  
    const fetchEpisodeTitles = async () => {
      try {
        const response = await axios.get(`https://endgame-team-server.vercel.app/episodes/${videoData?.title}`);
        setPlaylist(response.data.episodes);
      } catch (error) {
        // console.error('Error fetching episode titles:', error);
      }
    };
  
    useEffect(() => {
      if (videoData?.title) {
        fetchEpisodeTitles();
      }
    }, [videoData?.title]);
  
    const handleVideoProgress = ({ playedSeconds }) => {
      if (playedSeconds >= 10 && !watchedFor10Seconds) {
        setWatchedFor10Seconds(true);
        handleView();
      }
    };
  
    const handleView = async () => {
      const updateViewCount = episodeViews + 1;
      try {
        await axios.put(`https://endgame-team-server.vercel.app/latestViews/${episodeId}`, { views: updateViewCount });
  
      } catch (error) {
        // console.error('Error updating view count:', error);
  
      }
    };
  
    const handleEpisodeClick = async (epId, episodeVideoLink, epNumber, index, episodeViews) => {
      setEpisodeId(epId);
      setLoading(true);
      setActiveIndex(index);
      setVideoLink(episodeVideoLink);
      setEpisodeNumber(epNumber);
      setEpisodeViews(episodeViews);
      setWatchedFor10Seconds(false);
    };
  
    const handleNextEpisode = () => {
      if (activeIndex < playlist.length - 1) {
        const nextEpisode = playlist[activeIndex + 1];
        handleEpisodeClick(nextEpisode._id, nextEpisode.video.link, nextEpisode.episodes, activeIndex + 1, nextEpisode.views);
      }
    };
  
    const handlePreviousEpisode = () => {
      if (activeIndex > 0) {
        const previousEpisode = playlist[activeIndex - 1];
        handleEpisodeClick(previousEpisode._id, previousEpisode.video.link, previousEpisode.episodes, activeIndex - 1, previousEpisode.views);
      }
    };
  
    return (
      <section>
      <Sidebar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />
      <MainNavbar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />

      {videoLink && (
        <>
          <div className='w-full py-10 sm:py-28 md:py-28 lg:py-24 h-screen'>
            <div className="player-container max-w-screen-xl mx-auto flex flex-col sm:flex-row md:flex-row lg:flex-row p-1 bg-slate-900 pb-0 lg:pb-9 relative">
              <ReactPlayer
                url={videoLink}
                controls={['play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'fullscreen']}
                width='100%'
                height='100%'
                onProgress={handleVideoProgress}
              />
              <div className='hidden md:block lg:block'>
                <div className="absolute bottom-2 left-0 ml-4 flex items-center space-x-4 text-white">
                  <div className="flex items-center space-x-2 hover:text-green-500 cursor-pointer">
                    <FaComment /> <span>Comment</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-green-500 cursor-pointer" style={{ color: episodeWathLaterData ? 'green' : 'white' }}>
                    <FaClock /> <span> <EpisodeWatchLaterButton fetchEpisodeWathLater={fetchEpisodeWathLater} episodeId={episodeId} /></span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-green-500 cursor-pointer">
                    <Share video={videoLink} />
                  </div>
                  <div className='text-green-400 flex flex-row items-center gap-2'><FaEye />{episodeViews}</div>
                </div>
              </div>
              <div className="md:col-span-1 sm:flex-1  lg:col-span-1 px-2 text-white">
                <EpisodePlayList handleEpisodeClick={handleEpisodeClick} playlist={playlist} episodeNumber={episodeNumber} handlePreviousEpisode={handlePreviousEpisode} handleNextEpisode={handleNextEpisode} />
              </div>
            </div>
          </div>
          <div className='mb-8 overflow-hidden  px-1 max-w-screen-xl mt-20 lg:mt-16 py-5 lg:py-0 mx-auto'>
            <h1 className='text-sm lg:text-2xl text-white font-bold'>{videoData?.title} Episode {episodeNumber} </h1>
            <Comments videoId={episodeId} />
          </div>
        </>
      )}

      <Toaster />
    </section>
    );
  };
  
  export default EpisodeDetail;
  