package models

type User struct {
	ID       uint     `json:"id" gorm:"autoCreateTime:milli"`
	Name     string   `json:"name"`
	Email    string   `json:"email" gorm:"unique:true"`
	Username string   `json:"username" gorm:"unique:true"`
	Password []byte   `json:"-"`
	Posts    []Post   `json:"posts" gorm:"foreignKey:Author"`
	Reviews  []Review `json:"-" gorm:"foreignKey:Author"`
}

type Post struct {
	ID        uint     `json:"id"`
	Title     string   `json:"title"`
	Content   string   `json:"content"`
	Image     string   `json:"image"`
	Category  string   `json:"category"`
	Slug      string   `json:"slug" gorm:"unique:true"`
	CreatedAt int      `json:"created"`
	Author    uint     `json:"author"`
	Reviews   []Review `json:"comments" gorm:"foreignKey:PostID"`
}

type Review struct {
	ID      uint   `json:"id"`
	Title   string `json:"title"`
	Comment string `json:"content"`
	Rating  int    `json:"rating"`
	PostID  int    `json:"post_id"`
	Author  uint   `json:"author"`
}
