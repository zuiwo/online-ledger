import { request } from 'umi';
import type { ProductItem } from './data';

// 获取产品列表
export async function getProductList() {
  return request<{
    data: ProductItem[];
  }>('/api/products', {
    method: 'GET',
  });
}

// 获取单个产品
export async function getProduct(id: number) {
  return request<{
    data: ProductItem;
  }>(`/api/products/${id}`, {
    method: 'GET',
  });
}

// 创建产品
export async function addProduct(params: Omit<ProductItem, 'id'>) {
  return request('/api/products', {
    method: 'POST',
    data: params,
  });
}

// 更新产品
export async function updateProduct(id: number, params: Omit<ProductItem, 'id'>) {
  return request(`/api/products/${id}`, {
    method: 'PUT',
    data: params,
  });
}

// 删除产品
export async function deleteProduct(id: number) {
  return request(`/api/products/${id}`, {
    method: 'DELETE',
  });
}
