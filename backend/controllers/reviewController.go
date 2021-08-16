package controllers

import (
	"strconv"
	s "strings"

	"github.com/Animish-Sharma/blog/backend/database"
	"github.com/Animish-Sharma/blog/backend/models"
	"github.com/Animish-Sharma/blog/backend/utils"
	"github.com/gofiber/fiber"
)

func ReviewCreate(c *fiber.Ctx) error {
	user, _ := utils.VerifyJwt(c)
	var ex_review *models.Review
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		panic(err)
	}
	post_id, _ := strconv.Atoi(data["post_id"])
	database.DB.Model(&models.Review{}).Where("Author = ?", user.ID).Where("PostID = ?", post_id).First(&ex_review)
	if ex_review != nil {
		return c.JSON(
			fiber.Map{"error": "Already have a comment in the post"},
		)
	}
	if len(s.TrimSpace(data["comment"]))|len(s.TrimSpace(data["title"])) == 0 {
		return c.JSON(fiber.Map{
			"error": "fill all the fields",
		})
	}
	rating, _ := strconv.Atoi(data["rating"])

	review := models.Review{
		Author:  user.ID,
		Comment: data["comment"],
		Title:   data["title"],
		Rating:  rating,
		PostID:  post_id,
	}

	database.DB.Model(&models.Review{}).Create(&review)
	database.DB.Model(&user).Association("Reviews").Append([]models.Review{review})
	database.DB.Model(&models.Post{}).Where("ID = ?", uint(review.PostID)).Association("Reviews").Append([]models.Review{review})
	return c.JSON(fiber.Map{
		"success": "Comment created successfully",
	})
}

func ReviewUpdate(c *fiber.Ctx) error {
	user, _ := utils.VerifyJwt(c)

	var review models.Review
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		panic(err)
	}
	id, _ := strconv.Atoi(data["id"])
	database.DB.Model(&models.Review{}).Where("ID = ?", uint(id)).First(&review)
	if review.Author != user.ID {
		return c.JSON(
			fiber.Map{"error": "You are not the author of this post"},
		)
	}
	if len(s.TrimSpace(data["title"]))|len(s.TrimSpace(data["comment"])) == 0 {
		return c.JSON(fiber.Map{
			"error": "fill all the fields",
		})
	}
	rating, _ := strconv.Atoi(data["rating"])
	database.DB.Model(&review).Updates(&models.Review{Title: data["title"], Comment: data["comment"], Rating: rating})
	return c.JSON(
		fiber.Map{"sucess": "Comment Updated Successfully"},
	)
}

func ReviewDelete(c *fiber.Ctx) error {
	user, _ := utils.VerifyJwt(c)
	id, _ := strconv.Atoi(c.Params("id"))
	var review *models.Review
	database.DB.Model(&models.Review{}).Where("ID = ?", uint(id)).First(&review)
	if review.Author == user.ID {
		database.DB.Model(&models.Post{}).Where("ID = ?", uint(review.PostID)).Association("Reviews").Delete([]models.Review{*review})
		database.DB.Model(&user).Association("Reviews").Delete([]models.Review{*review})
		database.DB.Model(&models.Review{}).Delete(review)
		return c.JSON(
			fiber.Map{
				"success": "Deleted Review Successfully",
			},
		)
	}
	return c.JSON(
		fiber.Map{"error": "You are not allowed to delete this comment"},
	)
}
