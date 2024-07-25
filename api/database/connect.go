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
	DB.AutoMigrate(&model.UsedPorts{})

	fmt.Println("Connected to Database successfully....!!")

}
