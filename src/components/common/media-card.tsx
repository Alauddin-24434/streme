import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface MediaCardProps {
  item: {
    id: string
    title: string
    thumbnailUrl: string
    episodeInfo?: string
    comingSoonDate?: string
  }
}

export default function MediaCard({ item }: MediaCardProps) {
  return (
    <Link
      href={`/media/${item.id}`}
      className="flex-none w-[200px] sm:w-[240px] cursor-pointer border bg-green-800 group"
    >
      <div className="relative w-full h-[140px] sm:h-[160px]  overflow-hidden  shadow-sm transition-transform duration-300 hover:scale-105">
        <Image
          src={item.thumbnailUrl || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />

        {item.episodeInfo && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
            {item.episodeInfo}
          </div>
        )}

        {item.comingSoonDate && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs px-2 py-1 text-center">
            Coming {item.comingSoonDate}
          </div>
        )}
      </div>
      <h3 className="mt-2 text-base font-semibold truncate text-gray-100 ">
        {item.title}
      </h3>
    </Link>
  )
}
