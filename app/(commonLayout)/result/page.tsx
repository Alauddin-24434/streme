'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Movie {
  _id: string
  title?: string
  genres?: string | string[]
  publisDate?: string
  episodes?: boolean
  thumbnail: {
    link: string
  }
}

const Page: React.FC = () => {
  const searchParams = useSearchParams()
  const [allDatas, setAllDatas] = useState<Movie[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [filterAllVideos, setFilterAllVideos] = useState<Movie[]>([])
  const [selectedGenres, setSelectedGenres] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  // Fetch all data once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://endgame-team-server.vercel.app/allDatas`, { cache: 'no-cache' })
        if (!res.ok) {
          console.error(`Failed to fetch data. Status: ${res.status}`)
          return
        }
        const data: Movie[] = await res.json()
        setAllDatas(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  // Filter by search query
  useEffect(() => {
    const searchQuery = searchParams.get('q')
    if (searchQuery) {
      const filtered = allDatas.filter(movie =>
        movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilterAllVideos(filtered)
    } else {
      setFilterAllVideos(allDatas)
    }
  }, [searchParams, allDatas])

  // Extract unique genres for the dropdown
  const genresCategory = Array.from(
    new Set(
      filterAllVideos.flatMap(movie => {
        if (Array.isArray(movie.genres)) return movie.genres
        else if (typeof movie.genres === 'string') return [movie.genres]
        else return []
      })
    )
  )


  // Filter videos by selected genre and date
  const filteredVideos = filterAllVideos.filter(video => {
    // Filter by genre
    if (selectedGenres) {
      if (typeof video.genres === 'string') {
        if (!video.genres.includes(selectedGenres)) return false
      } else if (Array.isArray(video.genres)) {
        if (!video.genres.includes(selectedGenres)) return false
      }
    }

    // Filter by date
    if (selectedDate) {
      if (!video.publisDate) return false
      const publishedDate = new Date(video.publisDate)
      const currentDate = new Date()

      if (selectedDate === 'this-week') {
        const startOfWeek = new Date(currentDate)
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 7)
        return publishedDate >= startOfWeek && publishedDate < endOfWeek
      } else if (selectedDate === 'this-month') {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        return publishedDate >= startOfMonth && publishedDate <= endOfMonth
      } else if (selectedDate === 'this-year') {
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1)
        const endOfYear = new Date(currentDate.getFullYear() + 1, 0, 0)
        return publishedDate >= startOfYear && publishedDate <= endOfYear
      }
    }

    return true
  })

  return (
    <div>
      <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-center max-w-5xl mx-auto gap-4">
        <div className="mt-16 md:mt-20 lg:mt-24 xl:mt-24 2xl:mt-32 px-2">
          <select
            onChange={e => setSelectedGenres(e.target.value)}
            className="px-2 rounded-l-md md:px-4 lg:px-4 py-1 md:py-3 lg:py-3 bg-slate-900 border-transparent text-xs md:text-sm lg:text-sm text-white"
            value={selectedGenres}
          >
            <option value="">Type</option>
            {genresCategory.map((genre, i) => (
              <option key={i} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          <select
            onChange={e => setSelectedDate(e.target.value)}
            className="px-2 md:px-4 lg:px-4 py-1 md:py-3 lg:py-3 bg-slate-900 border-transparent text-xs md:text-sm lg:text-sm text-white"
            value={selectedDate}
          >
            <option value="">Date</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="this-year">This Year</option>
          </select>
        </div>

        <div className="mt-2 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-28 mb-5 w-full">
          {filteredVideos.map(movie => (
            <div key={movie._id}>
              {movie.episodes ? (
                <Link href={`/drama/episode/${movie._id}`} passHref>
                  <div
                    className="max-w-4xl mx-auto mt-3 w-full item lg:flex px-2 cursor-pointer"
                    title={movie?.title}
                    style={{ backgroundImage: `url(${movie.thumbnail.link})` }}
                  >
                    <div
                      className="h-44 lg:h-56 lg:w-72 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                      style={{ backgroundImage: `url(${movie.thumbnail.link})` }}
                    ></div>
                    <div className="bg-slate-900 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                      <div className="mb-8 w-56">
                        <h2 className="text-white text-left hover:text-green-600 font-bold text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl mb-2">
                          {movie?.title}
                        </h2>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link href={`/movies/${movie._id}`} passHref>
                  <div
                    className="max-w-4xl mx-auto mt-3 w-full item lg:flex px-2 cursor-pointer"
                    title={movie?.title}
                    style={{ backgroundImage: `url(${movie.thumbnail.link})` }}
                  >
                    <div
                      className="h-44 lg:h-56 lg:w-72 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                      style={{ backgroundImage: `url(${movie.thumbnail.link})` }}
                    ></div>
                    <div className="bg-slate-900 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                      <div className="mb-8 w-56">
                        <h2 className="text-white text-left hover:text-green-600 font-bold text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl mb-2">
                          {movie?.title}
                        </h2>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
