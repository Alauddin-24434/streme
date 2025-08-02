"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

// Define type for movie object
interface Movie {
  _id: string;
  title: string;
  thumbnail: {
    link: string;
  };
  status: string;
}

const VideoCard = () => {
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://endgame-team-server.vercel.app/movies`, {
          cache: "no-cache",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch. Status: ${res.status}`);
        }

        const data: Movie[] = await res.json();
        const filtered = data.filter((item) => item.status === "enable");
        setMoviesData(filtered);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mt-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-xl md:text-2xl font-semibold">Latest Movies</h2>
      </div>

      {loading ? (
        <p className="text-white text-sm">Loading...</p>
      ) : moviesData.length === 0 ? (
        <p className="text-white text-sm">No movies available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {moviesData.map((item) => (
            <Link key={item._id} href={`/movies/${item._id}`} passHref>
              <div className="relative group rounded-lg overflow-hidden shadow-lg bg-slate-900 transition transform hover:scale-105">
                <Image
                  src={item.thumbnail.link}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />

                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-slate-950 to-transparent" />

                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded shadow">
                  Original
                </span>

                <div className="absolute bottom-2 left-2 right-2 text-white z-10">
                  <h3 className="text-sm font-medium truncate">{item.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default VideoCard;
