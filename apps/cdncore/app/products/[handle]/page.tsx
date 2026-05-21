import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductByHandle, getAllHandles } from '@/lib/products-data';
import ProductDetail from '@/components/products/ProductDetail';

export async function generateStaticParams() {
  return getAllHandles().map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.title,
    description: product.product_type ?? 'Produto MikroTik',
    openGraph: {
      title: product.title,
      description: product.product_type ?? '',
      images: product.featured_image ? [{ url: product.featured_image }] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
