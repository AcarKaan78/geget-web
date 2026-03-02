package handler

import (
	"net/http"

	"github.com/geget-org/backend/internal/response"
)

// BlogHandler handles blog post endpoints.
// Scaffolded for a future phase — all endpoints return 501 Not Implemented.
type BlogHandler struct{}

// NewBlogHandler creates a new BlogHandler.
func NewBlogHandler() *BlogHandler {
	return &BlogHandler{}
}

// List handles GET /api/blog.
func (h *BlogHandler) List(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "blog listing not yet implemented")
}

// GetBySlug handles GET /api/blog/{slug}.
func (h *BlogHandler) GetBySlug(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "blog post details not yet implemented")
}

// Create handles POST /api/blog.
func (h *BlogHandler) Create(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "blog post creation not yet implemented")
}

// Update handles PUT /api/blog/{slug}.
func (h *BlogHandler) Update(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "blog post update not yet implemented")
}

// Delete handles DELETE /api/blog/{slug}.
func (h *BlogHandler) Delete(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "blog post deletion not yet implemented")
}

// ListCategories handles GET /api/blog/categories.
func (h *BlogHandler) ListCategories(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "blog categories not yet implemented")
}

// ListTags handles GET /api/blog/tags.
func (h *BlogHandler) ListTags(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "blog tags not yet implemented")
}
