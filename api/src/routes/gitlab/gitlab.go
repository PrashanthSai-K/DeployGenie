package gitlabRoutes

import (
	gitlabHandler "github.com/PrashanthSai-K/DeployGenie/api/src/handlers/gitlab"
	"github.com/gofiber/fiber/v2"
)


func SetUpGitlsbRoutes (router fiber.Router){

	gitlab := router.Group("/gitlab")

	gitlab.Get("/", gitlabHandler.GetUsers);

	gitlab.Get("/project", gitlabHandler.CreateProject)
}