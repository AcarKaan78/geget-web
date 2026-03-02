package model

import (
	"time"

	"github.com/google/uuid"
)

// Donation represents a financial donation made to the organization.
// Fields match the donations table in migration 000005.
type Donation struct {
	ID               uuid.UUID  `json:"id" db:"id"`
	CampaignID       *uuid.UUID `json:"campaign_id,omitempty" db:"campaign_id"`
	MemberID         *uuid.UUID `json:"member_id,omitempty" db:"member_id"`
	DonorName        string     `json:"donor_name,omitempty" db:"donor_name"`
	DonorEmail       string     `json:"donor_email,omitempty" db:"donor_email"`
	Amount           float64    `json:"amount" db:"amount" validate:"required,gt=0"`
	Currency         string     `json:"currency" db:"currency"`
	PaymentMethod    string     `json:"payment_method,omitempty" db:"payment_method"`
	PaymentReference string     `json:"payment_reference,omitempty" db:"payment_reference"`
	Status           string     `json:"status" db:"status"` // pending, completed, failed, refunded
	IsAnonymous      bool       `json:"is_anonymous" db:"is_anonymous"`
	Message          string     `json:"message,omitempty" db:"message"`
	CreatedAt        time.Time  `json:"created_at" db:"created_at"`
}

// DonationCampaign represents a fundraising campaign.
// Fields match the donation_campaigns table in migration 000005.
type DonationCampaign struct {
	ID            uuid.UUID  `json:"id" db:"id"`
	Title         string     `json:"title" db:"title" validate:"required,min=2,max=500"`
	Slug          string     `json:"slug" db:"slug"`
	Description   string     `json:"description,omitempty" db:"description"`
	GoalAmount    *float64   `json:"goal_amount,omitempty" db:"goal_amount"`
	Currency      string     `json:"currency" db:"currency"`
	StartDate     *time.Time `json:"start_date,omitempty" db:"start_date"`
	EndDate       *time.Time `json:"end_date,omitempty" db:"end_date"`
	IsActive      bool       `json:"is_active" db:"is_active"`
	CoverImageURL string     `json:"cover_image_url,omitempty" db:"cover_image_url"`
	CreatedAt     time.Time  `json:"created_at" db:"created_at"`
}

// CreateDonationRequest is the request body for making a donation.
type CreateDonationRequest struct {
	CampaignID  *uuid.UUID `json:"campaign_id,omitempty"`
	DonorName   string     `json:"donor_name" validate:"required,min=2,max=255"`
	DonorEmail  string     `json:"donor_email" validate:"required,email"`
	Amount      float64    `json:"amount" validate:"required,gt=0"`
	Currency    string     `json:"currency" validate:"omitempty,len=3"`
	IsAnonymous bool       `json:"is_anonymous"`
	Message     string     `json:"message,omitempty" validate:"omitempty,max=1000"`
}
