"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ChildrenBox from "@/components/dashboard/childrenBox/ChildrenBox";

// Define movie type
interface Movie {
  _id: string;
  title: string;
  status: string;
  [key: string]: any; // add more fields as needed
}

const MoviesPage = () => {
  const dbutton = "Add Movie";
  const [movies, setMovieData] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchMovies = async () => {
    try {
      const response = await axios.get<Movie[]>(
        "https://endgame-team-server.vercel.app/moviesSearch",
        { params: { searchQuery } }
      );
      setMovieData(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [searchQuery]);

  const handleCurrentVisibilityStatus = async (
    movieId: string,
    currentStatus: string
  ) => {
    try {
      await axios.put(
        `https://endgame-team-server.vercel.app/latestMovies/${movieId}`,
        { status: currentStatus }
      );
      setMovieData((prev) =>
        prev.filter((movie) => movie._id !== movieId)
      );
      toast.success("Status updated successfully", {
        icon: "🚀",
        style: {
          backgroundColor: "#4CAF50",
          color: "#FFFFFF",
        },
      });
      fetchMovies();
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

  const handleDeleteData = async (movieId: string) => {
    try {
      await axios.delete(
        `https://endgame-team-server.vercel.app/latestMovies/${movieId}`
      );
      setMovieData((prev) =>
        prev.filter((movie) => movie._id !== movieId)
      );
      toast.success("Movie deleted successfully", {
        icon: "🚀",
        style: {
          backgroundColor: "#4CAF50",
          color: "#FFFFFF",
        },
      });
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast.error("Error deleting movie", {
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
        tableData={movies}
        dbutton={dbutton}
        onDelete={handleDeleteData}
        onCurrentVisibleStatus={handleCurrentVisibilityStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fetchMovies={fetchMovies}
        fetchEpisodes={() => {}}
        fetchShows={() => {}}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default MoviesPage;
