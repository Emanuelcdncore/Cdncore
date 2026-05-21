"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { X, SlidersHorizontal, Network, ShoppingCart, ChevronDown, Search } from "lucide-react";
import { PRODUCTS, formatEUR, type Product } from "./mikrotikData";
import { useCart } from "./useCart";

const SPEC_GROUPS = [
  "Ambiente", "Portas de rede", "Portas SFP", "Portas SFP+",
  "Portas SFP28", "Portas QSFP+",
];

/* ─── Accordion item ─────────────────────────────── */
function AccordionItem({
  title, children, defaultOpen = false,
}: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-900 hover:text-gray-700"
      >
        {title}
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

/* ─── Switch ─────────────────────────────────────── */
function Switch({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full border-2 border-transparent transition-colors ${checked ? "bg-blue-600" : "bg-gray-200"}`}
    >
      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

/* ─── Checkbox ───────────────────────────────────── */
function Checkbox({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: () => void }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={onCheckedChange}
      className={`h-4 w-4 flex-shrink-0 rounded border flex items-center justify-center transition-colors ${checked ? "bg-blue-600 border-blue-600" : "border-gray-300 bg-white hover:border-blue-400"}`}
    >
      {checked && (
        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
}

/* ─── Dual price slider ──────────────────────────── */
function DualSlider({
  min, max, step, value: [lo, hi], onChange,
}: {
  min: number; max: number; step: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) {
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className="relative h-6 flex items-center select-none">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 bg-gray-200 rounded-full" />
      <div
        className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-blue-600 rounded-full pointer-events-none"
        style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
      />
      <input
        type="range" min={min} max={max} step={step} value={lo}
        onChange={(e) => onChange([Math.min(Number(e.target.value), hi - step), hi])}
        className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:shadow-sm"
        style={{ zIndex: lo > max - (max - min) / 10 ? 5 : 3 }}
      />
      <input
        type="range" min={min} max={max} step={step} value={hi}
        onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo + step)])}
        className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:shadow-sm"
        style={{ zIndex: 4 }}
      />
    </div>
  );
}

/* ─── Facet list ─────────────────────────────────── */
function FacetList({
  entries, selected, onToggle,
}: { entries: [string, number][]; selected: Set<string>; onToggle: (v: string) => void }) {
  return (
    <ul className="space-y-2 pt-1 max-h-64 overflow-y-auto pr-1">
      {entries.map(([value, count]) => (
        <li key={value}>
          <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 text-sm text-gray-700">
            <Checkbox checked={selected.has(value)} onCheckedChange={() => onToggle(value)} />
            <span className="flex-1 truncate">{value}</span>
            <span className="text-xs text-gray-400">({count})</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

/* ─── Mobile sheet ───────────────────────────────── */
function Sheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-[7000] bg-black/50" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 z-[7001] w-[300px] bg-white overflow-y-auto shadow-xl">
        {children}
      </div>
    </>
  );
}

/* ─── Header ─────────────────────────────────────── */
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

/* ─── Product card ───────────────────────────────── */
function ProductCard({ p }: { p: Product }) {
  const [imgError, setImgError] = useState(false);
  return (
    <Link
      href={`/mikrotik/${p.handle}`}
      className="group border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow duration-200 flex flex-col"
    >
      <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
        {p.featured_image && !imgError ? (
          <img
            src={p.featured_image}
            alt={p.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-gray-400 text-xs">Sem imagem</span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2">
        {p.product_type && (
          <div className="text-[10px] uppercase tracking-wide text-gray-400">{p.product_type}</div>
        )}
        <h3 className="font-medium text-sm text-gray-900 line-clamp-2 min-h-[2.5rem]">{p.title}</h3>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-semibold text-blue-600">{formatEUR(p.min_price_cents)}</span>
          {!p.available && <span className="text-[10px] text-red-500">Esgotado</span>}
        </div>
      </div>
    </Link>
  );
}

/* ─── Main page ──────────────────────────────────── */
export default function MikrotikPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("title-asc");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Map<string, Set<string>>>(new Map());
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { minPrice, maxPrice } = useMemo(() => {
    const prices = PRODUCTS.map((p) => p.min_price_cents).filter((n) => n > 0);
    return {
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 100000,
    };
  }, []);

  const effectivePriceRange: [number, number] = priceRange ?? [minPrice, maxPrice];

  const facets = useMemo(() => {
    const vendors = new Map<string, number>();
    const groups = new Map<string, Map<string, number>>();
    for (const g of SPEC_GROUPS) groups.set(g, new Map());
    for (const p of PRODUCTS) {
      vendors.set(p.vendor, (vendors.get(p.vendor) ?? 0) + 1);
      for (const g of SPEC_GROUPS) {
        const vals = p.specs[g];
        if (!vals) continue;
        const m = groups.get(g)!;
        for (const v of vals) m.set(v, (m.get(v) ?? 0) + 1);
      }
    }
    return { vendors, groups };
  }, []);

  const items = useMemo(() => {
    let list = PRODUCTS;
    if (search) list = list.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    if (inStockOnly) list = list.filter((p) => p.available);
    if (selectedVendors.size) list = list.filter((p) => selectedVendors.has(p.vendor));
    if (priceRange) list = list.filter((p) => p.min_price_cents >= priceRange[0] && p.min_price_cents <= priceRange[1]);
    if (selectedTags.size) {
      list = list.filter((p) => {
        for (const [key, values] of selectedTags) {
          if (!values.size) continue;
          const prodVals = p.specs[key] ?? [];
          if (!prodVals.some((v) => values.has(v))) return false;
        }
        return true;
      });
    }
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.min_price_cents - b.min_price_cents;
      if (sort === "price-desc") return b.min_price_cents - a.min_price_cents;
      if (sort === "title-desc") return b.title.localeCompare(a.title);
      return a.title.localeCompare(b.title);
    });
    return list;
  }, [search, sort, inStockOnly, selectedVendors, selectedTags, priceRange]);

  const toggleVendor = (v: string) =>
    setSelectedVendors((prev) => { const n = new Set(prev); n.has(v) ? n.delete(v) : n.add(v); return n; });

  const toggleTag = (label: string, value: string) =>
    setSelectedTags((prev) => {
      const n = new Map(prev);
      const s = new Set(n.get(label) ?? []);
      s.has(value) ? s.delete(value) : s.add(value);
      n.set(label, s);
      return n;
    });

  const activeFilterCount =
    (inStockOnly ? 1 : 0) + selectedVendors.size + (priceRange ? 1 : 0) +
    Array.from(selectedTags.values()).reduce((n, s) => n + s.size, 0);

  const clearAll = () => {
    setInStockOnly(false);
    setSelectedVendors(new Set());
    setSelectedTags(new Map());
    setPriceRange(null);
  };

  const groupsWithValues = SPEC_GROUPS.filter((g) => (facets.groups.get(g)?.size ?? 0) > 0);

  const sidebar = (
    <div className="text-sm">
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
          <span className="text-xs text-gray-500">{activeFilterCount} filtro{activeFilterCount !== 1 ? "s" : ""} ativo{activeFilterCount !== 1 ? "s" : ""}</span>
          <button onClick={clearAll} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 h-7 px-2 rounded hover:bg-gray-100">
            <X className="h-3 w-3" /> Limpar
          </button>
        </div>
      )}

      <AccordionItem title="Disponibilidade" defaultOpen>
        <label className="flex items-center justify-between pb-2 cursor-pointer text-sm text-gray-700">
          <span>Em stock</span>
          <Switch checked={inStockOnly} onCheckedChange={setInStockOnly} />
        </label>
      </AccordionItem>

      <AccordionItem title="Preço" defaultOpen>
        <div className="space-y-3 pt-1">
          <p className="text-xs text-gray-500">O preço mais alto é {formatEUR(maxPrice)}</p>
          <DualSlider min={minPrice} max={maxPrice} step={100} value={effectivePriceRange} onChange={setPriceRange} />
          <div className="flex items-center justify-between text-xs">
            <span className="border border-gray-200 rounded px-2 py-1 text-gray-700">{formatEUR(effectivePriceRange[0])}</span>
            <span className="text-gray-400">—</span>
            <span className="border border-gray-200 rounded px-2 py-1 text-gray-700">{formatEUR(effectivePriceRange[1])}</span>
          </div>
        </div>
      </AccordionItem>

      {facets.vendors.size > 0 && (
        <AccordionItem title="Marca" defaultOpen>
          <FacetList entries={Array.from(facets.vendors.entries())} selected={selectedVendors} onToggle={toggleVendor} />
        </AccordionItem>
      )}

      {groupsWithValues.map((g) => {
        const entries = Array.from(facets.groups.get(g)!.entries()).sort((a, b) =>
          a[0].localeCompare(b[0], undefined, { numeric: true })
        );
        const selected = selectedTags.get(g) ?? new Set<string>();
        return (
          <AccordionItem key={g} title={g} defaultOpen={selected.size > 0}>
            <FacetList entries={entries} selected={selected} onToggle={(v) => toggleTag(g, v)} />
          </AccordionItem>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <MikrotikHeader />

      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Filtros</h2>
            <button onClick={() => setSheetOpen(false)} className="text-gray-400 hover:text-gray-900">
              <X className="h-5 w-5" />
            </button>
          </div>
          {sidebar}
        </div>
      </Sheet>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">MikroTik</h1>
          <p className="text-gray-500 mt-1">{items.length} produto{items.length !== 1 ? "s" : ""}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          <aside className="hidden lg:block">{sidebar}</aside>

          <div>
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <button
                onClick={() => setSheetOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 border border-gray-200 rounded-md px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
                {activeFilterCount > 0 && (
                  <span className="ml-1 bg-blue-600 text-white rounded-full text-xs px-2 py-0.5">{activeFilterCount}</span>
                )}
              </button>

              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar produtos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-gray-200 rounded-md pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-56"
              >
                <option value="title-asc">Nome A-Z</option>
                <option value="title-desc">Nome Z-A</option>
                <option value="price-asc">Preço crescente</option>
                <option value="price-desc">Preço decrescente</option>
              </select>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-16 border border-gray-200 rounded-lg bg-white">
                <p className="text-gray-500">Nenhum produto corresponde aos filtros.</p>
                <button onClick={clearAll} className="mt-3 text-blue-600 hover:text-blue-700 text-sm underline underline-offset-2">
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((p) => <ProductCard key={p.id} p={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      <MikrotikFooter />
    </div>
  );
}
