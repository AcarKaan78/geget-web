CREATE TABLE volunteer_positions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    requirements TEXT,
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    max_volunteers INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE volunteer_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    position_id UUID REFERENCES volunteer_positions(id),
    member_id UUID REFERENCES members(id),
    applicant_name VARCHAR(255) NOT NULL,
    applicant_email VARCHAR(255) NOT NULL,
    applicant_phone VARCHAR(20),
    motivation TEXT,
    experience TEXT,
    availability VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    reviewed_by UUID REFERENCES members(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_volunteer_apps_status ON volunteer_applications(status);
CREATE INDEX idx_volunteer_apps_position ON volunteer_applications(position_id);
