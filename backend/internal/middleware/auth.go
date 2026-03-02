package middleware

import (
	"net/http"

	"github.com/geget-org/backend/internal/response"
)

// Phase 2: JWT Authentication Middleware
//
// This file contains scaffolded authentication and authorization middleware.
// These will be activated in Phase 2 when the member registration and login
// system is implemented. For now, they return 501 Not Implemented.
//
// When activated, Authenticate will:
//   - Extract the JWT from the Authorization header (Bearer <token>)
//   - Validate the token signature and expiration using JWTSecret from config
//   - Extract the member ID and role from the token claims
//   - Add the authenticated member info to the request context
//
// RequireRole will:
//   - Check that the request has been authenticated (Authenticate ran first)
//   - Verify the member's role is one of the allowed roles
//   - Return 403 Forbidden if the role does not match

// Authenticate is a placeholder middleware for JWT authentication.
// It will be implemented in Phase 2 when member auth is added.
func Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		response.Error(w, http.StatusNotImplemented, "authentication not yet implemented (Phase 2)")
	})
}

// RequireRole is a placeholder middleware that restricts access by member role.
// It will be implemented in Phase 2 when member auth is added.
func RequireRole(roles ...string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			response.Error(w, http.StatusNotImplemented, "role-based authorization not yet implemented (Phase 2)")
		})
	}
}
