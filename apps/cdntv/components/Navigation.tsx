'use client'

import { FloatingNav } from "@/components/ui/floating-nav";

const Navigation = () => {
    const navItems = [
        { name: "About", link: "/about/" },
        { name: "Services", link: "/services/" },
        { name: "News", link: "/news/" },
        { name: "Contact", link: "/contact/" },
    ];

    return (
        <FloatingNav navItems={navItems} />
    );
};

export default Navigation;
