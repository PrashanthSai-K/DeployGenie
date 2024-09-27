package database

import (
	"fmt"
	"github.com/PrashanthSai-K/DeployGenie/api/config"
	"github.com/PrashanthSai-K/DeployGenie/api/src/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)


var DB *gorm.DB
func ConnectDB() {

	var err error

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		config.Config("DB_USER"), config.Config("DB_PASSWORD"),
		config.Config("DB_HOST"), config.Config("DB_PORT"),
		config.Config("DB_NAME"),
	)

	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	DB.AutoMigrate(&model.Users{})
	DB.AutoMigrate(&model.Containers{})
	DB.AutoMigrate(&model.Images{})
	DB.AutoMigrate(&model.UsedPorts{})
	DB.AutoMigrate(&model.Volumes{})

	query := DB.Table("containers").
		Select(`containers.id, containers.service_type, containers.container_id, containers.container_name, containers.reason, containers.outcome, containers.presistent, containers.expiry_date, containers.status,
				images.id as image_id, images.image_name as image_name, images.tag as image_tag, images.size as image_size,
				users.id as user_id, users.user_email as user_email, users.user_firstname as user_firstname, users.user_lastname as user_lastname,
				volumes.id as volume_id, volumes.volume_name as volume_name`).
		Joins("join images on images.id = containers.image_id").
		Joins("join users on users.id = containers.user_id").
		Joins("left join volumes on volumes.container_id = containers.id").
		Order("id DESC")

	if err := DB.Migrator().CreateView("container_views", gorm.ViewOption{Query: query}); err != nil {
		fmt.Println("Error creating view:", err)
	}

	fmt.Println("Connected to Database successfully....!!")

}
