'use client'

import { FloatingNav } from "@/components/ui/floating-nav";

const Navigation = () => {
    const navItems = [
        { name: "CDNTV", link: "/" },
        { name: "About", link: "/about" },
        { name: "Services", link: "/services" },
        { name: "Contact", link: "/contact" }
    ];

    return (
        <FloatingNav navItems={navItems} />
    );
};

export default Navigation;