package containerRoutes

import (
	containerHandler "github.com/PrashanthSai-K/DeployGenie/api/src/handlers/container"
	"github.com/gofiber/fiber/v2"
)


func SetUpContainerRoutes(router fiber.Router){

	container := router.Group("/container")

	container.Get("/", containerHandler.GetContainers)
	
}