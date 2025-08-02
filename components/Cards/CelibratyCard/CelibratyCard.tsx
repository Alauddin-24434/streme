'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Celebrity {
  _id: string;
  name: string;
  image_url: string;
}

const CelibratyCard = () => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://endgame-team-server.vercel.app/celebrities`, {
          cache: 'no-cache',
        });

        if (!res.ok) {
          console.error(`Failed to fetch data. Status: ${res.status}`);
        } else {
          const data = await res.json();
          setCelebrities(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <h2 className="text-white text-lg font-semibold mb-4">Popular Celebrities</h2>

      {loading ? (
        <div className="text-center text-white">Loading celebrities...</div>
      ) : celebrities.length === 0 ? (
        <div className="text-center">No celebrities found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-10 text-white">
          {celebrities.map((celebrity) => (
            <Link href={`/celebrities/${celebrity._id}`} key={celebrity._id}>
              <div className="flex flex-col items-center hover:scale-110 hover:text-[#01B84C] duration-300 cursor-pointer">
                <img
                  src={celebrity.image_url}
                  alt={celebrity.name}
                  className="rounded-full w-32 h-32 object-cover hover:border-[#01B84C] hover:border-4 duration-300"
                />
                <h1 className="mt-2 text-center">{celebrity.name}</h1>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CelibratyCard;
