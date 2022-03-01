import { FC } from 'react';
import { Modal, Form, Input } from 'antd';
import { FormValues } from '../data';

interface DictModalProps {
  visible: boolean;
  dictId: string;
  onFinish: (values: FormValues) => void;
  closeHandler: () => void;
}

const DictModal: FC<DictModalProps> = (props) => {
  const { visible, dictId, onFinish, closeHandler } = props;

  const [form] = Form.useForm();

  // 点击确定按钮，提交form表单，自动调用onFinish
  const onOk = () => {
    console.log('ok');
    form.submit();
  };

  return (
    <div>
      <Modal
        title={dictId === undefined ? '添加字典信息' : '修改字典信息'}
        // maskClosable={false}
        centered
        forceRender
        visible={visible}
        onOk={onOk}
        onCancel={closeHandler}
        // confirmLoading={confirmLoading}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item
            label="字典名称"
            name="name"
            rules={[{ required: true, message: '名称不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="字典编码"
            name="code"
            rules={[{ required: true, message: '编码不能为空' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DictModal;
