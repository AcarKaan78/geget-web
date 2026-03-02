package handler

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/geget-org/backend/internal/model"
	"github.com/geget-org/backend/internal/response"
)

// TeamHandler handles team member endpoints.
// Team data is currently served as static data; database integration comes in a future phase.
type TeamHandler struct{}

// NewTeamHandler creates a new TeamHandler.
func NewTeamHandler() *TeamHandler {
	return &TeamHandler{}
}

// staticTeam holds placeholder team data.
var staticTeam = []model.TeamMember{
	{
		ID:       "1",
		Name:     "Ahmet Yilmaz",
		Role:     "Baskan",
		Bio:      "Kurucu baskan, 10 yillik sivil toplum deneyimi.",
		ImageURL: "/images/team/ahmet.jpg",
		Social: model.Social{
			LinkedIn:  "https://linkedin.com/in/ahmetyilmaz",
			Twitter:   "https://twitter.com/ahmetyilmaz",
			Instagram: "https://instagram.com/ahmetyilmaz",
		},
	},
	{
		ID:       "2",
		Name:     "Ayse Demir",
		Role:     "Genel Sekreter",
		Bio:      "Proje yonetimi ve stratejik planlama uzmani.",
		ImageURL: "/images/team/ayse.jpg",
		Social: model.Social{
			LinkedIn: "https://linkedin.com/in/aysedemir",
		},
	},
}

// List handles GET /api/team — returns all team members.
func (h *TeamHandler) List(w http.ResponseWriter, r *http.Request) {
	response.Success(w, http.StatusOK, staticTeam)
}

// GetByID handles GET /api/team/{id} — returns a single team member.
func (h *TeamHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	for _, m := range staticTeam {
		if m.ID == id {
			response.Success(w, http.StatusOK, m)
			return
		}
	}
	response.Error(w, http.StatusNotFound, "team member not found")
}
