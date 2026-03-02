package store

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/geget-org/backend/internal/model"
)

// EventStoreInterface defines the operations available for events and registrations.
type EventStoreInterface interface {
	Create(ctx context.Context, e *model.Event) error
	GetByID(ctx context.Context, id uuid.UUID) (*model.Event, error)
	GetBySlug(ctx context.Context, slug string) (*model.Event, error)
	List(ctx context.Context, page, perPage int, publishedOnly bool) ([]*model.Event, int, error)
	Update(ctx context.Context, e *model.Event) error
	Delete(ctx context.Context, id uuid.UUID) error
	Register(ctx context.Context, reg *model.EventRegistration) error
	ListRegistrations(ctx context.Context, eventID uuid.UUID, page, perPage int) ([]*model.EventRegistration, int, error)
	CancelRegistration(ctx context.Context, registrationID uuid.UUID) error
}

// EventStore implements EventStoreInterface using PostgreSQL via pgx.
type EventStore struct {
	pool *pgxpool.Pool
}

// NewEventStore returns a new EventStore backed by the given connection pool.
func NewEventStore(pool *pgxpool.Pool) *EventStore {
	return &EventStore{pool: pool}
}

// Create inserts a new event into the database.
func (s *EventStore) Create(ctx context.Context, e *model.Event) error {
	return ErrNotImplemented
}

// GetByID retrieves an event by its unique ID.
func (s *EventStore) GetByID(ctx context.Context, id uuid.UUID) (*model.Event, error) {
	return nil, ErrNotImplemented
}

// GetBySlug retrieves an event by its URL-friendly slug.
func (s *EventStore) GetBySlug(ctx context.Context, slug string) (*model.Event, error) {
	return nil, ErrNotImplemented
}

// List returns a paginated list of events. If publishedOnly is true, only
// published events are returned. Also returns the total count for pagination.
func (s *EventStore) List(ctx context.Context, page, perPage int, publishedOnly bool) ([]*model.Event, int, error) {
	return nil, 0, ErrNotImplemented
}

// Update modifies an existing event record.
func (s *EventStore) Update(ctx context.Context, e *model.Event) error {
	return ErrNotImplemented
}

// Delete removes an event and its associated registrations by event ID.
func (s *EventStore) Delete(ctx context.Context, id uuid.UUID) error {
	return ErrNotImplemented
}

// Register creates a new event registration for a member or guest.
func (s *EventStore) Register(ctx context.Context, reg *model.EventRegistration) error {
	return ErrNotImplemented
}

// ListRegistrations returns a paginated list of registrations for a specific event.
func (s *EventStore) ListRegistrations(ctx context.Context, eventID uuid.UUID, page, perPage int) ([]*model.EventRegistration, int, error) {
	return nil, 0, ErrNotImplemented
}

// CancelRegistration cancels a registration by setting its status to "cancelled".
func (s *EventStore) CancelRegistration(ctx context.Context, registrationID uuid.UUID) error {
	return ErrNotImplemented
}
