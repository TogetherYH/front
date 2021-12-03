import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Checkbox } from 'antd';

export default function UserModal(props) {
  const [form] = Form.useForm();
  const { visible, record, handleClose } = props;

  useEffect(() => {
    form.setFieldsValue(record);
  }, [visible]);

  return (
    <div>
      <Modal
        title="basic modal"
        maskClosable={false}
        centered
        forceRender
        visible={visible}
        onOk={handleClose}
        onCancel={handleClose}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="姓名"
            name="realName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
              label="启用"
              name="status"
              // valuePropName="status"
            >
              <Checkbox/>
            </Form.Item> */}

          {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
}
