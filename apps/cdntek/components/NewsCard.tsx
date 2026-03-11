"use client";

import { ImageWithFallback } from "./ImageWithFallback";
import { Clock } from "lucide-react";

interface NewsCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  type: "not\u00edcias" | "eventos" | "papers";
  readTime?: string;
  onClick?: (id: number) => void;
}

export function NewsCard({
  id,
  title,
  description,
  image,
  category,
  date,
  type,
  readTime,
  onClick,
}: NewsCardProps) {
  return (
    <article
      className="group cursor-pointer bg-zinc-900/50 border border-white/5 rounded-lg overflow-hidden hover:border-green-500/50 transition-all duration-300"
      onClick={() => onClick?.(id)}
    >
      <div className="aspect-[16/10] overflow-hidden bg-black relative">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span
            className="px-4 py-1.5 text-xs text-white border border-white/30 rounded-full backdrop-blur-sm bg-black/20"
            style={{ boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)" }}
          >
            {type}
          </span>
        </div>
      </div>
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-3 text-green-500">
          <span className="uppercase tracking-wider text-xs">{category}</span>
          <span className="text-xs text-gray-600">&bull;</span>
          <time className="text-xs text-gray-500">{date}</time>
          {readTime && (
            <>
              <span className="text-xs text-gray-600">&bull;</span>
              <span className="text-xs text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {readTime}
              </span>
            </>
          )}
        </div>
        <h3 className="text-white group-hover:text-green-500 transition-colors uppercase tracking-wide font-bold">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
      </div>
    </article>
  );
}
