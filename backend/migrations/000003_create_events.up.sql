CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    description TEXT,
    content TEXT,
    location VARCHAR(500),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    max_participants INT,
    cover_image_url VARCHAR(500),
    is_published BOOLEAN DEFAULT FALSE,
    is_free BOOLEAN DEFAULT TRUE,
    price DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'TRY',
    created_by UUID REFERENCES members(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    member_id UUID REFERENCES members(id),
    guest_name VARCHAR(255),
    guest_email VARCHAR(255),
    status VARCHAR(50) DEFAULT 'registered',
    registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_events_start_date ON events(start_date DESC);
CREATE INDEX idx_events_is_published ON events(is_published);
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_event_registrations_event ON event_registrations(event_id);
