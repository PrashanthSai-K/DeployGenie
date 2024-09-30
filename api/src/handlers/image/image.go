package imageHandler

import (
	"context"
	"fmt"

	"github.com/PrashanthSai-K/DeployGenie/api/database"
	"github.com/PrashanthSai-K/DeployGenie/api/src/model"
	"github.com/docker/docker/api/types/image"
	"github.com/docker/docker/client"
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

func CreateImage(c *fiber.Ctx) error {

	imageData := new(model.Images);

	err := c.BodyParser(&imageData);

	if (err != nil){
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success":"false", "message":"Invalid Data"});
    }

	db := database.DB;

	res := db.Create(&imageData);

	if (res.Error != nil){
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"success":"false", "message":"Internal Server Error"});
    }

	return c.JSON(fiber.Map{"success":"true", });
}

func UpdateImage(c *fiber.Ctx) error {

	imageData := new(model.Images);

	imageId := c.Params("id");

	err := c.BodyParser(&imageData);

	if (err != nil){
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success":"false", "message":"Invalid Data"});
    }

	db := database.DB;

	oldImageData := new(model.Images)

	res := db.Table("images").Where("id=?", imageId).First(&oldImageData, imageData.Id);

	fmt.Println(oldImageData);

	if (res.Error != nil || res.RowsAffected == 0){
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"success":"false", "message":"Image Not Found"});
    }

	res = db.Save(&imageData);

	if (res.Error != nil){
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"success":"false", "message":"Internal Server Error"});
    }

	return c.JSON(fiber.Map{"success":"true", });
}


func SyncImages(c *fiber.Ctx) error{

	client, err := client.NewClientWithOpts(client.FromEnv)

	if err != nil {
		fmt.Println("Error creating Docker client:", err)
	}

	db := database.DB

	var images []model.Images

	result := db.Find(&images)

	if result.Error != nil {
		fmt.Println("Error fetching images from DB:", result.Error)
	}

	for _, img := range images {
		imageName := fmt.Sprintf("%s:%s", img.ImageName, img.Tag)
		if _, err := client.ImagePull(context.Background(), imageName, image.PullOptions{}); err != nil {
			fmt.Println("Error pulling images", err)
		}
	}

	return c.JSON(fiber.Map{"success":"true", "message":"Images synced successfully"})
}
