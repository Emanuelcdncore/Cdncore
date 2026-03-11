'use client';

import { NewsDetail } from "@/components/News/NewsDetail";
import Footer from "@/components/Footer";
import type { NewsArticle } from "@cdn/news";

export function NewsDetailClient({ article }: { article: NewsArticle }) {
    return (
        <>
            <NewsDetail article={article} />
            <Footer />
        </>
    );
}
