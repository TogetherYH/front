import { FC, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Switch,
  TreeSelect,
  InputNumber,
  Radio,
} from 'antd';
import { MenuType, FormValues } from '../data';
import { menuTreeState } from '../models/menuTree';

interface MenuModalProps {
  visible: boolean;
  record: MenuType | undefined;
  closeHandler: () => void;
  onFinish: (values: FormValues) => void;
  confirmLoading: boolean;
  menuTree: menuTreeState;
}

const MenuModal: FC<MenuModalProps> = (props) => {
  const { visible, record, closeHandler, onFinish, confirmLoading, menuTree } =
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

  // 点击确定按钮，提交form表单，自动调用onFinish
  const onOk = () => {
    form.submit();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('form submit failed');
  };

  return (
    <div>
      <Modal
        title={record ? '修改菜单信息' : '添加菜单信息'}
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
            label="上级菜单"
            name="parentId"
            rules={[{ required: true, message: '菜单名称不能为空' }]}
          >
            <TreeSelect
              treeData={menuTree?.tree}
              treeDefaultExpandedKeys={[record?.id]}
              fieldNames={{ label: 'name', value: 'id' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            />
          </Form.Item>
          <Form.Item
            label="菜单名称"
            name="name"
            rules={[{ required: true, message: '菜单名称不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="菜单编码"
            name="code"
            rules={[{ required: true, message: '菜单编码不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="类型" name="type">
            <Radio.Group>
              <Radio value={'group'}>分组</Radio>
              <Radio value={'menu'}>菜单</Radio>
              <Radio value={'button'}>按钮</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="路径"
            name="path"
            rules={[{ required: true, message: '菜单编码不能为空' }]}
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

export default MenuModal;
