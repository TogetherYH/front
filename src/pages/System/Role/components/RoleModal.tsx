import { FC, useEffect } from 'react';
import { Modal, Form, Input, Switch, Radio } from 'antd';
import { RoleType, FormValues } from '../data';

interface RoleModalProps {
  visible: boolean;
  record: RoleType | undefined;
  closeHandler: () => void;
  onFinish: (values: FormValues) => void;
  confirmLoading: boolean;
}

const RoleModal: FC<RoleModalProps> = (props) => {
  const { visible, record, closeHandler, onFinish, confirmLoading } = props;
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
            label="角色名称"
            name="name"
            rules={[{ required: true, message: '角色名称不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="角色编码"
            name="code"
            rules={[{ required: true, message: '角色编码不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="数据权限" name="dataAuthority">
            <Radio.Group>
              <Radio value={'OWN'}>本人</Radio>
              <Radio value={'DEPT'}>本部门</Radio>
              <Radio value={'ALL'}>所有</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="状态" name="status" valuePropName="checked">
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleModal;
