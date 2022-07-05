import { FC, useState, useEffect } from 'react';
import { Modal, Form, Input, notification } from 'antd';
import { Dispatch, connect, pwdState } from 'umi';

interface ChangePwdProps {
  isModalVisible: boolean;
  handleCancel: () => void;
  pwd: pwdState;
  dispatch: Dispatch;
}

const ChangePwd: FC<ChangePwdProps> = (props) => {
  const {
    isModalVisible,
    pwd,
    // defaultChecked,
    dispatch,
    // handleOk,
    handleCancel,
  } = props;

  const [form] = Form.useForm();

  const onOk = () => {
    const param = form.getFieldsValue();
    // console.log('param', param);
    if (!param.oldPwd) {
      notification.error({
        message: '请输入原密码',
      });
      return;
    }
    if (!param.newPwd) {
      notification.error({
        message: '请输入新密码',
      });
      return;
    }
    if (param.newPwd !== param.newPwdConfirm) {
      notification.error({
        message: '两次输入的新密码不一致',
      });
      return;
    }
    dispatch({
      type: 'pwd/fetchUpdate',
      payload: {
        ...param,
      },
    });
  };

  return (
    <>
      <Modal
        title="修改密码"
        centered
        visible={isModalVisible}
        onOk={onOk}
        onCancel={handleCancel}
        bodyStyle={{ overflowY: 'auto' }}
      >
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 20 }}>
          <Form.Item label="原密码" name="oldPwd">
            <Input placeholder="" type="password" />
          </Form.Item>
          <Form.Item label="新密码" name="newPwd">
            <Input placeholder="" type="password" />
          </Form.Item>
          <Form.Item label="确认新密码" name="newPwdConfirm">
            <Input placeholder="" type="password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ pwd }: { pwd: pwdState }) => {
  return {
    pwd,
  };
};

export default connect(mapStateToProps)(ChangePwd);
