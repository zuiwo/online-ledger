package config

// Config 应用配置
type Config struct {
	DB   DBConfig `json:"db"`
	Port string   `json:"port"` // 后端服务端口
}

// DBConfig 数据库配置
type DBConfig struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Host     string `json:"host"`
	Port     string `json:"port"`
	DBName   string `json:"dbname"`
}

// GetConfig 获取配置信息
func GetConfig() Config {
	return Config{
		Port: "8080", // 后端服务运行的端口
		DB: DBConfig{
			Username: "root",
			Password: "123456", // 与docker-compose.yml一致
			Host:     "localhost",
			Port:     "3307", // 你设置的MySQL端口
			DBName:   "online_ledger",
		},
	}
}
