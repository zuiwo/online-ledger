package model

import "gorm.io/gorm"

// Product 产品模型
type Product struct {
	gorm.Model
	Code string `gorm:"type:varchar(50);not null;unique" json:"code" binding:"required"` // 产品编号（必填，唯一）
	Name string `gorm:"type:varchar(100);not null" json:"name" binding:"required"`       // 产品名称（必填）
}
