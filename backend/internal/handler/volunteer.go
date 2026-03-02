package handler

import (
	"net/http"

	"github.com/geget-org/backend/internal/response"
)

// VolunteerHandler handles volunteer position and application endpoints.
// Scaffolded for a future phase — all endpoints return 501 Not Implemented.
type VolunteerHandler struct{}

// NewVolunteerHandler creates a new VolunteerHandler.
func NewVolunteerHandler() *VolunteerHandler {
	return &VolunteerHandler{}
}

// ListPositions handles GET /api/volunteers/positions.
func (h *VolunteerHandler) ListPositions(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "volunteer positions not yet implemented")
}

// GetPosition handles GET /api/volunteers/positions/{id}.
func (h *VolunteerHandler) GetPosition(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "volunteer position details not yet implemented")
}

// Apply handles POST /api/volunteers/apply.
func (h *VolunteerHandler) Apply(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "volunteer application not yet implemented")
}

// ListApplications handles GET /api/volunteers/applications (admin).
func (h *VolunteerHandler) ListApplications(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "volunteer application listing not yet implemented")
}
