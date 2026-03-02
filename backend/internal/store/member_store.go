package store

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/geget-org/backend/internal/model"
)

// MemberStoreInterface defines the operations available for members.
type MemberStoreInterface interface {
	Create(ctx context.Context, m *model.Member) error
	GetByID(ctx context.Context, id uuid.UUID) (*model.Member, error)
	GetByEmail(ctx context.Context, email string) (*model.Member, error)
	List(ctx context.Context, page, perPage int) ([]*model.Member, int, error)
	Update(ctx context.Context, m *model.Member) error
	Delete(ctx context.Context, id uuid.UUID) error
	UpdateLastLogin(ctx context.Context, id uuid.UUID) error
}

// MemberStore implements MemberStoreInterface using PostgreSQL via pgx.
type MemberStore struct {
	pool *pgxpool.Pool
}

// NewMemberStore returns a new MemberStore backed by the given connection pool.
func NewMemberStore(pool *pgxpool.Pool) *MemberStore {
	return &MemberStore{pool: pool}
}

// Create inserts a new member into the database.
func (s *MemberStore) Create(ctx context.Context, m *model.Member) error {
	return ErrNotImplemented
}

// GetByID retrieves a member by their unique ID.
func (s *MemberStore) GetByID(ctx context.Context, id uuid.UUID) (*model.Member, error) {
	return nil, ErrNotImplemented
}

// GetByEmail retrieves a member by their email address.
func (s *MemberStore) GetByEmail(ctx context.Context, email string) (*model.Member, error) {
	return nil, ErrNotImplemented
}

// List returns a paginated list of members and the total count.
func (s *MemberStore) List(ctx context.Context, page, perPage int) ([]*model.Member, int, error) {
	return nil, 0, ErrNotImplemented
}

// Update modifies an existing member record.
func (s *MemberStore) Update(ctx context.Context, m *model.Member) error {
	return ErrNotImplemented
}

// Delete removes a member by their ID (soft-delete by setting is_active to false).
func (s *MemberStore) Delete(ctx context.Context, id uuid.UUID) error {
	return ErrNotImplemented
}

// UpdateLastLogin sets the last_login_at timestamp for a member.
func (s *MemberStore) UpdateLastLogin(ctx context.Context, id uuid.UUID) error {
	return ErrNotImplemented
}
