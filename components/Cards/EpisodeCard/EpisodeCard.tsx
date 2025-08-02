"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const EpisodeCard = ({ id }: { id: string }) => {
  const [show, setShow] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch shows & episodes একসাথে
        const [showsRes, episodesRes] = await Promise.all([
          fetch("https://endgame-team-server.vercel.app/latestShows", { cache: "no-cache" }),
          fetch("https://endgame-team-server.vercel.app/latestEpisodes", { cache: "no-cache" }),
        ]);

        if (!showsRes.ok || !episodesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const shows = await showsRes.json();
        const allEpisodes = await episodesRes.json();

        const currentShow = shows.find((s: any) => s._id === id);
        if (!currentShow) {
          setShow(null);
          setEpisodes([]);
          return;
        }

        // Filter episodes by show.episodes and status enabled
        const filteredEpisodes = allEpisodes
          .filter((ep: any) => currentShow.episodes.includes(ep._id) && ep.status === "enable")
          .sort((a: any, b: any) => currentShow.episodes.indexOf(a._id) - currentShow.episodes.indexOf(b._id));

        setShow(currentShow);
        setEpisodes(filteredEpisodes);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!show) {
    return <p className="text-center py-20 text-white">Show not found or loading...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto py-20 px-4 text-white">
      {/* Banner */}
      <div className="relative mb-10">
        <img src={show.banner?.link} alt={show.title} className="w-full h-auto object-cover rounded" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-transparent opacity-90"></div>
        <h1 className="absolute top-10 left-8 text-4xl font-bold">{show.title}</h1>
      </div>

      {/* Play First Episode Button */}
      {episodes.length > 0 && (
        <div className="mb-8">
          <Link href={`/drama/episode/video/${episodes[0]._id}`}>
            <a className="bg-green-600 hover:bg-green-500 px-5 py-3 rounded font-semibold inline-block">
              ▶ Play First Episode
            </a>
          </Link>
        </div>
      )}

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {episodes.map((episode, idx) => (
          <Link key={episode._id} href={`/drama/episode/video/${episode._id}`}>
            <a className="block rounded overflow-hidden shadow-lg bg-gray-900 hover:scale-105 transition-transform duration-300">
              <img
                src={episode.thumbnail?.link}
                alt={episode.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h2 className="text-lg truncate">{episode.title} {idx + 1}</h2>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default EpisodeCard;
