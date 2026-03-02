package middleware

import (
	"log/slog"
	"net/http"
	"runtime/debug"

	"github.com/geget-org/backend/internal/response"
)

// Recoverer returns middleware that recovers from panics, logs the stack trace,
// and returns a 500 Internal Server Error JSON response to the client.
func Recoverer(logger *slog.Logger) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				if rvr := recover(); rvr != nil {
					reqID, _ := r.Context().Value(RequestIDKey).(string)

					logger.Error("panic recovered",
						slog.Any("panic", rvr),
						slog.String("stack", string(debug.Stack())),
						slog.String("method", r.Method),
						slog.String("path", r.URL.Path),
						slog.String("request_id", reqID),
					)

					response.Error(w, http.StatusInternalServerError, "internal server error")
				}
			}()

			next.ServeHTTP(w, r)
		})
	}
}
