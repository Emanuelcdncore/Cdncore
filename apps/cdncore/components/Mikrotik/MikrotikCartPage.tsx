"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingCart, Network } from "lucide-react";
import { useCart } from "./useCart";
import { formatEUR, shippingFor, FREE_SHIPPING_THRESHOLD_CENTS } from "./mikrotikData";

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
            <Link href="/mikrotik" className="text-gray-600 hover:text-gray-900 transition-colors">MikroTik</Link>
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

export default function MikrotikCartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  const shipping = shippingFor(subtotal);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <MikrotikHeader />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <ShoppingCart className="h-16 w-16 text-gray-200 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">O seu carrinho está vazio</h1>
          <p className="text-gray-500 mt-2">Adicione produtos do catálogo para começar.</p>
          <Link
            href="/mikrotik"
            className="mt-6 inline-block bg-blue-600 text-white px-5 py-2.5 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Ver produtos
          </Link>
        </div>
        <MikrotikFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <MikrotikHeader />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Carrinho</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Items */}
          <div className="md:col-span-2 space-y-3">
            {items.map((item) => (
              <div key={item.handle} className="flex gap-4 border border-gray-200 rounded-lg p-4 bg-white">
                <div className="w-20 h-20 bg-gray-50 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain p-1" />
                  ) : (
                    <Network className="h-8 w-8 text-gray-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/mikrotik/${item.handle}`} className="font-medium text-gray-900 hover:text-blue-600 line-clamp-2 text-sm">
                    {item.title}
                  </Link>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => setQty(item.handle, item.quantity - 1)}
                      className="h-7 w-7 border border-gray-200 rounded grid place-items-center hover:bg-gray-50 text-gray-600"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => setQty(item.handle, item.quantity + 1)}
                      className="h-7 w-7 border border-gray-200 rounded grid place-items-center hover:bg-gray-50 text-gray-600"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <div className="font-semibold text-gray-900">{formatEUR(item.priceCents * item.quantity)}</div>
                  <button onClick={() => remove(item.handle)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border border-gray-200 rounded-lg p-5 h-fit bg-white">
            <h2 className="font-semibold text-gray-900 mb-4">Resumo</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatEUR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Portes</span>
                <span>{shipping === 0 ? "Grátis" : formatEUR(shipping)}</span>
              </div>
              {shipping > 0 && (
                <div className="text-xs text-gray-400">
                  Faltam {formatEUR(FREE_SHIPPING_THRESHOLD_CENTS - subtotal)} para portes grátis
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-base text-gray-900">
                <span>Total</span>
                <span>{formatEUR(subtotal + shipping)}</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-colors text-sm"
                onClick={() => alert("Checkout — a implementar pelo Henrique")}
              >
                Finalizar encomenda
              </button>
              <Link
                href="/mikrotik"
                className="w-full block text-center text-sm text-gray-500 hover:text-gray-900 transition-colors py-2"
              >
                Continuar a comprar
              </Link>
            </div>
          </div>
        </div>
      </div>

      <MikrotikFooter />
    </div>
  );
}
