"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Thumbnail {
  link: string;
}

interface Movie {
  _id: string;
  title: string;
  thumbnail?: Thumbnail;
}

const History: React.FC = () => {
  const [moves, setMoves] = useState<Movie[]>([]);
  const [historyVideo, setHistoryVideo] = useState<Movie[]>([]);

  useEffect(() => {
    fetch("https://endgame-team-server.vercel.app/movies")
      .then((res) => res.json())
      .then((data: Movie[]) => setMoves(data))
      .catch((error) => console.error("Failed to fetch movies:", error));
  }, []);

  useEffect(() => {
    const history: string[] = JSON.parse(localStorage.getItem("videoHistory") || "[]");
    if (!history.length) {
      setHistoryVideo([]);
      return;
    }

    const allMove = history
      .map((id) => moves.find((move) => move._id === id))
      .filter((move): move is Movie => move !== undefined); // type guard to filter undefined

    setHistoryVideo(allMove);
  }, [moves]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-white text-lg font-semibold mb-4">History</h2>
      {historyVideo.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="grid place-content-center grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 gap-y-8">
            {historyVideo.map((item) => (
              <div key={item._id}>
                <Link href={`/movies/${item._id}`}>
                  <a className="max-w-xs relative text-white h-72 rounded-md shadow-md overflow-hidden block">
                    <img
                      className="h-[265px] object-cover rounded-sm"
                      src={item.thumbnail?.link}
                      alt={item.title}
                      width={400}
                      height={200}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-slate-950 opacity-100"></div>
                    <p className="absolute top-0 right-0 rounded-sm px-1 text-[12px] font-light bg-green-500">
                      Original
                    </p>
                    <div className="flex flex-col z-0 py-1 relative">
                      <span className="text-sm">{item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}</span>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-white text-lg font-semibold">No Add History</div>
      )}
    </div>
  );
};

export default History;
