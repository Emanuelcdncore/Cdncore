import type { Metadata } from 'next';
import { getProductsList } from '@/lib/products-data';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Catálogo completo de equipamento MikroTik: routers, switches, access points e muito mais.',
};

export default async function ProductsPage() {
  const products = getProductsList();
  return <ProductCatalog products={products} />;
}
