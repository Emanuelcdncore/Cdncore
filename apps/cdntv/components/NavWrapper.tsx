"use client";

import { FloatingNav } from "@/components/ui/floating-nav";

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about/" },
  { name: "Services", link: "/services/" },
  { name: "News", link: "/news/" },
  { name: "Contact", link: "/contact/" },
];

export default function NavWrapper() {
  return <FloatingNav navItems={navItems} />;
}
