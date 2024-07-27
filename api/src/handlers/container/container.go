package containerHandler

import (
	"context"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/gofiber/fiber/v2"
)

func GetContainers(c *fiber.Ctx) error {

	client, err := client.NewClientWithOpts(client.FromEnv)

	if err != nil {
		panic(err)
	}

	defer client.Close()

	containers, err := client.ContainerList(context.Background(), container.ListOptions{})

	if err != nil {
		panic(err)
	}
	
	return c.JSON(fiber.Map{"status": "success", "data": containers})
}





