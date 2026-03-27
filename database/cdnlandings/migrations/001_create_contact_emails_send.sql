CREATE TYPE website_enum AS ENUM ('cdncore', 'cdntek', 'cdntv');

CREATE TABLE contact_emails_send (
    id SERIAL PRIMARY KEY,
    website website_enum NOT NULL,
    sent_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contact_emails_send_lookup
    ON contact_emails_send (website, sent_at);
