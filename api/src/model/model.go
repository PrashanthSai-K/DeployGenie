package model

import (
	"gorm.io/gorm"
)

type Users struct {
	gorm.Model
	Id			uint `grom:"primaryKey;autoIncrement"`
	UserName	string
	UserMail	string
	ContactNo	string
	Password	string
	Role		string
}

type Images struct {
	gorm.Model
	Id			uint `gorm:"primaryKey;autoIncrement"`
	ImageName	string
	Tag			string
	Size		string
}

type Containers struct {
	gorm.Model
	Id				uint `grom:"primaryKey;autoIncrement"`
	ContainerId		string
	ContainerName	string
	ImageId			uint 
	UserId			uint 
	// Image          	Images  `gorm:"foreignKey:ImageId;references:Id"`
	User			Users `grom:"foreignKey:UserId;references:Id"`			 
}



type UsedPorts struct {
	gorm.Model
	Id				uint `grom:"primaryKey;autoIncrement"`
	Port			int
	ContainerId		uint
	UserId			uint
	Container		Containers `grom:"foreignKey:ContainerId;references:Id`
	User			Users `grom:"foreignKey:UserId;references:Id`			 
}







