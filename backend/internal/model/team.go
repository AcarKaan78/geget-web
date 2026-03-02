package model

// TeamMember represents a member of the organization's team displayed on the website.
type TeamMember struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Role     string `json:"role"`
	Bio      string `json:"bio"`
	ImageURL string `json:"image_url"`
	Social   Social `json:"social"`
}

// Social holds social media links for a team member.
type Social struct {
	LinkedIn  string `json:"linkedin,omitempty"`
	Twitter   string `json:"twitter,omitempty"`
	Instagram string `json:"instagram,omitempty"`
}
