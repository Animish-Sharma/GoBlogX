package utils

import (
	"fmt"
	"os"
	s "strings"

	"github.com/Animish-Sharma/blog/backend/models"
	"github.com/gofiber/fiber"
	"github.com/google/uuid"
)

func ImageUpload(c *fiber.Ctx) (map[string]interface{}, error) {
	form, err := c.MultipartForm()

	if err != nil {
		fmt.Println(err)
	}

	file := form.File["image"][0]

	if file == nil {
		return nil, c.Next()
	}

	unique := uuid.New()

	filename := s.Replace(unique.String(), "-", "", -1)

	fileExtension := s.Split(file.Filename, ".")[1]

	image := fmt.Sprintf("%s.%s", filename, fileExtension)
	err = c.SaveFile(file, fmt.Sprintf("D:/Programming-Timepass/Golang/go/src/github.com/Animish-Sharma/blog/backend/images/posts/%s", image))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return nil, c.JSON(fiber.Map{"error": "Image can't be uploaded", "err": err})
	}

	imageUrl := fmt.Sprintf("http://localhost:3000/images/posts/%s", image)

	data := map[string]interface{}{
		"imageName": image,
		"imageUrl":  imageUrl,
		"headers":   file.Header,
		"size":      file.Size,
	}

	return data, nil
}

func ImageDelete(c *fiber.Ctx, post *models.Post) error {
	imageUrl := post.Image
	imagePath := s.TrimPrefix(imageUrl, "http://localhost:3000/images/posts/")
	err := os.Remove(fmt.Sprintf("D:/Programming-Timepass/Golang/go/src/github.com/Animish-Sharma/blog/backend/images/posts/%s", imagePath))
	if err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{"error": "Server Error. Try again later"})
	}
	return err
}
