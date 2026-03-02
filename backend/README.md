# GEGET Backend API

Go backend service for the GEGET NGO website. Built with [chi](https://github.com/go-chi/chi) router, PostgreSQL, and structured logging via `slog`.

## Architecture

```
backend/
├── cmd/server/main.go          # Application entry point
├── internal/
│   ├── config/                 # Environment-based configuration
│   ├── server/                 # HTTP server with graceful shutdown
│   ├── middleware/             # HTTP middleware (logging, recovery, rate-limit, auth)
│   ├── response/              # JSON response helpers
│   ├── model/                 # Domain models and request DTOs
│   ├── store/                 # Database access layer (PostgreSQL)
│   ├── service/               # Business logic services (mail, etc.)
│   ├── handler/               # HTTP request handlers
│   └── router/                # Route registration
├── migrations/                # SQL migration files
├── Dockerfile                 # Multi-stage Docker build
└── go.mod                     # Go module definition
```

## API Endpoints

### Active Endpoints

| Method | Path                        | Description                      |
|--------|-----------------------------|----------------------------------|
| GET    | `/api/healthz`              | Health check                     |
| GET    | `/api/readyz`               | Readiness check                  |
| POST   | `/api/contact`              | Submit contact form              |
| GET    | `/api/contact`              | List contact submissions (admin) |
| GET    | `/api/contact/{id}`         | Get contact submission by ID     |
| PATCH  | `/api/contact/{id}/read`    | Mark submission as read          |
| GET    | `/api/projects`             | List all projects                |
| GET    | `/api/projects/{id}`        | Get project by ID                |
| GET    | `/api/team`                 | List all team members            |
| GET    | `/api/team/{id}`            | Get team member by ID            |

### Scaffolded Endpoints (501 Not Implemented)

| Method | Path                              | Description                        |
|--------|-----------------------------------|------------------------------------|
| POST   | `/api/members/register`           | Register a new member              |
| POST   | `/api/members/login`              | Member login                       |
| GET    | `/api/members/me`                 | Get current member profile         |
| PUT    | `/api/members/me`                 | Update current member profile      |
| GET    | `/api/members`                    | List all members (admin)           |
| GET    | `/api/events`                     | List events                        |
| GET    | `/api/events/{id}`                | Get event by ID                    |
| POST   | `/api/events`                     | Create event                       |
| POST   | `/api/events/{id}/register`       | Register for event                 |
| GET    | `/api/blog`                       | List blog posts                    |
| GET    | `/api/blog/categories`            | List blog categories               |
| GET    | `/api/blog/tags`                  | List blog tags                     |
| GET    | `/api/blog/{slug}`                | Get blog post by slug              |
| POST   | `/api/blog`                       | Create blog post                   |
| PUT    | `/api/blog/{slug}`                | Update blog post                   |
| DELETE | `/api/blog/{slug}`                | Delete blog post                   |
| POST   | `/api/donations`                  | Make a donation                    |
| GET    | `/api/donations/campaigns`        | List donation campaigns            |
| GET    | `/api/donations/campaigns/{id}`   | Get campaign by ID                 |
| GET    | `/api/volunteers/positions`       | List volunteer positions           |
| GET    | `/api/volunteers/positions/{id}`  | Get volunteer position by ID       |
| POST   | `/api/volunteers/apply`           | Apply for volunteer position       |
| GET    | `/api/volunteers/applications`    | List applications (admin)          |
| POST   | `/api/newsletter/subscribe`       | Subscribe to newsletter            |
| POST   | `/api/newsletter/unsubscribe`     | Unsubscribe from newsletter        |
| GET    | `/api/newsletter/subscribers`     | List subscribers (admin)           |

## Request/Response Format

All responses use a standard JSON envelope:

### Success Response

```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "error": "error message here"
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 42,
    "total_pages": 3
  }
}
```

### Contact Form Example

**Request:**

```bash
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ali Veli",
    "email": "ali@example.com",
    "subject": "Volunteering inquiry",
    "message": "I would like to learn about volunteering opportunities."
  }'
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Ali Veli",
    "email": "ali@example.com",
    "subject": "Volunteering inquiry",
    "message": "I would like to learn about volunteering opportunities.",
    "is_read": false,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

## Environment Variables

| Variable         | Required | Default                | Description                      |
|------------------|----------|------------------------|----------------------------------|
| `PORT`           | No       | `8080`                 | HTTP server port                 |
| `ENVIRONMENT`    | No       | `development`          | Runtime environment              |
| `DATABASE_URL`   | Yes      | —                      | PostgreSQL connection string     |
| `SMTP_HOST`      | No       | `localhost`            | SMTP server hostname             |
| `SMTP_PORT`      | No       | `587`                  | SMTP server port                 |
| `SMTP_USER`      | No       | —                      | SMTP username                    |
| `SMTP_PASSWORD`  | No       | —                      | SMTP password                    |
| `SMTP_FROM`      | No       | `noreply@geget.org`    | Sender email address             |
| `JWT_SECRET`     | No       | `change-me-in-production` | JWT signing secret (Phase 2)  |

## Database Migrations

Migrations run automatically on server startup using [golang-migrate](https://github.com/golang-migrate/migrate). Migration files are located in `migrations/`.

To create a new migration:

```bash
# Install migrate CLI
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

# Create migration
migrate create -ext sql -dir migrations -seq <migration_name>
```

To run migrations manually via Docker:

```bash
make migrate-up
make migrate-down
```

## Development

```bash
# Start all services (backend, frontend, db) in dev mode
make dev

# View logs
make logs

# Run tests
make test
```

## Docker Build

The backend uses a multi-stage Docker build:

1. **Builder stage**: Compiles the Go binary with `CGO_ENABLED=0` for a static binary.
2. **Runtime stage**: Alpine-based minimal image with only the binary and migrations.

```bash
docker build -t geget-backend ./backend
```
