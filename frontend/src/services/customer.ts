import { request } from 'umi';
import type { CustomerItem } from './data';

// 获取客户列表
export async function getCustomerList() {
  return request<{
    data: CustomerItem[];
  }>('/api/customers', {
    method: 'GET',
  });
}

// 获取单个客户
export async function getCustomer(id: number) {
  return request<{
    data: CustomerItem;
  }>(`/api/customers/${id}`, {
    method: 'GET',
  });
}

// 创建客户
export async function addCustomer(params: Omit<CustomerItem, 'id'>) {
  return request('/api/customers', {
    method: 'POST',
    data: params,
  });
}

// 更新客户
export async function updateCustomer(id: number, params: Omit<CustomerItem, 'id'>) {
  return request(`/api/customers/${id}`, {
    method: 'PUT',
    data: params,
  });
}

// 删除客户
export async function deleteCustomer(id: number) {
  return request(`/api/customers/${id}`, {
    method: 'DELETE',
  });
}
