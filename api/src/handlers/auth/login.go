package authHandler

import (
	"fmt"
	"log"

	"github.com/PrashanthSai-K/DeployGenie/api/database"
	"github.com/PrashanthSai-K/DeployGenie/api/src/model"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

var secretKey = "asdfasdf654sdf4984sd854asf654asdsdf65"

func Login(c *fiber.Ctx) error {
	
	user := new(model.Users)

	err := c.BodyParser(user)

	if err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{"message": "Bad Gateway"})
	}

	db := database.DB

	oldUser := db.Where(&model.Users{UserName: user.UserName}).First(&user)

	fmt.Println(oldUser)

	token := jwt.NewWithClaims(jwt.SigningMethodES256, jwt.MapClaims{
		"UserName":      user.UserName,
		"UserEmail":     user.UserEmail,
		"UserFirstname": user.UserFirstname,
		"UserLastname":  user.UserLastname,
		"Role":          user.Role,
		"Status":        user.Status,
	})

	tokenSigned, err := token.SignedString(secretKey)

	if err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{"message": "Bad Gateway"})
	}

	fmt.Println(token)

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"message": "Login Successful", "token": tokenSigned})
}
