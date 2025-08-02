"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Show {
  _id: string;
  title: string;
  thumbnail?: {
    link: string;
  };
  status: string;
}

const ShowCard: React.FC = () => {
  const [showsData, setShowsData] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://endgame-team-server.vercel.app/latestShows`,
          { cache: "no-cache" }
        );

        if (!res.ok) {
          console.error(`Failed to fetch data. Status: ${res.status}`);
        } else {
          const data: Show[] = await res.json();
          const filteredShows = data.filter((item) => item.status === "enable");
          setShowsData(filteredShows);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="">
      <h2 className="text-white my-2 text-lg font-semibold">Latest Shows</h2>

      {loading ? (
        <p className="text-white text-sm">Loading...</p>
      ) : showsData.length === 0 ? (
        <p className="text-white text-sm">No shows found at the moment.</p>
      ) : (
        <div className="grid place-content-center grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 gap-y-8">
          {showsData.map((item) => (
            <div key={item._id} className="relative">
              <Link href={`/drama/episode/${item._id}`}>
                <div className="max-w-sm text-white h-64 lg:h-[320px] rounded-md shadow-md overflow-hidden cursor-pointer">
                  <img
                    className="h-56 lg:h-72 w-full object-cover rounded-sm"
                    src={item.thumbnail?.link}
                    alt={item.title || "Episode Thumbnail"}
                    width={400}
                    height={200}
                  />
                  <div className="bottom-0 left-0 h-8 w-full bg-gradient-to-t from-slate-950 text-center text-white py-2">
                    <span className="text-sm">{item.title.slice(0, 20)}...</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ShowCard;
