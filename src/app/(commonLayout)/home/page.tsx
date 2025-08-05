import HeroCarousel from "@/components/common/hero-caro";
import MediaRow from "@/components/common/media-row";
import ChatModal from "@/components/shared/chat/chatModal";
import { MediaContent } from "@/generated/prisma";
import { ConetentStatus, MediaType } from "@/lib/interface";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/media`, {
    cache: "no-store",
  });

  const allMediaContent: MediaContent[] = await res.json();

  const latestFiveItems = allMediaContent.slice(-5).reverse(); // শেষ ৫টি (নতুন যুক্ত ডেটা ধরে)

  const drama = allMediaContent.filter(
    (item) => item.type === MediaType.TV_SHOW
  );

  const movies = allMediaContent.filter(
    (item) => item.type === MediaType.MOVIE
  );

  const animeItems = allMediaContent.filter(
    (item) => item.type === MediaType.ANIME
  );

  const upcomingItems = allMediaContent.filter(
    (item) => item.status === ConetentStatus.UPCOMING
  );

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <HeroCarousel items={latestFiveItems} />
      <section className=" px-4 py-8">
        <MediaRow title="Tv Shows" items={drama} />
        <MediaRow title="Movies" items={movies} />
        <MediaRow title="Anime" items={animeItems} />
        <MediaRow title="Upcoming" items={upcomingItems} />
        <ChatModal />
      </section>
    </div>
  );
}
