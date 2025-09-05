import React, { useState } from 'react';
import { ProTable, ProFormText, Modal, message } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import {
  getProductList,
  addProduct,
  updateProduct,
  deleteProduct,
} from '@/services/product';
import type { ProductItem } from '@/services/data';

const ProductPage: React.FC = () => {
  // 控制新增/编辑弹窗显示
  const [visible, setVisible] = useState<boolean>(false);
  // 当前编辑的产品数据
  const [currentRow, setCurrentRow] = useState<ProductItem | null>(null);

  // 表格列配置
  const columns = [
    {
      title: '产品编号',
      dataIndex: 'code',
      key: 'code',
      formItemProps: {
        rules: [{ required: true, message: '请输入产品编号' }],
      },
    },
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
      formItemProps: {
        rules: [{ required: true, message: '请输入产品名称' }],
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
              await deleteProduct(record.id);
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
  const handleSubmit = async (values: Omit<ProductItem, 'id'>) => {
    try {
      if (currentRow) {
        // 编辑操作
        await updateProduct(currentRow.id, values);
        message.success('更新成功');
      } else {
        // 新增操作
        await addProduct(values);
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
      <ProTable<ProductItem>
        ref={tableRef}
        columns={columns}
        request={getProductList}
        rowKey="id"
        toolBarRender={() => [
          <button
            key="add"
            type="button"
            onClick={handleAdd}
            className="ant-btn ant-btn-primary"
          >
            <PlusOutlined /> 新增产品
          </button>,
        ]}
        pagination={{ pageSize: 10 }}
        search={false}
      />

      {/* 新增/编辑弹窗 */}
      <Modal
        title={currentRow ? '编辑产品' : '新增产品'}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <ProFormText
          name="code"
          label="产品编号"
          initialValue={currentRow?.code}
          rules={[{ required: true, message: '请输入产品编号' }]}
        />
        <ProFormText
          name="name"
          label="产品名称"
          initialValue={currentRow?.name}
          rules={[{ required: true, message: '请输入产品名称' }]}
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

export default ProductPage;
