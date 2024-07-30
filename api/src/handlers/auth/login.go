package authHandler

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"fmt"
	"github.com/PrashanthSai-K/DeployGenie/api/database"
	"github.com/PrashanthSai-K/DeployGenie/api/src/model"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

var secretKey *ecdsa.PrivateKey

func init() {
	var err error
	secretKey, err = ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	if err != nil {
		fmt.Println(err)
	}
}

func Login(c *fiber.Ctx) error {
	fmt.Println(secretKey)
	user := new(model.Users)
	oldUser := new(model.Users)

	err := c.BodyParser(user)

	fmt.Println(user)

	if err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{"message": "Bad Gateway"})
	}

	db := database.DB

	result := db.Where(&model.Users{UserName: user.UserName}).First(&oldUser)

	if result.Error != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Unauthorized access"})
	}

	if result.RowsAffected <= 0 {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Username not Found"})
	}

	if oldUser.Password != user.Password {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Password is incorrect"})
	}

	if oldUser.Status == "PENDING" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Account not yet activated"})
	}

	if oldUser.Status != "ACTIVE" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Account Banned"})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodES256, jwt.MapClaims{
		"UserName":      oldUser.UserName,
		"UserEmail":     oldUser.UserEmail,
		"UserFirstname": oldUser.UserFirstname,
		"UserLastname":  oldUser.UserLastname,
		"Role":          oldUser.Role,
		"Status":        oldUser.Status,
	})

	tokenSigned, err := token.SignedString(secretKey)

	if err != nil {
		fmt.Println(err)
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{"message": "Bad Gateway"})
	}

	fmt.Println(token)

	if oldUser.Role == "ADMIN" {
		return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"message": "Login Successful", "token": tokenSigned, "admin": true})
	}
	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"message": "Login Successful", "token": tokenSigned, "admin": false})
}
