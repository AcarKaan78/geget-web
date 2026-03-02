package service

import (
	"fmt"
	"log/slog"

	"github.com/wneessen/go-mail"

	"github.com/geget-org/backend/internal/config"
	"github.com/geget-org/backend/internal/model"
)

// MailService handles sending emails via SMTP.
type MailService struct {
	cfg    config.SMTPConfig
	logger *slog.Logger
}

// NewMailService creates a new MailService.
func NewMailService(cfg config.SMTPConfig, logger *slog.Logger) *MailService {
	return &MailService{
		cfg:    cfg,
		logger: logger,
	}
}

// SendContactNotification sends an email notification when a new contact
// form submission is received.
func (s *MailService) SendContactNotification(submission *model.ContactSubmission) error {
	m := mail.NewMsg()

	if err := m.From(s.cfg.From); err != nil {
		return fmt.Errorf("setting from address: %w", err)
	}

	if err := m.To(s.cfg.From); err != nil {
		return fmt.Errorf("setting to address: %w", err)
	}

	m.Subject(fmt.Sprintf("New Contact Form Submission: %s", submission.Subject))

	body := fmt.Sprintf(
		"New contact form submission received:\n\n"+
			"Name: %s\n"+
			"Email: %s\n"+
			"Subject: %s\n\n"+
			"Message:\n%s\n\n"+
			"Submitted at: %s\n",
		submission.Name,
		submission.Email,
		submission.Subject,
		submission.Message,
		submission.CreatedAt.Format("2006-01-02 15:04:05 UTC"),
	)
	m.SetBodyString(mail.TypeTextPlain, body)

	// Build SMTP client options.
	opts := []mail.Option{
		mail.WithPort(s.cfg.Port),
		mail.WithSMTPAuth(mail.SMTPAuthPlain),
		mail.WithUsername(s.cfg.User),
		mail.WithPassword(s.cfg.Password),
	}

	if s.cfg.Port == 465 {
		opts = append(opts, mail.WithSSL())
	} else {
		opts = append(opts, mail.WithTLSPolicy(mail.TLSOpportunistic))
	}

	c, err := mail.NewClient(s.cfg.Host, opts...)
	if err != nil {
		return fmt.Errorf("creating mail client: %w", err)
	}

	if err := c.DialAndSend(m); err != nil {
		s.logger.Error("failed to send contact notification email",
			slog.String("error", err.Error()),
			slog.String("to", s.cfg.From),
		)
		return fmt.Errorf("sending email: %w", err)
	}

	s.logger.Info("contact notification email sent",
		slog.String("submission_id", submission.ID.String()),
	)

	return nil
}
