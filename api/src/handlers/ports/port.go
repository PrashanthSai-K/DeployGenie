package portHandler

import (
	"fmt"

	"github.com/PrashanthSai-K/DeployGenie/api/database"
	authHandler "github.com/PrashanthSai-K/DeployGenie/api/src/handlers/auth"
	"github.com/PrashanthSai-K/DeployGenie/api/src/model"
	"github.com/gofiber/fiber/v2"
)

func GetPortsByContainer(c *fiber.Ctx) error {

	jwtClaims := c.Locals("claims").(*authHandler.JwtClaims)

	containerName := c.Params("name")

	db := database.DB

	oldContainer := new(model.ContainerView)

	result := db.Table("container_views").Where("container_name", containerName).Find(&oldContainer)

	if result.Error!= nil || result.RowsAffected == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success":"true", })
	}
	fmt.Println(jwtClaims)
	if oldContainer.UserId != jwtClaims.UserId && jwtClaims.Role != "ADMIN"   {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"success":"true" })
	}

	var ports[] *model.UsedPorts

	result = db.Table("used_ports").Where("container_id", oldContainer.Id).Find(&ports)

	if result.Error!= nil || result.RowsAffected == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success":"true", })
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"success":"true", "data": ports })
}