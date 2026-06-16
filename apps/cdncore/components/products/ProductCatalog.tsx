'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { ProductListItem } from '@/lib/products-data';
import { ProductCard } from './ProductCard';
import { Input } from '@/components/products-ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/products-ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/products-ui/accordion';
import { Checkbox } from '@/components/products-ui/checkbox';
import { Switch } from '@/components/products-ui/switch';
import { Slider } from '@/components/products-ui/slider';
import { Button } from '@/components/products-ui/button';
import { formatEUR } from '@/lib/products-format';
import { X, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/products-ui/sheet';
import { SPEC_GROUPS } from '@/lib/products-specs';
import { normalizeSpecKey } from '@/lib/products-i18n';
import '@/components/css/Products.css';

type Facets = {
  vendors: Map<string, number>;
  groups: Map<string, Map<string, number>>;
};

function buildFacets(items: ProductListItem[]): Facets {
  const vendors = new Map<string, number>();
  const groups = new Map<string, Map<string, number>>();
  for (const g of SPEC_GROUPS) groups.set(g.key, new Map());
  for (const p of items) {
    if (p.vendor) vendors.set(p.vendor, (vendors.get(p.vendor) ?? 0) + 1);
    for (const g of SPEC_GROUPS) {
      const vals = p.specs?.[g.key];
      if (!vals) continue;
      const m = groups.get(g.key)!;
      for (const v of vals) m.set(v, (m.get(v) ?? 0) + 1);
    }
  }
  return { vendors, groups };
}

export default function ProductCatalog({ products }: { products: ProductListItem[] }) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('title-asc');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Map<string, Set<string>>>(new Map());
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    setLimit(20);
  }, [search, sort, inStockOnly, selectedVendors, selectedTags, priceRange]);

  const all = products;

  const { minPrice, maxPrice } = useMemo(() => {
    const prices = all.map((p) => p.min_price_cents).filter((n) => n > 0);
    return {
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 100000,
    };
  }, [all]);

  const effectivePrice = priceRange ?? [minPrice, maxPrice];

  const facets = useMemo(() => buildFacets(all), [all]);

  const items = useMemo(() => {
    let list = all;
    if (search) list = list.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    if (inStockOnly) list = list.filter((p) => p.available);
    if (selectedVendors.size) list = list.filter((p) => p.vendor && selectedVendors.has(p.vendor));
    if (priceRange)
      list = list.filter((p) => p.min_price_cents >= priceRange[0] && p.min_price_cents <= priceRange[1]);
    if (selectedTags.size) {
      list = list.filter((p) => {
        for (const [key, values] of selectedTags) {
          if (!values.size) continue;
          const prodVals = p.specs?.[key] ?? [];
          const matched = prodVals.some((v) => values.has(v));
          if (!matched) return false;
        }
        return true;
      });
    }
    list = [...list].sort((a, b) => {
      if (sort === 'price-asc') return a.min_price_cents - b.min_price_cents;
      if (sort === 'price-desc') return b.min_price_cents - a.min_price_cents;
      if (sort === 'title-desc') return b.title.localeCompare(a.title);
      return a.title.localeCompare(b.title);
    });
    return list;
  }, [all, search, sort, inStockOnly, selectedVendors, selectedTags, priceRange]);

  const toggleVendor = (v: string) =>
    setSelectedVendors((prev) => {
      const next = new Set(prev);
      next.has(v) ? next.delete(v) : next.add(v);
      return next;
    });

  const toggleTag = (label: string, value: string) =>
    setSelectedTags((prev) => {
      const next = new Map(prev);
      const set = new Set(next.get(label) ?? []);
      set.has(value) ? set.delete(value) : set.add(value);
      next.set(label, set);
      return next;
    });

  const activeFilterCount =
    (inStockOnly ? 1 : 0) +
    selectedVendors.size +
    (priceRange ? 1 : 0) +
    Array.from(selectedTags.values()).reduce((n, s) => n + s.size, 0);

  const clearAll = () => {
    setInStockOnly(false);
    setSelectedVendors(new Set());
    setSelectedTags(new Map());
    setPriceRange(null);
  };

  const sidebar = (
    <FilterSidebar
      facets={facets}
      inStockOnly={inStockOnly}
      setInStockOnly={setInStockOnly}
      selectedVendors={selectedVendors}
      toggleVendor={toggleVendor}
      selectedTags={selectedTags}
      toggleTag={toggleTag}
      minPrice={minPrice}
      maxPrice={maxPrice}
      priceRange={effectivePrice}
      setPriceRange={setPriceRange}
      activeFilterCount={activeFilterCount}
      clearAll={clearAll}
    />
  );

  return (
    <div className="products-page min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 pt-28">
        <div className="mb-10">
          <h1 className="products-depot-font text-4xl md:text-5xl font-semibold text-white mt-3 tracking-tight">{t('products_page.title')}</h1>
          <p className="text-muted-foreground mt-2 text-sm">{t('products_page.count', { count: items.length })}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          <aside className="hidden lg:block">{sidebar}</aside>
          <div>
            <div className="flex flex-col md:flex-row gap-3 mb-8">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" /> {t('products_page.filters_btn')}
                    {activeFilterCount > 0 && (
                      <span className="ml-2 bg-primary text-primary-foreground rounded-full text-xs px-2 py-0.5">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>{t('products_page.filters_btn')}</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">{sidebar}</div>
                </SheetContent>
              </Sheet>
              <Input
                placeholder={t('products_page.search_placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="md:max-w-sm bg-white/[0.03] border-white/10"
              />
              <div className="md:ml-auto">
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="md:w-56 bg-white/[0.03] border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title-asc">{t('products_page.sort_title_asc')}</SelectItem>
                    <SelectItem value="title-desc">{t('products_page.sort_title_desc')}</SelectItem>
                    <SelectItem value="price-asc">{t('products_page.sort_price_asc')}</SelectItem>
                    <SelectItem value="price-desc">{t('products_page.sort_price_desc')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {items.length === 0 ? (
              <div className="text-center py-16 border border-white/10 rounded-xl bg-white/[0.02]">
                <p className="text-muted-foreground">{t('products_page.no_products')}</p>
                <Button variant="link" onClick={clearAll}>{t('products_page.clear_filters')}</Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {items.slice(0, limit).map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
                </div>
                {limit < items.length && (
                  <div className="mt-14 flex justify-center">
                    <button onClick={() => setLimit(limit + 20)} className="btn-violet">
                      {t('products_page.load_more')}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSidebar(props: {
  facets: Facets;
  inStockOnly: boolean;
  setInStockOnly: (v: boolean) => void;
  selectedVendors: Set<string>;
  toggleVendor: (v: string) => void;
  selectedTags: Map<string, Set<string>>;
  toggleTag: (label: string, value: string) => void;
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  setPriceRange: (r: [number, number] | null) => void;
  activeFilterCount: number;
  clearAll: () => void;
}) {
  const { t } = useTranslation();
  const {
    facets, inStockOnly, setInStockOnly, selectedVendors, toggleVendor,
    selectedTags, toggleTag, minPrice, maxPrice, priceRange, setPriceRange,
    activeFilterCount, clearAll,
  } = props;

  const groupsWithValues = SPEC_GROUPS.filter((g) => (facets.groups.get(g.key)?.size ?? 0) > 0);
  const defaultOpen = ['availability', 'price', 'vendor'];
  for (const [key, values] of selectedTags) {
    if (values.size) defaultOpen.push(`tag-${key}`);
  }

  return (
    <div className="text-sm">
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between mb-3 pb-3 border-b">
          <span className="text-xs text-muted-foreground">{t('products_page.active_filters', { count: activeFilterCount })}</span>
          <Button variant="ghost" size="sm" onClick={clearAll} className="h-7 text-xs">
            <X className="h-3 w-3 mr-1" /> {t('products_page.clear')}
          </Button>
        </div>
      )}

      <Accordion type="multiple" defaultValue={defaultOpen} className="w-full">
        <AccordionItem value="availability">
          <AccordionTrigger className="text-sm font-semibold py-3">{t('products_page.availability')}</AccordionTrigger>
          <AccordionContent>
            <label className="flex items-center justify-between pb-2 cursor-pointer">
              <span>{t('products_page.in_stock')}</span>
              <Switch checked={inStockOnly} onCheckedChange={setInStockOnly} />
            </label>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>{t('products_page.price')}</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2 px-2">
              <Slider
                min={minPrice}
                max={maxPrice}
                step={100}
                value={priceRange}
                onValueChange={(val) => setPriceRange(val as [number, number])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-4">
                <span>{formatEUR(priceRange[0])}</span>
                <span>{formatEUR(priceRange[1])}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">{t('products_page.max_price')} {formatEUR(maxPrice)}</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {facets.vendors.size > 0 && (
          <AccordionItem value="brand">
            <AccordionTrigger>{t('products_page.brand')}</AccordionTrigger>
            <AccordionContent>
              <FacetList
                entries={Array.from(facets.vendors.entries())}
                selected={selectedVendors}
                onToggle={toggleVendor}
              />
            </AccordionContent>
          </AccordionItem>
        )}

        {groupsWithValues.map((g) => {
          const entries = Array.from(facets.groups.get(g.key)!.entries()).sort((a, b) =>
            a[0].localeCompare(b[0], undefined, { numeric: true })
          );
          const selected = selectedTags.get(g.key) ?? new Set<string>();
          return (
            <AccordionItem key={g.key} value={`tag-${g.key}`}>
              <AccordionTrigger className="text-sm font-semibold py-3">
                {t(`product_specs.${normalizeSpecKey(g.key)}`, { defaultValue: g.key })}
              </AccordionTrigger>
              <AccordionContent>
                <FacetList
                  entries={entries}
                  selected={selected}
                  onToggle={(v) => toggleTag(g.key, v)}
                  translateLabel
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

function FacetList({
  entries, selected, onToggle, translateLabel = false,
}: {
  entries: [string, number][];
  selected: Set<string>;
  onToggle: (v: string) => void;
  translateLabel?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <ul className="space-y-2 pt-1 max-h-64 overflow-y-auto pr-1">
      {entries.map(([value, count]) => (
        <li key={value}>
          <label className="flex items-center gap-2 cursor-pointer hover:text-primary">
            <Checkbox
              checked={selected.has(value)}
              onCheckedChange={() => onToggle(value)}
            />
            <span className="flex-1 truncate">
              {translateLabel
                ? t(`product_specs.${normalizeSpecKey(value)}`, { defaultValue: value })
                : value}
            </span>
            <span className="text-xs text-muted-foreground">({count})</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
