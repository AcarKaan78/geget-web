package model

// Project represents an NGO project or initiative.
type Project struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Category    string `json:"category"`
	Status      string `json:"status"` // active, completed, upcoming
	ImageURL    string `json:"image_url"`
	StartDate   string `json:"start_date"`
}
