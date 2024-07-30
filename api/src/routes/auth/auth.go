package authRoutes

import (
	authHandler "github.com/PrashanthSai-K/DeployGenie/api/src/handlers/auth"
	"github.com/gofiber/fiber/v2"
)

func SetUpAuthRoutes(router fiber.Router){

	auth := router.Group("/auth")

	auth.Post("/login", authHandler.Login)

}