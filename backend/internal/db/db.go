package db

import (
	"fmt"
	"online-ledger/backend/config"
	"online-ledger/backend/internal/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

// Init 初始化数据库连接并自动创建表
func Init() error {
	cfg := config.GetConfig().DB

	// 构建连接字符串
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		cfg.Username, cfg.Password, cfg.Host, cfg.Port, cfg.DBName)

	// 连接数据库
	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("数据库连接失败: %v", err)
	}

	// 自动创建数据表（如果不存在）
	err = DB.AutoMigrate(
		&model.Customer{},
		&model.Product{},
	)
	if err != nil {
		return fmt.Errorf("创建数据表失败: %v", err)
	}

	return nil
}
