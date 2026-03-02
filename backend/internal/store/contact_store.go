package store

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/geget-org/backend/internal/model"
)

// ContactStoreInterface defines the operations available for contact submissions.
type ContactStoreInterface interface {
	Create(ctx context.Context, c *model.ContactSubmission) error
	GetByID(ctx context.Context, id uuid.UUID) (*model.ContactSubmission, error)
	List(ctx context.Context, page, perPage int) ([]*model.ContactSubmission, int, error)
	MarkAsRead(ctx context.Context, id uuid.UUID) error
}

// ContactStore implements ContactStoreInterface using PostgreSQL via pgx.
type ContactStore struct {
	pool *pgxpool.Pool
}

// NewContactStore returns a new ContactStore backed by the given connection pool.
func NewContactStore(pool *pgxpool.Pool) *ContactStore {
	return &ContactStore{pool: pool}
}

// Create inserts a new contact submission into the database. The ID and
// CreatedAt fields are populated by the database and written back to the struct.
func (s *ContactStore) Create(ctx context.Context, c *model.ContactSubmission) error {
	query := `
		INSERT INTO contact_submissions (name, email, subject, message)
		VALUES ($1, $2, $3, $4)
		RETURNING id, created_at`

	err := s.pool.QueryRow(ctx, query,
		c.Name,
		c.Email,
		c.Subject,
		c.Message,
	).Scan(&c.ID, &c.CreatedAt)
	if err != nil {
		return fmt.Errorf("inserting contact submission: %w", err)
	}

	return nil
}

// GetByID retrieves a single contact submission by its ID. Returns ErrNotFound
// if no submission exists with the given ID.
func (s *ContactStore) GetByID(ctx context.Context, id uuid.UUID) (*model.ContactSubmission, error) {
	query := `
		SELECT id, name, email, subject, message, is_read, read_at, created_at
		FROM contact_submissions
		WHERE id = $1`

	var c model.ContactSubmission
	err := s.pool.QueryRow(ctx, query, id).Scan(
		&c.ID,
		&c.Name,
		&c.Email,
		&c.Subject,
		&c.Message,
		&c.IsRead,
		&c.ReadAt,
		&c.CreatedAt,
	)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, fmt.Errorf("querying contact submission %s: %w", id, err)
	}

	return &c, nil
}

// List returns a paginated list of contact submissions ordered by creation date
// (newest first). It also returns the total count of submissions for pagination.
func (s *ContactStore) List(ctx context.Context, page, perPage int) ([]*model.ContactSubmission, int, error) {
	if page < 1 {
		page = 1
	}
	if perPage < 1 {
		perPage = 20
	}
	offset := (page - 1) * perPage

	// Get total count.
	var total int
	countQuery := `SELECT COUNT(*) FROM contact_submissions`
	if err := s.pool.QueryRow(ctx, countQuery).Scan(&total); err != nil {
		return nil, 0, fmt.Errorf("counting contact submissions: %w", err)
	}

	// Get the page of results.
	query := `
		SELECT id, name, email, subject, message, is_read, read_at, created_at
		FROM contact_submissions
		ORDER BY created_at DESC
		LIMIT $1 OFFSET $2`

	rows, err := s.pool.Query(ctx, query, perPage, offset)
	if err != nil {
		return nil, 0, fmt.Errorf("listing contact submissions: %w", err)
	}
	defer rows.Close()

	var submissions []*model.ContactSubmission
	for rows.Next() {
		var c model.ContactSubmission
		if err := rows.Scan(
			&c.ID,
			&c.Name,
			&c.Email,
			&c.Subject,
			&c.Message,
			&c.IsRead,
			&c.ReadAt,
			&c.CreatedAt,
		); err != nil {
			return nil, 0, fmt.Errorf("scanning contact submission row: %w", err)
		}
		submissions = append(submissions, &c)
	}

	if err := rows.Err(); err != nil {
		return nil, 0, fmt.Errorf("iterating contact submission rows: %w", err)
	}

	return submissions, total, nil
}

// MarkAsRead marks a contact submission as read by setting is_read to true and
// read_at to the current time. Returns ErrNotFound if no row was updated.
func (s *ContactStore) MarkAsRead(ctx context.Context, id uuid.UUID) error {
	query := `
		UPDATE contact_submissions
		SET is_read = TRUE, read_at = $1
		WHERE id = $2 AND is_read = FALSE`

	now := time.Now().UTC()
	tag, err := s.pool.Exec(ctx, query, now, id)
	if err != nil {
		return fmt.Errorf("marking contact submission %s as read: %w", id, err)
	}

	if tag.RowsAffected() == 0 {
		// Check if the row exists at all (it might already be read).
		var exists bool
		checkQuery := `SELECT EXISTS(SELECT 1 FROM contact_submissions WHERE id = $1)`
		if err := s.pool.QueryRow(ctx, checkQuery, id).Scan(&exists); err != nil {
			return fmt.Errorf("checking contact submission existence: %w", err)
		}
		if !exists {
			return ErrNotFound
		}
		// Row exists but was already marked as read — not an error.
	}

	return nil
}
