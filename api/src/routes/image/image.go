package imageRoutes

import (
	imageHandler "github.com/PrashanthSai-K/DeployGenie/api/src/handlers/image"
	"github.com/gofiber/fiber/v2"
)

func SetUPImageRoutes (router fiber.Router) {
	image := router.Group("/images")

	image.Get("/", imageHandler.GetImages);

	image.Post("/", imageHandler.CreateImage);

	image.Post("/:id", imageHandler.UpdateImage);

	image.Get("/sync", imageHandler.SyncImages);

}