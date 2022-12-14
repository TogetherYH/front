import { FC, useEffect, useState } from 'react';
import { Space, Row, Button, Form, Input, InputNumber } from 'antd';
import { connect, brotherSisterState, Loading, Dispatch } from 'umi';
import DictSelect from '@/components/DictSelect';
import { SizeType } from 'antd/es/config-provider/SizeContext';
const { TextArea } = Input;

interface BrotherSisterProps {
  visible: boolean;
  userId?: string;
  brotherSister: brotherSisterState;
  brotherSisterLoading: boolean;
  dispatch: Dispatch;
}

const BrotherSister: FC<BrotherSisterProps> = (props) => {
  const { visible, userId, brotherSister, dispatch } = props;
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (visible && dispatch) {
      dispatch({
        type: 'brotherSister/fetchOne',
        payload: {
          userId,
        },
      });
    }
  }, [visible]);

  useEffect(() => {
    // console.log('uu', userInfo);
    if (brotherSister?.brotherSister) {
      form.setFieldsValue({
        ...brotherSister?.brotherSister,
      });
    } else {
      form.resetFields();
    }

    setEditing(false);
  }, [brotherSister]);

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
      type: 'brotherSister/fetchOne',
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
      type: 'brotherSister/fetchUpdate',
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
              ??????
            </Button>
            <Button type="primary" disabled={!editing} onClick={handlerSave}>
              ??????
            </Button>
            <Button disabled={!editing} onClick={handlerCancel}>
              ??????
            </Button>
          </Space>
        </Row>
        <Form {...formProps}>
          <Form.Item label="??????????????????" name="listJson">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="??????????????????" name="disease">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="???????????????????????????" name="deathCase">
            <DictSelect dictCode="user_brother_death" disabled={!editing} />
          </Form.Item>

          <Form.Item label="????????????" name="deathAge">
            <InputNumber />
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

const mapStateToProps = ({
  brotherSister,
  loading,
}: {
  brotherSister: brotherSisterState;
  loading: Loading;
}) => {
  return {
    brotherSister,
    brotherSisterLoading: loading.models.brotherSister,
  };
};

export default connect(mapStateToProps)(BrotherSister);
