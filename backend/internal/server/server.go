package server

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

// Server wraps the standard http.Server with graceful shutdown capabilities.
type Server struct {
	httpServer *http.Server
	logger     *slog.Logger
}

// New creates a new Server with the given address and handler.
func New(addr string, handler http.Handler, logger *slog.Logger) *Server {
	return &Server{
		httpServer: &http.Server{
			Addr:         addr,
			Handler:      handler,
			ReadTimeout:  15 * time.Second,
			WriteTimeout: 15 * time.Second,
			IdleTimeout:  60 * time.Second,
		},
		logger: logger,
	}
}

// Start begins listening for HTTP requests and blocks until a shutdown signal
// (SIGINT or SIGTERM) is received. It then gracefully drains connections with
// a 30-second timeout before returning.
func (s *Server) Start() error {
	// Channel to receive shutdown signals.
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	// Channel to receive server errors.
	errCh := make(chan error, 1)

	go func() {
		s.logger.Info("server starting", slog.String("addr", s.httpServer.Addr))
		if err := s.httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			errCh <- fmt.Errorf("server listen: %w", err)
		}
	}()

	// Wait for either a shutdown signal or a server error.
	select {
	case sig := <-quit:
		s.logger.Info("shutdown signal received", slog.String("signal", sig.String()))
	case err := <-errCh:
		s.logger.Error("server error", slog.String("error", err.Error()))
		return err
	}

	// Graceful shutdown with a 30-second timeout.
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	s.logger.Info("shutting down server gracefully", slog.Duration("timeout", 30*time.Second))

	if err := s.httpServer.Shutdown(ctx); err != nil {
		s.logger.Error("server forced to shutdown", slog.String("error", err.Error()))
		return fmt.Errorf("server shutdown: %w", err)
	}

	s.logger.Info("server stopped gracefully")
	return nil
}
