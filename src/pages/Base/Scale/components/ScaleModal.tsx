import { FC, useEffect } from 'react';
import { Modal, Form, Input, Switch, InputNumber, TreeSelect } from 'antd';
import { scaleState, scaleTreeState, Loading, Dispatch, connect } from 'umi';
// import moment from 'moment';
import { ScaleType, FormValues } from '../data';

interface ScaleModalProps {
  visible: boolean;
  scaleId?: string;
  scale: scaleState;
  scaleTree: scaleTreeState;
  closeHandler: () => void;
  onFinish: (values: FormValues) => void;
  confirmLoading: boolean;
  dispatch?: Dispatch;
}

const ScaleModal: FC<ScaleModalProps> = (props) => {
  const {
    visible,
    scaleId,
    scale,
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
    if (visible && scaleId === undefined) {
      form.resetFields();
    }

    // 打开修改对话框
    if (visible && scaleId) {
      if (dispatch) {
        dispatch({
          type: 'scale/fetchOne',
          payload: {
            scaleId,
          },
        });
      }
    }

    if (!visible) {
      form.resetFields();
    }
  }, [visible]);

  useEffect(() => {
    // console.log('scaleState变化....')
    form.setFieldsValue({
      ...scale,
      status: scale.status === '1' ? true : false,
    });
  }, [scale]);

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
        title={scaleId === undefined ? '添加量表信息' : '修改量表信息'}
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
            label="分类"
            name="parentId"
            rules={[{ required: true, message: '分类不能为空' }]}
          >
            <TreeSelect
              treeData={scaleTree?.tree}
              // treeDefaultExpandedKeys={[record?.id]}
              fieldNames={{ label: 'name', value: 'id' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            />
          </Form.Item>

          <Form.Item
            label="量表名称"
            name="name"
            rules={[{ required: true, message: '量表名称不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="别名" name="alias">
            <Input />
          </Form.Item>

          <Form.Item
            label="编码"
            name="code"
            rules={[{ required: true, message: '编码不能为空' }]}
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
  scale,
  loading,
}: {
  scale: scaleState;
  loading: Loading;
}) => {
  return {
    scale,
    scaleLoading: loading.models.scale,
  };
};

export default connect(mapStateToProps)(ScaleModal);
