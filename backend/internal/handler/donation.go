package handler

import (
	"net/http"

	"github.com/geget-org/backend/internal/response"
)

// DonationHandler handles donation-related endpoints.
// Scaffolded for a future phase — all endpoints return 501 Not Implemented.
type DonationHandler struct{}

// NewDonationHandler creates a new DonationHandler.
func NewDonationHandler() *DonationHandler {
	return &DonationHandler{}
}

// Create handles POST /api/donations.
func (h *DonationHandler) Create(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "donation processing not yet implemented")
}

// ListCampaigns handles GET /api/donations/campaigns.
func (h *DonationHandler) ListCampaigns(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "donation campaigns not yet implemented")
}

// GetCampaign handles GET /api/donations/campaigns/{id}.
func (h *DonationHandler) GetCampaign(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "donation campaign details not yet implemented")
}
