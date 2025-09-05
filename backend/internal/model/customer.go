package model

import "gorm.io/gorm"

// Customer 客户模型
type Customer struct {
	gorm.Model
	Code string `gorm:"type:varchar(50);not null;unique" json:"code" binding:"required"` // 客户编号（必填，唯一）
	Name string `gorm:"type:varchar(100);not null" json:"name" binding:"required"`       // 客户姓名（必填）
}
