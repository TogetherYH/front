import { FC, useEffect } from 'react';
import { Modal, Form, Input, Switch, Radio, InputNumber } from 'antd';
import { ChildType } from '../data';
import DictSelect from '@/components/DictSelect';

interface ChildModalProps {
  visible: boolean;
  record: ChildType | undefined;
  closeHandler: () => void;
  onFinish: (values: any) => void;
  confirmLoading: boolean;
}

const ChildModal: FC<ChildModalProps> = (props) => {
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
        title={record ? '修改子女信息' : '添加子女信息'}
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
            label="性别"
            name="childSex"
            rules={[{ required: true, message: '性别不能为空' }]}
          >
            {/* <Input style={{ width: '100%' }} /> */}
            <DictSelect dictCode="user_sex" disabled={false} />
          </Form.Item>

          <Form.Item
            label="年龄"
            name="childAge"
            rules={[{ required: true, message: '年龄不能为空' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="详细信息" name="childInfo">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ChildModal;
