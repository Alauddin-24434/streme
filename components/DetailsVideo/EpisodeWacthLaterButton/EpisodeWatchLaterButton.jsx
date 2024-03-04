"use client";

import axios from 'axios';
import useUserInfo from '@/hooks/useUser';

const EpisodeWatchLaterButton = ({fetchEpisodeWathLater,episodeId}) => {
  const userInfo = useUserInfo();
  const email = userInfo?.email;

  const handleEpisodeWatchLater = async () => {
    try {
      const res = await axios.post("https://endgame-team-server.vercel.app/episodesWatchLater", {episodeId:episodeId, email });
      fetchEpisodeWathLater()
      console.log("Response:", res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button onClick={handleEpisodeWatchLater}>
      Watch Later
    </button>
  );
};

export default EpisodeWatchLaterButton;
