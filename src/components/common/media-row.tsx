import { ChevronRight } from "lucide-react"

import { IMediaContent } from "@/lib/interface"
import MediaCard from "./media-card"

interface MediaRowProps {
  title: string
  items :any[]
}

export default function MediaRow({ title, items }: MediaRowProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-green-500 mb-4 flex  items-center">
        {title}
      </h2>
      <div className="grid grid-cols-6 scrollbar-hide">
        {items.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
