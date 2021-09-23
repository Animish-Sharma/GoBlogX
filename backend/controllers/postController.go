package controllers

import (
	"strconv"
	"strings"
	"time"

	"github.com/Animish-Sharma/blog/backend/database"
	"github.com/Animish-Sharma/blog/backend/models"
	"github.com/Animish-Sharma/blog/backend/utils"
	"github.com/gofiber/fiber"
	"github.com/gosimple/slug"
)

type Result struct {
	ID        uint       `json:"id"`
	AuthorID  uint       `json:"author_id"`
	Name      string     `json:"author"`
	Title     string     `json:"title"`
	Content   string     `json:"content"`
	Slug      string     `json:"slug"`
	Category  string     `json:"category"`
	Image     string     `json:"image"`
	CreatedAt int        `json:"created_at"`
	Reviews   [][]string `json:"reviews"`
}

func PostList(c *fiber.Ctx) error {
	var result []Result

	database.DB.Scopes(utils.Paginate(c)).Model(&models.Post{}).Select("*").Joins("join users on users.id=posts.author").Order("created_at Desc").Scan(&result)
	return c.JSON(fiber.Map{"posts": result})
}

func PostDetail(c *fiber.Ctx) error {
	slug := c.Params("slug")
	var result Result
	database.DB.Model(&models.Post{}).Where("slug = ?", slug).Select("*").Joins("join users on users.id=posts.author").Order("created_at Desc").Preload("Reviews").Scan(&result)

	return c.JSON(fiber.Map{
		"post": result,
	})
}

func PostCreate(c *fiber.Ctx) error {
	form, err := c.MultipartForm()

	if err != nil {
		panic(err)
	}

	user, _ := utils.VerifyJwt(c)
	image, _ := utils.ImageUpload(c)
	imageUrl := image["imageUrl"].(string)

	title_s := form.Value["title"]

	title := strings.Join(title_s, " ")

	slug := slug.Make(title)

	var ex_post *models.Post

	database.DB.Model(&models.Post{}).Find("slug = ?", slug).First(&ex_post)
	if ex_post != nil {
		var count int64 = 1
		var copy_slug string = slug
		var queryset int64
		database.DB.Model(&models.Post{}).Where("slug = ?", slug).Count(&queryset)

		for queryset > 0 {
			slug = copy_slug + "-" + strconv.Itoa(int(count))
			count += 1
			database.DB.Model(&models.Post{}).Where("slug=?", slug).Count(&queryset)
		}
	}

	content := strings.Join(form.Value["content"], " ")
	category := strings.Join(form.Value["category"], " ")

	post := models.Post{
		Title:     title,
		Content:   content,
		Image:     imageUrl,
		Category:  category,
		Slug:      slug,
		CreatedAt: int(time.Now().Local().Unix()),
		Author:    user.ID,
	}
	database.DB.Table("posts").Create(&post)
	database.DB.Model(&models.User{}).Association("Posts").Append([]models.Post{post})

	return c.JSON(fiber.Map{
		"post":   post,
		"author": user,
	})
}

func PostUpdate(c *fiber.Ctx) error {
	form, err := c.MultipartForm()
	if err != nil {
		panic(err)
	}
	var post models.Post
	var ex_post *models.Post
	user, _ := utils.VerifyJwt(c)
	slug_s := strings.Join(form.Value["slug"], " ")
	database.DB.Model(&models.Post{}).Where("slug = ?", slug_s).First(&post)
	if post.Author != user.ID {
		return c.JSON(fiber.Map{"error": "You are not the owner of this post"})
	}

	title := strings.Join(form.Value["title"], " ")
	slug_n := slug.Make(title)
	database.DB.Model(&models.Post{}).Where("slug = ?", slug_n).First(&ex_post)
	if ex_post != nil {
		var count int64 = 1
		var query *models.Post
		var copy_slug string = slug_n
		var queryset int64
		database.DB.Model(&models.Post{}).Where("slug = ?", slug_n).Count(&queryset)
		for queryset >= 1 {
			slug_n = copy_slug + "-" + strconv.Itoa(int(count))
			database.DB.Model(&models.Post{}).Where("slug = ?", slug_n).First(&query)
			if query.ID == post.ID {
				break
			}

			count += 1
			database.DB.Model(&models.Post{}).Where("slug=?", slug_n).Count(&queryset)
		}
	}
	content := strings.Join(form.Value["content"], " ")
	var imageUrl string = ""
	if form.File["image"] != nil {
		utils.ImageDelete(c, &post)
		image, _ := utils.ImageUpload(c)
		imageUrl = image["imageUrl"].(string)

	}

	database.DB.Model(&post).Updates(models.Post{Title: title, Image: imageUrl, Content: content, Slug: slug_n})
	return c.JSON(fiber.Map{
		"post":   post,
		"author": user,
	})
}

func PostDelete(c *fiber.Ctx) error {
	var post *models.Post
	slug := c.Params("slug")
	user, _ := utils.VerifyJwt(c)
	database.DB.Model(&models.Post{}).Where("slug = ?", slug).First(&post)
	if post.Author != user.ID {
		return c.JSON(
			fiber.Map{
				"Error": "You are not the author of this post",
			},
		)
	}
	utils.ImageDelete(c, post)
	database.DB.Model(&user).Association("Posts").Delete([]models.Post{*post})
	database.DB.Model(&post).Delete(&post)
	return c.JSON(fiber.Map{"success": "Post deleted successfully"})
}

func CategorySearch(c *fiber.Ctx) error {
	var result []Result
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		panic(err)
	}
	database.DB.Scopes(utils.Paginate(c)).Model(&models.Post{}).Where("category = ?", data["category"]).Select("*").Joins("join users on users.id=posts.author").Order("created_at Desc").Scan(&result)
	return c.JSON(fiber.Map{"posts": result})
}
