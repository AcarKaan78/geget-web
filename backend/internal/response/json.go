package response

import (
	"encoding/json"
	"log/slog"
	"net/http"
)

// APIResponse is the standard JSON envelope for all API responses.
type APIResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
	Meta    *Meta       `json:"meta,omitempty"`
}

// Meta carries pagination metadata.
type Meta struct {
	Page       int `json:"page"`
	PerPage    int `json:"per_page"`
	Total      int `json:"total"`
	TotalPages int `json:"total_pages"`
}

// writeJSON marshals the payload and writes it to the response writer.
func writeJSON(w http.ResponseWriter, status int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(payload); err != nil {
		slog.Error("failed to encode JSON response", "error", err)
	}
}

// Success sends a successful JSON response with the given status code and data.
func Success(w http.ResponseWriter, status int, data interface{}) {
	writeJSON(w, status, APIResponse{
		Success: true,
		Data:    data,
	})
}

// Error sends an error JSON response with the given status code and message.
func Error(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, APIResponse{
		Success: false,
		Error:   message,
	})
}

// Paginated sends a successful JSON response that includes pagination metadata.
func Paginated(w http.ResponseWriter, data interface{}, meta Meta) {
	writeJSON(w, http.StatusOK, APIResponse{
		Success: true,
		Data:    data,
		Meta:    &meta,
	})
}
