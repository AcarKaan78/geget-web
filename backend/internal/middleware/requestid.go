package middleware

import (
	"context"
	"net/http"

	"github.com/google/uuid"
)

// contextKey is a custom type for context keys to avoid collisions.
type contextKey string

// RequestIDKey is the context key for the request ID.
const RequestIDKey contextKey = "request_id"

// RequestIDHeader is the HTTP header name for the request ID.
const RequestIDHeader = "X-Request-ID"

// RequestID returns middleware that ensures every request has a unique request ID.
// If the incoming request has an X-Request-ID header, it is reused; otherwise a new
// UUID is generated. The ID is placed into both the response header and the request context.
func RequestID(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		reqID := r.Header.Get(RequestIDHeader)
		if reqID == "" {
			reqID = uuid.New().String()
		}

		// Set on the response header.
		w.Header().Set(RequestIDHeader, reqID)

		// Add to request context.
		ctx := context.WithValue(r.Context(), RequestIDKey, reqID)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// GetRequestID retrieves the request ID from the context, returning an empty string if absent.
func GetRequestID(ctx context.Context) string {
	if id, ok := ctx.Value(RequestIDKey).(string); ok {
		return id
	}
	return ""
}
