package service

import (
	"online-ledger/backend/internal/db"
	"online-ledger/backend/internal/model"
)

// GetAllProducts 获取所有产品
func GetAllProducts() ([]model.Product, error) {
	var products []model.Product
	result := db.DB.Find(&products)
	return products, result.Error
}

// GetProductById 根据ID获取产品
func GetProductById(id uint) (model.Product, error) {
	var product model.Product
	result := db.DB.First(&product, id)
	return product, result.Error
}

// CreateProduct 创建产品
func CreateProduct(product *model.Product) error {
	result := db.DB.Create(product)
	return result.Error
}

// UpdateProduct 更新产品
func UpdateProduct(product *model.Product) error {
	result := db.DB.Save(product)
	return result.Error
}

// DeleteProduct 删除产品
func DeleteProduct(id uint) error {
	result := db.DB.Delete(&model.Product{}, id)
	return result.Error
}
