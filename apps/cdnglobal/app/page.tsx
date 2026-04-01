import Image from "next/image";
import Link from "next/link";

const bp = process.env.BASE_PATH || '';

const cards = [
  {
    href: "https://cdncore.eu",
    logo: `${bp}/logos/cdncore1.png`,
    alt: "CDN Core Logo",
    cardClass: "card-core",
    hoverColor: "group-hover:text-indigo-600",
    delay: "delay-100",
  },
  {
    href: "https://cdntv.eu",
    logo: `${bp}/logos/cdntv1.png`,
    alt: "CDN TV Logo",
    cardClass: "card-tv",
    hoverColor: "group-hover:text-red-500",
    delay: "delay-200",
  },
  {
    href: "https://cdntek.eu",
    logo: `${bp}/logos/cdntek1.png`,
    alt: "CDN Tek Logo",
    cardClass: "card-tek",
    hoverColor: "group-hover:text-green-600",
    delay: "delay-300",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-slate-800 selection:bg-slate-200">
      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center z-10">
        <header className="mb-16 text-center fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-2">
            CDN<span className="font-light text-slate-500">Global</span>
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 mx-auto rounded-full mt-6 opacity-80" />
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto font-light">
            Connecting technology, media, and infrastructure.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {cards.map((card) => (
            <a
              key={card.href}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-card ${card.cardClass} rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer fade-in-up ${card.delay} group`}
            >
              <div className="logo-container">
                <Image
                  src={card.logo}
                  alt={card.alt}
                  width={300}
                  height={120}
                  unoptimized
                  className="logo-img"
                />
              </div>
              <div className="mt-6 text-center">
                <span className={`inline-flex items-center text-sm font-medium text-slate-400 ${card.hoverColor} transition-colors`}>
                  Visit Site
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 fade-in-up delay-300">
          <Link
            href="/request-demo"
            className="inline-flex items-center px-8 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
          >
            Request a Demo
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-4 w-full text-center py-4 text-slate-400 text-sm font-light fade-in-up delay-300">
        <p>&copy; {new Date().getFullYear()} CDN Global Group. All rights reserved.</p>
      </footer>
    </div>
  );
}
