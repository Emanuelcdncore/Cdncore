export interface NewsRow {
  id: string;
  website: string;
  title: string | null;
  subtitle: string | null;
  content: string;
  image_url: string | null;
  slug: string;
  published: boolean;
  created_at: Date;
  updated_at: Date;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  clicks: number;
  meta_title: string | null;
  meta_description: string | null;
  tags: string[];
}

export interface NewsArticle {
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
  isoDate: string;
  readTime: string;
  imageUrl: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
}
