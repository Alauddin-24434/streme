"use client"

import Image from "next/image"
import {
  PlayIcon,
  EyeIcon,
  CalendarIcon,
  FilmIcon,
  GlobeIcon,
  HeartIcon,
  ThumbsDownIcon,
  XIcon,
  Loader2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect, useRef } from "react"

interface TVShow {
  id: string
  title: string
  description: string
  category: string[]
  genres: string[]
  country: string
  thumbnailUrl: string
  videoUrl: string | null
  isPublished: boolean
  views: number
  type: string
  status: string
  createdAt: string
  updatedAt: string
  episodes: any[] // Define a more specific type if episode structure is known
}

interface AdData {
  id: string
  image: string
  title: string
  description: string
  link: string
}

interface TVShowDetailsProps {
  show: TVShow
  isSubscribed: boolean // New prop to control ads
}

export default function TVShowDetails({ show, isSubscribed }: TVShowDetailsProps) {
  const defaultVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4" // Placeholder video
  const videoRef = useRef<HTMLVideoElement>(null)

  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [showAd, setShowAd] = useState(false)
  const [currentAd, setCurrentAd] = useState<AdData | null>(null)
  const [canPlayVideo, setCanPlayVideo] = useState(isSubscribed) // Initially true if subscribed
  const [videoBuffering, setVideoBuffering] = useState(false)
  const [loadingDetails, setLoadingDetails] = useState(true) // For chunk-by-chunk simulation
  const [adPosition, setAdPosition] = useState({ top: "50%", left: "50%" }) // For random ad position

  useEffect(() => {
    // Simulate loading for the right-side details
    const timer = setTimeout(() => {
      setLoadingDetails(false)
    }, 1000) // Simulate 1 second loading

    // Fetch ads data
    fetch("/ads.json")
      .then((res) => res.json())
      .then((ads: AdData[]) => {
        if (!isSubscribed && ads.length > 0) {
          const randomIndex = Math.floor(Math.random() * ads.length)
          setCurrentAd(ads[randomIndex])
          setShowAd(true)
          setCanPlayVideo(false) // Block video playback if ad is shown

          // Calculate random ad position
          const randomTop = 20 + Math.random() * 60 // 20% to 80%
          const randomLeft = 20 + Math.random() * 60 // 20% to 80%
          setAdPosition({ top: `${randomTop}%`, left: `${randomLeft}%` })
        } else {
          setCanPlayVideo(true) // Allow video playback if subscribed or no ads
        }
      })
      .catch((error) => console.error("Failed to load ads:", error))

    return () => clearTimeout(timer)
  }, [isSubscribed])

  const handleLike = () => setLikes((prev) => prev + 1)
  const handleDislike = () => setDislikes((prev) => prev + 1)

  const handleCloseAd = () => {
    setShowAd(false)
    setCanPlayVideo(true) // Allow video playback after ad is closed
    if (videoRef.current) {
      videoRef.current.play() // Auto-play video after ad dismissal
    }
  }

  const handleVideoWaiting = () => setVideoBuffering(true)
  const handleVideoPlaying = () => setVideoBuffering(false)

  return (
    <div className="w-full  py-8 px-4 md:px-6 lg:px-8">
      <div className="grid md:grid-cols-12 gap-8 md:items-stretch">
        {/* Left Column: Video Player (8/12 width) */}
        <div className="col-span-12 md:col-span-8 relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
          {show.videoUrl || defaultVideoUrl ? (
            <>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls={canPlayVideo} // Controls enabled only if canPlayVideo is true
                autoPlay={canPlayVideo} // Auto-play only if canPlayVideo is true
                src={show.videoUrl || defaultVideoUrl}
                poster={show.thumbnailUrl}
                controlsList="nodownload" // Prevents download button
                onWaiting={handleVideoWaiting}
                onPlaying={handleVideoPlaying}
                onCanPlay={handleVideoPlaying} // Also set to false when video is ready to play
              >
                {"Your browser does not support the video tag."}
              </video>
              {videoBuffering && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
                  <Loader2 className="h-12 w-12 animate-spin text-white" />
                </div>
              )}
              {!canPlayVideo && showAd && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20">
                  <div className="text-white text-center p-4">
                    <PlayIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-xl font-semibold">{"Please close the ad to play video"}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-gray-900">
              <Image
                src={show.thumbnailUrl || "/placeholder.svg?height=720&width=1280&query=video thumbnail"}
                alt={`${show.title} thumbnail`}
                layout="fill"
                objectFit="cover"
                className="opacity-50"
              />
              <div className="absolute z-10 text-white text-center">
                <PlayIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-xl font-semibold">{"No video available"}</p>
                <p className="text-sm text-gray-400">{"Please check back later."}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Show Details, Episodes, Likes/Dislikes (4/12 width) */}
        <div className="col-span-12 md:col-span-4 flex flex-col space-y-6 h-full">
          {loadingDetails ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin mb-4" />
              <p>Loading show details...</p>
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold tracking-tight">{show.title}</h1>
              <div className="flex flex-wrap gap-2">
                {show.category.map((cat, index) => (
                  <Badge key={index} variant="secondary">
                    {cat}
                  </Badge>
                ))}
                {show.genres.map((genre, index) => (
                  <Badge key={index} variant="outline">
                    {genre}
                  </Badge>
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {show.description || "No description available for this show."}
              </p>

              {/* Views, Release Date, Type, Country, Status */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <EyeIcon className="w-4 h-4" />
                  <span>{show.views.toLocaleString()} Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Released: {new Date(show.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FilmIcon className="w-4 h-4" />
                  <span>Type: {show.type.replace(/_/g, " ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GlobeIcon className="w-4 h-4" />
                  <span>Country: {show.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="capitalize">
                    {show.status.toLowerCase()}
                  </Badge>
                </div>
              </div>

              {/* Like/Dislike Buttons */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <Button variant="ghost" onClick={handleLike} className="flex items-center gap-1">
                  <HeartIcon className="w-5 h-5" />
                  <span>{likes} Likes</span>
                </Button>
                <Button variant="ghost" onClick={handleDislike} className="flex items-center gap-1">
                  <ThumbsDownIcon className="w-5 h-5" />
                  <span>{dislikes} Dislikes</span>
                </Button>
              </div>

              {/* Episodes Section */}
              <Card className="flex-grow">
                <CardHeader>
                  <CardTitle>Episodes</CardTitle>
                </CardHeader>
                <CardContent>
                  {show.episodes && show.episodes.length > 0 ? (
                    <ul className="space-y-2">
                      {show.episodes.map((episode, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <PlayIcon className="w-4 h-4 text-primary" />
                          <span>
                            Episode {index + 1}: {episode.title || `Untitled Episode ${index + 1}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No episodes available yet.</p>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Floating Random Ad Section */}
      {showAd && currentAd && (
        <Card
          className="fixed w-[300px] bg-gradient-to-br from-purple-600 to-indigo-800 text-white overflow-hidden shadow-2xl z-50"
          style={{ top: adPosition.top, left: adPosition.left, transform: "translate(-50%, -50%)" }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-white hover:bg-white/20"
            onClick={handleCloseAd}
            aria-label="Close ad"
          >
            <XIcon className="w-4 h-4" />
          </Button>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold mb-2">{currentAd.title}</h3>
            <p className="text-sm mb-4">{currentAd.description}</p>
            <Image
              src={currentAd.image || "/placeholder.svg"}
              alt={currentAd.title}
              width={200}
              height={150}
              className="rounded-md mb-4 shadow-md"
            />
            <Button variant="secondary" className="w-full max-w-[200px]">
              {"Learn More"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
