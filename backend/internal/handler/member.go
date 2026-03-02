package handler

import (
	"net/http"

	"github.com/geget-org/backend/internal/response"
)

// MemberHandler handles member registration, login, and profile endpoints.
// Scaffolded for Phase 2 — all endpoints return 501 Not Implemented.
type MemberHandler struct{}

// NewMemberHandler creates a new MemberHandler.
func NewMemberHandler() *MemberHandler {
	return &MemberHandler{}
}

// Register handles POST /api/members/register.
func (h *MemberHandler) Register(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "member registration not yet implemented (Phase 2)")
}

// Login handles POST /api/members/login.
func (h *MemberHandler) Login(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "member login not yet implemented (Phase 2)")
}

// GetProfile handles GET /api/members/me.
func (h *MemberHandler) GetProfile(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "member profile not yet implemented (Phase 2)")
}

// UpdateProfile handles PUT /api/members/me.
func (h *MemberHandler) UpdateProfile(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "member profile update not yet implemented (Phase 2)")
}

// List handles GET /api/members (admin).
func (h *MemberHandler) List(w http.ResponseWriter, r *http.Request) {
	response.Error(w, http.StatusNotImplemented, "member listing not yet implemented (Phase 2)")
}
