package router

import (
	"online-ledger/backend/internal/handler"

	"github.com/gin-gonic/gin"
)

// SetupRouter 配置路由
func SetupRouter() *gin.Engine {
	r := gin.Default() // 默认包含日志和恢复中间件

	// API路由组
	api := r.Group("/api")
	{
		// 客户管理接口
		customers := api.Group("/customers")
		{
			customers.GET("", handler.ListCustomers)         // 获取所有客户
			customers.GET("/:id", handler.GetCustomer)       // 获取单个客户
			customers.POST("", handler.CreateCustomer)       // 创建客户
			customers.PUT("/:id", handler.UpdateCustomer)    // 更新客户
			customers.DELETE("/:id", handler.DeleteCustomer) // 删除客户
		}

		// 产品管理接口
		products := api.Group("/products")
		{
			products.GET("", handler.ListProducts)         // 获取所有产品
			products.GET("/:id", handler.GetProduct)       // 获取单个产品
			products.POST("", handler.CreateProduct)       // 创建产品
			products.PUT("/:id", handler.UpdateProduct)    // 更新产品
			products.DELETE("/:id", handler.DeleteProduct) // 删除产品
		}
	}

	return r
}
