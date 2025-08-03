"use client"

import { useForm, type SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type FormValues = {
  title: string
  description?: string
  videoUrl?: string
}

interface AddEpisodeFormProps {
  mediaContentId: string
  onEpisodeAdded?: () => void
}

export default function AddEpisodeForm({ mediaContentId, onEpisodeAdded }: AddEpisodeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>()
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true)
    try {
      const payload = {
        ...data,
        mediaContentId,
      }

      const res = await fetch("/api/episodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        toast.success("Episode added successfully!")
        reset()
        onEpisodeAdded?.() // Callback to refresh parent data
      } else {
        const errorData = await res.json()
        toast.error(errorData.message || "Failed to add episode.")
      }
    } catch (error) {
      console.error("Error adding episode:", error)
      toast.error("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full bg-gray-900 text-white border-gray-700 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add New Episode</CardTitle>
        <CardDescription className="text-gray-300">
          Fill in the details for a new episode in this series.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="episode-title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="episode-title"
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Enter episode title"
              className="bg-gray-800 text-white border-gray-700 placeholder:text-gray-500 focus:ring-red-500 focus:ring-2"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="episode-description">Description</Label>
            <Textarea
              id="episode-description"
              {...register("description")}
              rows={3}
              placeholder="Enter episode description"
              className="bg-gray-800 text-white border-gray-700 placeholder:text-gray-500 focus:ring-red-500 focus:ring-2 resize-y"
            />
          </div>

          {/* Video URL (for now, text input) */}
          <div>
            <Label htmlFor="episode-videoUrl">Video URL</Label>
            <Input
              id="episode-videoUrl"
              {...register("videoUrl")}
              type="url"
              placeholder="https://example.com/episode.mp4"
              className="bg-gray-800 text-white border-gray-700 placeholder:text-gray-500 focus:ring-red-500 focus:ring-2"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition text-white"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Episode
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
