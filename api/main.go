package main

import (
	"fmt"
	"github.com/PrashanthSai-K/DeployGenie/api/database"
	"github.com/PrashanthSai-K/DeployGenie/api/router"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	fmt.Println("Helloworld...!!!")

	app := fiber.New()
	app.Use(cors.New())

	database.ConnectDB()

	router.SetUpRoutes(app)

	app.Listen(":3500")
}
