"use client"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Play, ThumbsUp, ThumbsDown, Eye, PlusCircle, Edit } from "lucide-react"
import Image from "next/image"

import { useState } from "react"
import { useRouter } from "next/navigation"
import EditEpisodeForm from "@/app/(dashbordLayout)/dashboard/media-content/edit-episode-form"
import AddEpisodeForm from "@/app/(dashbordLayout)/dashboard/media-content/add-episode-form"
import { Episode, MediaContent } from "@/generated/prisma"

// Extend MediaContent type to include episodes if needed for display
type MediaContentWithEpisodes = MediaContent & {
  episodes?: Episode[]
}

interface MediaContentDetailProps {
  content: MediaContentWithEpisodes
}

export default function MediaContentDetail({ content }: MediaContentDetailProps) {
  const router = useRouter()
  const [isAddEpisodeDialogOpen, setIsAddEpisodeDialogOpen] = useState(false)
  const [isEditEpisodeDialogOpen, setIsEditEpisodeDialogOpen] = useState(false)
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null)

  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    )
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`
    }
    return null
  }


  const handleEpisodeAddedOrUpdated = () => {
    // Force a refresh of the page to refetch data
    router.refresh()
    setIsAddEpisodeDialogOpen(false)
    setIsEditEpisodeDialogOpen(false)
  }

  const openEditEpisodeDialog = (episode: Episode) => {
    setSelectedEpisode(episode)
    setIsEditEpisodeDialogOpen(true)
  }

  return (
    <Card className="w-full bg-gray-900 text-white border-gray-700 shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{content.title}</CardTitle>
        <CardDescription className="text-gray-300">{content.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {content.videoUrl && (
          <div className="w-full">
            <AspectRatio ratio={16 / 9}>
              <video
                controls
                src={content.videoUrl}
                poster={content.thumbnailUrl || "/placeholder.svg?height=720&width=1280"}
                className="rounded-lg object-cover w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            </AspectRatio>
          </div>
        )}

        {content.thumbnailUrl && !content.videoUrl && (
          <div className="w-full">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={content.thumbnailUrl || "/placeholder.svg"}
                alt={`${content.title} thumbnail`}
                fill
                className="rounded-lg object-cover"
              />
            </AspectRatio>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Details</h3>
            <ul className="space-y-1 text-gray-300">
              <li>
                <strong>Type:</strong>{" "}
                <Badge variant="secondary" className="bg-red-600 text-white">
                  {content.type}
                </Badge>
              </li>
              {content.releaseDate && (
                <li>
                  <strong>Release Date:</strong> {new Date(content.releaseDate).toLocaleDateString()}
                </li>
              )}
         
              {content.country && (
                <li>
                  <strong>Country:</strong> {content.country}
                </li>
              )}
         
              <li>
                <strong>Published:</strong>{" "}
                <Badge
                  variant={content.isPublished ? "default" : "outline"}
                  className={content.isPublished ? "bg-green-500 text-white" : "border-gray-600 text-gray-400"}
                >
                  {content.isPublished ? "Yes" : "No"}
                </Badge>
              </li>
            </ul>
          </div>

          <div>
            {content.category && content.category.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {content.category.map((cat, index) => (
                    <Badge key={index} variant="outline" className="border-red-500 text-red-400">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {content.genres && content.genres.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {content.genres.map((genre, index) => (
                    <Badge key={index} variant="outline" className="border-blue-500 text-blue-400">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

         
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
          <div className="flex items-center gap-1 text-gray-300">
            <Eye className="h-5 w-5" /> {content.views} Views
          </div>
    
        </div>

     

     
      </CardContent>

      {/* Edit Episode Dialog */}
      {selectedEpisode && (
        <Dialog open={isEditEpisodeDialogOpen} onOpenChange={setIsEditEpisodeDialogOpen}>
          <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Edit Episode</DialogTitle>
            </DialogHeader>
            <EditEpisodeForm episode={selectedEpisode} onEpisodeUpdated={handleEpisodeAddedOrUpdated} />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
