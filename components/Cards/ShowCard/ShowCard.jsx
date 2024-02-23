// compontst-/showcard
"use client"
import React, { useEffect, useState } from 'react';

import Link from 'next/link';

const ShowCard = () => {
    const [showsData, setShowsData] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://endgame-team-server.vercel.app/latestShows`, { cache: 'no-cache' });

                if (!res.ok) {
                    console.error(`Failed to fetch data. Status: ${res.status}`);
                } else {
                    const data = await res.json();
                    setShowsData(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {
            // Cleanup function (optional)
        };
    }, []);

    return (
        <>
            
              
                <div className="grid place-content-center grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 gap-y-8 max-w-screen-xl mx-auto px-4">
                {showsData.map((item) => (
                    <div key={item._id} className="relative">
                        <Link href={`/drama/episode/${item._id}`}>
                            <div className="max-w-lg  text-white h-60 rounded-md shadow-md overflow-hidden">
                                <img
                                    className="h-60 w-full object-cover rounded-sm"
                                    src={item?.thumbnail?.link}
                                    alt="Episode Thumbnail"
                                    width={400}
                                    height={200}
                                />
                                <div className=" bottom-0 left-0 w-full bg-gradient-to-t from-slate-950 opacity-100 text-center text-white py-2"> {/* Adjust bottom and other styles as needed */}
                                   
                                    <span className="text-sm">{item.title.slice(0, 20)}...</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
         

          
        </>
    );
};

export default ShowCard;
