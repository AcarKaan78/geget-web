CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    confirmed BOOLEAN DEFAULT FALSE,
    confirm_token VARCHAR(255),
    unsubscribe_token VARCHAR(255) UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    confirmed_at TIMESTAMPTZ,
    unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_active ON newsletter_subscribers(is_active, confirmed);
