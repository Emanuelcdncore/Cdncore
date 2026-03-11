'use client';

import { NewsDetail } from "@/components/News/NewsDetail";
import Footer from "@/components/Footer";
import type { NewsArticle } from "@cdn/news";

export function NewsDetailClient({ article, allArticles }: { article: NewsArticle; allArticles: NewsArticle[] }) {
    return (
        <div className="pt-20">
            <NewsDetail article={article} allArticles={allArticles} />
            <Footer />
        </div>
    );
}
