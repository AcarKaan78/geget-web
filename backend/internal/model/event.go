package model

import (
	"time"

	"github.com/google/uuid"
)

// Event represents an event organized by the NGO.
// Fields match the events table in migration 000003.
type Event struct {
	ID              uuid.UUID  `json:"id" db:"id"`
	Title           string     `json:"title" db:"title" validate:"required,min=2,max=500"`
	Slug            string     `json:"slug" db:"slug"`
	Description     string     `json:"description,omitempty" db:"description"`
	Content         string     `json:"content,omitempty" db:"content"`
	Location        string     `json:"location,omitempty" db:"location" validate:"omitempty,max=500"`
	Latitude        *float64   `json:"latitude,omitempty" db:"latitude"`
	Longitude       *float64   `json:"longitude,omitempty" db:"longitude"`
	StartDate       time.Time  `json:"start_date" db:"start_date" validate:"required"`
	EndDate         *time.Time `json:"end_date,omitempty" db:"end_date"`
	MaxParticipants int        `json:"max_participants" db:"max_participants"`
	CoverImageURL   string     `json:"cover_image_url,omitempty" db:"cover_image_url"`
	IsPublished     bool       `json:"is_published" db:"is_published"`
	IsFree          bool       `json:"is_free" db:"is_free"`
	Price           *float64   `json:"price,omitempty" db:"price"`
	Currency        string     `json:"currency,omitempty" db:"currency"`
	CreatedBy       *uuid.UUID `json:"created_by,omitempty" db:"created_by"`
	CreatedAt       time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt       time.Time  `json:"updated_at" db:"updated_at"`
}

// EventRegistration represents a user registration for an event.
// Fields match the event_registrations table in migration 000003.
type EventRegistration struct {
	ID           uuid.UUID  `json:"id" db:"id"`
	EventID      uuid.UUID  `json:"event_id" db:"event_id"`
	MemberID     *uuid.UUID `json:"member_id,omitempty" db:"member_id"`
	GuestName    string     `json:"guest_name,omitempty" db:"guest_name"`
	GuestEmail   string     `json:"guest_email,omitempty" db:"guest_email"`
	Status       string     `json:"status" db:"status"` // registered, attended, cancelled
	RegisteredAt time.Time  `json:"registered_at" db:"registered_at"`
}

// CreateEventRequest is the request body for creating a new event.
type CreateEventRequest struct {
	Title           string     `json:"title" validate:"required,min=2,max=500"`
	Description     string     `json:"description,omitempty"`
	Content         string     `json:"content,omitempty"`
	Location        string     `json:"location,omitempty" validate:"omitempty,max=500"`
	Latitude        *float64   `json:"latitude,omitempty"`
	Longitude       *float64   `json:"longitude,omitempty"`
	StartDate       time.Time  `json:"start_date" validate:"required"`
	EndDate         *time.Time `json:"end_date,omitempty"`
	MaxParticipants int        `json:"max_participants,omitempty" validate:"omitempty,min=0"`
	CoverImageURL   string     `json:"cover_image_url,omitempty"`
	IsFree          bool       `json:"is_free"`
	Price           *float64   `json:"price,omitempty"`
	Currency        string     `json:"currency,omitempty"`
}

// CreateEventRegistrationRequest is the request body for registering to an event.
type CreateEventRegistrationRequest struct {
	GuestName  string `json:"guest_name" validate:"required,min=2,max=255"`
	GuestEmail string `json:"guest_email" validate:"required,email"`
}
