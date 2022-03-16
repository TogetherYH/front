import { FC, useEffect } from 'react';
import { Modal, Form, Input, Switch, Radio } from 'antd';
import { JobType } from '../data';

interface JobModalProps {
  visible: boolean;
  record: JobType | undefined;
  closeHandler: () => void;
  onFinish: (values: any) => void;
  confirmLoading: boolean;
}

const JobModal: FC<JobModalProps> = (props) => {
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
        title={record ? '修改任务信息' : '添加任务信息'}
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
            label="任务名称"
            name="name"
            rules={[{ required: true, message: '任务名称不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="任务分组"
            name="group"
            rules={[{ required: true, message: '任务分组不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="任务调度字符串"
            name="taskStr"
            rules={[{ required: true, message: '任务调度字符串不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="cron表达式"
            name="cronExpression"
            rules={[{ required: true, message: 'cron表达式不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="状态" name="status" valuePropName="checked">
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default JobModal;
