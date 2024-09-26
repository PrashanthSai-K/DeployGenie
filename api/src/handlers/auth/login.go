package authHandler

import (
	"crypto/ecdsa"

	// "crypto/elliptic"
	// "crypto/rand"
	"crypto/x509"
	"encoding/base64"
	"fmt"
	"strings"

	"github.com/PrashanthSai-K/DeployGenie/api/config"
	"github.com/PrashanthSai-K/DeployGenie/api/database"
	"github.com/PrashanthSai-K/DeployGenie/api/src/model"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

var secretKey *ecdsa.PrivateKey

func init() {
	var err error
	// this is for production
	// secretKey, err = ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// byteKey, err := x509.MarshalECPrivateKey(secretKey)
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// fmt.Println(base64.StdEncoding.EncodeToString(byteKey))

	//for developemtn

	secretKeyenv := config.Config("JWTSECRET")

	if secretKeyenv == "" {
		fmt.Println("No JWT Key found")
	}
	byteKey, err := base64.StdEncoding.DecodeString(secretKeyenv)

	if err != nil {
		fmt.Println(err)
	}

	secretKey, err = x509.ParseECPrivateKey(byteKey)

	if err != nil {
		fmt.Println(err)
	}
}

type JwtClaims struct {
	UserId        uint   `json:"Id"`
	UserName      string `json:"UserName"`
	UserEmail     string `json:"UserEmail"`
	UserFirstname string `json:"UserFirstname"`
	UserLastname  string `json:"UserLastname"`
	Role          string `json:"Role"`
	Status        string `json:"Status"`
	jwt.RegisteredClaims
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

	claims := JwtClaims{
		UserId:        oldUser.Id,
		UserName:      oldUser.UserName,
		UserEmail:     oldUser.UserEmail,
		UserFirstname: oldUser.UserFirstname,
		UserLastname:  oldUser.UserLastname,
		Role:          oldUser.Role,
		Status:        oldUser.Status,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodES256, claims)

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

func GetUser(c *fiber.Ctx) error {

	authHeader := c.Get("Authorization")

	if authHeader == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Auth token missing"})
	}

	var token string

	if len(strings.Split(authHeader, " ")) == 2 {
		token = strings.Split(authHeader, " ")[1]
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Bearer token required"})
	}

	jwtClaims := new(JwtClaims)

	claim, err := jwt.ParseWithClaims(token, jwtClaims, func(t *jwt.Token) (interface{}, error) {
		return &secretKey.PublicKey, nil
	})

	fmt.Println(claim.Valid)

	if err != nil || !claim.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Invalid Auth token"})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"success": "true", "claims": jwtClaims})
}

func VerifyAdmin(c *fiber.Ctx) error {

	authHeader := c.Get("Authorization")

	if authHeader == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Auth token missing"})
	}

	var token string

	if len(strings.Split(authHeader, " ")) == 2 {
		token = strings.Split(authHeader, " ")[1]
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Bearer token required"})
	}

	jwtClaims := new(JwtClaims)

	claim, err := jwt.ParseWithClaims(token, jwtClaims, func(t *jwt.Token) (interface{}, error) {
		return &secretKey.PublicKey, nil
	})

	if err != nil || !claim.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Invalid Auth token"})
	}

	if jwtClaims.Role != "ADMIN" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Not Authorised"})
	}

	c.Locals("claims", jwtClaims);

	return c.Next();
}

func VerifyUser(c *fiber.Ctx) error {

	authHeader := c.Get("Authorization")

	if authHeader == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Auth token missing"})
	}
	var token string

	if len(strings.Split(authHeader, " ")) == 2 {
		token = strings.Split(authHeader, " ")[1]
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Bearer token required"})
	}

	jwtClaims := new(JwtClaims)

	claim, err := jwt.ParseWithClaims(token, jwtClaims, func(t *jwt.Token) (interface{}, error) {
		return &secretKey.PublicKey, nil
	})

	if err != nil || !claim.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Invalid Auth token"})
	}

	if jwtClaims.Role != "USER" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Not Authorised"})
	}

	c.Locals("claims", jwtClaims);

	return c.Next();
}

func VerifyToken(c *fiber.Ctx) error {

	var token string
	authHeader := c.Get("Authorization")

	if authHeader == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Auth token missing"})
	}

	if len(strings.Split(authHeader, " ")) == 2 {
		token = strings.Split(authHeader, " ")[1]
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Bearer token required"})
	}

	jwtClaims := new(JwtClaims)

	claim, err := jwt.ParseWithClaims(token, jwtClaims, func(t *jwt.Token) (interface{}, error) {
		return &secretKey.PublicKey, nil
	})

	if err != nil || !claim.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Invalid Auth token"})
	}

	if jwtClaims.Role != "USER" && jwtClaims.Role != "ADMIN" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Not Authorised"})
	}

	c.Locals("claims", jwtClaims);

	return c.Next();
}
