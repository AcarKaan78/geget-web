package handler

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/geget-org/backend/internal/model"
	"github.com/geget-org/backend/internal/response"
)

// ProjectHandler handles project-related endpoints.
// Projects are currently served as static data; database integration comes in a future phase.
type ProjectHandler struct{}

// NewProjectHandler creates a new ProjectHandler.
func NewProjectHandler() *ProjectHandler {
	return &ProjectHandler{}
}

// staticProjects holds placeholder project data. In production this will come from the database.
var staticProjects = []model.Project{
	{
		ID:          "1",
		Title:       "Egitim Destegi Programi",
		Description: "Dezavantajli bolgeler icin egitim destek programi.",
		Category:    "education",
		Status:      "active",
		ImageURL:    "/images/projects/education.jpg",
		StartDate:   "2024-01-15",
	},
	{
		ID:          "2",
		Title:       "Cevre Koruma Projesi",
		Description: "Yerel cevre koruma ve agaclandirma projesi.",
		Category:    "environment",
		Status:      "active",
		ImageURL:    "/images/projects/environment.jpg",
		StartDate:   "2024-03-01",
	},
	{
		ID:          "3",
		Title:       "Saglik Taramasi Kampanyasi",
		Description: "Ucretsiz saglik taramasi ve bilinclendirme kampanyasi.",
		Category:    "health",
		Status:      "completed",
		ImageURL:    "/images/projects/health.jpg",
		StartDate:   "2023-09-10",
	},
}

// List handles GET /api/projects — returns all projects.
func (h *ProjectHandler) List(w http.ResponseWriter, r *http.Request) {
	response.Success(w, http.StatusOK, staticProjects)
}

// GetByID handles GET /api/projects/{id} — returns a single project.
func (h *ProjectHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	for _, p := range staticProjects {
		if p.ID == id {
			response.Success(w, http.StatusOK, p)
			return
		}
	}
	response.Error(w, http.StatusNotFound, "project not found")
}
