package routes

import (
	controllers "github.com/Animish-Sharma/blog/backend/controllers"
	"github.com/gofiber/fiber"
)

func ReviewRoutes(app *fiber.App) {
	app.Post("/api/review/create", controllers.ReviewCreate)
	app.Put("/api/review/update", controllers.ReviewUpdate)
	app.Delete("/api/review/delete/:id", controllers.ReviewDelete)
}
