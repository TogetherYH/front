import { FC, useEffect } from 'react';
import { Modal, Form, Input, Radio, DatePicker, Switch } from 'antd';
import moment from 'moment';
import { UserType, FormValues } from '../data';

interface UserModalProps {
  visible: boolean;
  record: UserType | undefined;
  closeHandler: () => void;
  onFinish: (values: FormValues) => void;
  confirmLoading: boolean;
}

const UserModal: FC<UserModalProps> = (props) => {
  const { visible, record, closeHandler, onFinish, confirmLoading } = props;
  const [form] = Form.useForm();

  // 第二个参数是触发条件
  useEffect(() => {
    if (record === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue({
        ...record,
        birthday: record.birthday ? moment(record.birthday) : '',
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
        title={record ? '修改用户信息' : '添加用户信息'}
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
            label="账号"
            name="username"
            rules={[{ required: true, message: '账号不能为空' }]}
          >
            <Input disabled={record ? true : false} />
          </Form.Item>

          <Form.Item
            label="姓名"
            name="realName"
            rules={[{ required: true, message: '姓名不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="性别" name="sex">
            <Radio.Group>
              <Radio value={'1'}>男</Radio>
              <Radio value={'0'}>女</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="出生日期" name="birthday">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="状态" name="status" valuePropName="checked">
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserModal;
