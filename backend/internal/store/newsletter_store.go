package store

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/geget-org/backend/internal/model"
)

// NewsletterStoreInterface defines the operations available for newsletter
// subscribers.
type NewsletterStoreInterface interface {
	Subscribe(ctx context.Context, sub *model.NewsletterSubscriber) error
	Confirm(ctx context.Context, token string) error
	Unsubscribe(ctx context.Context, token string) error
	GetByID(ctx context.Context, id uuid.UUID) (*model.NewsletterSubscriber, error)
	GetByEmail(ctx context.Context, email string) (*model.NewsletterSubscriber, error)
	ListActive(ctx context.Context, page, perPage int) ([]*model.NewsletterSubscriber, int, error)
}

// NewsletterStore implements NewsletterStoreInterface using PostgreSQL via pgx.
type NewsletterStore struct {
	pool *pgxpool.Pool
}

// NewNewsletterStore returns a new NewsletterStore backed by the given connection pool.
func NewNewsletterStore(pool *pgxpool.Pool) *NewsletterStore {
	return &NewsletterStore{pool: pool}
}

// Subscribe adds a new subscriber to the newsletter. A confirmation token is
// generated and should be sent via email for double opt-in.
func (s *NewsletterStore) Subscribe(ctx context.Context, sub *model.NewsletterSubscriber) error {
	return ErrNotImplemented
}

// Confirm activates a subscriber using their confirmation token.
func (s *NewsletterStore) Confirm(ctx context.Context, token string) error {
	return ErrNotImplemented
}

// Unsubscribe deactivates a subscriber using their unique unsubscribe token.
func (s *NewsletterStore) Unsubscribe(ctx context.Context, token string) error {
	return ErrNotImplemented
}

// GetByID retrieves a newsletter subscriber by their unique ID.
func (s *NewsletterStore) GetByID(ctx context.Context, id uuid.UUID) (*model.NewsletterSubscriber, error) {
	return nil, ErrNotImplemented
}

// GetByEmail retrieves a newsletter subscriber by their email address.
func (s *NewsletterStore) GetByEmail(ctx context.Context, email string) (*model.NewsletterSubscriber, error) {
	return nil, ErrNotImplemented
}

// ListActive returns a paginated list of active, confirmed subscribers.
func (s *NewsletterStore) ListActive(ctx context.Context, page, perPage int) ([]*model.NewsletterSubscriber, int, error) {
	return nil, 0, ErrNotImplemented
}
