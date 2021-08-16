package main

import (
	"log"

	"github.com/Animish-Sharma/blog/backend/database"
	"github.com/Animish-Sharma/blog/backend/routes"
	"github.com/gofiber/fiber"
	"github.com/gofiber/fiber/middleware/cors"
)

func main() {
	database.Connect()
	app := fiber.New()

	app.Use(cors.New())
	routes.Setup(app)
	routes.Route(app)
	routes.ReviewRoutes(app)
	app.Static("/images", "./images")

	log.Fatal(app.Listen(":3000"))
}
