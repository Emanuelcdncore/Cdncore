import type { Metadata } from "next";
import MikrotikCartPage from "@/components/Mikrotik/MikrotikCartPage";

export const metadata: Metadata = {
  title: "Carrinho",
  description: "O seu carrinho de compras OfficeLan.",
};

export default function Page() {
  return <MikrotikCartPage />;
}
