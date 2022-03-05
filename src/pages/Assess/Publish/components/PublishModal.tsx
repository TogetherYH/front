import { FC, useState, useEffect, useRef } from 'react';
import { Modal, Form, Input, Button, DatePicker, Switch, Space } from 'antd';
const { TextArea } = Input;
const { RangePicker } = DatePicker;
import { publishState, Loading, Dispatch, connect } from 'umi';
import moment from 'moment';
import { PublishType, FormValues } from '../data';
import ScaleSelect from '@/components/System/ScaleSelect';
import DeptSelect from '@/components/System/DeptSelect';

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

  const [scaleSelectVisible, setScaleSelectVisible] = useState(false);
  const [selectedScaleKeys, setSelectedScaleKeys] = useState<
    string[] | undefined
  >([]);
  const [selectedScaleNames, setSelectedScaleNames] = useState('');
  const scaleIdRef = useRef<any>(null);

  const [deptSelectVisible, setDeptSelectVisible] = useState(false);
  const [selectedDeptKeys, setSelectedDeptKeys] = useState<
    string[] | undefined
  >([]);
  const [selectedDeptNames, setSelectedDeptNames] = useState('');
  const deptIdRef = useRef<any>(null);

  // 第二个参数是触发条件
  useEffect(() => {
    // 打开新建对话框
    if (visible && publishId === undefined) {
      setSelectedScaleNames('');
      setSelectedScaleKeys([]);
      setSelectedDeptNames('');
      setSelectedDeptKeys([]);
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
      setSelectedScaleNames('');
      setSelectedScaleKeys([]);
      setSelectedDeptNames('');
      setSelectedDeptKeys([]);
      form.resetFields();
    }
  }, [visible]);

  useEffect(() => {
    var checkedScaleKeys = publish?.scales?.map((item) => {
      return item.id;
    });
    setSelectedScaleKeys(checkedScaleKeys);
    var checkedScaleNames = publish?.scales?.map((item) => {
      return item.name;
    });
    setSelectedScaleNames(
      checkedScaleNames ? checkedScaleNames.join('\n') : '',
    );

    var checkedDeptKeys = publish?.depts?.map((item) => {
      return item.id;
    });
    setSelectedDeptKeys(checkedDeptKeys);
    var checkedDeptNames = publish?.depts?.map((item) => {
      return item.name;
    });
    setSelectedDeptNames(checkedDeptNames ? checkedDeptNames.join('\n') : '');

    form.setFieldsValue({
      ...publish,
      startDate: [
        publish.startDate ? moment(publish.startDate) : '',
        publish.endDate ? moment(publish.endDate) : '',
      ],
      status: publish.status === '1' ? true : false,
      scaleIds: checkedScaleKeys,
      deptIds: checkedDeptKeys,
    });
  }, [publish]);

  // 点击确定按钮，提交form表单，自动调用onFinish
  const onOk = () => {
    // console.log('ff', form.getFieldsValue());
    form.submit();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('form submit failed');
  };

  // 打开选择量表对话框
  const openScaleSelect = () => {
    // console.log('ss', scaleIdRef.current);
    scaleIdRef.current.blur();
    setScaleSelectVisible(true);
  };

  // 选择量表
  const selectedScales = (checkedNodes: any[]) => {
    var checkedKeys = checkedNodes.map((item) => {
      return item.id;
    });
    var checkedNames = checkedNodes.map((item) => {
      return item.name;
    });
    setSelectedScaleKeys(checkedKeys);
    setSelectedScaleNames(checkedNames.join('\n'));
    form.setFieldsValue({ scaleIds: checkedKeys });
    // console.log('ccc', checkedKeys);
    // console.log('ccc', checkedNodes);
    setScaleSelectVisible(false);
  };

  // 清空选择量表
  const onScaleClear = (e: any) => {
    setSelectedScaleNames('');
    setSelectedScaleKeys([]);
  };

  // 关闭选择量表对话框
  const handleScaleModalCancel = () => {
    setScaleSelectVisible(false);
  };

  // 打开选择部门对话框
  const openDeptSelect = () => {
    deptIdRef.current.blur();
    setDeptSelectVisible(true);
  };

  const selectedDepts = (checkedNodes: any[]) => {
    var checkedDeptKeys = checkedNodes.map((item) => {
      return item.id;
    });
    var checkedDeptNames = checkedNodes.map((item) => {
      return item.name;
    });
    setSelectedDeptKeys(checkedDeptKeys);
    setSelectedDeptNames(checkedDeptNames.join('\n'));
    form.setFieldsValue({ deptIds: checkedDeptKeys });
    setDeptSelectVisible(false);
  };

  // 清空选择部门
  const onDeptClear = (e: any) => {
    setSelectedDeptNames('');
    setSelectedDeptKeys([]);
  };

  const handleDeptModalCancel = () => {
    setDeptSelectVisible(false);
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
            label="主题"
            name="subject"
            rules={[{ required: true, message: '发布主题不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="开始日期" name="startDate">
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="测评量表" name="scaleIds">
            <Space direction="vertical" style={{ width: '100%' }}>
              <TextArea
                rows={4}
                allowClear
                onFocus={openScaleSelect}
                ref={scaleIdRef}
                value={selectedScaleNames}
                onChange={onScaleClear}
              />
              {/* <Button onClick={openScaleSelect}>选择量表</Button> */}
            </Space>
          </Form.Item>

          <Form.Item label="测评部门" name="deptIds">
            <Space direction="vertical" style={{ width: '100%' }}>
              <TextArea
                rows={4}
                allowClear
                onFocus={openDeptSelect}
                ref={deptIdRef}
                value={selectedDeptNames}
                onChange={onDeptClear}
              />
              {/* <Button>选择部门</Button> */}
            </Space>
          </Form.Item>

          <Form.Item label="状态" name="status" valuePropName="checked">
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
        <ScaleSelect
          isModalVisible={scaleSelectVisible}
          defaultChecked={selectedScaleKeys}
          handleOk={selectedScales}
          handleCancel={handleScaleModalCancel}
        />
        <DeptSelect
          isModalVisible={deptSelectVisible}
          defaultChecked={selectedDeptKeys}
          handleOk={selectedDepts}
          handleCancel={handleDeptModalCancel}
        />
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
