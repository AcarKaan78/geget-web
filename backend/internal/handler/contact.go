package handler

import (
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"

	"github.com/geget-org/backend/internal/model"
	"github.com/geget-org/backend/internal/response"
	"github.com/geget-org/backend/internal/service"
	"github.com/geget-org/backend/internal/store"
)

// ContactHandler handles contact form submission endpoints.
type ContactHandler struct {
	store    *store.ContactStore
	mail     *service.MailService
	validate *validator.Validate
	logger   *slog.Logger
}

// NewContactHandler creates a new ContactHandler.
func NewContactHandler(store *store.ContactStore, mail *service.MailService, logger *slog.Logger) *ContactHandler {
	return &ContactHandler{
		store:    store,
		mail:     mail,
		validate: validator.New(),
		logger:   logger,
	}
}

// Create handles POST /api/contact -- accepts a new contact form submission.
func (h *ContactHandler) Create(w http.ResponseWriter, r *http.Request) {
	var req model.CreateContactRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if err := h.validate.Struct(req); err != nil {
		response.Error(w, http.StatusUnprocessableEntity, formatValidationErrors(err))
		return
	}

	// Build domain model from request DTO.
	submission := &model.ContactSubmission{
		Name:    req.Name,
		Email:   req.Email,
		Subject: req.Subject,
		Message: req.Message,
	}

	if err := h.store.Create(r.Context(), submission); err != nil {
		h.logger.Error("failed to create contact submission",
			slog.String("error", err.Error()),
		)
		response.Error(w, http.StatusInternalServerError, "failed to submit contact form")
		return
	}

	// Send email notification asynchronously -- do not block the response.
	go func() {
		if err := h.mail.SendContactNotification(submission); err != nil {
			h.logger.Error("failed to send contact notification email",
				slog.String("error", err.Error()),
				slog.String("submission_id", submission.ID.String()),
			)
		}
	}()

	response.Success(w, http.StatusCreated, submission)
}

// List handles GET /api/contact -- returns paginated contact submissions (admin).
func (h *ContactHandler) List(w http.ResponseWriter, r *http.Request) {
	pagination := model.PaginationFromRequest(r)

	submissions, total, err := h.store.List(r.Context(), pagination.Page, pagination.PerPage)
	if err != nil {
		h.logger.Error("failed to list contact submissions",
			slog.String("error", err.Error()),
		)
		response.Error(w, http.StatusInternalServerError, "failed to retrieve contact submissions")
		return
	}

	response.Paginated(w, submissions, response.Meta{
		Page:       pagination.Page,
		PerPage:    pagination.PerPage,
		Total:      total,
		TotalPages: pagination.TotalPages(total),
	})
}

// GetByID handles GET /api/contact/{id} -- returns a single contact submission.
func (h *ContactHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		response.Error(w, http.StatusBadRequest, "invalid contact submission ID")
		return
	}

	submission, err := h.store.GetByID(r.Context(), id)
	if err != nil {
		if errors.Is(err, store.ErrNotFound) {
			response.Error(w, http.StatusNotFound, "contact submission not found")
			return
		}
		h.logger.Error("failed to get contact submission",
			slog.String("error", err.Error()),
			slog.String("id", idStr),
		)
		response.Error(w, http.StatusInternalServerError, "failed to retrieve contact submission")
		return
	}

	response.Success(w, http.StatusOK, submission)
}

// MarkAsRead handles PATCH /api/contact/{id}/read -- marks a submission as read.
func (h *ContactHandler) MarkAsRead(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		response.Error(w, http.StatusBadRequest, "invalid contact submission ID")
		return
	}

	if err := h.store.MarkAsRead(r.Context(), id); err != nil {
		if errors.Is(err, store.ErrNotFound) {
			response.Error(w, http.StatusNotFound, "contact submission not found")
			return
		}
		h.logger.Error("failed to mark contact submission as read",
			slog.String("error", err.Error()),
			slog.String("id", idStr),
		)
		response.Error(w, http.StatusInternalServerError, "failed to update contact submission")
		return
	}

	response.Success(w, http.StatusOK, map[string]string{"status": "marked as read"})
}

// formatValidationErrors converts validator errors into a human-readable string.
func formatValidationErrors(err error) string {
	if validationErrors, ok := err.(validator.ValidationErrors); ok {
		msg := "validation failed: "
		for i, fe := range validationErrors {
			if i > 0 {
				msg += "; "
			}
			msg += fe.Field() + " " + fe.Tag()
		}
		return msg
	}
	return "validation failed"
}
