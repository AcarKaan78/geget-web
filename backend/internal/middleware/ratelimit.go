package middleware

import (
	"net"
	"net/http"
	"sync"
	"time"

	"github.com/geget-org/backend/internal/response"
)

// bucket represents a token bucket for a single client IP.
type bucket struct {
	tokens     float64
	lastRefill time.Time
}

// RateLimiter is a simple in-memory per-IP token-bucket rate limiter.
type RateLimiter struct {
	mu       sync.Mutex
	buckets  map[string]*bucket
	rate     float64 // tokens per second
	capacity float64 // max burst size
}

// NewRateLimiter creates a new RateLimiter with the given rate (requests per second)
// and burst capacity. It starts a background goroutine that periodically cleans up
// stale entries to prevent unbounded memory growth.
func NewRateLimiter(rate float64, capacity float64) *RateLimiter {
	rl := &RateLimiter{
		buckets:  make(map[string]*bucket),
		rate:     rate,
		capacity: capacity,
	}

	// Cleanup stale buckets every 5 minutes.
	go func() {
		ticker := time.NewTicker(5 * time.Minute)
		defer ticker.Stop()
		for range ticker.C {
			rl.cleanup()
		}
	}()

	return rl
}

// allow checks whether the IP is allowed to make a request.
func (rl *RateLimiter) allow(ip string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	now := time.Now()

	b, exists := rl.buckets[ip]
	if !exists {
		rl.buckets[ip] = &bucket{
			tokens:     rl.capacity - 1, // consume one token for the current request
			lastRefill: now,
		}
		return true
	}

	// Refill tokens based on elapsed time.
	elapsed := now.Sub(b.lastRefill).Seconds()
	b.tokens += elapsed * rl.rate
	if b.tokens > rl.capacity {
		b.tokens = rl.capacity
	}
	b.lastRefill = now

	if b.tokens < 1 {
		return false
	}

	b.tokens--
	return true
}

// cleanup removes buckets that have not been used recently.
func (rl *RateLimiter) cleanup() {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	cutoff := time.Now().Add(-10 * time.Minute)
	for ip, b := range rl.buckets {
		if b.lastRefill.Before(cutoff) {
			delete(rl.buckets, ip)
		}
	}
}

// Limit returns HTTP middleware that rate-limits requests by client IP address.
// When the limit is exceeded, a 429 Too Many Requests response is returned.
func (rl *RateLimiter) Limit(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip := extractIP(r)

		if !rl.allow(ip) {
			w.Header().Set("Retry-After", "1")
			response.Error(w, http.StatusTooManyRequests, "rate limit exceeded, please try again later")
			return
		}

		next.ServeHTTP(w, r)
	})
}

// extractIP attempts to get the real client IP from common proxy headers,
// falling back to the remote address.
func extractIP(r *http.Request) string {
	// Check X-Real-IP first (set by nginx).
	if ip := r.Header.Get("X-Real-IP"); ip != "" {
		return ip
	}

	// Check X-Forwarded-For.
	if ip := r.Header.Get("X-Forwarded-For"); ip != "" {
		return ip
	}

	// Fall back to remote address.
	ip, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return ip
}
