import type { Metadata } from "next";
import { PRODUCTS } from "@/components/Mikrotik/mikrotikData";
import MikrotikProductPage from "@/components/Mikrotik/MikrotikProductPage";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = PRODUCTS.find((p) => p.handle === handle);
  return {
    title: product ? product.title : "Produto não encontrado",
    description: product
      ? `${product.product_type} MikroTik — ${product.title}. Stock imediato.`
      : undefined,
  };
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ handle: p.handle }));
}

export default async function Page({ params }: Props) {
  const { handle } = await params;
  return <MikrotikProductPage handle={handle} />;
}
