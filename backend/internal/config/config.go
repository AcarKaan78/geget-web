package config

import (
	"fmt"

	"github.com/kelseyhightower/envconfig"
)

// Config holds all configuration for the backend application.
type Config struct {
	Port        int    `envconfig:"PORT" default:"8080"`
	Environment string `envconfig:"ENVIRONMENT" default:"development"`
	DatabaseURL string `envconfig:"DATABASE_URL" required:"true"`
	SMTP        SMTPConfig
	JWTSecret   string `envconfig:"JWT_SECRET" default:"change-me-in-production"`
}

// SMTPConfig holds SMTP-related configuration for sending emails.
type SMTPConfig struct {
	Host     string `envconfig:"SMTP_HOST" default:"localhost"`
	Port     int    `envconfig:"SMTP_PORT" default:"587"`
	User     string `envconfig:"SMTP_USER"`
	Password string `envconfig:"SMTP_PASSWORD"`
	From     string `envconfig:"SMTP_FROM" default:"noreply@geget.org"`
}

// IsDevelopment returns true if the application is running in development mode.
func (c *Config) IsDevelopment() bool {
	return c.Environment == "development"
}

// Addr returns the address string for the HTTP server to listen on.
func (c *Config) Addr() string {
	return fmt.Sprintf(":%d", c.Port)
}

// Load reads configuration from environment variables and returns a Config.
func Load() (*Config, error) {
	var cfg Config
	if err := envconfig.Process("", &cfg); err != nil {
		return nil, fmt.Errorf("loading config: %w", err)
	}
	return &cfg, nil
}
