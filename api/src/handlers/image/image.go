package imageHandler

import (
	"github.com/PrashanthSai-K/DeployGenie/api/database"
	"github.com/PrashanthSai-K/DeployGenie/api/src/model"
	"github.com/gofiber/fiber/v2"
)

func GetImages(c *fiber.Ctx) error {

	var images[] *model.Images

	db := database.DB

	result := db.Find(&images)

	if (result.Error != nil ){
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{"success":"false", "message":"Some Internal error"})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"success":"true", "data":images})
}