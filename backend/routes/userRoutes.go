package routes

import (
	controllers "github.com/Animish-Sharma/blog/backend/controllers"
	"github.com/gofiber/fiber"
)

func Route(app *fiber.App) {
	app.Post("/register", controllers.Register)
	app.Post("/login", controllers.Login)
	app.Post("/update", controllers.UserUpdate)
	app.Get("/get-posts", controllers.UserPost)
	app.Get("/user/:username", controllers.OtherProfiles)
}
