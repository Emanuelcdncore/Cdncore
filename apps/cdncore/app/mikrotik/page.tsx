import type { Metadata } from "next";
import MikrotikPage from "@/components/Mikrotik/MikrotikPage";

export const metadata: Metadata = {
  title: "MikroTik",
  description:
    "Catálogo completo de equipamento MikroTik: routers, switches e access points. Stock imediato e portes grátis acima de 75€.",
  alternates: { canonical: "/mikrotik" },
};

export default function Page() {
  return <MikrotikPage />;
}
