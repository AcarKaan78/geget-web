package handler

import (
	"net/http"

	"github.com/geget-org/backend/internal/response"
)

// EventHandler handles event-related endpoints.
// Scaffolded for a future phase — all endpoints return 501 Not Implemented.
type EventHandler struct{}

// NewEventHandler creates a new EventHandler.
func NewEventHandler() *EventHandler {
	return &EventHandler{}
}

// List handles GET /api/events.
func (h *EventHandler) List(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "event listing not yet implemented")
}

// GetByID handles GET /api/events/{id}.
func (h *EventHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "event details not yet implemented")
}

// Create handles POST /api/events.
func (h *EventHandler) Create(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "event creation not yet implemented")
}

// Register handles POST /api/events/{id}/register.
func (h *EventHandler) Register(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "event registration not yet implemented")
}
