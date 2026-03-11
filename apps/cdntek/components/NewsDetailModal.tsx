"use client";

import {
  X,
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Link,
} from "lucide-react";
import { useEffect } from "react";

interface NewsDetailModalProps {
  news: {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    date: string;
    type: "not\u00edcias" | "eventos" | "papers";
    readTime?: string;
    content: string;
  };
  allNews: Array<{
    id: number;
    title: string;
    category: string;
    date: string;
    type: "not\u00edcias" | "eventos" | "papers";
    readTime?: string;
    image?: string;
  }>;
  onClose: () => void;
  onNewsClick: (id: number) => void;
}

export function NewsDetailModal({
  news,
  allNews,
  onClose,
  onNewsClick,
}: NewsDetailModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const relatedNews = allNews
    .filter((n) => n.id !== news.id)
    .sort((a, b) => {
      if (a.category === news.category && b.category !== news.category)
        return -1;
      if (a.category !== news.category && b.category === news.category)
        return 1;
      if (a.type === news.type && b.type !== news.type) return -1;
      if (a.type !== news.type && b.type === news.type) return 1;
      return 0;
    })
    .slice(0, 3);

  const categoryCount = allNews.reduce(
    (acc, n) => {
      acc[n.category] = (acc[n.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const typeCount = allNews.reduce(
    (acc, n) => {
      acc[n.type] = (acc[n.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/90 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-7xl mx-auto my-8 px-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 md:left-8 z-50 p-3 bg-zinc-900/95 hover:bg-green-600 border border-white/20 hover:border-green-600 rounded-lg transition-all group backdrop-blur-sm shadow-xl"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5 text-white group-hover:text-black transition-colors" />
        </button>

        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          {/* Main Content */}
          <div>
            <article className="bg-zinc-900/50 rounded-2xl border border-white/10 p-8 md:p-12">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                <span className="flex items-center gap-2 text-green-500">
                  <Tag className="w-4 h-4" />
                  {news.category}
                </span>
                <span className="text-gray-600">&bull;</span>
                <span className="flex items-center gap-2 text-white/90">
                  {news.type}
                </span>
                <span className="text-gray-600">&bull;</span>
                <span className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {news.date}
                </span>
                {news.readTime && (
                  <>
                    <span className="text-gray-600">&bull;</span>
                    <span className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      {news.readTime} de leitura
                    </span>
                  </>
                )}
              </div>

              <h1 className="mb-6 uppercase tracking-wide text-3xl md:text-5xl text-white font-bold">
                {news.title}
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {news.description}
              </p>

              <div
                className="prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: news.content }}
                style={{ lineHeight: "1.8" }}
              />

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <h3 className="uppercase text-sm mb-3 text-green-500 font-bold">
                  PARTILHAR
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  Partilhe esta not\u00edcia nas suas redes sociais
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:border-green-500/50 hover:bg-green-500/10 transition-all text-sm text-white group">
                    <Facebook className="w-5 h-5 group-hover:text-green-500 transition-colors" />
                    <span className="hidden md:inline">Facebook</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:border-green-500/50 hover:bg-green-500/10 transition-all text-sm text-white group">
                    <Twitter className="w-5 h-5 group-hover:text-green-500 transition-colors" />
                    <span className="hidden md:inline">Twitter</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:border-green-500/50 hover:bg-green-500/10 transition-all text-sm text-white group">
                    <Linkedin className="w-5 h-5 group-hover:text-green-500 transition-colors" />
                    <span className="hidden md:inline">LinkedIn</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:border-green-500/50 hover:bg-green-500/10 transition-all text-sm text-white group">
                    <Link className="w-5 h-5 group-hover:text-green-500 transition-colors" />
                    <span className="hidden md:inline">Copiar Link</span>
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            {/* Related News */}
            {relatedNews.length > 0 && (
              <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
                <h3 className="uppercase text-sm mb-4 text-green-500 font-bold">
                  NOT\u00cdCIAS/ARTIGOS RELACIONADOS
                </h3>
                <div className="space-y-4">
                  {relatedNews.map((related) => (
                    <button
                      key={related.id}
                      onClick={() => onNewsClick(related.id)}
                      className="w-full text-left group"
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden relative border border-white/10 group-hover:border-green-500/50 transition-all">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={
                              related.image ||
                              "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=200&fit=crop"
                            }
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 space-y-2 min-w-0">
                          <h4 className="text-white text-sm group-hover:text-green-500 transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>{related.date}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
              <h3 className="uppercase text-sm mb-4 text-green-500 font-bold">
                TAGS RELACIONADAS
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "IA",
                  "Tecnologia",
                  "Digital",
                  "Inova\u00e7\u00e3o",
                  "Neg\u00f3cios",
                  "Design",
                ].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-full hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-500 transition-all"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
              <h3 className="uppercase text-sm mb-4 text-green-500 font-bold">
                CATEGORIAS
              </h3>
              <div className="space-y-2">
                {Object.entries(categoryCount)
                  .sort(([, a], [, b]) => b - a)
                  .map(([category, count]) => (
                    <div
                      key={category}
                      className={`flex items-center justify-between py-2 px-3 rounded-md transition-colors ${
                        category === news.category
                          ? "bg-green-500/10 border border-green-500/30"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`text-sm ${category === news.category ? "text-green-500" : "text-gray-400"}`}
                      >
                        {category}
                      </span>
                      <span className="text-green-500 text-xs bg-green-500/10 px-2 py-1 rounded-full">
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Types Distribution */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
              <h3 className="uppercase text-sm mb-4 text-green-500 font-bold">
                DISTRIBUI\u00c7\u00c3O POR TIPO
              </h3>
              <div className="space-y-3">
                {Object.entries(typeCount).map(([type, count]) => (
                  <div key={type} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span
                        className={`capitalize ${type === news.type ? "text-green-500" : "text-gray-400"}`}
                      >
                        {type}
                      </span>
                      <span className="text-green-500 text-xs">
                        {count}/{allNews.length}
                      </span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${type === news.type ? "bg-green-500" : "bg-green-500/50"}`}
                        style={{
                          width: `${(count / allNews.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
