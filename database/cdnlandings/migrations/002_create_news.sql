CREATE TABLE news (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website    website_enum NOT NULL,
  title      VARCHAR(500),
  content    TEXT NOT NULL,
  image_url  TEXT,
  slug       VARCHAR(500) NOT NULL,
  published  BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  views      INTEGER NOT NULL DEFAULT 0,
  likes      INTEGER NOT NULL DEFAULT 0,
  comments   INTEGER NOT NULL DEFAULT 0,
  shares     INTEGER NOT NULL DEFAULT 0,
  clicks     INTEGER NOT NULL DEFAULT 0,
  meta_title       VARCHAR(500),
  meta_description VARCHAR(1000),
  tags             TEXT[] NOT NULL DEFAULT '{}'
);

CREATE UNIQUE INDEX idx_news_website_slug ON news (website, slug);
CREATE INDEX idx_news_published_created ON news (website, published, created_at DESC);
