package store

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/geget-org/backend/internal/model"
)

// BlogStoreInterface defines the operations available for blog posts, categories, and tags.
type BlogStoreInterface interface {
	// Posts
	CreatePost(ctx context.Context, p *model.BlogPost) error
	GetPostByID(ctx context.Context, id uuid.UUID) (*model.BlogPost, error)
	GetPostBySlug(ctx context.Context, slug string) (*model.BlogPost, error)
	ListPosts(ctx context.Context, page, perPage int, publishedOnly bool) ([]*model.BlogPost, int, error)
	ListPostsByCategory(ctx context.Context, categoryID uuid.UUID, page, perPage int) ([]*model.BlogPost, int, error)
	ListPostsByTag(ctx context.Context, tagID uuid.UUID, page, perPage int) ([]*model.BlogPost, int, error)
	UpdatePost(ctx context.Context, p *model.BlogPost) error
	DeletePost(ctx context.Context, id uuid.UUID) error
	IncrementViewCount(ctx context.Context, id uuid.UUID) error

	// Categories
	CreateCategory(ctx context.Context, c *model.BlogCategory) error
	GetCategoryByID(ctx context.Context, id uuid.UUID) (*model.BlogCategory, error)
	ListCategories(ctx context.Context) ([]*model.BlogCategory, error)
	UpdateCategory(ctx context.Context, c *model.BlogCategory) error
	DeleteCategory(ctx context.Context, id uuid.UUID) error

	// Tags
	CreateTag(ctx context.Context, t *model.BlogTag) error
	ListTags(ctx context.Context) ([]*model.BlogTag, error)
	DeleteTag(ctx context.Context, id uuid.UUID) error
	SetPostTags(ctx context.Context, postID uuid.UUID, tagIDs []uuid.UUID) error
	GetPostTags(ctx context.Context, postID uuid.UUID) ([]*model.BlogTag, error)
}

// BlogStore implements BlogStoreInterface using PostgreSQL via pgx.
type BlogStore struct {
	pool *pgxpool.Pool
}

// NewBlogStore returns a new BlogStore backed by the given connection pool.
func NewBlogStore(pool *pgxpool.Pool) *BlogStore {
	return &BlogStore{pool: pool}
}

// --- Posts ---

// CreatePost inserts a new blog post into the database.
func (s *BlogStore) CreatePost(ctx context.Context, p *model.BlogPost) error {
	return ErrNotImplemented
}

// GetPostByID retrieves a blog post by its unique ID.
func (s *BlogStore) GetPostByID(ctx context.Context, id uuid.UUID) (*model.BlogPost, error) {
	return nil, ErrNotImplemented
}

// GetPostBySlug retrieves a blog post by its URL-friendly slug.
func (s *BlogStore) GetPostBySlug(ctx context.Context, slug string) (*model.BlogPost, error) {
	return nil, ErrNotImplemented
}

// ListPosts returns a paginated list of blog posts. If publishedOnly is true,
// only published posts are returned.
func (s *BlogStore) ListPosts(ctx context.Context, page, perPage int, publishedOnly bool) ([]*model.BlogPost, int, error) {
	return nil, 0, ErrNotImplemented
}

// ListPostsByCategory returns a paginated list of blog posts in a category.
func (s *BlogStore) ListPostsByCategory(ctx context.Context, categoryID uuid.UUID, page, perPage int) ([]*model.BlogPost, int, error) {
	return nil, 0, ErrNotImplemented
}

// ListPostsByTag returns a paginated list of blog posts with a given tag.
func (s *BlogStore) ListPostsByTag(ctx context.Context, tagID uuid.UUID, page, perPage int) ([]*model.BlogPost, int, error) {
	return nil, 0, ErrNotImplemented
}

// UpdatePost modifies an existing blog post record.
func (s *BlogStore) UpdatePost(ctx context.Context, p *model.BlogPost) error {
	return ErrNotImplemented
}

// DeletePost removes a blog post and its tag associations by post ID.
func (s *BlogStore) DeletePost(ctx context.Context, id uuid.UUID) error {
	return ErrNotImplemented
}

// IncrementViewCount atomically increments the view count for a blog post.
func (s *BlogStore) IncrementViewCount(ctx context.Context, id uuid.UUID) error {
	return ErrNotImplemented
}

// --- Categories ---

// CreateCategory inserts a new blog category.
func (s *BlogStore) CreateCategory(ctx context.Context, c *model.BlogCategory) error {
	return ErrNotImplemented
}

// GetCategoryByID retrieves a blog category by its unique ID.
func (s *BlogStore) GetCategoryByID(ctx context.Context, id uuid.UUID) (*model.BlogCategory, error) {
	return nil, ErrNotImplemented
}

// ListCategories returns all blog categories.
func (s *BlogStore) ListCategories(ctx context.Context) ([]*model.BlogCategory, error) {
	return nil, ErrNotImplemented
}

// UpdateCategory modifies an existing blog category.
func (s *BlogStore) UpdateCategory(ctx context.Context, c *model.BlogCategory) error {
	return ErrNotImplemented
}

// DeleteCategory removes a blog category by its ID.
func (s *BlogStore) DeleteCategory(ctx context.Context, id uuid.UUID) error {
	return ErrNotImplemented
}

// --- Tags ---

// CreateTag inserts a new blog tag.
func (s *BlogStore) CreateTag(ctx context.Context, t *model.BlogTag) error {
	return ErrNotImplemented
}

// ListTags returns all blog tags.
func (s *BlogStore) ListTags(ctx context.Context) ([]*model.BlogTag, error) {
	return nil, ErrNotImplemented
}

// DeleteTag removes a blog tag and its post associations by tag ID.
func (s *BlogStore) DeleteTag(ctx context.Context, id uuid.UUID) error {
	return ErrNotImplemented
}

// SetPostTags replaces all tags for a blog post with the given tag IDs.
func (s *BlogStore) SetPostTags(ctx context.Context, postID uuid.UUID, tagIDs []uuid.UUID) error {
	return ErrNotImplemented
}

// GetPostTags returns all tags associated with a given blog post.
func (s *BlogStore) GetPostTags(ctx context.Context, postID uuid.UUID) ([]*model.BlogTag, error) {
	return nil, ErrNotImplemented
}
