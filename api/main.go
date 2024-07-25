package main

import (
	"fmt"
	"github.com/PrashanthSai-K/DeployGenie/api/database"
	"github.com/PrashanthSai-K/DeployGenie/api/router"
	"github.com/gofiber/fiber/v2"
)

func main() {

	fmt.Println("Helloworld...!!!")

	app := fiber.New()

	database.ConnectDB()

	router.SetUpRoutes(app)

	app.Listen(":3500")
}
