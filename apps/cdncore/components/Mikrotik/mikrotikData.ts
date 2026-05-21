export type Product = {
  id: string;
  handle: string;
  title: string;
  product_type: string;
  vendor: string;
  min_price_cents: number;
  available: boolean;
  featured_image: string | null;
  specs: Record<string, string[]>;
};

export const PRODUCTS: Product[] = [
  {
    id: "1", handle: "hex-s", title: "MikroTik hEX S (RB760iGS)",
    product_type: "Router", vendor: "MikroTik",
    min_price_cents: 7900, available: true,
    featured_image: "https://cdn.mikrotik.com/web-assets/rb_images/1539_lg.webp",
    specs: { "Portas de rede": ["5"], "Portas SFP": ["1"], "Ambiente": ["Interior"] },
  },
  {
    id: "2", handle: "hap-ac3", title: "MikroTik hAP ac³",
    product_type: "Access Point", vendor: "MikroTik",
    min_price_cents: 9900, available: true,
    featured_image: "https://cdn.mikrotik.com/web-assets/rb_images/1975_lg.webp",
    specs: { "Portas de rede": ["5"], "Ambiente": ["Interior"] },
  },
  {
    id: "3", handle: "rb5009", title: "MikroTik RB5009UG+S+IN",
    product_type: "Router", vendor: "MikroTik",
    min_price_cents: 18900, available: true,
    featured_image: "https://cdn.mikrotik.com/web-assets/rb_images/2065_lg.webp",
    specs: { "Portas de rede": ["8"], "Portas SFP+": ["1"], "Ambiente": ["Interior"] },
  },
  {
    id: "4", handle: "crs326", title: "MikroTik CRS326-24G-2S+IN",
    product_type: "Switch", vendor: "MikroTik",
    min_price_cents: 18900, available: true,
    featured_image: "https://cdn.mikrotik.com/web-assets/rb_images/1938_lg.webp",
    specs: { "Portas de rede": ["24"], "Portas SFP+": ["2"], "Ambiente": ["Interior"] },
  },
  {
    id: "5", handle: "crs317", title: "MikroTik CRS317-1G-16S+RM",
    product_type: "Switch", vendor: "MikroTik",
    min_price_cents: 39500, available: true,
    featured_image: null,
    specs: { "Portas de rede": ["1"], "Portas SFP+": ["16"], "Ambiente": ["Interior"] },
  },
  {
    id: "6", handle: "ccr2004", title: "MikroTik CCR2004-1G-12S+2XS",
    product_type: "Router", vendor: "MikroTik",
    min_price_cents: 89500, available: true,
    featured_image: null,
    specs: { "Portas de rede": ["1"], "Portas SFP+": ["12"], "Portas SFP28": ["2"], "Ambiente": ["Interior"] },
  },
  {
    id: "7", handle: "wap-ac", title: "MikroTik wAP ac",
    product_type: "Access Point", vendor: "MikroTik",
    min_price_cents: 6900, available: true,
    featured_image: "https://cdn.mikrotik.com/web-assets/rb_images/1988_lg.webp",
    specs: { "Portas de rede": ["2"], "Ambiente": ["Exterior", "Interior"] },
  },
  {
    id: "8", handle: "lhg-hp5", title: "MikroTik LHG HP5",
    product_type: "Access Point", vendor: "MikroTik",
    min_price_cents: 8900, available: false,
    featured_image: null,
    specs: { "Portas de rede": ["1"], "Ambiente": ["Exterior"] },
  },
  {
    id: "9", handle: "sxtsq-5-ac", title: "MikroTik SXTsq 5 ac",
    product_type: "Access Point", vendor: "MikroTik",
    min_price_cents: 7900, available: true,
    featured_image: "https://cdn.mikrotik.com/web-assets/rb_images/1374_lg.webp",
    specs: { "Portas de rede": ["1"], "Ambiente": ["Exterior"] },
  },
  {
    id: "10", handle: "css326", title: "MikroTik CSS326-24G-2S+RM",
    product_type: "Switch", vendor: "MikroTik",
    min_price_cents: 12900, available: true,
    featured_image: "https://cdn.mikrotik.com/web-assets/rb_images/1267_lg.webp",
    specs: { "Portas de rede": ["24"], "Portas SFP+": ["2"], "Ambiente": ["Interior"] },
  },
  {
    id: "11", handle: "rb3011", title: "MikroTik RB3011UiAS-RM",
    product_type: "Router", vendor: "MikroTik",
    min_price_cents: 11900, available: false,
    featured_image: "https://cdn.mikrotik.com/web-assets/rb_images/1407_lg.webp",
    specs: { "Portas de rede": ["10"], "Portas SFP": ["1"], "Ambiente": ["Interior"] },
  },
  {
    id: "12", handle: "crs354", title: "MikroTik CRS354-48G-4S+2Q+RM",
    product_type: "Switch", vendor: "MikroTik",
    min_price_cents: 48900, available: true,
    featured_image: null,
    specs: { "Portas de rede": ["48"], "Portas SFP+": ["4"], "Portas QSFP+": ["2"], "Ambiente": ["Interior"] },
  },
];

export const FREE_SHIPPING_THRESHOLD_CENTS = 7500;
export const SHIPPING_FLAT_CENTS = 595;

export function formatEUR(cents: number) {
  return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(cents / 100);
}

export function shippingFor(subtotal: number) {
  return subtotal >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : SHIPPING_FLAT_CENTS;
}
