package model

import (
	"time"

	"github.com/google/uuid"
)

// Member represents a registered member of the organization (Phase 2 - Auth).
type Member struct {
	ID              uuid.UUID  `json:"id" db:"id"`
	Email           string     `json:"email" db:"email" validate:"required,email"`
	PasswordHash    string     `json:"-" db:"password_hash"`
	FirstName       string     `json:"first_name" db:"first_name" validate:"required,min=2,max=100"`
	LastName        string     `json:"last_name" db:"last_name" validate:"required,min=2,max=100"`
	Phone           string     `json:"phone,omitempty" db:"phone" validate:"omitempty,max=20"`
	City            string     `json:"city,omitempty" db:"city" validate:"omitempty,max=100"`
	Bio             string     `json:"bio,omitempty" db:"bio" validate:"omitempty,max=2000"`
	AvatarURL       string     `json:"avatar_url,omitempty" db:"avatar_url"`
	Role            string     `json:"role" db:"role"` // admin, editor, member
	IsActive        bool       `json:"is_active" db:"is_active"`
	EmailVerified   bool       `json:"email_verified" db:"email_verified"`
	EmailVerifiedAt *time.Time `json:"email_verified_at,omitempty" db:"email_verified_at"`
	LastLoginAt     *time.Time `json:"last_login_at,omitempty" db:"last_login_at"`
	CreatedAt       time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt       time.Time  `json:"updated_at" db:"updated_at"`
}

// CreateMemberRequest is the request body for registering a new member.
type CreateMemberRequest struct {
	Email     string `json:"email" validate:"required,email"`
	Password  string `json:"password" validate:"required,min=8,max=128"`
	FirstName string `json:"first_name" validate:"required,min=2,max=100"`
	LastName  string `json:"last_name" validate:"required,min=2,max=100"`
	Phone     string `json:"phone,omitempty" validate:"omitempty,max=20"`
	City      string `json:"city,omitempty" validate:"omitempty,max=100"`
}

// LoginRequest is the request body for member login.
type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

// UpdateMemberRequest is the request body for updating member profile.
type UpdateMemberRequest struct {
	FirstName string `json:"first_name,omitempty" validate:"omitempty,min=2,max=100"`
	LastName  string `json:"last_name,omitempty" validate:"omitempty,min=2,max=100"`
	Phone     string `json:"phone,omitempty" validate:"omitempty,max=20"`
	City      string `json:"city,omitempty" validate:"omitempty,max=100"`
	Bio       string `json:"bio,omitempty" validate:"omitempty,max=2000"`
	AvatarURL string `json:"avatar_url,omitempty"`
}
