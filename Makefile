.PHONY: dev build up down logs migrate-up migrate-down test lint clean

# Development
dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# Production
build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

# Database
migrate-up:
	docker compose exec backend /app/server migrate up

migrate-down:
	docker compose exec backend /app/server migrate down 1

# Testing
test:
	cd frontend && npm test
	docker compose exec backend go test ./...

# Linting
lint:
	cd frontend && npm run lint

# Cleanup
clean:
	docker compose down -v --rmi local
