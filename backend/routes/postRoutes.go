package routes

import (
	controllers "github.com/Animish-Sharma/blog/backend/controllers"
	"github.com/gofiber/fiber"
)

func Setup(app *fiber.App) {
	app.Get("/api/posts", controllers.PostList)
	app.Get("/api/post/:slug", controllers.PostDetail)
	app.Post("/api/post/create", controllers.PostCreate)
	app.Post("/api/post/update", controllers.PostUpdate)
	app.Delete("/api/post/delete/:slug", controllers.PostDelete)
	app.Post("/api/category", controllers.CategorySearch)
}
