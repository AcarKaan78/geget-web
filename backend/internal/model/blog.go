package model

import (
	"time"

	"github.com/google/uuid"
)

// BlogPost represents a blog article on the website.
// Fields match the blog_posts table in migration 000004.
type BlogPost struct {
	ID            uuid.UUID  `json:"id" db:"id"`
	Title         string     `json:"title" db:"title" validate:"required,min=2,max=500"`
	Slug          string     `json:"slug" db:"slug"`
	Excerpt       string     `json:"excerpt,omitempty" db:"excerpt"`
	Content       string     `json:"content" db:"content" validate:"required,min=10"`
	CoverImageURL string     `json:"cover_image_url,omitempty" db:"cover_image_url"`
	CategoryID    *uuid.UUID `json:"category_id,omitempty" db:"category_id"`
	AuthorID      uuid.UUID  `json:"author_id" db:"author_id"`
	IsPublished   bool       `json:"is_published" db:"is_published"`
	PublishedAt   *time.Time `json:"published_at,omitempty" db:"published_at"`
	ViewCount     int        `json:"view_count" db:"view_count"`
	CreatedAt     time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt     time.Time  `json:"updated_at" db:"updated_at"`
}

// BlogCategory represents a category for blog posts.
type BlogCategory struct {
	ID          uuid.UUID `json:"id" db:"id"`
	Name        string    `json:"name" db:"name" validate:"required,min=2,max=100"`
	Slug        string    `json:"slug" db:"slug"`
	Description string    `json:"description,omitempty" db:"description" validate:"omitempty,max=500"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}

// BlogTag represents a tag that can be applied to blog posts.
// Note: the blog_tags table in migration 000004 does not have a created_at column.
type BlogTag struct {
	ID   uuid.UUID `json:"id" db:"id"`
	Name string    `json:"name" db:"name" validate:"required,min=2,max=100"`
	Slug string    `json:"slug" db:"slug"`
}

// CreateBlogPostRequest is the request body for creating a new blog post.
type CreateBlogPostRequest struct {
	Title         string      `json:"title" validate:"required,min=2,max=500"`
	Excerpt       string      `json:"excerpt,omitempty"`
	Content       string      `json:"content" validate:"required,min=10"`
	CoverImageURL string      `json:"cover_image_url,omitempty"`
	CategoryID    *uuid.UUID  `json:"category_id,omitempty"`
	TagIDs        []uuid.UUID `json:"tag_ids,omitempty"`
}
