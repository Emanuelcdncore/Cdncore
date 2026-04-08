import LoriLogo from "./icons/LoriLogo";

const links = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
    { label: "Supported networks", href: "#" },
  ],
  Resources: [
    { label: "Help center", href: "#" },
    { label: "Contact us", href: "mailto:infglobal@cdncore.eu" },
    { label: "Beta feedback", href: "#" },
    { label: "API docs", href: "#" },
  ],
  Legal: [
    { label: "Privacy policy", href: "#" },
    { label: "Terms of service", href: "#" },
    { label: "Cookie policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-4">
            <LoriLogo variant="horizontal" size={32} className="brightness-0 invert" />
            <p className="text-sm text-white/50 font-light leading-relaxed">
              AI content for every social network.<br />
              CDN Core Technologies<br />
              Parkurbis, Covilh&atilde; · Portugal
            </p>
            <div className="flex flex-col gap-1 text-xs text-white/35 font-light">
              <span>+351 275 959 168</span>
              <span>infglobal@cdncore.eu</span>
            </div>
          </div>

          {Object.entries(links).map(([section, items]) => (
            <div key={section} className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-white/40 uppercase">{section}</p>
              {items.map((item) => (
                <a key={item.label} href={item.href} className="text-sm text-white/65 font-light hover:text-white transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35 font-light">
            &copy; 2026 Loritalk&reg; by CDN Core Technologies. Covilh&atilde;, Portugal.
          </p>
          <div className="flex items-center gap-4">
            {["language", "close", "linkedin"].map((icon) => (
              <a key={icon} href="#" className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center hover:border-white/40 transition-colors" aria-label={icon}>
                <span className="material-icons-round text-sm text-white/50">{icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
