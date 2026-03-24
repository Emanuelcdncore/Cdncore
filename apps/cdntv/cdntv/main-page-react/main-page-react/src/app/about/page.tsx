import AboutSection from "@/components/AboutSection";
import { FloatingNav } from "@/components/ui/floating-nav";

const navItems = [
    {
        name: "About",
        link: "/about",
    },
    {
        name: "Services",
        link: "/services",
    },
    {
        name: "Contact",
        link: "/contact",
    },
];


export default function AboutPage() {
    return (
        <main className="relative bg-black min-h-screen">
            <FloatingNav navItems={navItems} />
            <AboutSection />
        </main>
    );
}

