package main

import (
	"context"
	"fmt"
	"log/slog"
	"os"
	"time"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/geget-org/backend/internal/config"
	"github.com/geget-org/backend/internal/handler"
	"github.com/geget-org/backend/internal/router"
	"github.com/geget-org/backend/internal/server"
	"github.com/geget-org/backend/internal/service"
	"github.com/geget-org/backend/internal/store"
)

func main() {
	// ---- Logger ----
	logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}))
	slog.SetDefault(logger)

	// ---- Config ----
	cfg, err := config.Load()
	if err != nil {
		logger.Error("failed to load configuration", slog.String("error", err.Error()))
		os.Exit(1)
	}

	logger.Info("configuration loaded",
		slog.String("environment", cfg.Environment),
		slog.Int("port", cfg.Port),
	)

	// ---- Database Connection (with retry) ----
	pool, err := connectDB(cfg.DatabaseURL, logger)
	if err != nil {
		logger.Error("failed to connect to database", slog.String("error", err.Error()))
		os.Exit(1)
	}
	defer pool.Close()

	logger.Info("database connection established")

	// ---- Migrations ----
	if err := runMigrations(cfg.DatabaseURL, logger); err != nil {
		logger.Error("failed to run migrations", slog.String("error", err.Error()))
		os.Exit(1)
	}

	// ---- Stores ----
	contactStore := store.NewContactStore(pool)

	// ---- Services ----
	mailService := service.NewMailService(cfg.SMTP, logger)

	// ---- Handlers ----
	healthHandler := handler.NewHealthHandler()
	contactHandler := handler.NewContactHandler(contactStore, mailService, logger)
	projectHandler := handler.NewProjectHandler()
	teamHandler := handler.NewTeamHandler()
	memberHandler := handler.NewMemberHandler()
	eventHandler := handler.NewEventHandler()
	blogHandler := handler.NewBlogHandler()
	donationHandler := handler.NewDonationHandler()
	volunteerHandler := handler.NewVolunteerHandler()
	newsletterHandler := handler.NewNewsletterHandler()

	// ---- Router ----
	r := router.New(router.Handlers{
		Health:     healthHandler,
		Contact:    contactHandler,
		Project:    projectHandler,
		Team:       teamHandler,
		Member:     memberHandler,
		Event:      eventHandler,
		Blog:       blogHandler,
		Donation:   donationHandler,
		Volunteer:  volunteerHandler,
		Newsletter: newsletterHandler,
	}, logger)

	// ---- Server ----
	srv := server.New(cfg.Addr(), r, logger)

	logger.Info("starting GEGET backend server")

	if err := srv.Start(); err != nil {
		logger.Error("server error", slog.String("error", err.Error()))
		os.Exit(1)
	}
}

// connectDB connects to PostgreSQL with retry logic.
// It attempts up to 5 connections with a 2-second backoff between each attempt.
func connectDB(databaseURL string, logger *slog.Logger) (*pgxpool.Pool, error) {
	var pool *pgxpool.Pool
	var err error

	const maxAttempts = 5
	const backoff = 2 * time.Second

	for attempt := 1; attempt <= maxAttempts; attempt++ {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)

		pool, err = pgxpool.New(ctx, databaseURL)
		if err != nil {
			cancel()
			logger.Warn("database connection attempt failed",
				slog.Int("attempt", attempt),
				slog.Int("max_attempts", maxAttempts),
				slog.String("error", err.Error()),
			)
			if attempt < maxAttempts {
				time.Sleep(backoff)
			}
			continue
		}

		// Verify the connection is actually alive.
		if err = pool.Ping(ctx); err != nil {
			cancel()
			pool.Close()
			logger.Warn("database ping failed",
				slog.Int("attempt", attempt),
				slog.Int("max_attempts", maxAttempts),
				slog.String("error", err.Error()),
			)
			if attempt < maxAttempts {
				time.Sleep(backoff)
			}
			continue
		}

		cancel()
		logger.Info("database connected", slog.Int("attempt", attempt))
		return pool, nil
	}

	return nil, fmt.Errorf("failed to connect to database after %d attempts: %w", maxAttempts, err)
}

// runMigrations executes pending database migrations from the filesystem.
// The Dockerfile copies migration files into the container's /app/migrations/ directory.
func runMigrations(databaseURL string, logger *slog.Logger) error {
	m, err := migrate.New("file://migrations", databaseURL)
	if err != nil {
		return fmt.Errorf("creating migrate instance: %w", err)
	}
	defer m.Close()

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		return fmt.Errorf("running migrations: %w", err)
	}

	version, dirty, _ := m.Version()
	logger.Info("migrations completed",
		slog.Uint64("version", uint64(version)),
		slog.Bool("dirty", dirty),
	)

	return nil
}
