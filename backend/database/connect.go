package database

import (
	m "github.com/Animish-Sharma/blog/backend/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	connection, err := gorm.Open(mysql.Open("username:password@/database"), &gorm.Config{})
	if err != nil {
		panic("could not connect to database")
	}
	DB = connection
	connection.AutoMigrate(&m.User{}, &m.Post{}, &m.Review{})
}
