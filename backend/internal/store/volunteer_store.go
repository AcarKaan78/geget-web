package store

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/geget-org/backend/internal/model"
)

// VolunteerStoreInterface defines the operations available for volunteer
// positions and applications.
type VolunteerStoreInterface interface {
	// Positions
	CreatePosition(ctx context.Context, p *model.VolunteerPosition) error
	GetPositionByID(ctx context.Context, id uuid.UUID) (*model.VolunteerPosition, error)
	ListPositions(ctx context.Context, activeOnly bool) ([]*model.VolunteerPosition, error)
	UpdatePosition(ctx context.Context, p *model.VolunteerPosition) error
	DeletePosition(ctx context.Context, id uuid.UUID) error

	// Applications
	CreateApplication(ctx context.Context, a *model.VolunteerApplication) error
	GetApplicationByID(ctx context.Context, id uuid.UUID) (*model.VolunteerApplication, error)
	ListApplications(ctx context.Context, page, perPage int) ([]*model.VolunteerApplication, int, error)
	ListApplicationsByPosition(ctx context.Context, positionID uuid.UUID, page, perPage int) ([]*model.VolunteerApplication, int, error)
	UpdateApplicationStatus(ctx context.Context, id uuid.UUID, status string, reviewedBy uuid.UUID) error
}

// VolunteerStore implements VolunteerStoreInterface using PostgreSQL via pgx.
type VolunteerStore struct {
	pool *pgxpool.Pool
}

// NewVolunteerStore returns a new VolunteerStore backed by the given connection pool.
func NewVolunteerStore(pool *pgxpool.Pool) *VolunteerStore {
	return &VolunteerStore{pool: pool}
}

// --- Positions ---

// CreatePosition inserts a new volunteer position into the database.
func (s *VolunteerStore) CreatePosition(ctx context.Context, p *model.VolunteerPosition) error {
	return ErrNotImplemented
}

// GetPositionByID retrieves a volunteer position by its unique ID.
func (s *VolunteerStore) GetPositionByID(ctx context.Context, id uuid.UUID) (*model.VolunteerPosition, error) {
	return nil, ErrNotImplemented
}

// ListPositions returns all volunteer positions. If activeOnly is true, only
// active positions are returned.
func (s *VolunteerStore) ListPositions(ctx context.Context, activeOnly bool) ([]*model.VolunteerPosition, error) {
	return nil, ErrNotImplemented
}

// UpdatePosition modifies an existing volunteer position.
func (s *VolunteerStore) UpdatePosition(ctx context.Context, p *model.VolunteerPosition) error {
	return ErrNotImplemented
}

// DeletePosition removes a volunteer position by its ID.
func (s *VolunteerStore) DeletePosition(ctx context.Context, id uuid.UUID) error {
	return ErrNotImplemented
}

// --- Applications ---

// CreateApplication inserts a new volunteer application.
func (s *VolunteerStore) CreateApplication(ctx context.Context, a *model.VolunteerApplication) error {
	return ErrNotImplemented
}

// GetApplicationByID retrieves a volunteer application by its unique ID.
func (s *VolunteerStore) GetApplicationByID(ctx context.Context, id uuid.UUID) (*model.VolunteerApplication, error) {
	return nil, ErrNotImplemented
}

// ListApplications returns a paginated list of all volunteer applications.
func (s *VolunteerStore) ListApplications(ctx context.Context, page, perPage int) ([]*model.VolunteerApplication, int, error) {
	return nil, 0, ErrNotImplemented
}

// ListApplicationsByPosition returns a paginated list of applications for a
// specific volunteer position.
func (s *VolunteerStore) ListApplicationsByPosition(ctx context.Context, positionID uuid.UUID, page, perPage int) ([]*model.VolunteerApplication, int, error) {
	return nil, 0, ErrNotImplemented
}

// UpdateApplicationStatus changes the status of an application and records who
// reviewed it and when.
func (s *VolunteerStore) UpdateApplicationStatus(ctx context.Context, id uuid.UUID, status string, reviewedBy uuid.UUID) error {
	return ErrNotImplemented
}
