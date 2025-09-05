import React, { useState } from 'react';
import { ProTable, ProFormText, Modal, message } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import {
  getCustomerList,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from '@/services/customer';
import type { CustomerItem } from '@/services/data';

const CustomerPage: React.FC = () => {
  // 控制新增/编辑弹窗显示
  const [visible, setVisible] = useState<boolean>(false);
  // 当前编辑的客户数据
  const [currentRow, setCurrentRow] = useState<CustomerItem | null>(null);

  // 表格列配置
  const columns = [
    {
      title: '客户编号',
      dataIndex: 'code',
      key: 'code',
      formItemProps: {
        rules: [{ required: true, message: '请输入客户编号' }],
      },
    },
    {
      title: '客户姓名',
      dataIndex: 'name',
      key: 'name',
      formItemProps: {
        rules: [{ required: true, message: '请输入客户姓名' }],
      },
    },
    {
      title: '操作',
      key: 'operation',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setCurrentRow(record);
            setVisible(true);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={async () => {
            try {
              await deleteCustomer(record.id);
              message.success('删除成功');
              // 刷新表格
              tableRef.current?.reload();
            } catch (error) {
              message.error('删除失败');
            }
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  // 表格引用，用于刷新
  const tableRef = React.useRef<{ reload: () => void }>(null);

  // 打开新增弹窗
  const handleAdd = () => {
    setCurrentRow(null);
    setVisible(true);
  };

  // 提交表单（新增或编辑）
  const handleSubmit = async (values: Omit<CustomerItem, 'id'>) => {
    try {
      if (currentRow) {
        // 编辑操作
        await updateCustomer(currentRow.id, values);
        message.success('更新成功');
      } else {
        // 新增操作
        await addCustomer(values);
        message.success('创建成功');
      }
      setVisible(false);
      // 刷新表格
      tableRef.current?.reload();
    } catch (error) {
      message.error(currentRow ? '更新失败' : '创建失败');
    }
  };

  return (
    <div>
      <ProTable<CustomerItem>
        ref={tableRef}
        columns={columns}
        request={getCustomerList}
        rowKey="id"
        toolBarRender={() => [
          <button
            key="add"
            type="button"
            onClick={handleAdd}
            className="ant-btn ant-btn-primary"
          >
            <PlusOutlined /> 新增客户
          </button>,
        ]}
        pagination={{ pageSize: 10 }}
        search={false}
      />

      {/* 新增/编辑弹窗 */}
      <Modal
        title={currentRow ? '编辑客户' : '新增客户'}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <ProFormText
          name="code"
          label="客户编号"
          initialValue={currentRow?.code}
          rules={[{ required: true, message: '请输入客户编号' }]}
        />
        <ProFormText
          name="name"
          label="客户姓名"
          initialValue={currentRow?.name}
          rules={[{ required: true, message: '请输入客户姓名' }]}
        />
        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="ant-btn"
            style={{ marginRight: 8 }}
          >
            取消
          </button>
          <button
            type="button"
            onClick={() => {
              const form = document.querySelector('.ant-form') as any;
              form.validateFields().then((values: any) => {
                handleSubmit(values);
              });
            }}
            className="ant-btn ant-btn-primary"
          >
            确认
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerPage;
