package model

import (
	"time"

	"github.com/google/uuid"
)

// ContactSubmission represents a message submitted through the contact form.
type ContactSubmission struct {
	ID        uuid.UUID  `json:"id" db:"id"`
	Name      string     `json:"name" db:"name" validate:"required,min=2,max=255"`
	Email     string     `json:"email" db:"email" validate:"required,email"`
	Subject   string     `json:"subject" db:"subject" validate:"required,min=2,max=500"`
	Message   string     `json:"message" db:"message" validate:"required,min=10"`
	IsRead    bool       `json:"is_read" db:"is_read"`
	ReadAt    *time.Time `json:"read_at,omitempty" db:"read_at"`
	CreatedAt time.Time  `json:"created_at" db:"created_at"`
}

// CreateContactRequest is the request body for creating a new contact submission.
type CreateContactRequest struct {
	Name    string `json:"name" validate:"required,min=2,max=255"`
	Email   string `json:"email" validate:"required,email"`
	Subject string `json:"subject" validate:"required,min=2,max=500"`
	Message string `json:"message" validate:"required,min=10"`
}
