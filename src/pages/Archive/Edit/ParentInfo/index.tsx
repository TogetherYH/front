import { FC, useEffect, useState } from 'react';
import { Space, Row, Button, Form, Input } from 'antd';
import { connect, parentInfoState, Loading, Dispatch } from 'umi';
import DictSelect from '@/components/DictSelect';
import { SizeType } from 'antd/es/config-provider/SizeContext';
const { TextArea } = Input;

interface ParentInfoProps {
  visible: boolean;
  userId?: string;
  parentInfo: parentInfoState;
  dispatch: Dispatch;
}

const ParentInfo: FC<ParentInfoProps> = (props) => {
  const { visible, userId, parentInfo, dispatch } = props;
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (visible && dispatch) {
      dispatch({
        type: 'parentInfo/fetchOne',
        payload: {
          userId,
        },
      });
    }
  }, [visible]);

  useEffect(() => {
    // console.log('uu', userInfo);
    if (parentInfo?.parentInfo) {
      form.setFieldsValue({
        ...parentInfo?.parentInfo,
      });
    } else {
      form.resetFields();
    }

    setEditing(false);
  }, [parentInfo]);

  const formProps = {
    form: form,
    size: 'small' as SizeType,
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
      type: 'parentInfo/fetchOne',
      payload: {
        userId,
      },
      callback: (res) => {
        setEditing(false);
      },
    });
  };

  const handlerSave = () => {
    dispatch({
      type: 'parentInfo/fetchUpdate',
      payload: {
        id: userId,
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
          <Form.Item label="父亲职业" name="fatherOccupation">
            <DictSelect dictCode="user_occupation" disabled={!editing} />
          </Form.Item>

          <Form.Item label="父亲健康状况" name="fatherHealth">
            <DictSelect dictCode="user_physical" disabled={!editing} />
          </Form.Item>

          <Form.Item label="母亲职业" name="motherOccupation">
            <DictSelect dictCode="user_occupation" disabled={!editing} />
          </Form.Item>

          <Form.Item label="母亲健康状况" name="motherHealth">
            <DictSelect dictCode="user_physical" disabled={!editing} />
          </Form.Item>

          <Form.Item label="父母婚姻状态" name="parentMarriage">
            <DictSelect dictCode="user_parent_marriage" disabled={!editing} />
          </Form.Item>

          <Form.Item label="父母病史" name="parentDisease">
            <TextArea placeholder="" rows={5} disabled={!editing} />
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

const mapStateToProps = ({
  parentInfo,
  loading,
}: {
  parentInfo: parentInfoState;
  loading: Loading;
}) => {
  return {
    parentInfo,
    userLoading: loading.models.parentInfo,
  };
};

export default connect(mapStateToProps)(ParentInfo);
