import { FC, useEffect } from 'react';
import { Modal, Form, Input, Radio, DatePicker, Switch, Select } from 'antd';
const { RangePicker } = DatePicker;
import { publishState, Loading, Dispatch, connect } from 'umi';
import moment from 'moment';
import { PublishType, FormValues } from '../data';

interface PublishModalProps {
  visible: boolean;
  publishId?: string;
  publish: publishState;
  closeHandler: () => void;
  onFinish: (values: FormValues) => void;
  confirmLoading: boolean;
  dispatch?: Dispatch;
}

const PublishModal: FC<PublishModalProps> = (props) => {
  const {
    visible,
    publishId,
    publish,
    closeHandler,
    onFinish,
    confirmLoading,
    dispatch,
  } = props;
  const [form] = Form.useForm();

  // 第二个参数是触发条件
  useEffect(() => {
    // 打开新建对话框
    if (visible && publishId === undefined) {
      form.resetFields();
    }

    // 打开修改对话框
    if (visible && publishId) {
      if (dispatch) {
        dispatch({
          type: 'publish/fetchOne',
          payload: {
            publishId,
          },
        });
      }
    }

    if (!visible) {
      form.resetFields();
    }
  }, [visible]);

  useEffect(() => {
    form.setFieldsValue({
      ...publish,
      startDate: [
        publish.startDate ? moment(publish.startDate) : '',
        publish.endDate ? moment(publish.endDate) : '',
      ],
      status: publish.status === '1' ? true : false,
    });
  }, [publish]);

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
        title={publishId === undefined ? '添加发布记录' : '修改发布记录'}
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
            name="subject"
            rules={[{ required: true, message: '发布主题不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="开始日期" name="startDate">
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="状态" name="status" valuePropName="checked">
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({
  publish,
  loading,
}: {
  publish: publishState;
  loading: Loading;
}) => {
  return {
    publish,
    publishLoading: loading.models.publish,
  };
};

export default connect(mapStateToProps)(PublishModal);
