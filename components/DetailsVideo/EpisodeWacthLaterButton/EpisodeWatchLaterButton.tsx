"use client";

import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";

interface EpisodeWatchLaterButtonProps {
  fetchEpisodeWatchLater: () => void;
  episodeId: string;
}

const EpisodeWatchLaterButton: React.FC<EpisodeWatchLaterButtonProps> = ({
  fetchEpisodeWatchLater,
  episodeId,
}) => {
  const user = useSelector((state: RootState) => selectCurrentUser(state));
  const email = user?.email;

  const handleEpisodeWatchLater = async () => {
    if (!email) return;

    try {
      const res = await axios.post(
        "https://endgame-team-server.vercel.app/episodesWatchLater",
        {
          episodeId,
          email,
        }
      );
      fetchEpisodeWatchLater();
      console.log("Response:", res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button
      onClick={handleEpisodeWatchLater}
      className="px-2 py-1 bg-green-600 rounded hover:bg-green-700 transition-colors text-white"
      type="button"
    >
      Watch Later
    </button>
  );
};

export default EpisodeWatchLaterButton;
