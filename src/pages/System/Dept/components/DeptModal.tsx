import { FC, useEffect } from 'react';
import { Modal, Form, Input, Switch, TreeSelect, InputNumber } from 'antd';
import { SingleDeptType, FormValues } from '../data';
import { deptTreeState } from '../models/deptTree';

interface DeptModalProps {
  visible: boolean;
  record: SingleDeptType | undefined;
  closeHandler: () => void;
  onFinish: (values: FormValues) => void;
  confirmLoading: boolean;
  deptTree: deptTreeState;
}

const DeptModal: FC<DeptModalProps> = (props) => {
  const { visible, record, closeHandler, onFinish, confirmLoading, deptTree } =
    props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (record === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue({
        ...record,
        status: record.status === '1' ? true : false,
      });
    }
  }, [visible]);

  const onOk = () => {
    form.submit();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('form submit failed');
  };

  return (
    <div>
      <Modal
        title={record ? '修改部门信息' : '添加部门信息'}
        maskClosable={false}
        centered
        forceRender
        visible={visible}
        onOk={onOk}
        onCancel={closeHandler}
        confirmLoading={confirmLoading}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            status: true,
          }}
        >
          <Form.Item
            label="上级部门"
            name="parentId"
            rules={[{ required: true, message: '部门名称不能为空' }]}
          >
            <TreeSelect
              treeData={deptTree?.tree}
              fieldNames={{ label: 'name', value: 'id' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            />
          </Form.Item>
          <Form.Item
            label="部门名称"
            name="name"
            rules={[{ required: true, message: '部门名称不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="部门编码"
            name="code"
            rules={[{ required: true, message: '部门编码不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="排序" name="order">
            <InputNumber />
          </Form.Item>

          <Form.Item label="状态" name="status" valuePropName="checked">
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeptModal;
