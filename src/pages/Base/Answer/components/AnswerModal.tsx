import { FC, useEffect } from 'react';
import { Modal, Form, Input, Switch, InputNumber, TreeSelect } from 'antd';
import { answerState, scaleTreeState, Loading, Dispatch, connect } from 'umi';
// import moment from 'moment';
import { AnswerType, FormValues } from '../data';

interface AnswerModalProps {
  visible: boolean;
  answerId?: string;
  answer: answerState;
  scaleTree: scaleTreeState;
  closeHandler: () => void;
  onFinish: (values: FormValues) => void;
  confirmLoading: boolean;
  dispatch?: Dispatch;
}

const AnswerModal: FC<AnswerModalProps> = (props) => {
  const {
    visible,
    answerId,
    answer,
    scaleTree,
    closeHandler,
    onFinish,
    confirmLoading,
    dispatch,
  } = props;
  const [form] = Form.useForm();

  // 第二个参数是触发条件
  useEffect(() => {
    // 打开新建对话框
    if (visible && answerId === undefined) {
      form.resetFields();
    }

    // 打开修改对话框
    if (visible && answerId) {
      if (dispatch) {
        dispatch({
          type: 'answer/fetchOne',
          payload: {
            answerId,
          },
        });
      }
    }

    if (!visible) {
      form.resetFields();
    }
  }, [visible]);

  useEffect(() => {
    // console.log('answerState变化....')
    form.setFieldsValue({
      ...answer,
      status: answer.status === '1' ? true : false,
    });
  }, [answer]);

  // 点击确定按钮，提交form表单，自动调用onFinish
  const onOk = () => {
    form.submit();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('form submit failed');
  };

  // const { Option } = Select;
  // const children = [];
  // for (let i = 10; i < 36; i++) {
  //   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  // }
  return (
    <div>
      <Modal
        title={answerId === undefined ? '添加答案信息' : '修改答案信息'}
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
            label="量表"
            name="scaleId"
            rules={[{ required: true, message: '量表不能为空' }]}
          >
            <TreeSelect
              treeData={scaleTree?.tree}
              // treeDefaultExpandedKeys={[record?.id]}
              fieldNames={{ label: 'name', value: 'id' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            />
          </Form.Item>

          <Form.Item
            label="答案"
            name="name"
            rules={[{ required: true, message: '答案不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="编码"
            name="groupCode"
            rules={[{ required: true, message: '编码不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="选项"
            name="option"
            rules={[{ required: true, message: '选项不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="分数"
            name="score"
            rules={[{ required: true, message: '分数不能为空' }]}
          >
            <InputNumber />
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

const mapStateToProps = ({
  answer,
  loading,
}: {
  answer: answerState;
  loading: Loading;
}) => {
  return {
    answer,
    answerLoading: loading.models.answer,
  };
};

export default connect(mapStateToProps)(AnswerModal);
