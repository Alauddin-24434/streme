"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { deleteMediaFile, uploadMediaFile } from "@/lib/hooks/useUpload";
import { MediaType, ConetentStatus } from "@/lib/interface";

type FormValues = {
  title: string;
  description?: string;
  category?: string;
  genres?: string;
  country?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  isPublished: boolean;
  type: MediaType;
  status: ConetentStatus
};

export default function AddMediaForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnailFile(e.target.files?.[0] ?? null);
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoFile(e.target.files?.[0] ?? null);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    let thumbnailUrl: string | null = null;
    let videoUrl: string | null = null;

    try {
      if (thumbnailFile) {
        thumbnailUrl = await uploadMediaFile(thumbnailFile);
      }
      if (videoFile) {
        videoUrl = await uploadMediaFile(videoFile);
      }

      const payload = {
        ...data,
        isPublished: true,
        thumbnailUrl,
        videoUrl,
        category: (data.category ?? "").split(",").map((s) => s.trim()),
        genres: (data.genres ?? "").split(",").map((s) => s.trim()),
       
      };

      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (thumbnailUrl) await deleteMediaFile(thumbnailUrl);
        if (videoUrl) await deleteMediaFile(videoUrl);

        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add media.");
      }

      toast.success("Media added successfully!");
      reset();
      setThumbnailFile(null);
      setVideoFile(null);
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-3xl mx-auto"
    >
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          placeholder="Title"
          className="bg-gray-800 text-white border-gray-700"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Description"
          className="bg-gray-800 text-white border-gray-700"
          {...register("description")}
        />
      </div>

      <div>
        <Label htmlFor="category">Category (comma separated) *</Label>
        <Input
          id="category"
          placeholder="e.g. Action, Drama"
          className="bg-gray-800 text-white border-gray-700"
          {...register("category", { required: "Category is required" })}
        />
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">
            {errors.category.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="genres">Genres (comma separated) *</Label>
        <Input
          id="genres"
          placeholder="e.g. Sci-fi, Thriller"
          className="bg-gray-800 text-white border-gray-700"
          {...register("genres", { required: "Genres are required" })}
        />
        {errors.genres && (
          <p className="text-red-500 text-sm mt-1">{errors.genres.message}</p>
        )}
      </div>

     
      <div>
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          placeholder="Country"
          className="bg-gray-800 text-white border-gray-700"
          {...register("country")}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isPublished"
          {...register("isPublished")}
          className="border-gray-600 data-[state=checked]:bg-red-500"
        />
        <Label htmlFor="isPublished">Published</Label>
      </div>

      <div>
        <Label htmlFor="type">Media Type *</Label>
        <Select onValueChange={(val) => setValue("type", val as MediaType)}>
          <SelectTrigger className="w-full bg-gray-800 text-white border-gray-700">
            <SelectValue placeholder="Select media type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            <SelectItem value={MediaType.ANIME}>Anime</SelectItem>
            <SelectItem value={MediaType.MOVIE}>Movie</SelectItem>
            <SelectItem value={MediaType.TV_SHOW}>TV Show</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="status">Content Status *</Label>
        <Select
          onValueChange={(val) =>
            setValue("status", val as ConetentStatus)
          }
        >
          <SelectTrigger className="w-full bg-gray-800 text-white border-gray-700">
            <SelectValue placeholder="Select content status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            <SelectItem value={ConetentStatus.UPCOMING}>Upcoming</SelectItem>
            <SelectItem value={ConetentStatus.ONGOING}>Ongoing</SelectItem>
            <SelectItem value={ConetentStatus.COMPLETED}>Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="thumbnail-upload">Select Thumbnail</Label>
        <Input
          id="thumbnail-upload"
          type="file"
          accept="image/*"
          onChange={handleThumbnailSelect}
          className="bg-gray-800 text-white border-gray-700"
        />
        {thumbnailFile && (
          <p className="text-green-500 text-sm">Selected: {thumbnailFile.name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="video-upload">Select Video</Label>
        <Input
          id="video-upload"
          type="file"
          accept="video/*"
          onChange={handleVideoSelect}
          className="bg-gray-800 text-white border-gray-700"
        />
        {videoFile && (
          <p className="text-green-500 text-sm">Selected: {videoFile.name}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition text-white"
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Add Media"
        )}
      </Button>
    </form>
  );
}
