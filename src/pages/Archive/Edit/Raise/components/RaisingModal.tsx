import { FC, useEffect } from 'react';
import { Modal, Form, Input, Switch, Radio, InputNumber } from 'antd';
import { RaisingHistoryType } from '../data';

interface RaisingModalProps {
  visible: boolean;
  record: RaisingHistoryType | undefined;
  closeHandler: () => void;
  onFinish: (values: any) => void;
  confirmLoading: boolean;
}

const RaisingModal: FC<RaisingModalProps> = (props) => {
  const { visible, record, closeHandler, onFinish, confirmLoading } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (record === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue({
        ...record,
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
        title={record ? '修改抚养史信息' : '添加抚养史信息'}
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
            label="起始年龄"
            name="startingAge"
            rules={[{ required: true, message: '起始年龄不能为空' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="截至年龄"
            name="endingAge"
            rules={[{ required: true, message: '截至年龄不能为空' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="抚养人"
            name="guardian"
            rules={[{ required: true, message: '抚养人不能为空' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RaisingModal;
