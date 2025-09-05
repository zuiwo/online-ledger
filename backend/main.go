package main

import (
	"fmt"
	"online-ledger/backend/config"
	"online-ledger/backend/internal/db"
	"online-ledger/backend/router"
)

func main() {
	// 初始化数据库
	if err := db.Init(); err != nil {
		fmt.Printf("数据库初始化失败: %v\n", err)
		return
	}
	fmt.Println("数据库初始化成功")

	// 设置路由
	r := router.SetupRouter()

	// 启动服务
	cfg := config.GetConfig()
	fmt.Printf("后端服务启动成功，地址: http://localhost:%s\n", cfg.Port)
	r.Run(":" + cfg.Port)
}
