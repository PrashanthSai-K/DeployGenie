package initial

import (
	"context"
	"fmt"

	"github.com/PrashanthSai-K/DeployGenie/api/database"
	"github.com/PrashanthSai-K/DeployGenie/api/src/model"
	"github.com/docker/docker/api/types/image"
	"github.com/docker/docker/client"
	"gorm.io/gorm"
)

func InitializeDB() {

	db := database.DB

	adminUser := new(model.Users)
	adminUser.UserName = "admin"
	adminUser.Password = "admin123"
	adminUser.UserFirstname = "Admin"
	adminUser.UserLastname = "User"
	adminUser.Role = "admin"
	adminUser.ContactNo = "9876543210"
	adminUser.DOB = "1990-01-01"
	adminUser.UserEmail = "admin@example.com"
	adminUser.Status = "ACTIVE"

	testUser := new(model.Users)
	testUser.UserName = "test"
	testUser.UserFirstname = "Test"
	testUser.UserLastname = "User"
	testUser.Password = "test123"
	testUser.Role = "user"
	testUser.ContactNo = "1234567890"
	testUser.DOB = "1995-05-15"
	testUser.UserEmail = "test@example.com"
	testUser.Status = "ACTIVE"

	var users []model.Users

	db.Find(&users)
	adminExists := false
	testUserExists := false

	for _, user := range users {
		if user.UserName == "admin" {
			adminExists = true
		}
		if user.UserName == "test" {
			testUserExists = true
		}
	}

	if !adminExists {
		if result := db.Create(&adminUser); result.Error != nil {
			fmt.Println("Error creating admin:", result.Error)
		}
	}

	if !testUserExists {
		if result := db.Create(&testUser); result.Error != nil {
			fmt.Println("Error creating test user:", result.Error)
		}
	}

	var exists bool
	db.Raw("SELECT EXISTS (SELECT 1 FROM information_schema.views WHERE table_name = ?)", "container_views").Scan(&exists)

	query := db.Table("containers").
		Select(`containers.id, containers.service_type, containers.container_id, containers.container_name, containers.reason, containers.outcome, containers.presistent, containers.expiry_date, containers.status,
				images.id as image_id, images.image_name as image_name, images.tag as image_tag, images.size as image_size,
				users.id as user_id, users.user_email as user_email, users.user_firstname as user_firstname, users.user_lastname as user_lastname,
				volumes.id as volume_id, volumes.volume_name as volume_name`).
		Joins("join images on images.id = containers.image_id").
		Joins("join users on users.id = containers.user_id").
		Joins("left join volumes on volumes.container_id = containers.id").
		Order("id DESC")

	if !exists {
		if err := db.Migrator().CreateView("container_views", gorm.ViewOption{Query: query}); err != nil {
			fmt.Println("Error creating view:", err)
		}
	}
}

func InitializeImages() {

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
}
