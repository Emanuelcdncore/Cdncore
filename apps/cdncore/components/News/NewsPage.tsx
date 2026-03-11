'use client';

import { NewsSection } from "./NewsSection";
import { ImpactSection } from "./ImpactSection";
import Footer from "../Footer";
import type { NewsArticle } from "@cdn/news";

export default function NewsPage({ articles }: { articles: NewsArticle[] }) {
    return (
        <div>
            <NewsSection articles={articles} />
            <div style={{ backgroundColor: '#0c0c14' }}>
                <ImpactSection />
            </div>
            <Footer />
        </div>
    );
}
