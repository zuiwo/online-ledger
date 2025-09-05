package service

import (
	"online-ledger/backend/internal/db"
	"online-ledger/backend/internal/model"
)

// GetAllCustomers 获取所有客户
func GetAllCustomers() ([]model.Customer, error) {
	var customers []model.Customer
	result := db.DB.Find(&customers)
	return customers, result.Error
}

// GetCustomerById 根据ID获取客户
func GetCustomerById(id uint) (model.Customer, error) {
	var customer model.Customer
	result := db.DB.First(&customer, id)
	return customer, result.Error
}

// CreateCustomer 创建客户
func CreateCustomer(customer *model.Customer) error {
	result := db.DB.Create(customer)
	return result.Error
}

// UpdateCustomer 更新客户
func UpdateCustomer(customer *model.Customer) error {
	result := db.DB.Save(customer)
	return result.Error
}

// DeleteCustomer 删除客户
func DeleteCustomer(id uint) error {
	result := db.DB.Delete(&model.Customer{}, id)
	return result.Error
}
