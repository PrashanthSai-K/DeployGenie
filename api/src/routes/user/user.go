package userRoutes

import (
	userHandler "github.com/PrashanthSai-K/DeployGenie/api/src/handlers/user"
	"github.com/gofiber/fiber/v2"
)

func SetUpUserRoutes(router fiber.Router) {

	user := router.Group("/user")

	user.Post("/", userHandler.CreateUser)

	user.Get("/", userHandler.GetUsers)

	user.Put("/", userHandler.UpdateUser)

	user.Post("/approve", userHandler.ApproveUser)

	user.Post("/reject", userHandler.RejectUser)

	user.Post("/inactive", userHandler.InactiveUser)

}
