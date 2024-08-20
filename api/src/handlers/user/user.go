package userHandler

import (
	"fmt"
	"github.com/PrashanthSai-K/DeployGenie/api/database"
	"github.com/PrashanthSai-K/DeployGenie/api/src/model"
	"github.com/gofiber/fiber/v2"
)

func CreateUser(c *fiber.Ctx) error {

	db := database.DB

	user := new(model.Users)

	err := c.BodyParser(user)

	if err != nil {
		panic(err)
	}
	var users []model.Users

	result := db.Find(&users)

	if result.Error != nil {
		fmt.Println(result.Error)
	}

	for _, i := range users {
		if user.UserEmail == i.UserEmail {
			return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"status": "failed", "message": "Email already registred"})
		}
		if user.UserName == i.UserName {
			return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"status": "failed", "message": "Username already taken"})
		}
	}

	user.Role = "USER"
	user.Status = "PENDING"

	result = db.Create(&user)

	if result.RowsAffected > 0 {
		return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"status": "success"})
	}

	return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"status": "failed", "message": "Some internal error, try after some time"})
}

func GetUsers(c *fiber.Ctx) error {

	var users []model.Users
	db := database.DB

	res := db.Find(&users)

	if err := res.Error; err != nil {
		panic(err)
	}

	for _, user := range users {
		fmt.Println(user.UserName)
	}

	return c.JSON(fiber.Map{"status": "done", "data": users})
}

func UpdateUser(c *fiber.Ctx) error {

	db := database.DB

	user := new(model.Users)

	err := c.BodyParser(user)

	if err != nil {
		panic(err)
	}

	oldUser := new(model.Users)

	if err := db.First(oldUser, user.Id).Error; err != nil {
		panic(err)
	}

	oldUser.UserName = user.UserName
	oldUser.UserEmail = user.UserEmail
	oldUser.Password = user.Password
	oldUser.ContactNo = user.ContactNo

	result := db.Save(&oldUser)

	fmt.Println(result.Error, "    ", result.RowsAffected)

	return c.JSON(fiber.Map{"status": "updated"})

}

func ApproveUser(c *fiber.Ctx) error {

	user := new(model.Users)

	db := database.DB

	err := c.BodyParser(user)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Some internal error"})
	}

	oldUser := new(model.Users)

	result := db.Where(&model.Users{Id: user.Id}).First(&oldUser)

	if result.Error != nil {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"message": "User Not Found"})
	}

	fmt.Println(oldUser.Status, "   ", oldUser.UserName)

	if oldUser.Status != "PENDING" && oldUser.Status != "INACTIVE" {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"message": "Ivalid User Status"})
	}

	oldUser.Status = "ACTIVE"

	result = db.Save(&oldUser)

	if result.Error != nil {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"message": "Database error try after some time"})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"success": "User approved successfully"})
}

func RejectUser(c *fiber.Ctx) error {

	user := new(model.Users)

	db := database.DB

	err := c.BodyParser(user)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Some internal error"})
	}

	oldUser := new(model.Users)

	result := db.Where(&model.Users{Id: user.Id}).First(&oldUser)

	if result.Error != nil {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"message": "User Not Found"})
	}
	fmt.Println(oldUser.UserName,"    ", oldUser.Status)

	if oldUser.Status != "PENDING" {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"message": "Ivalid User Status"})
	}

	oldUser.Status = "REJECTED"

	result = db.Save(&oldUser)

	if result.Error != nil {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"message": "Database error try after some time"})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"success": "User Rejected successfully"})
}

func InactiveUser(c *fiber.Ctx) error {

	user := new(model.Users)

	db := database.DB

	err := c.BodyParser(user)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Some internal error"})
	}

	oldUser := new(model.Users)

	result := db.Where(&model.Users{Id: user.Id}).First(&oldUser)

	if result.Error != nil {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"message": "User Not Found"})
	}

	if oldUser.Status != "ACTIVE" {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"message" : "Ivalid User Status"})
	}

	oldUser.Status = "INACTIVE"

	result = db.Save(&oldUser)

	if result.Error != nil {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"message": "Database error try after some time"})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"success": "User Inactivated successfully"})
}

// func ActiveUser(c *fiber.Ctx) error {

// 	user := new(model.Users)

// 	db := database.DB;

// 	err := c.BodyParser(user)

// 	if err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message" : "Some internal error"})
// 	}

// 	oldUser := new(model.Users)

// 	result := db.Find(oldUser, user)

// 	if result.Error != nil {
// 		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"message" : "User Not Found"})
// 	}

// 	oldUser.Status = "ACTIVE"

// 	result = db.Save(&oldUser)

// 	if result.Error != nil {
// 		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"message" : "Database error try after some time"})
// 	}

// 	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"success":"User approved successfully"})
// }
