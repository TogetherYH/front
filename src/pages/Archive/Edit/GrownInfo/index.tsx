import { FC, useEffect, useState } from 'react';
import { Space, Row, Button, Form, Input } from 'antd';
import { connect, grownInfoState, Loading, Dispatch } from 'umi';
import DictSelect from '@/components/DictSelect';
import { SizeType } from 'antd/es/config-provider/SizeContext';
const { TextArea } = Input;

interface GrownInfoProps {
  visible: boolean;
  userId?: string;
  grownInfo: grownInfoState;
  dispatch: Dispatch;
}

const GrownInfo: FC<GrownInfoProps> = (props) => {
  const { visible, userId, grownInfo, dispatch } = props;
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (visible && dispatch) {
      dispatch({
        type: 'grownInfo/fetchOne',
        payload: {
          userId,
        },
      });
    }
  }, [visible]);

  useEffect(() => {
    // console.log('uu', userInfo);
    if (grownInfo?.grownInfo) {
      form.setFieldsValue({
        ...grownInfo?.grownInfo,
      });
    } else {
      form.resetFields();
    }

    setEditing(false);
  }, [grownInfo]);

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
      type: 'grownInfo/fetchOne',
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
      type: 'grownInfo/fetchUpdate',
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
          <Form.Item label="????????????" name="fatherCharacter">
            <DictSelect disabled={!editing} dictCode="user_character" />
          </Form.Item>

          <Form.Item label="??????????????????" name="fatherRaiseMode">
            <DictSelect dictCode="user_raise_mode" disabled={!editing} />
          </Form.Item>

          <Form.Item label="????????????" name="motherCharacter">
            <DictSelect dictCode="user_character" disabled={!editing} />
          </Form.Item>

          <Form.Item label="??????????????????" name="motherRaiseMode">
            <DictSelect dictCode="user_raise_mode" disabled={!editing} />
          </Form.Item>

          <Form.Item label="????????????" name="parentRelation">
            <DictSelect dictCode="user_parent_relation" disabled={!editing} />
          </Form.Item>

          <Form.Item label="????????????" name="familyAtmosphere">
            <DictSelect dictCode="user_family_atmosphere" disabled={!editing} />
          </Form.Item>

          <Form.Item label="???????????????" name="guardianCharacter">
            <DictSelect dictCode="user_character" disabled={!editing} />
          </Form.Item>

          <Form.Item label="?????????????????????" name="guardianRaiseMode">
            <DictSelect dictCode="user_raise_mode" disabled={!editing} />
          </Form.Item>

          <Form.Item label="???????????????" name="firstMemory">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="?????????????????????" name="mostImpressive">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="????????????" name="importantEvent">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="?????????????????????" name="childhoodHurt">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="?????????????????????" name="kindergartenAdapt">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="????????????" name="primarySchoolExperience">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="????????????" name="juniorHighSchoolExperience">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="????????????" name="highSchoolExperience">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="????????????" name="universityExperience">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="????????????" name="rewardsPunishments">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="????????????" name="interpersonalRelationship">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="????????????" name="emotionExperience">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="??????????????????" name="successFailure">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

const mapStateToProps = ({
  grownInfo,
  loading,
}: {
  grownInfo: grownInfoState;
  loading: Loading;
}) => {
  return {
    grownInfo,
    userLoading: loading.models.grownInfo,
  };
};

export default connect(mapStateToProps)(GrownInfo);
