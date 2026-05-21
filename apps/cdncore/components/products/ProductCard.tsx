'use client';

import Link from 'next/link';
import { formatEUR } from '@/lib/products-format';
import type { ProductListItem } from '@/lib/products-data';
import { ArrowUpRight } from 'lucide-react';

const ANIMATE_STAGGER_MAX = 12;

export function ProductCard({ p, index, animate = true }: { p: ProductListItem; index: number; animate?: boolean }) {
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const animateClass = animate ? 'product-card-animate' : '';
  const delay = animate && index < ANIMATE_STAGGER_MAX ? { animationDelay: `${index * 0.04}s` } : undefined;

  return (
    <Link
      href={`/products/${p.handle}`}
      onMouseMove={onMove}
      className={`product-card group ${animateClass}`}
      style={delay}
    >
      <div className="aspect-square rounded-lg bg-[rgba(10,6,16,0.6)] border border-white/5 flex items-center justify-center overflow-hidden mb-4 relative">
        {p.featured_image ? (
          <img
            src={p.featured_image}
            alt={p.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <span className="text-zinc-600 text-xs">Sem imagem</span>
        )}
        <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-violet-500/90 text-white flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-violet-900/50">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2 relative">
        {p.product_type && (
          <div className="text-[10px] uppercase tracking-[0.18em] text-violet-300/80 font-semibold">
            {p.product_type}
          </div>
        )}
        <h3 className="products-depot-font font-medium text-[0.95rem] text-zinc-100 line-clamp-2 min-h-[2.6rem] leading-snug group-hover:text-white transition-colors">
          {p.title}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
          <span className="products-depot-font font-semibold text-white tracking-wide">
            {formatEUR(p.min_price_cents)}
          </span>
          {!p.available ? (
            <span className="text-[10px] bg-red-500/10 text-red-300 px-2 py-0.5 rounded-full border border-red-500/20">
              Esgotado
            </span>
          ) : (
            <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Em stock
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
