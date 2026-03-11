'use client';

import Link from "next/link";

interface NewsCardProps {
    slug: string;
    title: string;
    subtitle: string;
    date: string;
    imageUrl: string;
    readTime: string;
    featured?: boolean;
}

export function NewsCard({
    slug,
    title,
    subtitle,
    imageUrl,
    date,
    readTime,
    featured = false,
}: NewsCardProps) {
    return (
        <Link
            href={`/news/${slug}`}
            className="group cursor-pointer block bg-[#13131a] rounded-xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 flex flex-col"
            style={{ textDecoration: 'none' }}
        >
            {/* Image container with fixed height */}
            <div
                className="relative overflow-hidden"
                style={{ height: featured ? '260px' : '200px' }}
            >
                <img
                    src={imageUrl}
                    alt={title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: 'none', display: 'block', transition: 'transform 500ms ease' }}
                    className="group-hover:scale-[1.03]"
                />
                <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#13131a] to-transparent"
                    style={{ height: '4rem' }}
                />
            </div>

            {/* Text content */}
            <div className="flex flex-col flex-grow" style={{ padding: featured ? '1.5rem' : '1.25rem' }}>
                {/* Meta row */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-white/40 font-medium" style={{ fontSize: '13px' }}>{date}</span>
                    <span className="text-white/20">&middot;</span>
                    <span className="text-white/40 font-medium" style={{ fontSize: '13px' }}>{readTime} read</span>
                </div>

                {/* Title */}
                <h3
                    className="text-white/95 leading-tight group-hover:text-white transition-colors duration-200"
                    style={{
                        fontSize: featured ? '22px' : '1.125rem',
                        fontWeight: featured ? 700 : 600,
                        display: '-webkit-box',
                        WebkitLineClamp: featured ? 3 : 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        marginBottom: '0.5rem',
                    }}
                >
                    {title}
                </h3>

                {/* Description */}
                <p
                    className="text-white/50 leading-relaxed"
                    style={{
                        fontSize: featured ? '15px' : '0.875rem',
                        display: '-webkit-box',
                        WebkitLineClamp: featured ? 3 : 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        marginTop: 'auto',
                    }}
                >
                    {subtitle}
                </p>
            </div>
        </Link>
    );
}
