'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import type { ProductDetail } from '@/lib/products-data';
import { normalizeSpecKey } from '@/lib/products-i18n';
import { formatEUR } from '@/lib/products-format';
import { Skeleton } from '@/components/products-ui/skeleton';
import {
  Check,
  ChevronRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
} from 'lucide-react';
import { motion } from 'framer-motion';
import '@/components/css/Products.css';

export default function ProductDetail({ product }: { product: ProductDetail }) {
  const { t, i18n } = useTranslation();
  const tSpec = (name: string) => t(`product_specs.${normalizeSpecKey(name)}`, { defaultValue: name });
  const [variantId, setVariantId] = useState<string | null>(null);
  const [localizedDesc, setLocalizedDesc] = useState(product.description_html);

  useEffect(() => {
    const lang = (i18n.language ?? 'pt').split('-')[0];
    if (lang === 'pt' || !product.description_html) return;
    const bp = process.env.BASE_PATH || '';
    fetch(`${bp}/product-descriptions/${lang}.json`)
      .then(r => r.ok ? r.json() : null)
      .then((data: Record<string, string> | null) => {
        setLocalizedDesc(data?.[product.handle] ?? product.description_html);
      })
      .catch(() => {});
  }, [i18n.language, product.handle]);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<'desc' | 'specs' | 'ship'>('desc');

  const variants = (product.product_variants ?? []) as any[];
  const images = (product.product_images ?? []) as any[];
  const selectedVariant = variants.find((v) => v.id === variantId) ?? variants[0];
  const mainImg = images[activeImage]?.url ?? product.featured_image;

  const specList: { label: string; value: string }[] = [];
  if (product.vendor) specList.push({ label: t('products_page.spec_manufacturer'), value: product.vendor });
  if (product.product_type) specList.push({ label: t('products_page.spec_product_type'), value: product.product_type });
  if (selectedVariant?.sku) specList.push({ label: t('products_page.spec_sku'), value: selectedVariant.sku });
  if (selectedVariant?.weight_g) {
    const weightKg = selectedVariant.weight_g / 1000;
    specList.push({ label: t('products_page.spec_weight'), value: `${weightKg.toFixed(2)} kg (${selectedVariant.weight_g} g)` });
  }
  if (product.specs) {
    Object.entries(product.specs).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        specList.push({ label: tSpec(key), value: values.map(v => tSpec(String(v))).join(', ') });
      }
    });
  }

  return (
    <div className="products-page min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="flex items-center gap-1.5 text-xs text-zinc-400 mb-6">
          <Link href="/" className="hover:text-purple-400">{t('products_page.breadcrumb_home')}</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="hover:text-purple-400">{t('products_page.breadcrumb_products')}</Link>
          {product.product_type && (
            <>
              <ChevronRight className="h-3 w-3" />
              <span>{tSpec(product.product_type)}</span>
            </>
          )}
          <ChevronRight className="h-3 w-3" />
          <span className="text-white truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12">
          <motion.div
            className="lg:sticky lg:top-32 lg:self-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-zinc-900/50 border border-white/10 rounded-xl overflow-hidden aspect-square flex items-center justify-center group mb-4 relative">
              <div className="absolute inset-0 bg-black/40 z-0" />
              {mainImg ? (
                <img
                  src={mainImg}
                  alt={product.title}
                  className="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-105 relative z-10"
                />
              ) : (
                <span className="text-zinc-600 text-sm relative z-10">{t('products_page.no_image')}</span>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-6 gap-2 mt-3">
                {images.map((img: any, i: number) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square border rounded-lg overflow-hidden transition-all p-0 ${
                      i === activeImage
                        ? 'border-purple-500 ring-2 ring-purple-500/30'
                        : 'border-white/5 hover:border-purple-500/50'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-contain p-1.5 bg-black/60 relative z-10" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 lg:p-8">
              <div className="relative z-10">
                <div className="flex items-center gap-2 flex-wrap">
                  {product.vendor && (
                    <span className="text-xs font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                      {product.vendor}
                    </span>
                  )}
                  {product.product_type && (
                    <span className="text-[11px] uppercase tracking-wide text-zinc-400">
                      {tSpec(product.product_type)}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mt-3 leading-tight text-white tracking-tight">{product.title}</h1>

                {selectedVariant?.sku && (
                  <div className="mt-2 text-xs text-zinc-500 font-mono">SKU: {selectedVariant.sku}</div>
                )}

                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-white">
                    {formatEUR(selectedVariant?.price_cents ?? 0)}
                  </span>
                  <span className="text-xs text-zinc-500 uppercase tracking-widest">{t('products_page.vat_included')}</span>
                </div>

                <div className="mt-3">
                  {selectedVariant?.available ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-500">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <Check className="h-4 w-4" /> {t('products_page.in_stock_label')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500">
                      <span className="h-2 w-2 rounded-full bg-red-500" /> {t('products_page.out_of_stock')}
                    </span>
                  )}
                </div>

                {variants.length > 1 && (
                  <div className="mt-6">
                    <label className="text-sm font-medium block mb-2">{t('products_page.variant')}</label>
                    <div className="grid gap-2">
                      {variants.map((v: any) => {
                        const active = v.id === (selectedVariant?.id);
                        return (
                          <button
                            key={v.id}
                            onClick={() => { setVariantId(v.id); setQty(1); }}
                            disabled={!v.available}
                            className={`text-left border rounded-lg px-4 py-3 transition-all flex items-center justify-between ${
                              active
                                ? 'border-purple-500 ring-2 ring-purple-500/20 bg-purple-500/10'
                                : 'hover:border-purple-500/50'
                            } ${!v.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <span className="text-sm font-medium">{v.title}</span>
                            <span className="text-sm font-semibold">{formatEUR(v.price_cents)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/5">
                  <TrustBadge
                    icon={<Truck className="h-4 w-4" />}
                    title={t('products_page.trust_free_shipping')}
                    desc={t('products_page.trust_free_shipping_desc')}
                  />
                  <TrustBadge
                    icon={<ShieldCheck className="h-4 w-4" />}
                    title={t('products_page.trust_secure_payment')}
                    desc={t('products_page.trust_secure_payment_desc')}
                  />
                  <TrustBadge
                    icon={<RotateCcw className="h-4 w-4" />}
                    title={t('products_page.trust_returns')}
                    desc={t('products_page.trust_returns_desc')}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {(product.description_html || specList.length > 0) && (
          <motion.div
            className="mt-10 bg-zinc-900/30 border border-white/5 rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex border-b border-white/5 overflow-x-auto">
              {product.description_html && (
                <button
                  onClick={() => setTab('desc')}
                  className={`px-6 py-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
                    tab === 'desc' ? 'text-purple-500' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t('products_page.tab_description')}
                  {tab === 'desc' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />}
                </button>
              )}
              {specList.length > 0 && (
                <button
                  onClick={() => setTab('specs')}
                  className={`px-6 py-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
                    tab === 'specs' ? 'text-purple-500' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t('products_page.tab_specs')}
                  {tab === 'specs' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />}
                </button>
              )}
              <button
                onClick={() => setTab('ship')}
                className={`px-6 py-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
                  tab === 'ship' ? 'text-purple-500' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {t('products_page.tab_shipping')}
                {tab === 'ship' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />}
              </button>
            </div>
            <div className="p-6 lg:p-8">
              {tab === 'desc' && localizedDesc && (
                <div
                  className="prose-product max-w-3xl text-zinc-300"
                  dangerouslySetInnerHTML={{ __html: localizedDesc }}
                />
              )}
              {tab === 'specs' && (
                <div className="max-w-3xl">
                  <div className="overflow-x-auto border border-white/5 rounded-lg bg-zinc-900/10">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/2">
                          <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-purple-400 w-1/3">
                            {t('products_page.spec_col_name')}
                          </th>
                          <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-purple-400">
                            {t('products_page.spec_col_detail')}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-zinc-300">
                        {specList.map((spec, i) => (
                          <tr key={i} className="hover:bg-white/1 transition-colors">
                            <td className="px-6 py-3.5 font-medium text-white/90">{spec.label}</td>
                            <td className="px-6 py-3.5 text-zinc-400 font-mono">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {tab === 'ship' && (
                <div className="max-w-3xl space-y-4 text-sm text-zinc-400">
                  <p>
                    <strong className="text-white">{t('products_page.shipping_title')}</strong> {t('products_page.shipping_desc')}
                  </p>
                  <p>
                    <strong className="text-white">{t('products_page.returns_title')}</strong> {t('products_page.returns_desc')}
                  </p>
                  <p>
                    <strong className="text-white">{t('products_page.warranty_title')}</strong> {t('products_page.warranty_desc')}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function TrustBadge({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="h-8 w-8 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold">{title}</div>
        <div className="text-[11px] text-zinc-500">{desc}</div>
      </div>
    </div>
  );
}
