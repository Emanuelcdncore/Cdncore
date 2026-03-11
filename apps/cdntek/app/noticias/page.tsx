"use client";

import Footer from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { NewsDetailModal } from "@/components/NewsDetailModal";
import { useState, useMemo, useEffect } from "react";
import { Search, Mail } from "lucide-react";
import { newsData, type NewsItem } from "@/data/newsData";

export default function News() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<
    "todos" | "not\u00edcias" | "eventos" | "papers"
  >("todos");
  const [sortBy, setSortBy] = useState<"recentes" | "antigos">("recentes");
  const [email, setEmail] = useState("");
  const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Email ${email} registado com sucesso!`);
    setEmail("");
  };

  const filteredNewsData = useMemo(() => {
    let filtered: NewsItem[] = [...newsData];

    // Filter by type
    if (selectedType !== "todos") {
      filtered = filtered.filter((news) => news.type === selectedType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by date
    const sorted = [...filtered].sort((a, b) => {
      const parseDate = (dateStr: string) => {
        const months: { [key: string]: number } = {
          Jan: 0,
          Fev: 1,
          Mar: 2,
          Abr: 3,
          Mai: 4,
          Jun: 5,
          Jul: 6,
          Ago: 7,
          Set: 8,
          Out: 9,
          Nov: 10,
          Dez: 11,
        };
        const parts = dateStr.split(" ");
        if (parts.length >= 3) {
          const day = parseInt(parts[0]);
          const month = months[parts[1]] ?? 0;
          const year = parseInt(parts[2]);
          return new Date(year, month, day);
        }
        return new Date(dateStr);
      };

      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return sortBy === "recentes"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

    return sorted;
  }, [searchTerm, selectedType, sortBy]);

  return (
    <div className="min-h-screen bg-black">
      <main className="pt-20">
        <div className="min-h-screen bg-black text-white">
          {/* Hero Section */}
          <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1636703781908-a5e63be992a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbmV0d29yayUyMGRpZ2l0YWx8ZW58MXx8fHwxNzY1ODc0MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Technology Network"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />
            </div>
            <div className="relative z-10 text-center max-w-4xl px-6">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                \u00daLTIMAS NOT\u00cdCIAS
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Acompanhe as \u00faltimas not\u00edcias e atualiza\u00e7\u00f5es sobre tecnologia,
                inova\u00e7\u00e3o e tend\u00eancias do mercado.
              </p>
            </div>
          </section>

          {/* News Grid */}
          <div className="max-w-7xl mx-auto px-6 py-20">
            {/* Filters Section */}
            <div className="mb-12 space-y-4">
              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Pesquisar not\u00edcias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-900/50 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>

              {/* Filter Buttons and Sort */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Type Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  {(
                    ["todos", "not\u00edcias", "eventos", "papers"] as const
                  ).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-5 py-1.5 rounded-full text-sm transition-all duration-300 ${
                        selectedType === type
                          ? "bg-green-600/20 text-green-400 border border-green-600/50"
                          : "bg-zinc-900/50 text-white border border-white/10 hover:border-green-600/50"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs">Ordenar:</span>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as typeof sortBy)
                    }
                    className="bg-zinc-900/50 border border-white/10 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-green-500"
                  >
                    <option value="recentes">Mais Recentes</option>
                    <option value="antigos">Mais Antigos</option>
                  </select>
                </div>
              </div>

              {/* Results Counter */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <p className="text-gray-400 text-xs">
                  {filteredNewsData.length}{" "}
                  {filteredNewsData.length === 1
                    ? "resultado"
                    : "resultados"}{" "}
                  encontrado
                  {filteredNewsData.length === 1 ? "" : "s"}
                </p>
                {(searchTerm || selectedType !== "todos") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedType("todos");
                    }}
                    className="text-green-400 text-xs hover:underline"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
            </div>

            {/* News Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNewsData.length > 0 ? (
                filteredNewsData.map((news) => (
                  <NewsCard
                    key={news.id}
                    id={news.id}
                    title={news.title}
                    description={news.description}
                    image={news.image}
                    category={news.category}
                    date={news.date}
                    type={news.type}
                    readTime={news.readTime}
                    onClick={() => setSelectedNewsId(news.id)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-gray-400 text-lg">
                    Nenhuma not\u00edcia encontrada
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Tente ajustar seus filtros de pesquisa
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Newsletter Section */}
          <section className="border-t border-white/10 bg-zinc-900/30">
            <div className="max-w-7xl mx-auto px-6 py-16">
              <div className="max-w-2xl mx-auto text-center">
                <Mail className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-3 uppercase">
                  RECEBA AS \u00daLTIMAS NOT\u00cdCIAS
                </h2>
                <p className="text-gray-400 mb-8 text-sm">
                  Inscreva-se na nossa newsletter para receber atualiza\u00e7\u00f5es
                  sobre as novidades mais importantes do setor.
                </p>
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Inscrever
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* News Detail Modal */}
          {selectedNewsId !== null && (
            <NewsDetailModal
              news={
                filteredNewsData.find(
                  (news) => news.id === selectedNewsId
                ) as NewsItem
              }
              allNews={filteredNewsData}
              onClose={() => setSelectedNewsId(null)}
              onNewsClick={setSelectedNewsId}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
