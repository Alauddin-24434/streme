'use client'

import React, { useState, useEffect } from 'react'

interface Video {
  _id: string
  title: string
  genres: string | string[]
  thumbnail: {
    link: string
  }
  video: {
    link: string
  }
}

interface PlaylistProps {
  videoData: Video
  handlePlayVideo: (videoUrl: string) => void
}

const Playlist: React.FC<PlaylistProps> = ({ handlePlayVideo, videoData }) => {
  const [playlistData, setPlaylistData] = useState<Video[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://endgame-team-server.vercel.app/movies')
        if (!response.ok) {
          throw new Error('Failed to fetch movies')
        }
        const data: Video[] = await response.json()

        // Filter by genre(s)
        const filteredData = data.filter(item => {
          if (Array.isArray(item.genres)) {
            if (Array.isArray(videoData.genres)) {
              return item.genres.some(genre => videoData.genres.includes(genre))
            } else {
              return item.genres.includes(videoData.genres)
            }
          } else {
            if (Array.isArray(videoData.genres)) {
              return videoData.genres.includes(item.genres)
            } else {
              return item.genres === videoData.genres
            }
          }
        })

        setPlaylistData(filteredData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [videoData])

  return (
    <div className="w-80 mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 px-3 py-2 gap-4 overflow-y-auto max-h-[57vh]">
      {playlistData.map((item) => (
        <button
          key={item._id}
          onClick={() => handlePlayVideo(item.video.link)}
          className="hover:bg-gray-300"
          type="button"
        >
          <div className="px-2 py-3 border rounded-lg shadow-md flex items-center gap-2">
            <img src={item.thumbnail.link} alt={item.title} className="h-14 w-auto rounded" />
            <p className="text-base text-white font-semibold">
              {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}

export default Playlist
