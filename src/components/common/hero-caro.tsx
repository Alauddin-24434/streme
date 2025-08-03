"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MediaContent } from "@/generated/prisma";

interface HeroCarouselProps {
  items: MediaContent[];
}

export default function HeroCarousel({ items }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = items.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [totalItems]);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={item.thumbnailUrl || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover"
            priority={index === currentIndex}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
              {item.title}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
