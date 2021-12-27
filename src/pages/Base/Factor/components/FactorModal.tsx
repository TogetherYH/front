import { FC, useEffect } from 'react';
import { Modal, Form, Input, Switch, InputNumber, TreeSelect } from 'antd';
import { factorState, scaleTreeState, Loading, Dispatch, connect } from 'umi';
// import moment from 'moment';
import { FactorType, FormValues } from '../data';

interface FactorModalProps {
  visible: boolean;
  factorId?: string;
  factor: factorState;
  scaleTree: scaleTreeState;
  closeHandler: () => void;
  onFinish: (values: FormValues) => void;
  confirmLoading: boolean;
  dispatch?: Dispatch;
}

const FactorModal: FC<FactorModalProps> = (props) => {
  const {
    visible,
    factorId,
    factor,
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
    if (visible && factorId === undefined) {
      form.resetFields();
    }

    // 打开修改对话框
    if (visible && factorId) {
      if (dispatch) {
        dispatch({
          type: 'factor/fetchOne',
          payload: {
            factorId,
          },
        });
      }
    }

    if (!visible) {
      form.resetFields();
    }
  }, [visible]);

  useEffect(() => {
    // console.log('factorState变化....')
    form.setFieldsValue({
      ...factor,
      status: factor.status === '1' ? true : false,
    });
  }, [factor]);

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
        title={factorId === undefined ? '添加答案信息' : '修改答案信息'}
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
            label="因子名称"
            name="name"
            rules={[{ required: true, message: '因子名称不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="平均分"
            name="average"
            rules={[{ required: true, message: '平均分不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="标准差"
            name="sd"
            rules={[{ required: true, message: '标准差不能为空' }]}
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

const mapStateToProps = ({
  factor,
  loading,
}: {
  factor: factorState;
  loading: Loading;
}) => {
  return {
    factor,
    factorLoading: loading.models.factor,
  };
};

export default connect(mapStateToProps)(FactorModal);
