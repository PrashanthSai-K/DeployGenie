package portRoutes

import (
	// "github.com/PrashanthSai-K/DeployGenie/api/router"
	authHandler "github.com/PrashanthSai-K/DeployGenie/api/src/handlers/auth"
	portHandler "github.com/PrashanthSai-K/DeployGenie/api/src/handlers/ports"
	"github.com/gofiber/fiber/v2"
)

func SetUpPortRoutes(router fiber.Router){
	
	port := router.Group("/port")

	port.Get("/bycontainer/:name", authHandler.VerifyToken, portHandler.GetPortsByContainer);

}