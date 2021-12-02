import classNames from 'classnames';
import { Form, Input, Button, notification } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useModel, history } from 'umi';

import { login } from '@/services/login';

const Login = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    console.log('@@userInfo:', userInfo);
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values });
      // console.log('msg', msg);

      if (msg.success === true) {
        notification.success({
          message: '登录成功',
        });
        // console.log('msg', msg);
        // 保存token到localStorage
        localStorage.setItem('token', msg.data.token);
        // 获取用户信息
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      } else {
        notification.error({
          message: '登录失败',
        });
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      // setUserLoginState(msg);
    } catch (error) {
      console.log('error', error);
      notification.error({
        message: '登录失败',
      });
    }
  };

  return (
    <div
      className={classNames(
        'height-vh-full',
        'flex',
        'flex-center',
        'align-center',
      )}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={async (values) => {
          await handleSubmit(values as API.LoginParams);
        }}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password
            placeholder="密码"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
