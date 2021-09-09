package utils

import (
	"crypto/tls"
	"fmt"
	"os"

	"github.com/gofiber/fiber"
	gomail "gopkg.in/gomail.v2"
)

func SendMail(c *fiber.Ctx, to string, subject string, content string) error {
	from := os.Getenv("EMAIL")
	password := os.Getenv("PASSWORD")
	var host string = "smtp.gmail.com"
	var port int = 587
	m := gomail.NewMessage()
	m.SetHeader("From", from)
	m.SetHeader("To", to)
	m.SetHeader("Subject", subject)
	m.SetBody("text/plain", content)
	d := gomail.NewDialer(host, port, from, password)

	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}
	if err := d.DialAndSend(m); err != nil {
		fmt.Println(err)
		return err
	}
	fmt.Println("Sent Mail Successfully")
	return nil
}
