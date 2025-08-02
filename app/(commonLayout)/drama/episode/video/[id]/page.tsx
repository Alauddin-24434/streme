"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

import { FaComment, FaClock, FaEye } from "react-icons/fa";
import { Toaster } from "react-hot-toast";


import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";

import EpisodeWatchLaterButton from "@/components/DetailsVideo/EpisodeWacthLaterButton/EpisodeWatchLaterButton";
import EpisodePlayList, { Episode } from "@/components/DetailsVideo/EpisodePlayList/EpisodePlayList";

interface VideoData {
  _id: string;
  title: string;
  video: {
    link: string;
  };
  episodes: number; // current episode number
  views: number;
  thumbnail?: {
    link: string;
  };
}

interface Params {
  params: {
    id: string;
  };
}

const EpisodeDetail: React.FC<Params> = ({ params }) => {
  const { id } = params;

  const [loading, setLoading] = useState<boolean>(true);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [playlist, setPlaylist] = useState<Episode[] | null>(null);
  const [videoLink, setVideoLink] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [episodeNumber, setEpisodeNumber] = useState<number | null>(null);
  const [episodeWatchLaterData, setEpisodeWatchLaterData] = useState<string>("");
  const [episodeId, setEpisodeId] = useState<string>("");
  const [episodeViews, setEpisodeViews] = useState<number>(0);
  const [watchedFor10Seconds, setWatchedFor10Seconds] = useState<boolean>(false);

  const user = useSelector(selectCurrentUser);

  // Fetch video details by episode ID
  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://endgame-team-server.vercel.app/ep/${id}`);
        if (!response.ok) {
          console.error(`Failed to fetch video details. Status: ${response.status}`);
          setLoading(false);
          return;
        }
        const data: VideoData = await response.json();
        setVideoData(data);
        setEpisodeNumber(data.episodes);
        setVideoLink(data.video.link);
        setEpisodeId(data._id);
        setEpisodeViews(data.views);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video details:", error);
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [id]);

  // Fetch Watch Later data
  const fetchEpisodeWatchLater = async () => {
    if (!user?.email || !episodeId) return;

    try {
      const response = await axios.get(
        `https://endgame-team-server.vercel.app/episodesWatchLater?episodeId=${episodeId}&email=${user.email}`
      );
      setEpisodeWatchLaterData(response.data.episodeId);
    } catch (error) {
      // silent fail
    }
  };

  useEffect(() => {
    fetchEpisodeWatchLater();
  }, [user, episodeId]);

  // Fetch playlist episodes by video title
  const fetchEpisodeTitles = async () => {
    if (!videoData?.title) return;

    try {
      const response = await axios.get(
        `https://endgame-team-server.vercel.app/episodes/${videoData.title}`
      );
      setPlaylist(response.data.episodes);
    } catch (error) {
      // silent fail
    }
  };

  useEffect(() => {
    fetchEpisodeTitles();
  }, [videoData?.title]);

  // Handle video progress to count views after 10 seconds
  const handleVideoProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    if (playedSeconds >= 10 && !watchedFor10Seconds) {
      setWatchedFor10Seconds(true);
      handleView();
    }
  };

  // Update view count
  const handleView = async () => {
    const updateViewCount = episodeViews + 1;
    try {
      await axios.put(
        `https://endgame-team-server.vercel.app/latestViews/${episodeId}`,
        { views: updateViewCount }
      );
      setEpisodeViews(updateViewCount); // update locally as well
    } catch (error) {
      // silent fail
    }
  };

  // When user clicks on a different episode
  const handleEpisodeClick = (
    epId: string,
    episodeVideoLink: string,
    epNumber: number,
    index: number,
    epViews: number
  ) => {
    setEpisodeId(epId);
    setLoading(true);
    setActiveIndex(index);
    setVideoLink(episodeVideoLink);
    setEpisodeNumber(epNumber);
    setEpisodeViews(epViews);
    setWatchedFor10Seconds(false);
  };

  // Next and previous episode handlers
  const handleNextEpisode = () => {
    if (activeIndex !== null && playlist && activeIndex < playlist.length - 1) {
      const nextEpisode = playlist[activeIndex + 1];
      handleEpisodeClick(
        nextEpisode._id,
        nextEpisode.video.link,
        nextEpisode.episodes,
        activeIndex + 1,
        nextEpisode.views
      );
    }
  };

  const handlePreviousEpisode = () => {
    if (activeIndex !== null && playlist && activeIndex > 0) {
      const prevEpisode = playlist[activeIndex - 1];
      handleEpisodeClick(
        prevEpisode._id,
        prevEpisode.video.link,
        prevEpisode.episodes,
        activeIndex - 1,
        prevEpisode.views
      );
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center py-20 text-lg">
        Loading episode details...
      </div>
    );
  }

  return (
    <section>
      {videoLink && (
        <>
          <div className="w-full py-10 sm:py-28 md:py-28 lg:py-24 h-screen">
            <div className="player-container max-w-screen-xl mx-auto flex flex-col sm:flex-row md:flex-row lg:flex-row p-1 bg-slate-900 pb-0 lg:pb-9 relative">
              <ReactPlayer
                url={videoLink}
                controls
                width="100%"
                height="100%"
                onProgress={handleVideoProgress}
              />
              <div className="hidden md:block lg:block">
                <div className="absolute bottom-2 left-0 ml-4 flex items-center space-x-4 text-white">
                  <div className="flex items-center space-x-2 hover:text-green-500 cursor-pointer">
                    <FaComment /> <span>Comment</span>
                  </div>
                  <div
                    className="flex items-center space-x-2 hover:text-green-500 cursor-pointer"
                    style={{ color: episodeWatchLaterData ? "green" : "white" }}
                  >
                    <FaClock />{" "}
                    <EpisodeWatchLaterButton
                      fetchEpisodeWatchLater={fetchEpisodeWatchLater}
                      episodeId={episodeId}
                    />
                  </div>
                  <div className="text-green-400 flex flex-row items-center gap-2">
                    <FaEye />
                    {episodeViews}
                  </div>
                </div>
              </div>
              <div className="md:col-span-1 sm:flex-1 lg:col-span-1 px-2 text-white">
                <EpisodePlayList
                  handleEpisodeClick={handleEpisodeClick}
                  playlist={playlist}
                  episodeNumber={episodeNumber ?? 0}
                  handlePreviousEpisode={handlePreviousEpisode}
                  handleNextEpisode={handleNextEpisode}
                />
              </div>
            </div>
          </div>
          <div className="mb-8 overflow-hidden px-1 max-w-screen-xl mt-20 lg:mt-16 py-5 lg:py-0 mx-auto">
            <h1 className="text-sm lg:text-2xl text-white font-bold">
              {videoData?.title} Episode {episodeNumber}
            </h1>
          
          </div>
        </>
      )}
      <Toaster />
    </section>
  );
};

export default EpisodeDetail;
