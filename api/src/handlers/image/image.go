package imageHandler

import (
	"fmt"

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