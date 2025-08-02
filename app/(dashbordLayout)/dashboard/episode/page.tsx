"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ChildrenBox from "@/components/dashboard/childrenBox/ChildrenBox";

interface Episode {
  _id: string;
  title: string;
  status: boolean;
  [key: string]: any; // Allow extra dynamic fields
}

const EpisodesPage: React.FC = () => {
  const dbutton = "Add Episode";
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchEpisodes = async () => {
    try {
      const response = await axios.get(
        "https://endgame-team-server.vercel.app/episodeSearch",
        {
          params: { searchQuery },
        }
      );
      setEpisodes(response.data);
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
  };

  useEffect(() => {
    fetchEpisodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]); // Re-fetch when searchQuery changes

  const handleCurrentVisibilityStatus = async (
    episodeId: string,
    currentStatus: string
  ) => {
    try {
      await axios.put(
        `https://endgame-team-server.vercel.app/latestEpisodes/${episodeId}`,
        { status: currentStatus }
      );
      toast.success("Status updated successfully", {
        icon: "🚀",
        style: {
          backgroundColor: "#4CAF50",
          color: "#FFFFFF",
        },
      });
      fetchEpisodes();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status", {
        icon: "❌",
        style: {
          backgroundColor: "#FF6347",
          color: "#FFFFFF",
        },
      });
    }
  };

  const handleDeleteData = async (episodeId: string) => {
    try {
      await axios.delete(
        `https://endgame-team-server.vercel.app/latestEpisodes/${episodeId}`
      );
      setEpisodes((prev) =>
        prev.filter((episode) => episode._id !== episodeId)
      );
      toast.success("Episode deleted successfully", {
        icon: "🚀",
        style: {
          backgroundColor: "#4CAF50",
          color: "#FFFFFF",
        },
      });
    } catch (error) {
      console.error("Error deleting episode:", error);
      toast.error("Error deleting episode", {
        icon: "❌",
        style: {
          backgroundColor: "#FF6347",
          color: "#FFFFFF",
        },
      });
    }
  };

  return (
    <div>
 <ChildrenBox
        tableData={episodes}
        dbutton={dbutton}
        onDelete={handleDeleteData}
        onCurrentVisibleStatus={handleCurrentVisibilityStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fetchEpisodes={undefined}
        fetchMovies={undefined}
        fetchShows={undefined}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default EpisodesPage;
