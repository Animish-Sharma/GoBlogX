package controllers

import (
	"fmt"
	"os"

	s "strings"

	"github.com/Animish-Sharma/blog/backend/database"
	"github.com/Animish-Sharma/blog/backend/models"
	"github.com/Animish-Sharma/blog/backend/utils"
	"github.com/gofiber/fiber"
	"golang.org/x/crypto/bcrypt"
)

var Secret = os.Getenv("Secret")

func Register(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		fmt.Println(err)
	}

	password, err := bcrypt.GenerateFromPassword([]byte(data["password"]), 15)

	if len(data["password"]) < 8 {
		return c.JSON(
			fiber.Map{
				"error": "Password Length must be more than 8 characters",
			},
		)
	}

	if err != nil {
		panic(err)
	}

	user := models.User{
		Name:     data["name"],
		Email:    data["email"],
		Username: data["username"],
		Password: password,
		Posts:    []models.Post{},
	}
	result := database.DB.Create(&user)
	dev := os.Getenv("DEV_MAIL")
	content := "Thank You for Registering to our website\n" +
		"\nThis is a Test blog website still in development\n" +
		"\nIf you find any bug, feel free to contact dev on " + dev + "\n" +
		"\nYours Sincerely\n" +
		"\nAnimish Sharma"
	utils.SendMail(c, user.Email, "Registered Successfully", content)

	if result.Error != nil {
		return c.JSON(
			fiber.Map{
				"error": result.Error,
			},
		)
	}

	token := utils.GenerateJwt(c, user)

	return c.JSON(
		fiber.Map{
			"user":    user,
			"token":   token,
			"success": "Registered successfully",
		},
	)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		fmt.Println(err)
	}

	var user models.User

	database.DB.Where("username = ?", data["username"]).First(&user)

	if user.ID == 0 {
		return c.JSON(fiber.Map{
			"error": "User does not exist",
		})
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"error": "Password is incorrect",
		})
	}

	token := utils.GenerateJwt(c, user)

	return c.JSON(fiber.Map{
		"token":   token,
		"user":    user,
		"success": "Login successful",
	})
}

func UserUpdate(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		panic(err)
	}

	user, err := utils.VerifyJwt(c)

	if err != nil {
		panic(err)
	}

	if user.ID == 0 {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{"error": "user does not exist"})
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"error": "Password is incorrect",
		})
	}

	if len(s.TrimSpace(data["name"])) > 0 {
		user.Name = s.TrimSpace(data["name"])
	}

	if len(s.TrimSpace(data["email"])) > 0 {
		user.Email = s.TrimSpace(data["email"])
	}

	if len(s.TrimSpace(data["username"])) > 0 {
		user.Username = s.TrimSpace(data["username"])
	}

	if len(s.TrimSpace(data["new_password"])) > 0 {
		password, err := bcrypt.GenerateFromPassword([]byte(data["password"]), 15)
		if err != nil {
			c.Status(fiber.StatusBadRequest)
			return c.JSON(
				fiber.Map{"error": "An error occured"},
			)
		}
		user.Password = password
	}

	database.DB.Model(&models.User{}).Save(&user)

	return c.JSON(fiber.Map{
		"success": "User updated successfully",
		"user":    user,
	})
}

func UserPost(c *fiber.Ctx) error {
	user, _ := utils.VerifyJwt(c)
	err := database.DB.Model(&models.User{}).Preload("Posts").Find(&user).Error
	if err != nil {
		fmt.Println(nil, err)
	}
	return c.JSON(user.Posts)
}
