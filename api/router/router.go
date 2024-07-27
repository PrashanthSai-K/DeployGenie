package router

import (
	containerRoutes "github.com/PrashanthSai-K/DeployGenie/api/src/routes/container"
	userRoutes "github.com/PrashanthSai-K/DeployGenie/api/src/routes/user"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetUpRoutes(app *fiber.App) {

	api := app.Group("api/", logger.New())

	api.Get("/", func(c *fiber.Ctx) error {
		err := c.SendString(" Hiii from /api !!!")
		return err
	})

	userRoutes.SetUpUserRoutes(api)

	containerRoutes.SetUpContainerRoutes(api)
}
