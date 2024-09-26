package router

import (
	authRoutes "github.com/PrashanthSai-K/DeployGenie/api/src/routes/auth"
	containerRoutes "github.com/PrashanthSai-K/DeployGenie/api/src/routes/container"
	gitlabRoutes "github.com/PrashanthSai-K/DeployGenie/api/src/routes/gitlab"
	imageRoutes "github.com/PrashanthSai-K/DeployGenie/api/src/routes/image"
	portRoutes "github.com/PrashanthSai-K/DeployGenie/api/src/routes/ports"
	userRoutes "github.com/PrashanthSai-K/DeployGenie/api/src/routes/user"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetUpRoutes(app *fiber.App) {

	api := app.Group("/v1/api/", logger.New())

	api.Get("/", func(c *fiber.Ctx) error {
		err := c.SendString(" Hiii from /api !!!")
		return err
	})

	userRoutes.SetUpUserRoutes(api)

	containerRoutes.SetUpContainerRoutes(api)

	authRoutes.SetUpAuthRoutes(api)

	portRoutes.SetUpPortRoutes(api)

	imageRoutes.SetUPImageRoutes(api)

	gitlabRoutes.SetUpGitlsbRoutes(api)
	
}
