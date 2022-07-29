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
          <Form.Item label="父亲性格" name="fatherCharacter">
            <DictSelect disabled={!editing} dictCode="user_character" />
          </Form.Item>

          <Form.Item label="父亲抚养方式" name="fatherRaiseMode">
            <DictSelect dictCode="user_raise_mode" disabled={!editing} />
          </Form.Item>

          <Form.Item label="母亲性格" name="motherCharacter">
            <DictSelect dictCode="user_character" disabled={!editing} />
          </Form.Item>

          <Form.Item label="母亲抚养方式" name="motherRaiseMode">
            <DictSelect dictCode="user_raise_mode" disabled={!editing} />
          </Form.Item>

          <Form.Item label="父母关系" name="parentRelation">
            <DictSelect dictCode="user_parent_relation" disabled={!editing} />
          </Form.Item>

          <Form.Item label="家庭氛围" name="familyAtmosphere">
            <DictSelect dictCode="user_family_atmosphere" disabled={!editing} />
          </Form.Item>

          <Form.Item label="抚养人性格" name="guardianCharacter">
            <DictSelect dictCode="user_character" disabled={!editing} />
          </Form.Item>

          <Form.Item label="抚养人抚养方式" name="guardianRaiseMode">
            <DictSelect dictCode="user_raise_mode" disabled={!editing} />
          </Form.Item>

          <Form.Item label="最早的记忆" name="firstMemory">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="印象深刻的事情" name="mostImpressive">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="重要事件" name="importantEvent">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="幼时的创伤经历" name="childhoodHurt">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="幼儿园适应情况" name="kindergartenAdapt">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="小学经历" name="primarySchoolExperience">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="初中经历" name="juniorHighSchoolExperience">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="高中经历" name="highSchoolExperience">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="大学经历" name="universityExperience">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="奖惩经历" name="rewardsPunishments">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="人际关系" name="interpersonalRelationship">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="感情经历" name="emotionExperience">
            <TextArea placeholder="" rows={3} disabled={!editing} />
          </Form.Item>

          <Form.Item label="成功失败经历" name="successFailure">
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
