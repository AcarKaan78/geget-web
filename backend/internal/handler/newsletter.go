package handler

import (
	"net/http"

	"github.com/geget-org/backend/internal/response"
)

// NewsletterHandler handles newsletter subscription endpoints.
// Scaffolded for a future phase — all endpoints return 501 Not Implemented.
type NewsletterHandler struct{}

// NewNewsletterHandler creates a new NewsletterHandler.
func NewNewsletterHandler() *NewsletterHandler {
	return &NewsletterHandler{}
}

// Subscribe handles POST /api/newsletter/subscribe.
func (h *NewsletterHandler) Subscribe(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "newsletter subscription not yet implemented")
}

// Unsubscribe handles POST /api/newsletter/unsubscribe.
func (h *NewsletterHandler) Unsubscribe(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "newsletter unsubscription not yet implemented")
}

// ListSubscribers handles GET /api/newsletter/subscribers (admin).
func (h *NewsletterHandler) ListSubscribers(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "subscriber listing not yet implemented")
}
