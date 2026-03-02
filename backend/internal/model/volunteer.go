package model

import (
	"time"

	"github.com/google/uuid"
)

// VolunteerPosition represents an open volunteer position within the organization.
// Fields match the volunteer_positions table in migration 000006.
type VolunteerPosition struct {
	ID            uuid.UUID `json:"id" db:"id"`
	Title         string    `json:"title" db:"title" validate:"required,min=2,max=255"`
	Description   string    `json:"description,omitempty" db:"description"`
	Requirements  string    `json:"requirements,omitempty" db:"requirements"`
	Department    string    `json:"department,omitempty" db:"department" validate:"omitempty,max=100"`
	IsActive      bool      `json:"is_active" db:"is_active"`
	MaxVolunteers int       `json:"max_volunteers" db:"max_volunteers"`
	CreatedAt     time.Time `json:"created_at" db:"created_at"`
}

// VolunteerApplication represents an application to a volunteer position.
// Fields match the volunteer_applications table in migration 000006.
type VolunteerApplication struct {
	ID             uuid.UUID  `json:"id" db:"id"`
	PositionID     *uuid.UUID `json:"position_id,omitempty" db:"position_id"`
	MemberID       *uuid.UUID `json:"member_id,omitempty" db:"member_id"`
	ApplicantName  string     `json:"applicant_name" db:"applicant_name" validate:"required,min=2,max=255"`
	ApplicantEmail string     `json:"applicant_email" db:"applicant_email" validate:"required,email"`
	ApplicantPhone string     `json:"applicant_phone,omitempty" db:"applicant_phone" validate:"omitempty,max=20"`
	Motivation     string     `json:"motivation,omitempty" db:"motivation"`
	Experience     string     `json:"experience,omitempty" db:"experience"`
	Availability   string     `json:"availability,omitempty" db:"availability" validate:"omitempty,max=255"`
	Status         string     `json:"status" db:"status"` // pending, approved, rejected
	ReviewedBy     *uuid.UUID `json:"reviewed_by,omitempty" db:"reviewed_by"`
	ReviewedAt     *time.Time `json:"reviewed_at,omitempty" db:"reviewed_at"`
	CreatedAt      time.Time  `json:"created_at" db:"created_at"`
}

// CreateVolunteerApplicationRequest is the request body for submitting a volunteer application.
type CreateVolunteerApplicationRequest struct {
	PositionID     *uuid.UUID `json:"position_id,omitempty"`
	ApplicantName  string     `json:"applicant_name" validate:"required,min=2,max=255"`
	ApplicantEmail string     `json:"applicant_email" validate:"required,email"`
	ApplicantPhone string     `json:"applicant_phone,omitempty" validate:"omitempty,max=20"`
	Motivation     string     `json:"motivation,omitempty"`
	Experience     string     `json:"experience,omitempty"`
	Availability   string     `json:"availability,omitempty" validate:"omitempty,max=255"`
}
