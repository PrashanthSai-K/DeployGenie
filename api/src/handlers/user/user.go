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

	if(err != nil ){
		panic(err)
	}

	fmt.Println(user)

	result := db.Create(&user)

	fmt.Println(result.Error,"  ", result.RowsAffected);

	return c.JSON(fiber.Map{"status":"success"})

}

func GetUsers(c *fiber.Ctx) error{

	var users[]model.Users
	db := database.DB

	res := db.Find(&users)

	if err := res.Error; err != nil {
		panic(err)
	}

	for  _,user := range users {
		fmt.Println(user.UserName)
	}

	return c.JSON(fiber.Map{"status":"done", "data" : users})
}

func UpdateUser (c *fiber.Ctx) error {

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
	oldUser.UserMail = user.UserMail
	oldUser.Password = user.Password
	oldUser.ContactNo = user.ContactNo

	result := db.Save(&oldUser)

	fmt.Println(result.Error,"    ", result.RowsAffected)

	return c.JSON(fiber.Map{"status":"updated"})
	
}