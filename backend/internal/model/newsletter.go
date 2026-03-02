package model

import (
	"time"

	"github.com/google/uuid"
)

// NewsletterSubscriber represents an email newsletter subscriber.
type NewsletterSubscriber struct {
	ID               uuid.UUID  `json:"id" db:"id"`
	Email            string     `json:"email" db:"email" validate:"required,email"`
	Name             string     `json:"name,omitempty" db:"name" validate:"omitempty,max=255"`
	IsActive         bool       `json:"is_active" db:"is_active"`
	Confirmed        bool       `json:"confirmed" db:"confirmed"`
	ConfirmToken     string     `json:"-" db:"confirm_token"`
	UnsubscribeToken string     `json:"-" db:"unsubscribe_token"`
	SubscribedAt     time.Time  `json:"subscribed_at" db:"subscribed_at"`
	ConfirmedAt      *time.Time `json:"confirmed_at,omitempty" db:"confirmed_at"`
	UnsubscribedAt   *time.Time `json:"unsubscribed_at,omitempty" db:"unsubscribed_at"`
}

// SubscribeRequest is the request body for subscribing to the newsletter.
type SubscribeRequest struct {
	Email string `json:"email" validate:"required,email"`
	Name  string `json:"name,omitempty" validate:"omitempty,max=255"`
}
