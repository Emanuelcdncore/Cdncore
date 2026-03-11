'use client';

import Link from "next/link";
import { ImageWithFallback } from "../ImageWithFallback";
import { Clock } from "lucide-react";

interface NewsCardProps {
    slug: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    date: string;
    readTime?: string;
}

export function NewsCardLink({
    slug,
    title,
    subtitle,
    imageUrl,
    date,
    readTime,
}: NewsCardProps) {
    return (
        <Link
            href={`/news/${slug}`}
            className="group cursor-pointer block bg-zinc-900/50 border border-white/5 rounded-lg overflow-hidden hover:border-green-500/50 transition-all duration-300"
            style={{ textDecoration: 'none' }}
        >
            <div className="aspect-[16/10] overflow-hidden bg-black relative">
                <ImageWithFallback
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
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
                <p className="text-gray-400 leading-relaxed text-sm">{subtitle}</p>
            </div>
        </Link>
    );
}
