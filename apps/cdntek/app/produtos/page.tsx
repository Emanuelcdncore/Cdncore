"use client";

import Footer from "@/components/Footer";
import MapSection from "@/components/MapSection";
import { useEffect, useMemo, useState, useRef } from "react";
import { Heart, Search } from "lucide-react";
import Image from "next/image";
import {
  CATEGORIES,
  demoProducts,
  type Product,
  type Category,
} from "@/data/productsData";

const ITEMS_PER_PAGE = 20;

const bp = process.env.BASE_PATH || '';

export default function Products() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [allCategories] = useState<Category[]>(CATEGORIES);
  const [allProducts] = useState<Product[]>(demoProducts);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].name);
  const [page, setPage] = useState(1);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [favorites, setFavorites] = useState<Set<string | number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (productId: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const filteredProducts = useMemo(() => {
    const isMainCategory = allCategories.some(
      (cat) => cat.name === selectedCategory
    );

    let products: any[];

    if (isMainCategory) {
      const categoryData = allCategories.find(
        (cat) => cat.name === selectedCategory
      );

      if (categoryData?.subcategories && categoryData.subcategories.length > 0) {
        products = categoryData.subcategories.map((subcategory, index) => {
          const repProduct = allProducts.find(
            (p) =>
              p.category.trim() === selectedCategory.trim() &&
              p.subcategory.trim() === subcategory.trim()
          );
          return {
            id: 900000 + index,
            title: subcategory,
            model: subcategory,
            category: selectedCategory,
            subcategory: subcategory,
            image: repProduct?.image || `${bp}/uploads/1765985911695-360504175.jpg`,
            isSubcategoryCard: true,
            _instanceId: `subcat-${index}`,
          };
        });
      } else {
        products = allProducts.filter(
          (product) => product.category.trim() === selectedCategory.trim()
        );
      }
    } else {
      products = allProducts.filter(
        (product) => product.subcategory.trim() === selectedCategory.trim()
      );
    }

    // Apply search filter
    if (searchTerm) {
      products = products.filter(
        (p: any) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return products;
  }, [selectedCategory, allCategories, allProducts, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  );
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const productsSection = document.getElementById("produtos");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedCategory]);

  return (
    <div className="bg-black min-h-screen text-white">
      <style>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
      `}</style>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={`${bp}/display.jpg`}
              alt="Tecnologia profissional CDNTEK"
              fill
              unoptimized
              className="object-cover object-center brightness-110 contrast-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(22,163,74,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(22,163,74,0.3) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
                animation: "gridMove 15s linear infinite",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(22,163,74,0.15)_0%,_transparent_50%)] animate-pulse" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10 w-full px-6 pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div
                className={`space-y-6 -mt-8 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/40 rounded-full backdrop-blur-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(22,163,74,1)]" />
                  <span className="text-sm font-semibold text-green-400 uppercase tracking-wider">
                    Solu\u00e7\u00f5es Profissionais
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Produtos
                  <br />
                  <span className="text-gradient">Profissionais</span>
                </h1>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg">
                  Descubra a nossa gama completa de produtos de tecnologia
                  audiovisual, seguran\u00e7a e comunica\u00e7\u00e3o profissional.
                </p>
                <a
                  href="#produtos"
                  className="inline-block px-10 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-all duration-300 text-base uppercase tracking-wide shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)]"
                >
                  Ver Produtos
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="produtos" className="py-20 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
              {/* Sidebar - Categories */}
              <div className="space-y-2">
                <h3 className="text-green-500 text-sm font-bold uppercase tracking-wider mb-4">
                  Categorias
                </h3>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Pesquisar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-zinc-900/50 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>

                <div className="space-y-1 max-h-[600px] overflow-y-auto pr-2">
                  {allCategories.map((cat) => (
                    <div key={cat.name}>
                      <button
                        onClick={() => {
                          setSelectedCategory(cat.name);
                          if (
                            cat.subcategories &&
                            cat.subcategories.length > 0
                          ) {
                            toggleCategory(cat.name);
                          }
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          selectedCategory === cat.name
                            ? "bg-green-600/20 text-green-400 border border-green-600/50"
                            : "text-gray-400 hover:text-white hover:bg-zinc-800/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{cat.name}</span>
                          {cat.subcategories &&
                            cat.subcategories.length > 0 && (
                              <span className="text-xs text-gray-500">
                                {expandedCategories.has(cat.name)
                                  ? "\u25B2"
                                  : "\u25BC"}
                              </span>
                            )}
                        </div>
                      </button>

                      {/* Subcategories */}
                      {expandedCategories.has(cat.name) &&
                        cat.subcategories && (
                          <div className="ml-4 mt-1 space-y-1">
                            {cat.subcategories.map((sub) => (
                              <button
                                key={sub}
                                onClick={() => setSelectedCategory(sub)}
                                className={`w-full text-left px-3 py-1.5 rounded text-xs transition-all ${
                                  selectedCategory === sub
                                    ? "text-green-400 bg-green-600/10"
                                    : "text-gray-500 hover:text-white"
                                }`}
                              >
                                {sub}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Products Grid */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">{selectedCategory}</h2>
                  <span className="text-sm text-gray-400">
                    {filteredProducts.length} produto
                    {filteredProducts.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {paginatedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedProducts.map((product: any) => (
                      <div
                        key={product._instanceId || product.id}
                        className="group bg-zinc-900/50 border border-white/5 rounded-lg overflow-hidden hover:border-green-500/50 transition-all duration-300 cursor-pointer"
                        onClick={() => {
                          if (product.isSubcategoryCard) {
                            setSelectedCategory(product.subcategory);
                          }
                        }}
                      >
                        <div className="aspect-square overflow-hidden bg-black relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.image?.startsWith('/') ? `${bp}${product.image}` : product.image}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          {!product.isSubcategoryCard && (
                            <button
                              onClick={(e) => toggleFavorite(product.id, e)}
                              className="absolute top-3 right-3 p-2 bg-black/50 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors"
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  favorites.has(product.id)
                                    ? "fill-red-500 text-red-500"
                                    : "text-white"
                                }`}
                              />
                            </button>
                          )}

                          {product.isSubcategoryCard && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                              <span className="text-white font-semibold text-sm">
                                Ver subcategoria
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <h3 className="text-white text-sm font-semibold group-hover:text-green-400 transition-colors line-clamp-2">
                            {product.title}
                          </h3>
                          {!product.isSubcategoryCard && (
                            <p className="text-gray-500 text-xs mt-1">
                              {product.model}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-gray-400 text-lg">
                      Nenhum produto encontrado
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Tente selecionar outra categoria
                    </p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 bg-zinc-900/50 border border-white/10 rounded-lg text-sm disabled:opacity-50 hover:border-green-500/50 transition-colors"
                    >
                      Anterior
                    </button>
                    <span className="text-sm text-gray-400">
                      {page} / {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 bg-zinc-900/50 border border-white/10 rounded-lg text-sm disabled:opacity-50 hover:border-green-500/50 transition-colors"
                    >
                      Seguinte
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="w-full"
            style={{
              height: "2px",
              background: "#18491e",
              marginBottom: "40px",
            }}
          />
          <MapSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
