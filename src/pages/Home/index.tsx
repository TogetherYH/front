import styles from './index.less';

import { Space, Button } from 'antd';

import { useModel } from 'umi';

export default function IndexPage() {
  const { initialState } = useModel('@@initialState');
  const { user, login, logout } = useModel('login');
  return (
    <div>
      <h1 className={styles.title}>
        {' '}
        {initialState?.currentUser?.username}, Hello~
      </h1>
      {/* <h1 className={styles.title}> { user?.username }, Hello ~</h1> */}
      <Space>
        <Button
          type="primary"
          onClick={() => {
            login('admin', '123');
          }}
        >
          登录
        </Button>
        <Button
          type="primary"
          onClick={() => {
            logout();
          }}
        >
          登出
        </Button>
      </Space>
    </div>
  );
}
