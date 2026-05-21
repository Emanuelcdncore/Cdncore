"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ShoppingCart, Check, Truck, ShieldCheck, RotateCcw, Minus, Plus } from "lucide-react";
import { PRODUCTS, formatEUR, FREE_SHIPPING_THRESHOLD_CENTS } from "./mikrotikData";
import { useCart } from "./useCart";
import { Network } from "lucide-react";

/* ─── Header (shared style) ──────────────────────── */
function MikrotikHeader() {
  const { count } = useCart();
  return (
    <>
      <div className="bg-blue-600 text-white text-center text-xs py-2 px-4">
        Portes oferta em encomendas acima de 75&euro;
      </div>
      <header className="sticky top-0 z-[6000] bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900 hover:opacity-80 transition-opacity">
            <Network className="h-6 w-6 text-blue-600" />
            <span>OfficeLan</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
            <Link href="/mikrotik" className="text-blue-600">MikroTik</Link>
          </nav>
          <Link href="/mikrotik/cart" className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] rounded-full h-5 w-5 grid place-items-center font-semibold">
                {count}
              </span>
            )}
          </Link>
        </div>
      </header>
    </>
  );
}

/* ─── Footer ─────────────────────────────────────── */
function MikrotikFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 text-sm text-gray-500">
        <div>
          <div className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Network className="h-4 w-4 text-blue-600" /> OfficeLan
          </div>
          <p>Networking &amp; comunicações.</p>
        </div>
        <div>
          <div className="font-semibold text-gray-900 mb-2">Loja</div>
          <ul className="space-y-1">
            <li><Link href="/mikrotik" className="hover:text-blue-600 transition-colors">MikroTik</Link></li>
            <li><Link href="/mikrotik/cart" className="hover:text-blue-600 transition-colors">Carrinho</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-gray-900 mb-2">CDNCore</div>
          <ul className="space-y-1">
            <li><Link href="/" className="hover:text-blue-600 transition-colors">Website</Link></li>
            <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contacto</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 pb-6">
        &copy; {new Date().getFullYear()} OfficeLan
      </div>
    </footer>
  );
}

/* ─── Trust badge ────────────────────────────────── */
function TrustBadge({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold text-gray-900">{title}</div>
        <div className="text-[11px] text-gray-500">{desc}</div>
      </div>
    </div>
  );
}

/* ─── Product page ───────────────────────────────── */
export default function MikrotikProductPage({ handle }: { handle: string }) {
  const product = PRODUCTS.find((p) => p.handle === handle);
  const [qty, setQtyState] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  const [imgError, setImgError] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <MikrotikHeader />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Produto não encontrado</h1>
          <Link href="/mikrotik" className="text-blue-600 hover:underline mt-3 inline-block">
            Voltar para MikroTik
          </Link>
        </div>
        <MikrotikFooter />
      </div>
    );
  }

  const handleAdd = () => {
    add({
      handle: product.handle,
      title: product.title,
      image: product.featured_image,
      priceCents: product.min_price_cents,
    }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <MikrotikHeader />

      <div className="bg-gray-50 min-h-[calc(100vh-10rem)]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-blue-600">Início</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/mikrotik" className="hover:text-blue-600">MikroTik</Link>
            {product.product_type && (
              <>
                <ChevronRight className="h-3 w-3" />
                <span className="text-gray-500">{product.product_type}</span>
              </>
            )}
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-700 truncate max-w-[200px]">{product.title}</span>
          </nav>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12">
            {/* Image */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden aspect-square flex items-center justify-center group">
                {product.featured_image && !imgError ? (
                  <img
                    src={product.featured_image}
                    alt={product.title}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Sem imagem</span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {product.vendor}
                  </span>
                  {product.product_type && (
                    <span className="text-[11px] uppercase tracking-wide text-gray-400">
                      {product.product_type}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mt-3 leading-tight text-gray-900">
                  {product.title}
                </h1>

                {/* Price */}
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatEUR(product.min_price_cents)}
                  </span>
                  <span className="text-xs text-gray-400">IVA incluído</span>
                </div>

                {/* Stock */}
                <div className="mt-3">
                  {product.available ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <Check className="h-4 w-4" /> Em stock — envio rápido
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500">
                      <span className="h-2 w-2 rounded-full bg-red-500" /> Esgotado
                    </span>
                  )}
                </div>

                {/* Specs */}
                {Object.keys(product.specs).length > 0 && (
                  <div className="mt-6 space-y-1.5">
                    {Object.entries(product.specs).map(([key, vals]) => (
                      <div key={key} className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400 w-32 shrink-0">{key}</span>
                        <span className="text-gray-700">{vals.join(", ")}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Qty + CTA */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <div className="inline-flex items-center border border-gray-200 rounded-lg h-12">
                    <button
                      onClick={() => setQtyState((q) => Math.max(1, q - 1))}
                      className="h-full px-3 hover:bg-gray-50 rounded-l-lg text-gray-700"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-medium text-gray-900">{qty}</span>
                    <button
                      onClick={() => setQtyState((q) => q + 1)}
                      className="h-full px-3 hover:bg-gray-50 rounded-r-lg text-gray-700"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    disabled={!product.available}
                    onClick={handleAdd}
                    className={`flex-1 h-12 text-base font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${
                      product.available
                        ? added
                          ? "bg-green-600 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {added ? (
                      <><Check className="h-5 w-5" /> Adicionado!</>
                    ) : (
                      <><ShoppingCart className="h-5 w-5" /> Adicionar ao carrinho</>
                    )}
                  </button>
                </div>

                {/* Trust badges */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-gray-100">
                  <TrustBadge icon={<Truck className="h-4 w-4" />} title="Envio grátis" desc={`Acima de ${formatEUR(FREE_SHIPPING_THRESHOLD_CENTS)}`} />
                  <TrustBadge icon={<ShieldCheck className="h-4 w-4" />} title="Pagamento seguro" desc="SSL encriptado" />
                  <TrustBadge icon={<RotateCcw className="h-4 w-4" />} title="Devolução 14 dias" desc="Sem complicações" />
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4">
                  <span className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-4">
                    Descrição
                  </span>
                </div>
                <div className="p-6 text-sm text-gray-500 leading-relaxed">
                  {product.product_type === "Router" && (
                    <p>Router MikroTik de alto desempenho para redes empresariais. Compatível com RouterOS, com suporte a funcionalidades avançadas de routing, firewall e VPN.</p>
                  )}
                  {product.product_type === "Switch" && (
                    <p>Switch gerido MikroTik para infraestruturas de rede de alto desempenho. Suporta VLANs, MSTP, e gestão via WinBox ou WebFig.</p>
                  )}
                  {product.product_type === "Access Point" && (
                    <p>Access point MikroTik para cobertura wireless de alta performance em ambientes {product.specs["Ambiente"]?.join(" e ").toLowerCase() ?? "interior/exterior"}.</p>
                  )}
                  {!["Router", "Switch", "Access Point"].includes(product.product_type) && (
                    <p>Equipamento MikroTik de qualidade profissional para redes empresariais.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MikrotikFooter />
    </div>
  );
}
