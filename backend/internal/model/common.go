package model

import (
	"net/http"
	"strconv"
	"time"
)

// Pagination holds parsed pagination parameters from a request.
type Pagination struct {
	Page    int
	PerPage int
}

// DefaultPage is the default page number when none is specified.
const DefaultPage = 1

// DefaultPerPage is the default number of items per page.
const DefaultPerPage = 20

// MaxPerPage is the maximum allowed items per page to prevent abuse.
const MaxPerPage = 100

// PaginationFromRequest parses page and per_page query parameters from an HTTP request.
func PaginationFromRequest(r *http.Request) Pagination {
	page := queryInt(r, "page", DefaultPage)
	perPage := queryInt(r, "per_page", DefaultPerPage)

	if page < 1 {
		page = DefaultPage
	}
	if perPage < 1 {
		perPage = DefaultPerPage
	}
	if perPage > MaxPerPage {
		perPage = MaxPerPage
	}

	return Pagination{
		Page:    page,
		PerPage: perPage,
	}
}

// Offset returns the SQL OFFSET value for the current pagination.
func (p Pagination) Offset() int {
	return (p.Page - 1) * p.PerPage
}

// TotalPages calculates the total number of pages for a given total count.
func (p Pagination) TotalPages(total int) int {
	if total <= 0 {
		return 0
	}
	pages := total / p.PerPage
	if total%p.PerPage > 0 {
		pages++
	}
	return pages
}

// queryInt extracts an integer query parameter with a fallback default value.
func queryInt(r *http.Request, key string, defaultVal int) int {
	val := r.URL.Query().Get(key)
	if val == "" {
		return defaultVal
	}
	i, err := strconv.Atoi(val)
	if err != nil {
		return defaultVal
	}
	return i
}

// NowUTC returns the current UTC time, useful for consistent timestamps.
func NowUTC() time.Time {
	return time.Now().UTC()
}

// TimePtr returns a pointer to a time.Time value.
func TimePtr(t time.Time) *time.Time {
	return &t
}

// StringPtr returns a pointer to a string value.
func StringPtr(s string) *string {
	return &s
}
