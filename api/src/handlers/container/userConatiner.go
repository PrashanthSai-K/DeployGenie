package containerHandler

import (
	"context"
	"fmt"
	"github.com/PrashanthSai-K/DeployGenie/api/database"
	authHandler "github.com/PrashanthSai-K/DeployGenie/api/src/handlers/auth"
	"github.com/PrashanthSai-K/DeployGenie/api/src/model"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/gofiber/fiber/v2"
)


func GetContainersByUser(c *fiber.Ctx) error {

	id := c.Params("id")

	var containers []*model.ContainerView

	db := database.DB

	db.Table("container_views").Where("user_id", id).Find(&containers);

	return c.JSON(fiber.Map{"status": "success", "data": containers })
}

func StopContByUser(c *fiber.Ctx) error {

	containerData := new(model.ContainerView)

	claims := c.Locals("claims").(*authHandler.JwtClaims)

	err := c.BodyParser(&containerData)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	db := database.DB
	oldContainer := new(model.Containers)

	result := db.Where("id=?", containerData.Id).First(&oldContainer)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	if result.RowsAffected <= 0 {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"success": "false", "message": "Container not found"})
	}

	if oldContainer.UserId != claims.UserId {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "You are not authorized"})
	}

	client, err := client.NewClientWithOpts(client.FromEnv)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	ctx := context.Background()

	if err = client.ContainerStop(ctx, oldContainer.ContainerId, container.StopOptions{}); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Container not stopped"})
	}

	resu, err := client.ContainerInspect(ctx, oldContainer.ContainerId)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Container not stopped"})
	}

	oldContainer.Status = resu.State.Status

	update := db.Save(&oldContainer)

	if update.Error != nil || update.RowsAffected == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Container not stopped"})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"success": "true", "message": "Container stopped successfully"})
}

func StartContByUser(c *fiber.Ctx) error {

	containerData := new(model.ContainerView)

	claims := c.Locals("claims").(*authHandler.JwtClaims)

	err := c.BodyParser(&containerData)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	db := database.DB
	oldContainer := new(model.Containers)

	result := db.Where("id=?", containerData.Id).First(&oldContainer)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	if result.RowsAffected <= 0 {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"success": "false", "message": "Container not found"})
	}

	if oldContainer.UserId != claims.UserId {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "You are not authorized"})
	}

	client, err := client.NewClientWithOpts(client.FromEnv)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	ctx := context.Background()

	if err = client.ContainerStart(ctx, oldContainer.ContainerId, container.StartOptions{}); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Container not started"})
	}

	resu, err := client.ContainerInspect(ctx, oldContainer.ContainerId)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Container not started"})
	}

	oldContainer.Status = resu.State.Status

	update := db.Save(&oldContainer)

	if update.Error != nil || update.RowsAffected == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Container not started"})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"success": "true", "message": "Container started successfully"})
}

func TerminateContByUser(c *fiber.Ctx) error {

	containerData := new(model.ContainerView)

	claims := c.Locals("claims").(*authHandler.JwtClaims)

	err := c.BodyParser(&containerData)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	db := database.DB
	oldContainer := new(model.Containers)

	result := db.Where("id=?", containerData.Id).First(&oldContainer)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	if result.RowsAffected <= 0 {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"success": "false", "message": "Container not found"})
	}

	if oldContainer.UserId != claims.UserId {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "You are not authorized"})
	}

	client, err := client.NewClientWithOpts(client.FromEnv)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	ctx := context.Background()

	if err = client.ContainerRemove(ctx, oldContainer.ContainerId, container.RemoveOptions{Force: true}); err != nil {
		fmt.Println(err.Error())
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Container not terminnnnnnnnnnnated"})
	}

	oldContainer.Status = "terminated"

	update := db.Save(&oldContainer)

	if update.Error != nil || update.RowsAffected == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Container not Terminated"})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"success": "true", "message": "Container Terminated successfully"})
}

func GetContainerByName(c *fiber.Ctx) error {

	contName := c.Params("name");

	claims := c.Locals("claims").(*authHandler.JwtClaims)

	db := database.DB

	oldContainer := new(model.ContainerView);

	resu := db.Table("container_views").Where("container_name", contName).Find(&oldContainer);

	if resu.Error != nil {
		fmt.Println(resu.Error)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success":"true"});
	}

	if resu.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"success":"true"});
	}

	if claims.UserId != oldContainer.UserId {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"success":"true", "message": "Not Authorized"});
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"success":"true", "data": oldContainer});

}



