package model

import (
	"gorm.io/gorm"
)

type Users struct {
	gorm.Model
	Id            uint `gorm:"primaryKey;autoIncrement"`
	UserFirstname string
	UserLastname  string
	UserName      string `gorm:"unique;not null"`
	UserEmail     string `gorm:"unique;not null"`
	ContactNo     string
	DOB           string
	Password      string
	Role          string
	Status        string
}

type Images struct {
	gorm.Model
	Id        uint `gorm:"primaryKey;autoIncrement"`
	ImageName string
	Tag       string
	Size      string
}

type Containers struct {
	gorm.Model
	Id            uint `grom:"primaryKey;autoIncrement"`
	ContainerId   string
	ContainerName string
	ImageId       uint
	UserId        uint
	Image         Images `gorm:"foreignKey:ImageId;references:Id"`
	User          Users  `grom:"foreignKey:UserId;references:Id"`
}

type UsedPorts struct {
	gorm.Model
	Id          uint `grom:"primaryKey;autoIncrement"`
	Port        int
	ContainerId uint
	UserId      uint
	Container   Containers `grom:"foreignKey:ContainerId;references:Id`
	User        Users      `grom:"foreignKey:UserId;references:Id`
}
