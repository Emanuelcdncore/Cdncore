'use client';

import { NewsSection } from "./NewsSection";
import { ImpactSection } from "./ImpactSection";
import Footer from "../Footer";
import type { NewsArticle } from "@cdn/news";

export default function NewsPage({ articles }: { articles: NewsArticle[] }) {
    return (
        <div className="pt-20">
            <NewsSection articles={articles} />
            <div className="bg-black">
                <ImpactSection />
            </div>
            <Footer />
        </div>
    );
}
