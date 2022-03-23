import { FC, useEffect, useState } from 'react';
import { Space, Row, Col, Button, Form, Input, Select } from 'antd';
import { connect, userInfoState, Loading, Dispatch } from 'umi';
const { Option } = Select;

interface UserInfoProps {
  userInfo: userInfoState;
  dispatch: Dispatch;
}

const UserInfo: FC<UserInfoProps> = (props) => {
  const { userInfo, dispatch } = props;
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // console.log('uu', userInfo);
    form.setFieldsValue({
      ...userInfo?.userInfo,
    });
    setEditing(false);
  }, [userInfo]);

  const formProps = {
    form: form,
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
    style: {
      width: '60%',
    },
  };

  const handlerEdit = () => {
    setEditing(true);
  };

  const handlerCancel = () => {
    dispatch({
      type: 'userInfo/fetchOne',
      payload: {},
      callback: (res) => {
        setEditing(false);
      },
    });
  };

  const handlerSave = () => {
    dispatch({
      type: 'userInfo/fetchUpdate',
      payload: {
        values: form.getFieldsValue(),
      },
      callback: (res) => {
        setEditing(false);
      },
    });
  };

  return (
    <div>
      <Space style={{ width: '100%' }} direction="vertical">
        <Row justify="end">
          <Space direction="horizontal">
            <Button type="primary" disabled={editing} onClick={handlerEdit}>
              修改
            </Button>
            <Button type="primary" disabled={!editing} onClick={handlerSave}>
              保存
            </Button>
            <Button disabled={!editing} onClick={handlerCancel}>
              取消
            </Button>
          </Space>
        </Row>
        <Form {...formProps}>
          <Form.Item name="householdRegister" label="户口类型">
            <Select disabled={!editing}>
              <Option value="agricultural">农业户口</Option>
              <Option value="non-agriculturalucy">非农业户口</Option>
            </Select>
          </Form.Item>

          <Form.Item name="marriage" label="婚姻状况">
            <Select disabled={!editing} allowClear>
              <Option value="unmarried">未婚</Option>
              <Option value="married">已婚</Option>
              <Option value="widowed">丧偶</Option>
              <Option value="divorce">离异</Option>
            </Select>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

const mapStateToProps = ({
  userInfo,
  loading,
}: {
  userInfo: userInfoState;
  loading: Loading;
}) => {
  return {
    userInfo,
    userLoading: loading.models.userInfo,
  };
};

export default connect(mapStateToProps)(UserInfo);
