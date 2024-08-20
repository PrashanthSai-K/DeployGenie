package userRoutes

import (
	authHandler "github.com/PrashanthSai-K/DeployGenie/api/src/handlers/auth"
	userHandler "github.com/PrashanthSai-K/DeployGenie/api/src/handlers/user"
	"github.com/gofiber/fiber/v2"
)

func SetUpUserRoutes(router fiber.Router) {

	user := router.Group("/user")

	user.Post("/" , userHandler.CreateUser)

	user.Get("/", authHandler.VerifyToken, userHandler.GetUsers)

	user.Put("/", authHandler.VerifyAdmin, userHandler.UpdateUser)

	user.Post("/approve", authHandler.VerifyAdmin, userHandler.ApproveUser)

	user.Post("/reject", authHandler.VerifyAdmin, userHandler.RejectUser)

	user.Post("/inactive", authHandler.VerifyAdmin, userHandler.InactiveUser)

	
}
