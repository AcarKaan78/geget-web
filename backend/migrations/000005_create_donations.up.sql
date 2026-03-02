CREATE TABLE donation_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    description TEXT,
    goal_amount DECIMAL(12, 2),
    currency VARCHAR(3) DEFAULT 'TRY',
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    cover_image_url VARCHAR(500),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES donation_campaigns(id),
    member_id UUID REFERENCES members(id),
    donor_name VARCHAR(255),
    donor_email VARCHAR(255),
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'TRY',
    payment_method VARCHAR(50),
    payment_reference VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    is_anonymous BOOLEAN DEFAULT FALSE,
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_donations_campaign ON donations(campaign_id);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_created ON donations(created_at DESC);
