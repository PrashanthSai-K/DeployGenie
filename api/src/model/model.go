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

type Containers struct {
	gorm.Model
	Id				uint `grom:"primaryKey;autoIncrement"`
	ContainerId		string
	ContainerName	string
	UserId			uint
	User			Users `grom:"foreignKey:UserId;references:Id`			 
}

type UsedPorts struct {
	gorm.Model
	Id				uint `grom:"primaryKey;autoIncrement"`
	Port			int
	ContainerId		uint
	UserId			uint
	Container	Containers `grom:"foreignKey:ContainerId;references:Id`
	User			Users `grom:"foreignKey:UserId;references:Id`			 
}







