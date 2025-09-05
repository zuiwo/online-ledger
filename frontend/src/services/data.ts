// 客户数据类型
export interface CustomerItem {
  id: number;
  code: string; // 客户编号
  name: string; // 客户姓名
  created_at?: string;
  updated_at?: string;
}

// 产品数据类型
export interface ProductItem {
  id: number;
  code: string; // 产品编号
  name: string; // 产品名称
  created_at?: string;
  updated_at?: string;
}
