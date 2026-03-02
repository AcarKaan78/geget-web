package router

import (
	"log/slog"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"

	"github.com/geget-org/backend/internal/handler"
	"github.com/geget-org/backend/internal/middleware"
)

// Handlers bundles all handler instances needed to build the router.
type Handlers struct {
	Health     *handler.HealthHandler
	Contact    *handler.ContactHandler
	Project    *handler.ProjectHandler
	Team       *handler.TeamHandler
	Member     *handler.MemberHandler
	Event      *handler.EventHandler
	Blog       *handler.BlogHandler
	Donation   *handler.DonationHandler
	Volunteer  *handler.VolunteerHandler
	Newsletter *handler.NewsletterHandler
}

// New creates and configures the chi router with all middleware and routes.
func New(h Handlers, logger *slog.Logger) *chi.Mux {
	r := chi.NewRouter()

	// --- Global Middleware ---
	r.Use(middleware.RequestID)
	r.Use(middleware.Recoverer(logger))
	r.Use(middleware.Logging(logger))

	// CORS — allow the frontend to talk to the API.
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "https://geget.org", "https://www.geget.org"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-Request-ID"},
		ExposedHeaders:   []string{"X-Request-ID"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Rate limiting: 10 requests/second, burst of 20.
	limiter := middleware.NewRateLimiter(10, 20)
	r.Use(limiter.Limit)

	// --- Routes ---
	r.Route("/api", func(api chi.Router) {

		// Health checks (no auth).
		api.Get("/healthz", h.Health.Healthz)
		api.Get("/readyz", h.Health.Readyz)

		// Contact form (public POST, admin GET).
		api.Route("/contact", func(cr chi.Router) {
			cr.Post("/", h.Contact.Create)
			cr.Get("/", h.Contact.List)         // TODO: protect with auth in Phase 2
			cr.Get("/{id}", h.Contact.GetByID)  // TODO: protect with auth in Phase 2
			cr.Patch("/{id}/read", h.Contact.MarkAsRead) // TODO: protect with auth in Phase 2
		})

		// Projects (public).
		api.Route("/projects", func(pr chi.Router) {
			pr.Get("/", h.Project.List)
			pr.Get("/{id}", h.Project.GetByID)
		})

		// Team (public).
		api.Route("/team", func(tr chi.Router) {
			tr.Get("/", h.Team.List)
			tr.Get("/{id}", h.Team.GetByID)
		})

		// Members (scaffolded — Phase 2).
		api.Route("/members", func(mr chi.Router) {
			mr.Post("/register", h.Member.Register)
			mr.Post("/login", h.Member.Login)
			mr.Get("/me", h.Member.GetProfile)
			mr.Put("/me", h.Member.UpdateProfile)
			mr.Get("/", h.Member.List) // admin
		})

		// Events (scaffolded).
		api.Route("/events", func(er chi.Router) {
			er.Get("/", h.Event.List)
			er.Get("/{id}", h.Event.GetByID)
			er.Post("/", h.Event.Create)
			er.Post("/{id}/register", h.Event.Register)
		})

		// Blog (scaffolded).
		api.Route("/blog", func(br chi.Router) {
			br.Get("/", h.Blog.List)
			br.Get("/categories", h.Blog.ListCategories)
			br.Get("/tags", h.Blog.ListTags)
			br.Get("/{slug}", h.Blog.GetBySlug)
			br.Post("/", h.Blog.Create)
			br.Put("/{slug}", h.Blog.Update)
			br.Delete("/{slug}", h.Blog.Delete)
		})

		// Donations (scaffolded).
		api.Route("/donations", func(dr chi.Router) {
			dr.Post("/", h.Donation.Create)
			dr.Get("/campaigns", h.Donation.ListCampaigns)
			dr.Get("/campaigns/{id}", h.Donation.GetCampaign)
		})

		// Volunteers (scaffolded).
		api.Route("/volunteers", func(vr chi.Router) {
			vr.Get("/positions", h.Volunteer.ListPositions)
			vr.Get("/positions/{id}", h.Volunteer.GetPosition)
			vr.Post("/apply", h.Volunteer.Apply)
			vr.Get("/applications", h.Volunteer.ListApplications) // admin
		})

		// Newsletter (scaffolded).
		api.Route("/newsletter", func(nr chi.Router) {
			nr.Post("/subscribe", h.Newsletter.Subscribe)
			nr.Post("/unsubscribe", h.Newsletter.Unsubscribe)
			nr.Get("/subscribers", h.Newsletter.ListSubscribers) // admin
		})
	})

	return r
}
