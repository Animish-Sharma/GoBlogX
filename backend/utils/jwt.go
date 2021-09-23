package utils

import (
	"strconv"
	"strings"
	"time"

	"github.com/Animish-Sharma/blog/backend/database"
	"github.com/Animish-Sharma/blog/backend/models"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber"
	"github.com/google/uuid"
)

const Secret = "rCLwngnP26347Hkdu8386vwsb"

func GenerateJwt(c *fiber.Ctx, user models.User) interface{} {

	type CustomClaims struct {
		pass string `json:"-"`
		jwt.StandardClaims
	}
	custom := CustomClaims{
		uuid.NewString(),
		jwt.StandardClaims{
			Issuer:    strconv.Itoa(int(user.ID)),
			ExpiresAt: time.Now().Add(time.Hour * 168).Unix(),
		},
	}

	clams := jwt.NewWithClaims(jwt.SigningMethodHS256, custom)

	token, err := clams.SignedString([]byte(Secret))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{"error": "An error occurred"})
	}
	return token
}

func VerifyJwt(c *fiber.Ctx) (*models.User, error) {

	auth := c.Get("Authorization")
	bearer := strings.Split(auth, " ")[1]

	token, err := jwt.ParseWithClaims(bearer, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(Secret), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return nil, c.JSON(
			fiber.Map{
				"error": "Unauthorized",
			},
		)
	}

	claims := token.Claims.(*jwt.StandardClaims)

	var user *models.User

	database.DB.Where("ID = ?", claims.Issuer).First(&user)

	return user, nil

}
