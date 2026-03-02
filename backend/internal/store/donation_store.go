package store

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/geget-org/backend/internal/model"
)

// DonationStoreInterface defines the operations available for donations and campaigns.
type DonationStoreInterface interface {
	// Campaigns
	CreateCampaign(ctx context.Context, c *model.DonationCampaign) error
	GetCampaignByID(ctx context.Context, id uuid.UUID) (*model.DonationCampaign, error)
	ListCampaigns(ctx context.Context, activeOnly bool) ([]*model.DonationCampaign, error)
	UpdateCampaign(ctx context.Context, c *model.DonationCampaign) error
	DeleteCampaign(ctx context.Context, id uuid.UUID) error

	// Donations
	CreateDonation(ctx context.Context, d *model.Donation) error
	GetDonationByID(ctx context.Context, id uuid.UUID) (*model.Donation, error)
	ListDonations(ctx context.Context, page, perPage int) ([]*model.Donation, int, error)
	ListDonationsByCampaign(ctx context.Context, campaignID uuid.UUID, page, perPage int) ([]*model.Donation, int, error)
	UpdateDonationStatus(ctx context.Context, id uuid.UUID, status string) error
	GetCampaignTotalRaised(ctx context.Context, campaignID uuid.UUID) (float64, error)
}

// DonationStore implements DonationStoreInterface using PostgreSQL via pgx.
type DonationStore struct {
	pool *pgxpool.Pool
}

// NewDonationStore returns a new DonationStore backed by the given connection pool.
func NewDonationStore(pool *pgxpool.Pool) *DonationStore {
	return &DonationStore{pool: pool}
}

// --- Campaigns ---

// CreateCampaign inserts a new donation campaign into the database.
func (s *DonationStore) CreateCampaign(ctx context.Context, c *model.DonationCampaign) error {
	return ErrNotImplemented
}

// GetCampaignByID retrieves a donation campaign by its unique ID.
func (s *DonationStore) GetCampaignByID(ctx context.Context, id uuid.UUID) (*model.DonationCampaign, error) {
	return nil, ErrNotImplemented
}

// ListCampaigns returns all donation campaigns. If activeOnly is true, only
// active campaigns are returned.
func (s *DonationStore) ListCampaigns(ctx context.Context, activeOnly bool) ([]*model.DonationCampaign, error) {
	return nil, ErrNotImplemented
}

// UpdateCampaign modifies an existing donation campaign.
func (s *DonationStore) UpdateCampaign(ctx context.Context, c *model.DonationCampaign) error {
	return ErrNotImplemented
}

// DeleteCampaign removes a donation campaign by its ID.
func (s *DonationStore) DeleteCampaign(ctx context.Context, id uuid.UUID) error {
	return ErrNotImplemented
}

// --- Donations ---

// CreateDonation records a new donation in the database.
func (s *DonationStore) CreateDonation(ctx context.Context, d *model.Donation) error {
	return ErrNotImplemented
}

// GetDonationByID retrieves a donation by its unique ID.
func (s *DonationStore) GetDonationByID(ctx context.Context, id uuid.UUID) (*model.Donation, error) {
	return nil, ErrNotImplemented
}

// ListDonations returns a paginated list of all donations and the total count.
func (s *DonationStore) ListDonations(ctx context.Context, page, perPage int) ([]*model.Donation, int, error) {
	return nil, 0, ErrNotImplemented
}

// ListDonationsByCampaign returns a paginated list of donations for a specific campaign.
func (s *DonationStore) ListDonationsByCampaign(ctx context.Context, campaignID uuid.UUID, page, perPage int) ([]*model.Donation, int, error) {
	return nil, 0, ErrNotImplemented
}

// UpdateDonationStatus changes the status of a donation (e.g., pending -> completed).
func (s *DonationStore) UpdateDonationStatus(ctx context.Context, id uuid.UUID, status string) error {
	return ErrNotImplemented
}

// GetCampaignTotalRaised calculates the total amount raised for a specific campaign.
func (s *DonationStore) GetCampaignTotalRaised(ctx context.Context, campaignID uuid.UUID) (float64, error) {
	return 0, ErrNotImplemented
}
