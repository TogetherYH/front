import { FC, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Radio,
  DatePicker,
  Switch,
  Select,
  TreeSelect,
} from 'antd';
import { userState, deptTreeState, Loading, Dispatch, connect } from 'umi';
import moment from 'moment';
import { UserType, FormValues } from '../data';

interface UserModalProps {
  visible: boolean;
  userId?: string;
  user: userState;
  allRole: any;
  deptTree: deptTreeState;
  closeHandler: () => void;
  onFinish: (values: FormValues) => void;
  confirmLoading: boolean;
  dispatch?: Dispatch;
}

const UserModal: FC<UserModalProps> = (props) => {
  const {
    visible,
    userId,
    user,
    allRole,
    deptTree,
    closeHandler,
    onFinish,
    confirmLoading,
    dispatch,
  } = props;
  const [form] = Form.useForm();

  // 第二个参数是触发条件
  useEffect(() => {
    // 打开新建对话框
    if (visible && userId === undefined) {
      form.resetFields();
    }

    // 打开修改对话框
    if (visible && userId) {
      if (dispatch) {
        dispatch({
          type: 'user/fetchOne',
          payload: {
            userId,
          },
        });
      }
    }

    if (!visible) {
      form.resetFields();
    }
  }, [visible]);

  useEffect(() => {
    // console.log('userState变化....')
    form.setFieldsValue({
      ...user,
      birthday: user.birthday ? moment(user.birthday) : '',
      status: user.status === '1' ? true : false,
    });
  }, [user]);

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
        title={userId === undefined ? '添加用户信息' : '修改用户信息'}
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
            <Input disabled={userId === undefined ? false : true} />
          </Form.Item>

          <Form.Item
            label="姓名"
            name="realName"
            rules={[{ required: true, message: '姓名不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="所属部门"
            name="deptId"
            rules={[{ required: true, message: '部门名称不能为空' }]}
          >
            <TreeSelect
              treeData={deptTree?.tree}
              treeDefaultExpandedKeys={[user?.deptId]}
              fieldNames={{ label: 'name', value: 'id' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            />
          </Form.Item>

          <Form.Item label="角色" name="roleIds">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              // placeholder="Please select"
              // fieldNames={{ label: 'name', value: 'id' }}
              options={allRole}
              optionLabelProp={'label'}
              onSelect={() => {}}
              // value={user?.roleIds}
            >
              {/* {allRole} */}
            </Select>
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

const mapStateToProps = ({
  user,
  loading,
}: {
  user: userState;
  loading: Loading;
}) => {
  return {
    user,
    userLoading: loading.models.user,
  };
};

export default connect(mapStateToProps)(UserModal);
