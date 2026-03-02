package store

import "errors"

// Common store errors used across all store implementations.
var (
	// ErrNotFound is returned when a requested resource does not exist.
	ErrNotFound = errors.New("resource not found")

	// ErrDuplicate is returned when a unique constraint is violated.
	ErrDuplicate = errors.New("resource already exists")

	// ErrNotImplemented is returned by scaffolded store methods that are
	// not yet implemented.
	ErrNotImplemented = errors.New("not implemented")
)
