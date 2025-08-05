import React from "react";
import { IMediaContent } from "@/lib/interface";
import Link from "next/link";
import TVShowDetails from "@/components/common/media-content-detail";

interface MediaDetailsPageProps {
  params: { id: string };
}

export default async function MediaDetailsPage({ params }: MediaDetailsPageProps) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/media/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="text-red-500 text-center mt-10">❌ Media not found.</div>;
  }

  const media: IMediaContent = await res.json();


// const defaultShowData = {
//     id: "cmdvjif95000ihukmafc68bl7",
//     title: "When Life Gives You Tangerines",
//     description:
//       "A heartwarming and whimsical tale of two individuals navigating the complexities of life, love, and unexpected challenges in a vibrant, tangerine-filled world. This series explores themes of resilience, friendship, and finding joy in the simplest moments. Follow the journey of two unlikely companions as they discover that even the sourest of tangerines can lead to the sweetest of adventures.",
//     category: ["Drama", "Romance"],
//     genres: ["Slice of Life", "Comedy", "Fantasy"],
//     country: "South Korea",
//     thumbnailUrl: "https://res.cloudinary.com/dyfamn6rm/image/upload/v1754217002/uploads/qhylh26bckonti0ce548.jpg",
//     videoUrl: null, // Set to a valid URL to see the video player in action
//     isPublished: true,
//     views: 1234567,
//     type: "TV_SHOW",
//     status: "COMPLETED",
//     createdAt: "2025-08-03T10:30:04.127Z",
//     updatedAt: "2025-08-03T10:30:04.127Z",
//     episodes: [
//       { title: "The First Tangerine" },
//       { title: "A Zest for Life" },
//       { title: "Peeling Back the Layers" },
//       { title: "Sweet and Sour Moments" },
//       { title: "The Citrus of Destiny" },
//     ],
//   }
  return (
   <div>
     <TVShowDetails show={media} />
   </div>
  );
}
