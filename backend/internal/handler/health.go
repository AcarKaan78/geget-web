package handler

import (
	"net/http"

	"github.com/geget-org/backend/internal/response"
)

// HealthHandler handles health check endpoints.
type HealthHandler struct{}

// NewHealthHandler creates a new HealthHandler.
func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

// Healthz returns a simple health check response.
func (h *HealthHandler) Healthz(w http.ResponseWriter, r *http.Request) {
	response.Success(w, http.StatusOK, map[string]string{
		"status":  "healthy",
		"service": "geget-backend",
	})
}

// Readyz could be extended to check database connectivity, etc.
func (h *HealthHandler) Readyz(w http.ResponseWriter, r *http.Request) {
	response.Success(w, http.StatusOK, map[string]string{
		"status": "ready",
	})
}
