'use client'
import MainNavbar from '@/components/MainNavbar/MainNavbar';
import ProtectedRoute from '@/utils/ProtectedRoute';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const searchParams = useSearchParams();
  const [allDatas, setAllDatas] = useState([]);
  const [filterAllVideos, setFilterAllVideos] = useState([]);


  console.log(searchParams.get('q'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://endgame-team-server.vercel.app/allDatas`, { cache: 'no-cache' });

        if (!res.ok) {
          console.error(`Failed to fetch data. Status: ${res.status}`);
        } else {
          const data = await res.json();
          setAllDatas(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      const filtered = allDatas.filter(movie => {
        return movie.title?.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilterAllVideos(filtered);
    } else {
      setFilterAllVideos(allDatas);
    }
  }, [searchParams, allDatas]);

  return (
    <ProtectedRoute>
      <div>
        <MainNavbar></MainNavbar>
        <section className='max-w-7xl mx-auto h-screen p-10 md:p-20'>
          <div className='flex flex-col flex-col-reverse lg:flex-row-reverse   gap-6'>
            <div className="w-full md:w-2/3 shadow mt-3 px-5 rounded-lg bg-white">
              <div className="flex items-center justify-between mt-4">
                <p className="font-medium text-black">
                  Filters
                </p>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 g mt-4">
                  <select className="px-4 text-white py-3 w-20 md:w-40 rounded-md bg-slate-900 border-transparent focus:border-gray-500 focus:bg-gray-800 focus:ring-0 text-sm">
                    <option value="">Country</option>
                    <option value="for-rent">Bangladesh</option>
                    <option value="for-sale">United States</option>
                  </select>

                  <select className="px-4 py-3 w-20 text-white md:w-40 rounded-md bg-slate-900 border-transparent focus:border-gray-500 focus:bg-gray-800 focus:ring-0 text-sm">
                    <option value="">Time</option>
                    <option value="fully-furnished">This Week</option>
                    <option value="partially-furnished">This Month</option>
                    <option value="not-furnished">This Year</option>
                  </select>

                  <button className="px-4 w-20  md:w-40 py-2 bg-slate-900 hover:bg-gray-200 text-white text-sm font-medium rounded-md">
                    Reset Filter
                  </button>
                </div>
              </div>
            </div>


            <div>
              {filterAllVideos.map(movie => (
                <div key={movie.id}>
                  {movie.episodes ? (
                    <Link href={`/drama/${movie._id}`}>
                      <div className="max-w-4xl mx-auto mt-3 w-full item lg:flex lg:flex-col border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r   leading-normal">
                        <div className="h-24  lg:h-36 lg:min-w-96 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${movie.banner.link})` }} title={movie?.title} >
                        </div>

                        <div className="text-black font-bold text-xl p-2">{movie?.title}</div>

                      </div>

                    </Link>
                  ) : (
                    <Link href={`/movies/${movie._id}`}>
                      <div className="max-w-4xl mx-auto  mt-3 w-full item lg:flex">
                        <div className="h-44  lg:h-56 lg:w-80 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${movie.thumbnail.link})` }} title={movie?.title} >
                        </div>
                        <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                          <div className="mb-8">
                            <div className="text-black font-bold text-xl mb-2">{movie?.title}</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

    </ProtectedRoute>
  );
};

export default Page;
